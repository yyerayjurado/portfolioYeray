"""Música original de la presentación vertical (40 s, 120 BPM, sin voces). Síntesis propia, sin muestras de terceros.
Electrónica elegante en La mayor/Fa# menor: intro limpia → ritmo → subida progresiva → cierre memorable.
Cambios de escena en compás (src/presentation/theme.ts). Uso: python3 scripts/presentation_music.py"""
import sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import welcome_music as wm  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
DUR = 40.0
wm.DUR = DUR
wm.N = int(DUR * wm.SR) + wm.SR
SR = wm.SR
hz = wm.hz
rng = np.random.default_rng(41)
F = lambda fr: fr / 30.0
CUTS = [5, 10, 16, 22, 28, 33]

# A – E – F#m – D (optimista y elegante)
CH = [[57, 61, 64, 69], [52, 56, 59, 64], [54, 57, 61, 66], [50, 54, 57, 62]]
ROOTS = [45, 40, 42, 38]
ARP = [[69, 73, 76, 81], [68, 71, 76, 80], [66, 69, 73, 78], [66, 69, 74, 78]]


def impact(dur=1.6, f0=85, f1=34, noise=0.5):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 6)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * wm.env(n, 0.002, 0.5) + wm.lp(rng.standard_normal(n), 0.08) * wm.env(n, 0.001, 0.08) * noise


def riser(dur=1.0):
    n = int(dur * SR); t = np.arange(n) / n
    return wm.lp(rng.standard_normal(n), 0.01 + 0.4 * t ** 2) * t ** 2.3


m = wm.Bus()
t = 0.0; bar = 0
while t < 33 - 1e-6:
    c = bar % 4
    sec = sum(t >= x for x in CUTS)  # 0..5
    m.add(wm.pad(CH[c][1:], 2.3, att=0.6 if sec == 0 else 0.25, rel=0.5, cut=[0.03, 0.04, 0.045, 0.05, 0.06, 0.07][sec]), t, 0.2, pan=0.15 if bar % 2 else -0.15)
    for k in range(16):
        tt = t + k * 0.125
        if tt >= 33 - 1e-6: break
        if k % 2 == 0 and (sec >= 1 or k % 4 == 0):
            note = ARP[c][(k // 2) % 4] + (12 if sec >= 4 and k % 4 == 2 else 0)
            m.add(wm.pluck(note, 0.12 + 0.03 * sec, 0.1), tt, 0.06 + 0.008 * sec, pan=-0.3 if k % 4 else 0.3)
        if sec >= 1 and k % 4 == 0:
            m.add(wm.kick(0.55 if sec == 1 else 0.75), tt); m.add(wm.bass(ROOTS[c] + 12), tt, 0.13)
        if sec >= 2 and k % 8 == 4:
            m.add(wm.clap(), tt, 0.3)
        if sec >= 2 and k % 2 == 1:
            m.add(wm.hat(0.01), tt, 0.09 + 0.01 * sec, pan=0.35)
        if sec >= 3 and k % 4 == 2:
            m.add(wm.bass(ROOTS[c] + 12, 0.12), tt, 0.08)
        if sec >= 4 and k % 2 == 0:
            m.add(wm.hat(0.006), tt, 0.06, pan=-0.35)
    t += 2.0; bar += 1

# Acentos y transiciones
m.add(wm.bell(hz(81), 3.0), 0.12, 0.08)
m.add(impact(1.2, 70, 34, 0.2), 0.12, 0.35)                                 # logotipo
for c in CUTS[:-1]:
    m.add(riser(0.8), c - 0.8, 0.18); m.add(impact(0.9, 90, 40, 0.4), c, 0.3)
m.add(impact(0.7, 95, 50, 0.3), F(150 + 60), 0.25)                          # la idea se convierte en proyecto
m.add(wm.bell(hz(88), 0.5), F(480 + 54), 0.05)                              # «Añadir al carrito»
m.add(impact(0.8, 95, 45, 0.4), F(480 + 90), 0.3)                           # branding
for i in range(4):
    m.add(wm.bell(hz(85 + i * 2), 0.4), F(660 + 74 + i * 12) + 0.6, 0.04)   # tareas organizadas
m.add(riser(1.4), 31.6, 0.4)
# Cierre memorable a los 33 s
m.add(impact(3.5, 80, 28, 0.7), 33.0, 0.9); m.add(wm.kick(1.0), 33.0)
m.add(wm.pad([45, 57, 61, 64, 68, 71, 76], 7.0, att=0.06, rel=3.2, cut=0.06), 33.0, 0.5)
for i, n_ in enumerate([76, 81, 85, 88]):
    m.add(wm.bell(hz(n_), 4.5), 33.1 + i * 0.12, 0.08)
for tt in (34.0, 35.0, 36.0):
    m.add(wm.kick(0.4), tt)
m.add(wm.bell(hz(88), 2.5), F(990 + 67), 0.06)                              # orvixstudio.es
m.write(ROOT / "public/audio/presentation-music.wav", fade_end=3.0)

fx = wm.Bus()
fx.add(wm.shimmer(1.4), 0.15, 0.35)
for c in CUTS:
    fx.add(wm.whoosh(0.55), c - 0.3, 0.3)
fx.add(wm.shimmer(1.8), 33.1, 0.4)
fx.write(ROOT / "public/audio/presentation-sfx.wav", peak=0.55, fade_end=1.0)
print("ok", DUR)
