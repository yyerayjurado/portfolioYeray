"""Música original del Reel «Quiénes somos» (45 s, 120 BPM, sin voces). Síntesis propia, sin muestras de terceros.
Atmósfera (0–5 s) · logotipo y pulso (5–12) · groove (12–20) · más ritmo (20–29) · clímax (29–36) · cierre (36–45).
Los golpes coinciden con src/reel/theme.ts (SC y HITS). Uso: python3 scripts/reel_music.py"""
import sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import welcome_music as wm  # noqa: E402  instrumentos compartidos

ROOT = Path(__file__).resolve().parent.parent
DUR = 45.0
wm.DUR = DUR
wm.N = int(DUR * wm.SR) + wm.SR
SR = wm.SR
hz = wm.hz
rng = np.random.default_rng(31)
F = lambda frame: frame / 30.0

# Re menor → Re mayor en el cierre
CH = [[50, 57, 62, 65], [46, 53, 58, 62], [41, 53, 57, 60], [48, 55, 60, 64]]
ROOTS = [38, 34, 41, 36]
ARP = [[62, 65, 69, 74], [58, 62, 65, 70], [57, 60, 65, 69], [55, 60, 64, 67]]


def impact(dur=2.0, f0=85, f1=30, noise=0.6):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * wm.env(n, 0.002, 0.7) + wm.lp(rng.standard_normal(n), 0.08) * wm.env(n, 0.001, 0.1) * noise


def riser(dur=1.5):
    n = int(dur * SR); t = np.arange(n) / n
    return wm.lp(rng.standard_normal(n), 0.01 + 0.45 * t ** 2) * t ** 2.3


def sub(m, dur=0.5):
    n = int(dur * SR); x = np.arange(n) / SR
    return np.sin(2 * np.pi * hz(m) * x) * wm.env(n, 0.005, 0.3)


m = wm.Bus()
t = 0.0; bar = 0
while t < 36 - 1e-6:
    c = bar % 4
    sec = 0 if t < 5 else 1 if t < 12 else 2 if t < 20 else 3 if t < 29 else 4
    # Pads: se abren con cada sección
    m.add(wm.pad(CH[c][1:] if sec else [38, 45, 50], 2.3, att=1.5 if sec == 0 else 0.3, rel=0.5, cut=[0.02, 0.035, 0.045, 0.055, 0.08][sec]), t, [0.3, 0.22, 0.2, 0.2, 0.24][sec], pan=0.15 if bar % 2 else -0.15)
    for k in range(16):
        tt = t + k * 0.125
        if tt >= 36 - 1e-6: break
        if sec == 0 and k == 0 and tt > 0.9:
            m.add(sub(38, 1.2), tt, 0.25)
        if sec >= 1 and k % 2 == 0:
            note = ARP[c][(k // 2) % 4] + (12 if sec == 4 and k % 4 == 2 else 0)
            m.add(wm.pluck(note, 0.1 + 0.05 * sec, 0.11), tt, 0.07 + 0.01 * sec, pan=-0.3 if k % 4 else 0.3)
        if sec == 1 and k % 8 == 0:
            m.add(wm.kick(0.55), tt); m.add(wm.bass(ROOTS[c] + 12, 0.4), tt, 0.12)
        if sec >= 2 and k % 4 == 0:
            m.add(wm.kick(0.7 if sec == 2 else 0.85), tt); m.add(wm.bass(ROOTS[c] + 12), tt, 0.15)
        if sec >= 2 and k % 8 == 4:
            m.add(wm.clap(), tt, 0.32 if sec < 4 else 0.4)
        if sec >= 2 and k % 2 == 1:
            m.add(wm.hat(0.01 if sec < 4 else 0.02), tt, 0.09 if sec == 2 else 0.12, pan=0.35)
        if sec >= 3 and k % 4 == 2:
            m.add(wm.bass(ROOTS[c] + 24, 0.12), tt, 0.08)
    t += 2.0; bar += 1

# Golpes sincronizados con la animación
for i in range(5):
    m.add(wm.bell(hz(81 + (i % 2) * 5), 0.5), F(60 + i * 7.5), 0.03)       # «TODO EMPIEZA CON UNA IDEA»
m.add(riser(1.2), 3.8, 0.25)
m.add(impact(2.5, 80, 30), F(150 + 15), 0.6)                                # logotipo
for fr in (240, 270, 300):
    m.add(impact(0.9, 95, 45, 0.4), F(fr), 0.32)                            # CREATIVIDAD · DISEÑO · TECNOLOGÍA
m.add(impact(1.2, 90, 35, 0.8), 12.0, 0.45)                                 # fragmentación
m.add(impact(0.8, 100, 50, 0.3), F(360 + 90), 0.25)                         # IDEAS QUE SE CONVIERTEN…
m.add(riser(1.0), 19.0, 0.3)
for fr in (630, 690, 750):
    m.add(impact(1.0, 100, 40, 0.6), F(fr), 0.42)                           # PENSAR · CREAR · TRANSFORMAR
m.add(impact(1.4, 90, 32, 0.5), F(810), 0.4)                                # TECNOLOGÍA CON PROPÓSITO
m.add(riser(1.2), 27.8, 0.35)
m.add(impact(2.4, 90, 28, 0.9), 29.0, 0.85)                                 # clímax
m.add(impact(1.0, 100, 45, 0.5), F(870 + 60), 0.4)                          # EL FUTURO SE CONSTRUYE CON IDEAS
m.add(riser(1.6), 34.3, 0.5)
# Cierre: impacto elegante, firma del logotipo y resolución en Re mayor
m.add(impact(4.5, 80, 26, 0.8), 36.0, 1.0); m.add(wm.kick(1.0), 36.0)
m.add(wm.pad([38, 50, 57, 62, 66, 69, 74], 9.0, att=0.08, rel=4.0, cut=0.06), 36.0, 0.5)
for i, n_ in enumerate([74, 78, 81, 86]):
    m.add(wm.bell(hz(n_), 5.0), 36.1 + i * 0.12, 0.09)
for tt in (37.0, 38.0, 39.0):
    m.add(wm.kick(0.45), tt); m.add(sub(38, 0.8), tt, 0.12)
m.add(wm.bell(hz(81), 2.5), F(1080 + 60), 0.05)                            # IDEAS QUE EVOLUCIONAN
m.add(impact(2.5, 70, 30, 0.3), F(1080 + 120), 0.35); m.add(wm.bell(hz(86), 3.0), F(1080 + 120), 0.06)  # ORVIXSTUDIO.ES
m.write(ROOT / "public/audio/reel-music.wav", fade_end=3.5)

# Efectos discretos: transiciones y aparición del logotipo
fx = wm.Bus()
for i in range(8):
    fx.add(wm.bell(hz(88 + (i % 3) * 3), 0.25), 0.2 + i * 0.22, 0.04, pan=-0.5 + i * 0.14)   # formas que aparecen
for cut in (150, 360, 600, 870, 1080):
    fx.add(wm.whoosh(0.6), F(cut) - 0.3, 0.35)
fx.add(wm.shimmer(1.6), F(150 + 15), 0.4)
fx.add(wm.shimmer(2.0), F(1080 + 6), 0.45)
fx.write(ROOT / "public/audio/reel-sfx.wav", peak=0.6, fade_end=1.0)
print("ok", DUR)
