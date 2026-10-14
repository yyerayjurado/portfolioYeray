"""Comprueba los subtítulos contra el audio: transcribe con Whisper (sherpa-onnx) el tramo de cada subtítulo
y lo compara con su texto. Uso: python3 scripts/verify_subtitles.py /ruta/sherpa-onnx-whisper-small [welcome|about]"""
import json, sys, re, difflib
from pathlib import Path
import numpy as np, soundfile as sf, sherpa_onnx

ROOT = Path(__file__).resolve().parent.parent
M = Path(sys.argv[1])
rec = sherpa_onnx.OfflineRecognizer.from_whisper(
    encoder=str(M / "small-encoder.int8.onnx"), decoder=str(M / "small-decoder.int8.onnx"), tokens=str(M / "small-tokens.txt"),
    language="es", task="transcribe", num_threads=4)
NAME = sys.argv[2] if len(sys.argv) > 2 else "welcome"  # welcome | about
a, sr = sf.read(ROOT / f"public/audio/{NAME}-voice.wav", dtype="float32")
a16 = np.interp(np.arange(0, len(a), sr / 16000), np.arange(len(a)), a).astype("float32")
norm = lambda x: re.sub(r"[^a-záéíóúñü0-9 ]", "", x.lower().replace("orbix", "orvix").replace("orbex", "orvix")).split()
tl = json.loads((ROOT / f"src/{NAME}/timeline.json").read_text())
scores = []
for c in tl["chunks"]:
    seg = a16[int(c["start"] * 16000): int(c["end"] * 16000)]
    s = rec.create_stream(); s.accept_waveform(16000, seg); rec.decode_stream(s)
    got = s.result.text.strip()
    r = difflib.SequenceMatcher(None, norm(c["text"]), norm(got)).ratio()
    scores.append(r)
    print(f"{r:4.2f} | {c['text']}\n     | {got}")
print(f"media de coincidencia: {np.mean(scores):.2f}")
