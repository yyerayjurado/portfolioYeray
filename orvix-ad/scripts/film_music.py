"""Banda sonora original de «Orvix — A different perspective» (35 s, 120 BPM, sin voces).
Electrónica minimalista: piano eléctrico FM cálido, acordes de novena, sub-bajo contenido,
percusión fina (clic, rimshot, shaker) y detalles con eco. Síntesis propia, sin muestras de terceros.
Los acentos coinciden con src/film/theme.ts (SC y HIT). Uso: python3 scripts/film_music.py"""
import sys
from pathlib import Path
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import welcome_music as wm  # noqa: E402  (Bus, env, lp, whoosh)

ROOT = Path(__file__).resolve().parent.parent
DUR = 35.0
wm.DUR = DUR
wm.N = int(DUR * wm.SR) + wm.SR
SR = wm.SR
hz = wm.hz
rng = np.random.default_rng(77)
F = lambda fr: fr / 30.0


def epiano(m, dur=1.8, vel=1.0, bright=1.0):
    """Piano eléctrico FM: portadora + moduladora 1:1 con índice que decae (cálido y redondo)."""
    n = int(dur * SR); x = np.arange(n) / SR; f = hz(m)
    idx = (1.6 * bright) * np.exp(-x * 3.5) + 0.25
    mod = np.sin(2 * np.pi * f * x) * idx
    tine = np.sin(2 * np.pi * f * 7 * x) * np.exp(-x * 30) * 0.08
    s = np.sin(2 * np.pi * f * x + mod) + tine
    return s * wm.env(n, 0.004, 0.9) * vel * np.minimum(1, (dur - x) / 0.25).clip(0, 1)


def chord(notes, at, dur=1.9, vel=0.12, spread=0.012, bright=1.0, bus=None):
    for i, m in enumerate(notes):
        bus.add(epiano(m, dur, 1.0, bright), at + i * spread, vel, pan=(-0.35 + 0.7 * i / max(1, len(notes) - 1)))


def sub(m, dur=0.9):
    n = int(dur * SR); x = np.arange(n) / SR
    return np.sin(2 * np.pi * hz(m) * x) * wm.env(n, 0.01, 0.35)


def soft_kick():
    n = int(0.3 * SR); x = np.arange(n) / SR
    f = 50 + 70 * np.exp(-x * 40)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * wm.env(n, 0.002, 0.09)


def click(f0=3200, d=0.004):
    n = int(0.03 * SR); x = np.arange(n) / SR
    return np.sin(2 * np.pi * f0 * x) * wm.env(n, 0.0003, d)


def rim():
    n = int(0.08 * SR); x = np.arange(n) / SR
    w = rng.standard_normal(n); w = w - wm.lp(w, 0.3)
    return (np.sin(2 * np.pi * 1700 * x) * 0.6 + w * 0.4) * wm.env(n, 0.0005, 0.018)


def shaker():
    n = int(0.07 * SR); w = rng.standard_normal(n); w = w - wm.lp(w, 0.6)
    return w * wm.env(n, 0.004, 0.02)


def bell(m, dur=2.5):
    n = int(dur * SR); x = np.arange(n) / SR; f = hz(m)
    return (np.sin(2 * np.pi * f * x) + 0.4 * np.sin(2 * np.pi * f * 2.76 * x) * np.exp(-x * 3)) * np.exp(-x * 1.4)


def echo(bus, sig, at, gain, taps=4, delay=0.375, fb=0.45):
    for i in range(taps):
        bus.add(sig, at + i * delay, gain * fb ** i, pan=(0.5 if i % 2 else -0.5) if i else 0)


def swell(dur=1.2):
    n = int(dur * SR); t = np.arange(n) / n
    return wm.lp(rng.standard_normal(n), 0.01 + 0.2 * t ** 2) * t ** 2.5


m = wm.Bus()
# Progresión cálida (2 s por acorde): Fmaj9 – Dm9 – Bbmaj9 – C6/9 → resolución en Fmaj9
PROG = [[53, 57, 60, 64, 67], [50, 53, 57, 60, 64], [46, 50, 53, 57, 60], [48, 52, 55, 57, 62]]
ROOTS = [41, 38, 34, 36]

for bar in range(14):
    t = bar * 2.0
    if t >= 27: break
    c = bar % 4
    vel = 0.10 if t < 5 else 0.11 if t < 19 else 0.17
    # 0–5 s: acordes sueltos; luego pulso en negras con variación
    if t < 5:
        chord(PROG[c], t + (0.0 if bar else 0.12), 2.2, vel, 0.02, 0.7, m)
    else:
        for b in (0, 0.75, 1.5):
            chord(PROG[c][1:], t + b, 0.9, vel * (1 if b == 0 else 0.7), 0.006, 1.0, m)
    if t >= 5:
        m.add(sub(ROOTS[c], 1.4), t, 0.22 if t < 19 else 0.3)
    if 19 <= t < 27:  # más energía: pulso de corcheas en registro medio
        for k in range(4):
            m.add(epiano(PROG[c][(k % 3) + 1] + 12, 0.35, 1.0, 1.3), t + 0.25 + k * 0.5, 0.05, pan=-0.4 if k % 2 else 0.4)
    # Percusión fina
    for k in range(8):
        tt = t + k * 0.25
        if tt >= 27: break
        if t >= 5 and k in (0, 4):
            m.add(soft_kick(), tt, 0.5 if t < 19 else 0.8)
        if t >= 11 and k in (2, 6):
            m.add(rim(), tt, 0.22, pan=0.2)
        if t >= 19:
            m.add(shaker(), tt + (0.03 if k % 2 else 0), 0.08 if k % 2 else 0.05, pan=-0.3)
        if t >= 5 and k % 2 == 1:
            m.add(click(), tt, 0.05, pan=0.4)
    # Detalles con eco (más presentes en la parte central)
    if 11 <= t < 27:
        echo(m, bell(PROG[c][-1] + 12, 1.2), t + 1.25, 0.03)

# Acentos sincronizados con la imagen
m.add(bell(84, 3.0), 0.05, 0.06)                     # inicio: sonido elegante y preciso
m.add(click(5200, 0.006), 0.05, 0.15)
for at, g in [(5.0, 0.4), (11.0, 0.4), (19.0, 0.45)]:  # cortes de escena
    m.add(sub(29, 0.8), at, g); m.add(rim(), at, 0.25)
m.add(swell(0.9), F(150 + 90) - 0.9, 0.22)            # giro de la tarjeta
echo(m, bell(81, 1.5), F(150 + 90), 0.05)
for fr in (360, 382, 405, 427):                        # reencuadres
    m.add(click(2600, 0.008), F(fr), 0.18); m.add(soft_kick(), F(fr), 0.25)
m.add(swell(1.0), F(450) - 1.0, 0.22)                  # infinitas posibilidades
chord([65, 69, 72, 76, 79], F(450), 2.5, 0.08, 0.04, 1.3, m)
m.add(swell(0.8), F(660) - 0.8, 0.2)                   # creatividad con intención
echo(m, bell(77, 1.4), F(660), 0.05)
m.add(click(4200, 0.01), F(750), 0.18)                 # composición más limpia
# Resolución: 27 s
m.add(swell(1.6), 25.4, 0.3)
chord([41, 53, 57, 60, 64, 67, 72], 27.0, 8.0, 0.14, 0.03, 0.8, m)
m.add(sub(29, 3.0), 27.0, 0.35); m.add(soft_kick(), 27.0, 0.7)
for i, n_ in enumerate([72, 76, 79, 84]):
    m.add(bell(n_, 4.5), 27.15 + i * 0.14, 0.05)
echo(m, bell(84, 1.6), F(870), 0.04)                   # «UNA DIFERENTE FORMA DE CREAR»
m.add(click(3600, 0.008), F(930), 0.12)                # «ORVIXSTUDIO.ES»
chord([53, 57, 60, 64, 69], F(930), 4.0, 0.06, 0.05, 0.6, m)
m.write(ROOT / "public/audio/film-music.wav", peak=0.89, fade_end=3.0)

# Efectos de transición discretos
fx = wm.Bus()
for at in (5.0, 11.0, 19.0, 27.0):
    fx.add(wm.whoosh(0.5), at - 0.28, 0.25)
fx.add(wm.whoosh(0.7), F(150 + 78), 0.3)               # giro de la tarjeta
fx.add(wm.shimmer(1.6), 27.25, 0.3)                    # aparición del logotipo
fx.add(wm.whoosh(0.8), 33.9, 0.18)                     # salida
fx.write(ROOT / "public/audio/film-sfx.wav", peak=0.5, fade_end=1.0)
print("ok", DUR)
