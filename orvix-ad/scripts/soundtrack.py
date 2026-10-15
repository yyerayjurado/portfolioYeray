"""Genera la banda sonora original del anuncio (120 BPM, 30 s) sincronizada con los cortes:
3 s, 7 s, 14 s, 20 s y 25 s. Uso: python3 scripts/soundtrack.py"""
import numpy as np, wave

SR = 48000
DUR = 30.0
N = int(SR * DUR)
t = np.arange(N) / SR
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
BEAT = 0.5
CUTS = [3, 7, 14, 20, 25]

def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR); j = min(N, i + len(sig)); sig = sig[: j - i] * gain
    L[i:j] += sig * (1 - pan) / 1.0 if pan > 0 else sig
    R[i:j] += sig * (1 + pan) if pan < 0 else sig

def env(n, a, d):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(a, 1e-4)) * np.exp(-x / d)

def lowpass(x, alpha):
    y = np.zeros_like(x); acc = 0.0
    for k in range(len(x)):
        acc += alpha * (x[k] - acc); y[k] = acc
    return y

def boom(dur=2.2, f0=70, f1=28):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 6)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * env(n, 0.002, 0.7) + lowpass(rng.standard_normal(n), 0.08) * env(n, 0.001, 0.12) * 0.6

def kick():
    n = int(0.35 * SR); x = np.arange(n) / SR
    f = 45 + 110 * np.exp(-x * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.12)

def hat():
    n = int(0.06 * SR); w = rng.standard_normal(n)
    w = w - lowpass(w, 0.5)
    return w * env(n, 0.0005, 0.015)

def riser(dur=1.2):
    n = int(dur * SR); x = np.arange(n) / SR
    w = rng.standard_normal(n)
    out = np.zeros(n); acc = 0.0
    a = 0.01 + 0.5 * (x / dur) ** 2
    for k in range(n):
        acc += a[k] * (w[k] - acc); out[k] = acc
    return out * (x / dur) ** 2.2

def note(freq, dur, voices=3):
    n = int(dur * SR); x = np.arange(n) / SR; s = np.zeros(n)
    for v in range(voices):
        d = 1 + (v - 1) * 0.004
        s += np.sin(2 * np.pi * freq * d * x) + 0.3 * np.sin(4 * np.pi * freq * d * x)
    a = np.minimum(1, x / 0.6) * np.minimum(1, (dur - x) / 0.8)
    return s / voices * a

def bell(freq, dur=3.5):
    n = int(dur * SR); x = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * freq * p * x) * np.exp(-x * (1.2 + i)) / (i + 1)
               for i, p in enumerate([1, 2.0, 2.76, 4.07]))

hz = lambda m: 440 * 2 ** ((m - 69) / 12)

# 1) Impactos en el arranque y en cada corte + whoosh previo
add(boom(), 0, 0.9)
for c in CUTS:
    add(riser(1.0), c - 1.0, 0.25)
    add(boom(1.6 if c != 25 else 3.0), c, 0.55 if c != 25 else 0.95)

# 2) Pad armónico (Am – F – C – G) desde 3 s
chords = [[57, 60, 64], [53, 57, 60], [48, 55, 64], [55, 59, 62]]
for bar in range(12):
    start = 3 + bar * 2.0
    if start >= 28: break
    for m in chords[bar % 4]:
        add(note(hz(m), 2.3), start, 0.05 * (1 + bar / 12), pan=0.3 if m % 2 else -0.3)

# 3) Ritmo: kick 7–25 s, hats 7–25 s, bajo a corcheas 14–25 s
roots = [45, 41, 36, 43]
b = 7.0
while b < 25 - 1e-6:
    add(kick(), b, 0.75)
    add(hat(), b + BEAT / 2, 0.25, pan=0.4)
    if b >= 14:
        idx = int((b - 3) // 2) % 4
        for e in (0, BEAT / 2):
            n = int(0.22 * SR); x = np.arange(n) / SR
            sq = np.tanh(3 * np.sin(2 * np.pi * hz(roots[idx]) * x)) * env(n, 0.003, 0.09)
            add(sq, b + e, 0.18)
    if b >= 20:
        add(hat(), b, 0.15, pan=-0.4)
    b += BEAT

# 4) Firma sonora del logotipo
for i, m in enumerate([69, 76, 81]):
    add(bell(hz(m)), 25.12 + i * 0.12, 0.12)

mix = np.stack([L, R], 1)
fade = np.minimum(1, (DUR - t) / 1.5)[:, None]
mix = np.tanh(mix * 1.4) * fade
mix /= np.abs(mix).max() / 0.89
with wave.open("public/audio/orvix-soundtrack.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("ok")
