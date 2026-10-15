"""Locución del vídeo de bienvenida de Orvix Studio + tiempos de subtítulos derivados del audio real.

Genera:
  public/audio/welcome-voice.wav     locución completa (mono, 24 kHz)
  src/welcome/timeline.json          tiempos de frases, segmentos de subtítulo y anclas para las escenas
  video/orvix-studio-bienvenida.srt  subtítulos en SRT

Motor de voz: Kokoro-82M (ONNX, licencia Apache-2.0), voz masculina «em_alex», fonetización «es» (castellano).
Modelos: https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0 (kokoro-v1.0.onnx, voices-v1.0.bin)

Uso:
  pip install kokoro-onnx soundfile
  python3 scripts/welcome_voiceover.py /ruta/a/modelos

Para usar una locución humana: graba cada frase como voice/NN.wav (mismo orden que SCRIPT) y ejecuta con
--recorded carpeta; los tiempos y subtítulos se recalculan igual a partir de esos archivos.
"""
import json, sys, wave
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SR_OUT = 24000

# Guion exacto. «tts» solo cambia la grafía para que el motor pronuncie bien los nombres propios;
# los subtítulos usan siempre el texto real («chunks»). Cada párrafo corresponde a una escena.
SCRIPT = [
    [  # Escena 1 · Bienvenida
        {"chunks": ["El mundo digital evoluciona constantemente."]},
        {"chunks": ["Y tu negocio necesita algo más que estar presente en internet."]},
    ],
    [  # Escena 2 · Quiénes somos
        {
            "chunks": ["En Orvix Studio, unimos creatividad, diseño y tecnología", "para construir soluciones digitales", "pensadas para empresas y emprendedores."],
            "tts": "En Órvix Estudio, unimos creatividad, diseño y tecnología para construir soluciones digitales, pensadas para empresas y emprendedores.",
            "anchors": ["creatividad", "diseño", "tecnología"],
        },
    ],
    [  # Escena 3 · Web y Shopify
        {"chunks": ["Diseñamos y desarrollamos páginas web", "que representan tu marca."]},
        {
            "chunks": ["Creamos tiendas online con Shopify", "para ayudarte a vender por internet."],
            "tts": "Creamos tiendas onláin con Shópifai, para ayudarte a vender por internet.",
        },
    ],
    [  # Escena 4 · Branding, marketing y 3D
        {"chunks": ["Y trabajamos la identidad visual", "para que tu negocio tenga una imagen propia y reconocible."]},
        {
            "chunks": ["También desarrollamos soluciones de marketing digital y diseño 3D,", "adaptadas a las necesidades de cada proyecto."],
            "tts": "También desarrollamos soluciones de marketing digital y diseño tres dé, adaptadas a las necesidades de cada proyecto.",
            "anchors": ["marketing", "tres"],
        },
    ],
    [  # Escena 5 · Automatización e IA
        {
            "chunks": ["Y damos un paso más:", "incorporamos automatizaciones e inteligencia artificial", "para ayudar a simplificar tareas", "y conectar procesos de negocio."],
        },
    ],
    [  # Escena 6 · Filosofía
        {"chunks": ["Nuestro objetivo es convertir tus ideas", "en soluciones digitales útiles, cuidadas", "y preparadas para evolucionar contigo."]},
    ],
    [  # Escena 7 · Cierre
        {"chunks": ["Somos Orvix Studio."], "tts": "Somos Órvix Estudio."},
        {"chunks": ["Diseño, tecnología e innovación", "al servicio de tu negocio."]},
        {
            "chunks": ["Descubre todo lo que podemos construir juntos en orvixstudio.es."],
            "tts": "Descubre todo lo que podemos construir juntos en órvix estudio punto es.",
        },
    ],
]

LEAD_IN = 1.6  # el logotipo aparece antes de la primera frase
PAUSE_SENT = 0.42  # pausa entre frases
PAUSE_PARA = 0.85  # pausa entre ideas / escenas
TAIL = 5.0  # cierre: la web queda en pantalla y la música resuelve
SPEED = 0.94  # ritmo controlado, sin prisa


def frames_rms(a, win=240):
    n = len(a) // win
    return np.sqrt((a[: n * win].reshape(n, win) ** 2).mean(1) + 1e-12), win


def trim(a, thr_db=-42):
    r, win = frames_rms(a)
    on = np.where(20 * np.log10(r) > thr_db)[0]
    if len(on) == 0:
        return a
    s = max(0, on[0] * win - int(0.03 * SR_OUT))
    e = min(len(a), (on[-1] + 1) * win + int(0.06 * SR_OUT))
    return a[s:e]


def pauses(a, thr_db=-38, min_len=0.07):
    """Silencios internos (inicio, fin) en segundos."""
    r, win = frames_rms(a)
    quiet = 20 * np.log10(r) < thr_db
    out, i = [], 0
    while i < len(quiet):
        if quiet[i]:
            j = i
            while j < len(quiet) and quiet[j]:
                j += 1
            if (j - i) * win / SR_OUT >= min_len and i > 0 and j < len(quiet):
                out.append((i * win / SR_OUT, j * win / SR_OUT))
            i = j
        else:
            i += 1
    return out


def boundaries(text_parts, audio_dur, ps, weight):
    """Tiempos de corte entre fragmentos de una frase: se ajustan a las pausas reales del audio cuando
    el fragmento termina en signo de puntuación; si no, se reparten por peso fonético dentro de la frase."""
    total = sum(weight(t) for t in text_parts)
    cuts, acc = [], 0.0
    for t in text_parts[:-1]:
        acc += weight(t)
        exp = acc / total * audio_dur
        mids = [((s + e) / 2, s, e) for s, e in ps]
        tol = 0.9 if t.rstrip()[-1] in ",:;" else 0.3
        near = min(mids, key=lambda m: abs(m[0] - exp)) if mids else None
        cuts.append(near[2] - 0.02 if near and abs(near[0] - exp) < tol else exp)
    return cuts


def main(script=SCRIPT, name="welcome", srt_name="orvix-studio-bienvenida.srt", lead_in=LEAD_IN, tail=TAIL):
    """Sintetiza `script` y escribe public/audio/{name}-voice.wav, src/{name}/timeline.json y video/{srt_name}."""
    args = sys.argv[1:]
    recorded = None
    if "--recorded" in args:
        recorded = Path(args[args.index("--recorded") + 1])
    else:
        from kokoro_onnx import Kokoro

        mdir = Path(args[0])
        k = Kokoro(str(mdir / "kokoro-v1.0.onnx" if (mdir / "kokoro-v1.0.onnx").exists() else mdir / "kokoro.onnx"),
                   str(mdir / "voices-v1.0.bin" if (mdir / "voices-v1.0.bin").exists() else mdir / "voices.bin"))
        phon = lambda t: k.tokenizer.phonemize(t, "es")

    weight = (lambda t: len(phon(t).replace(" ", ""))) if not recorded else (lambda t: len(t.replace(" ", "")))

    voice = [np.zeros(int(lead_in * SR_OUT), dtype=np.float32)]
    t = lead_in
    sentences, chunks, paragraphs, anchors = [], [], [], {}
    idx = 0
    for pi, para in enumerate(script):
        p_start = t
        for si, s in enumerate(para):
            display = " ".join(s["chunks"])
            if recorded:
                import soundfile as sf

                a, sr = sf.read(recorded / f"{idx:02d}.wav", dtype="float32")
                if a.ndim > 1:
                    a = a.mean(1)
                if sr != SR_OUT:
                    a = np.interp(np.arange(0, len(a), sr / SR_OUT), np.arange(len(a)), a).astype("float32")
            else:
                a, _ = k.create(s.get("tts", display), voice="em_alex", speed=SPEED, lang="es")
            a = trim(a.astype(np.float32))
            dur = len(a) / SR_OUT
            ps = pauses(a)
            parts = s["chunks"]
            if "tts" in s and len(parts) > 1:
                # Reparte el texto de síntesis en los mismos fragmentos (para que la coma añadida marque el corte)
                words = s["tts"].split()
                sizes = [len(c.split()) for c in parts]
                parts, i0 = [], 0
                for n in sizes:
                    parts.append(" ".join(words[i0:i0 + n])); i0 += n
            cuts = boundaries(parts, dur, ps, weight)
            edges = [0.0] + cuts + [dur]
            for ci_, c in enumerate(s["chunks"]):
                chunks.append({"text": c, "start": round(t + edges[ci_], 3), "end": round(t + edges[ci_ + 1], 3)})
            # Anclas para animaciones: inicio aproximado de palabras clave dentro de la frase
            for w in s.get("anchors", []):
                src = s.get("tts", display)
                pos = src.lower().find(w)
                pre = src[:pos]
                exp = weight(pre) / max(1, weight(src)) * dur if pre.strip() else 0
                # Si la palabra va tras una coma, empieza al final de esa pausa real; si no, reparto fonético.
                ends = [e for _, e in ps]
                near = min(ends, key=lambda m: abs(m - exp)) if ends and pre.rstrip().endswith(",") else None
                anchors[w] = round(t + (near if near is not None and abs(near - exp) < 0.6 else exp), 3)
            sentences.append({"text": display, "start": round(t, 3), "end": round(t + dur, 3), "para": pi})
            voice.append(a)
            t += dur
            idx += 1
            last = si == len(para) - 1
            gap = PAUSE_PARA if last else PAUSE_SENT
            if pi == len(script) - 1 and last:
                gap = tail
            voice.append(np.zeros(int(gap * SR_OUT), dtype=np.float32))
            t += gap
        paragraphs.append({"start": round(p_start, 3), "end": round(sentences[-1]["end"], 3)})

    audio = np.concatenate(voice)
    peak = np.abs(audio).max()
    audio = audio / peak * 0.89
    out = ROOT / f"public/audio/{name}-voice.wav"
    with wave.open(str(out), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR_OUT)
        w.writeframes((audio * 32767).astype("<i2").tobytes())

    total = len(audio) / SR_OUT
    timeline = {"duration": round(total, 3), "fps": 30, "durationInFrames": int(np.ceil(total * 30)),
                "sentences": sentences, "chunks": chunks, "paragraphs": paragraphs, "anchors": anchors,
                "voice": "Kokoro-82M · em_alex · es" if not recorded else "grabación"}
    (ROOT / f"src/{name}").mkdir(parents=True, exist_ok=True)
    (ROOT / f"src/{name}/timeline.json").write_text(json.dumps(timeline, ensure_ascii=False, indent=2))

    def ts(x):
        h, m, s = int(x // 3600), int(x % 3600 // 60), x % 60
        return f"{h:02d}:{m:02d}:{int(s):02d},{int(round((s - int(s)) * 1000)):03d}"

    srt = "\n".join(f"{i + 1}\n{ts(c['start'])} --> {ts(c['end'])}\n{c['text']}\n" for i, c in enumerate(chunks))
    (ROOT / "video").mkdir(exist_ok=True)
    (ROOT / "video" / srt_name).write_text(srt, encoding="utf-8")
    print(f"locución: {total:.2f} s · {len(sentences)} frases · {len(chunks)} subtítulos")


if __name__ == "__main__":
    main()
