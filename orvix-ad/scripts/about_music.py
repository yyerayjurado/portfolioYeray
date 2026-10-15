"""Música y efectos originales del vídeo «Quiénes somos» (síntesis propia, sin muestras de terceros).
Electrónica cinematográfica: atmósfera → pulso → energía → resolución con el logotipo final.
Reutiliza los instrumentos de scripts/welcome_music.py y sigue src/about/timeline.json.
Genera public/audio/about-music.wav y public/audio/about-sfx.wav. Uso: python3 scripts/about_music.py"""
import json, sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import welcome_music as wm  # noqa: E402  (instrumentos: pad, pluck, kick, hat, clap, bass, bell, whoosh, shimmer, lp, env)

ROOT = Path(__file__).resolve().parent.parent
TL = json.loads((ROOT / "src/about/timeline.json").read_text())
DUR = TL["duration"]
wm.DUR = DUR
wm.N = int(DUR * wm.SR) + wm.SR
SR = wm.SR
rng = np.random.default_rng(9)
hz = wm.hz
P = [p["start"] for p in TL["paragraphs"]]
CUT = [0.0] + [p - 0.4 for p in P[1:]]
A = TL["anchors"]
LAST_END = TL["sentences"][-1]["end"]

# Re menor: Dm – Bb – F – C, resolución final en Re mayor
CH = [[50, 57, 62, 65], [46, 53, 58, 62], [41, 53, 57, 60], [48, 55, 60, 64]]
ROOTS = [38, 34, 41, 36]
ARP = [[62, 65, 69, 74], [58, 62, 65, 70], [57, 60, 65, 69], [55, 60, 64, 67]]


def impact(dur=2.0, f0=80, f1=32):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * wm.env(n, 0.002, 0.6) + wm.lp(rng.standard_normal(n), 0.08) * wm.env(n, 0.001, 0.08) * 0.5


def riser(dur=1.5):
    n = int(dur * SR); t = np.arange(n) / n
    return wm.lp(rng.standard_normal(n), 0.01 + 0.4 * t ** 2) * t ** 2.2


music = wm.Bus()
t = 0.0; bar = 0
while t < DUR - 0.5:
    c = bar % 4
    sec_ = 0 if t < P[1] else 1 if t < P[2] else 2 if t < P[3] else 3 if t < P[4] else 4 if t < P[5] else 5
    if sec_ < 5:
        cut = [0.02, 0.035, 0.045, 0.04, 0.06][sec_]
        music.add(wm.pad(CH[c][1:] if sec_ else [38, 45, 50], 2.4, att=1.2 if sec_ == 0 else 0.4, rel=0.6, cut=cut), t, 0.24, pan=0.15 if bar % 2 else -0.15)
    for k in range(16):
        tt = t + k * 0.125
        if tt >= DUR - 0.5 or tt >= P[5] - 0.05: break
        if sec_ == 0 and k % 8 == 0 and tt > 1.0:
            music.add(wm.kick(0.35), tt)                                  # pulso grave lento
        if sec_ >= 1 and k % 2 == 0:
            m = ARP[c][(k // 2) % 4] + (12 if sec_ == 4 and k % 4 == 2 else 0)
            music.add(wm.pluck(m, 0.1 + 0.04 * sec_, 0.12), tt, 0.07, pan=-0.3 if k % 4 else 0.3)
        if sec_ in (2, 4) and k % 4 == 0:
            music.add(wm.kick(0.75 if sec_ == 4 else 0.6), tt)
            music.add(wm.bass(ROOTS[c] + 12), tt, 0.14)
        if sec_ in (2, 4) and k % 8 == 4:
            music.add(wm.clap(), tt, 0.3)
        if sec_ in (2, 3, 4) and k % 4 == 2:
            music.add(wm.hat(), tt, 0.1 if sec_ == 3 else 0.13, pan=0.35)
        if sec_ == 3 and k % 8 == 0:
            music.add(wm.kick(0.5), tt); music.add(wm.bass(ROOTS[c] + 12, 0.4), tt, 0.1)
        if sec_ == 1 and k % 8 == 0:
            music.add(wm.bass(ROOTS[c] + 12, 0.5), tt, 0.1)
    t += 2.0; bar += 1

# Golpes y transiciones musicales
music.add(riser(1.2), P[1] - 1.6, 0.25)
music.add(impact(2.4), CUT[1] + 0.3, 0.55)                       # aparición del logotipo
for w in ("pensamiento", "innovación", "desarrollo"):
    music.add(impact(0.6, 90, 50), A[w], 0.18)
for at in (P[3], A["crear"], A["transformar"]):                  # PENSAR · CREAR · TRANSFORMAR
    music.add(impact(1.0, 95, 45), at, 0.3)
music.add(riser(1.6), P[5] - 2.0, 0.4)
music.add(impact(3.5, 85, 28), CUT[5] + 0.3, 0.9)                # logotipo final
res = CUT[5] + 0.3
music.add(wm.pad([38, 50, 57, 62, 66, 69], DUR - res, att=0.1, rel=3.0, cut=0.05), res, 0.5)   # Re mayor
for i, m in enumerate([74, 78, 81, 86]):
    music.add(wm.bell(hz(m), 5.0), res + 0.05 + i * 0.12, 0.09)
end_hit = TL["sentences"][-1]["start"]
music.add(wm.bell(hz(86), 3.0), end_hit + 0.05, 0.05)
music.write(ROOT / "public/audio/about-music.wav", fade_end=2.6)

# Efectos discretos
sfx = wm.Bus()
for i, at in enumerate([0.5, 0.9, 1.4, 1.8, 2.6, 3.3]):            # puntos y formas que aparecen
    sfx.add(wm.bell(hz(88 + (i % 3) * 3), 0.25), at, 0.05, pan=-0.5 + i * 0.2)
for w in ("visión", "creatividad", "convertirlas"):
    sfx.add(wm.whoosh(0.35), A[w] - 0.15, 0.18)                    # las formas se conectan
for c in CUT[1:]:
    sfx.add(wm.whoosh(0.6), c - 0.3, 0.35)
sfx.add(wm.shimmer(1.6), CUT[1] + 0.3, 0.35)
words = [P[1] + 1.6, A["diseño"], A["tecnología"]]                # CREATIVIDAD · DISEÑO · TECNOLOGÍA
for at in words:
    sfx.add(wm.bell(hz(91), 0.4), at, 0.07)
sfx.add(wm.shimmer(1.8), CUT[5] + 0.3, 0.4)
sfx.write(ROOT / "public/audio/about-sfx.wav", peak=0.6, fade_end=1.0)
print("ok", DUR)
