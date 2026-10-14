"""Música y efectos originales del vídeo de bienvenida (síntesis propia, sin muestras de terceros).
Lee src/welcome/timeline.json para que cada sección musical siga a la narración.
Genera public/audio/welcome-music.wav (se atenúa en Remotion durante la locución) y public/audio/welcome-sfx.wav.
Uso: python3 scripts/welcome_music.py"""
import json, wave
from pathlib import Path
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / "src/welcome/timeline.json").read_text())
SR = 48000
DUR = TL["duration"]
N = int(DUR * SR) + SR
rng = np.random.default_rng(5)
hz = lambda m: 440 * 2 ** ((m - 69) / 12)
P = [p["start"] for p in TL["paragraphs"]]  # inicio de cada idea / escena
CUT = [0.0] + [p - 0.4 for p in P[1:]]  # cortes de escena (en la pausa previa)
LAST_END = TL["sentences"][-1]["end"]


class Bus:
    def __init__(self):
        self.L = np.zeros(N); self.R = np.zeros(N)

    def add(self, sig, start, gain=1.0, pan=0.0):
        i = int(round(start * SR))
        if i >= N or i < 0: return
        j = min(N, i + len(sig)); s = sig[: j - i] * gain
        self.L[i:j] += s * min(1, 1 - pan); self.R[i:j] += s * min(1, 1 + pan)

    def write(self, path, peak=0.89, fade_end=3.0):
        mix = np.stack([self.L, self.R], 1)[: int(DUR * SR)]
        x = np.arange(len(mix)) / SR
        mix *= np.minimum(1, np.minimum(x / 0.02, (DUR - x) / fade_end))[:, None]
        mix = np.tanh(mix * 1.1)
        mix /= max(1e-9, np.abs(mix).max()) / peak
        with wave.open(str(path), "wb") as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
            w.writeframes((mix * 32767).astype("<i2").tobytes())


def env(n, a, d):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(a, 1e-4)) * np.exp(-x / d)


def lp(x, alpha):
    alpha = np.broadcast_to(np.asarray(alpha, dtype=float), x.shape); y = np.empty_like(x); acc = 0.0
    for k in range(len(x)):
        acc += alpha[k] * (x[k] - acc); y[k] = acc
    return y


def saw(f, n, det=(0.997, 1.0, 1.003)):
    x = np.arange(n) / SR
    return sum(2 * ((f * d * x) % 1.0) - 1 for d in det) / len(det)


def pad(ms, dur, att=0.8, rel=1.0, cut=0.035):
    n = int(dur * SR); x = np.arange(n) / SR
    s = lp(sum(saw(hz(m), n) for m in ms) / len(ms), cut)
    return s * np.minimum(1, x / att) * np.minimum(1, np.maximum(0, (dur - x) / rel))


def pluck(m, cut=0.18, d=0.14):
    n = int(0.4 * SR)
    return lp(saw(hz(m), n, (0.999, 1.001)), cut) * env(n, 0.002, d)


def kick(g=1.0):
    n = int(0.35 * SR); x = np.arange(n) / SR
    f = 48 + 110 * np.exp(-x * 34)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.12) * g


def hat(d=0.012):
    n = int(0.06 * SR); w = rng.standard_normal(n)
    return (w - lp(w, 0.45)) * env(n, 0.0005, d)


def clap():
    n = int(0.2 * SR); w = rng.standard_normal(n); w = w - lp(w, 0.25)
    return w * env(n, 0.001, 0.05) * 0.5


def bass(m, dur=0.22):
    n = int(dur * SR); x = np.arange(n) / SR
    return np.tanh(2.0 * np.sin(2 * np.pi * hz(m) * x)) * env(n, 0.004, 0.11)


def bell(f, dur=3.5):
    n = int(dur * SR); x = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * f * p * x) * np.exp(-x * (1.0 + i * 0.8)) / (i + 1) for i, p in enumerate([1, 2.0, 2.76, 4.07]))


def whoosh(dur=0.7):
    n = int(dur * SR); t = np.arange(n) / n
    return lp(rng.standard_normal(n), 0.015 + 0.25 * np.sin(np.pi * t) ** 2) * np.sin(np.pi * t) ** 2


def shimmer(dur=1.4):
    n = int(dur * SR); x = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * hz(m) * x + i) for i, m in enumerate([84, 88, 91, 96])) / 4
    return s * env(n, 0.05, 0.5) * (0.6 + 0.4 * np.sin(2 * np.pi * 7 * x))


# Progresión optimista en Do mayor: C – G – Am – F
CH = [[48, 55, 60, 64], [43, 55, 59, 62], [45, 52, 57, 60], [41, 53, 57, 60]]
ROOT_ = [36, 31, 33, 29]
ARP = [[60, 64, 67, 72], [59, 62, 67, 71], [57, 60, 64, 69], [57, 60, 65, 69]]
BAR = 2.0  # 120 BPM

music = Bus()
end_music = DUR
s_groove, s_ai, s_calm, s_close = P[2], P[4], P[5], P[6]

t = 0.0; bar = 0
while t < end_music - 0.5:
    c = bar % 4
    # Pad durante toda la pieza (intro más suave)
    music.add(pad(CH[c][1:], BAR + 0.4, att=0.6 if t > 1 else 1.5, rel=0.6, cut=0.03 if t < P[1] else 0.045), t, 0.22, pan=0.15 if bar % 2 else -0.15)
    for k in range(8):
        tt = t + k * 0.25
        if tt >= end_music - 0.5: break
        arp_on = tt >= 0.6
        if arp_on:
            m = ARP[c][k % 4] + (12 if (s_ai <= tt < s_calm) and k % 2 else 0)
            music.add(pluck(m, 0.12 if tt < P[1] else 0.2), tt, 0.09, pan=-0.3 if k % 2 else 0.3)
        drums = (P[1] <= tt < s_calm) or (s_close <= tt < LAST_END + 0.4)
        light = tt < s_groove
        if drums and k % 2 == 0:
            beat = (k // 2)
            if not light or beat in (0, 2):
                music.add(kick(0.55 if light else 0.75), tt)
            if not light and beat in (1, 3):
                music.add(clap(), tt, 0.35)
            music.add(bass(ROOT_[c] + 12), tt, 0.12 if light else 0.16)
        if drums and k % 2 == 1:
            music.add(hat(), tt, 0.1 if light else 0.14, pan=0.35)
        if s_calm <= tt < s_close and k % 4 == 0:
            music.add(bass(ROOT_[c] + 12, 0.5), tt, 0.1)
    t += BAR; bar += 1

# Cierre: subida suave y resolución final tras la última frase
music.add(whoosh(1.2) * np.linspace(0, 1, int(1.2 * SR)), s_close - 1.2, 0.25)
res = LAST_END + 0.5
music.add(pad([36, 48, 55, 60, 64, 67, 72], DUR - res, att=0.05, rel=2.6, cut=0.06), res, 0.45)
music.add(kick(1.0), res)
for i, m in enumerate([72, 79, 84]):
    music.add(bell(hz(m), 4.0), res + 0.02 + i * 0.1, 0.12)
music.write(ROOT / "public/audio/welcome-music.wav", fade_end=2.2)

# Efectos discretos (no se atenúan con la voz)
sfx = Bus()
sfx.add(shimmer(1.6), 0.3, 0.35)                  # aparición del logotipo
sfx.add(bell(hz(84), 2.0), 0.35, 0.12)
for c in CUT[1:]:
    sfx.add(whoosh(0.6), c - 0.3, 0.35)           # transiciones entre escenas
shop = next(x["start"] for x in TL["chunks"] if x["text"].startswith("Creamos tiendas"))
sfx.add(bell(hz(91), 0.4), shop + 1.6, 0.08)      # «Añadir al carrito»
auto0 = next(x["start"] for x in TL["chunks"] if x["text"].startswith("incorporamos"))
for i in range(5):
    sfx.add(bell(hz(88 + (i % 3) * 2), 0.3), auto0 + i * 1.4, 0.05)  # nodos del flujo
sfx.add(shimmer(1.8), s_close - 0.4, 0.4)          # logotipo final
sfx.write(ROOT / "public/audio/welcome-sfx.wav", peak=0.6, fade_end=1.0)
print("ok", DUR)
