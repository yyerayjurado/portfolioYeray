"""Banda sonora original de «OrvixCinematic» (40 s, 120 BPM), generada por síntesis: sin muestras de terceros.
Introducción grave (0–5 s) · construcción (5–11 s) · percusión (11–18 s) · clímax (18–26 s)
· revelación del logotipo (26–33 s) · resolución (33–40 s). Los golpes coinciden con src/cinematic/theme.ts.
Uso: python3 scripts/cinematic_soundtrack.py"""
import numpy as np, wave

SR = 48000
DUR = 40.0
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(23)
BEAT = 0.5
fr = lambda frame: frame / 30.0
hz = lambda m: 440 * 2 ** ((m - 69) / 12)

def add(sig, start, gain=1.0, pan=0.0):
    i = int(round(start * SR))
    if i >= N or i < 0: return
    j = min(N, i + len(sig)); s = sig[: j - i] * gain
    L[i:j] += s * min(1, 1 - pan); R[i:j] += s * min(1, 1 + pan)

def env(n, a, d):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(a, 1e-4)) * np.exp(-x / d)

def lp(x, alpha):
    alpha = np.broadcast_to(np.asarray(alpha, dtype=float), x.shape); y = np.empty_like(x); acc = 0.0
    for k in range(len(x)):
        acc += alpha[k] * (x[k] - acc); y[k] = acc
    return y

def saw(freq, n, detune=(0.996, 1.0, 1.004)):
    x = np.arange(n) / SR
    return sum(2 * ((freq * d * x) % 1.0) - 1 for d in detune) / len(detune)

def boom(dur=2.5, f0=72, f1=30, noise=0.5, decay=0.8):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 5)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, decay) + lp(rng.standard_normal(n), 0.06) * env(n, 0.001, 0.15) * noise

def kick(g=1.0):
    n = int(0.4 * SR); x = np.arange(n) / SR
    f = 44 + 130 * np.exp(-x * 30)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.15) * g

def clap():
    n = int(0.25 * SR); w = rng.standard_normal(n); w = w - lp(w, 0.2)
    e = env(n, 0.001, 0.07)
    for d in (0.008, 0.016): e[int(d * SR):] += env(n - int(d * SR), 0.001, 0.02) * 0.6
    return w * e * 0.6

def hat(d=0.015):
    n = int(0.08 * SR); w = rng.standard_normal(n)
    return (w - lp(w, 0.45)) * env(n, 0.0005, d)

def tom(m=40):
    n = int(0.6 * SR); x = np.arange(n) / SR
    f = hz(m) * (1 + 0.6 * np.exp(-x * 18))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.002, 0.22)

def blip(m=88, d=0.06):
    n = int(d * 3 * SR); x = np.arange(n) / SR
    return np.sin(2 * np.pi * hz(m) * x) * env(n, 0.001, d)

def riser(dur=1.5, top=0.45):
    n = int(dur * SR); t = np.arange(n) / n
    return lp(rng.standard_normal(n), 0.01 + top * t ** 2) * t ** 2.4

def whoosh(dur=0.6):
    n = int(dur * SR); t = np.arange(n) / n
    return lp(rng.standard_normal(n), 0.02 + 0.3 * np.sin(np.pi * t) ** 2) * np.sin(np.pi * t) ** 2

def pad(midis, dur, att=0.8, rel=1.2, cutoff=0.04):
    n = int(dur * SR); x = np.arange(n) / SR
    s = sum(saw(hz(m), n) for m in midis) / len(midis)
    s = lp(s, cutoff)
    return s * np.minimum(1, x / att) * np.minimum(1, np.maximum(0, (dur - x) / rel))

def pluck(m, cutoff=0.15, d=0.12):
    n = int(0.3 * SR)
    return lp(saw(hz(m), n, (0.998, 1.002)), cutoff) * env(n, 0.002, d)

def bass(m, dur=0.24, drive=2.5):
    n = int(dur * SR); x = np.arange(n) / SR
    return np.tanh(drive * (np.sin(2 * np.pi * hz(m) * x) + 0.3 * np.sin(4 * np.pi * hz(m) * x))) * env(n, 0.004, 0.12)

def bell(freq, dur=4.0):
    n = int(dur * SR); x = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * freq * p * x) * np.exp(-x * (0.9 + i * 0.7)) / (i + 1) for i, p in enumerate([1, 2.0, 2.76, 4.07]))

ARP = [57, 60, 64, 69, 64, 60, 57, 52]  # La menor
CHORDS = {"Am": [45, 57, 60, 64], "F": [41, 53, 57, 60], "C": [36, 48, 55, 64], "G": [43, 55, 59, 62]}
PROG = ["Am", "F", "C", "G"]
ROOTS = {"Am": 33, "F": 29, "C": 36, "G": 31}
chord_at = lambda t: PROG[int(t // 2) % 4]

# ── 00–05 · Introducción: dron grave, textura y palabras ──────────────────────
add(pad([33, 45, 52], 5.6, att=0.6, rel=0.8, cutoff=0.02), 0, 0.55)
add(boom(3.0, 60, 28, 0.2, 1.0), 0.0, 0.55)  # golpe grave inicial
for t in np.arange(1.0, 5.0, 1.0): add(boom(0.9, 55, 32, 0.0, 0.35), t, 0.35)
add(lp(rng.standard_normal(int(5 * SR)), 0.004) * np.linspace(0, 1, int(5 * SR)), 0, 0.6, pan=0.3)
for i in range(5): add(blip(81 + (i % 2) * 7, 0.04), fr(60 + i * 8), 0.07, pan=-0.4 + i * 0.2)
add(riser(1.3), 3.7, 0.3)
add(whoosh(0.5), 4.55, 0.35)

# ── 05–11 · Construcción: arpegio que se abre, pulso y bajo ───────────────────
add(boom(1.6, 70, 34, 0.4), 5.0, 0.55)
add(pad(CHORDS["Am"][1:], 6.2, att=1.2, rel=0.6, cutoff=0.03), 5.0, 0.18)
t = 5.0; k = 0
while t < 11 - 1e-6:
    open_ = 0.05 + 0.2 * (t - 5) / 6
    add(pluck(ARP[k % 8] + (12 if t > 8 else 0), open_), t, 0.12, pan=0.35 if k % 2 else -0.35)
    if t >= 7 and abs((t * 2) % 1) < 1e-6: add(kick(0.7), t)
    if t >= 8 and k % 2 == 0: add(bass(ROOTS[chord_at(t - 5)] + 12), t, 0.12)
    t += 0.25; k += 1
add(whoosh(0.7), fr(150 + 84), 0.4)
add(boom(1.0, 80, 40, 0.3, 0.4), fr(150 + 90), 0.35)  # cambio a la tienda
add(whoosh(0.9), fr(150 + 140), 0.3)
add(riser(1.0), 10.0, 0.4)

# ── 11–18 · Percusión contundente y pulsos digitales del flujo ────────────────
add(boom(2.2, 85, 30, 0.8), 11.0, 0.95); add(clap(), 11.0, 0.8)
for bar in range(4):
    st = 11 + bar * 2.0
    add(pad(CHORDS[PROG[bar % 4]][1:], 2.2, att=0.2, rel=0.5, cutoff=0.05), st, 0.12)
t = 11.0; k = 0
while t < 18 - 1e-6:
    if k % 2 == 0: add(kick(0.95), t)
    if k % 4 == 2: add(clap(), t, 0.6)
    add(hat(0.012 if k % 2 else 0.008), t + 0.0, 0.16, pan=0.3)
    if k % 2 == 0: add(bass(ROOTS[chord_at(t - 11)]), t, 0.2); add(bass(ROOTS[chord_at(t - 11)] + 12), t + 0.25, 0.12)
    add(pluck(ARP[k % 8] + 12, 0.25, 0.08), t, 0.07, pan=-0.3 if k % 2 else 0.3)
    t += 0.25; k += 1
for at in (10, 34, 58, 86, 92, 118):
    add(blip(84 + (at % 5), 0.05), fr(330 + 10 + at), 0.16)
add(riser(1.0), 17.0, 0.45)

# ── 18–26 · Clímax ────────────────────────────────────────────────────────────
add(boom(2.4, 90, 30, 0.9), 18.0, 1.0); add(clap(), 18.0, 0.9)
for bar in range(4):
    st = 18 + bar * 2.0
    add(pad(CHORDS[PROG[bar % 4]], 2.2, att=0.05, rel=0.4, cutoff=0.09), st, 0.16)
t = 18.0; k = 0
while t < 25 - 1e-6:
    if k % 2 == 0: add(kick(1.0), t)
    if k % 4 == 2: add(clap(), t, 0.7)
    add(hat(0.02 if k % 2 else 0.01), t, 0.2, pan=0.3)
    if k % 2 == 0: add(bass(ROOTS[chord_at(t - 18)], 0.24, 3.5), t, 0.24)
    add(bass(ROOTS[chord_at(t - 18)] + 12, 0.12), t + 0.125, 0.1)
    add(pluck(ARP[k % 8] + 12, 0.35, 0.07), t, 0.08, pan=-0.3 if k % 2 else 0.3)
    t += 0.25; k += 1
for s in (19, 20, 21): add(whoosh(0.3), s - 0.15, 0.3); add(boom(0.6, 90, 50, 0.6, 0.2), s, 0.4)
for i, s in enumerate((22, 23, 24)):
    add(boom(1.4, 95, 32, 0.7, 0.5), s, 0.75 + i * 0.08); add(tom(43 - i * 3), s, 0.5); add(clap(), s, 0.7)
add(boom(1.2, 100, 30, 1.0, 0.4), 25.0, 0.9)          # convergencia
add(riser(1.0, 0.6), 25.0, 0.6)                          # aspiración antes de la marca

# ── 26–33 · Revelación del logotipo ──────────────────────────────────────────
add(boom(4.5, 80, 26, 0.9, 1.2), 26.0, 1.1); add(kick(1.0), 26.0)
for i, m in enumerate([69, 76, 81, 88]): add(bell(hz(m), 5.0), 26.05 + i * 0.11, 0.08)
add(lp(rng.standard_normal(int(1.2 * SR)), np.linspace(0.4, 0.02, int(1.2 * SR))) * np.linspace(1, 0, int(1.2 * SR)), 26.0, 0.25)
add(pad(CHORDS["Am"] + [71], 7.2, att=0.4, rel=1.0, cutoff=0.05), 26.0, 0.17)
t = 27.0
while t < 33 - 1e-6:
    add(kick(0.55), t); add(hat(0.01), t + 0.5, 0.1)
    add(bass(33, 0.5, 2.0), t, 0.12)
    t += 1.0

# ── 33–40 · Resolución y cierre electrónico ──────────────────────────────────
add(pad(CHORDS["F"], 2.2, att=0.4, rel=0.6, cutoff=0.05), 33.0, 0.16)
add(pad(CHORDS["G"], 2.2, att=0.3, rel=0.6, cutoff=0.06), 35.0, 0.16)
for t in (33.0, 34.0, 35.0, 35.5, 36.0, 36.25, 36.5, 36.75): add(kick(0.7), t)
add(riser(0.9), 36.1, 0.4)
add(boom(4.0, 85, 26, 0.8, 1.2), 37.0, 1.0); add(clap(), 37.0, 0.6)
add(pad(CHORDS["C"] + [67, 76], 3.0, att=0.05, rel=2.4, cutoff=0.07), 37.0, 0.2)
for i, m in enumerate([72, 79, 84]): add(bell(hz(m), 3.0), 37.02 + i * 0.09, 0.06)

mix = np.stack([L, R], 1)
x = np.arange(N) / SR
fade = np.minimum(1, np.minimum(x / 0.02, (DUR - x) / 2.0))[:, None]
mix = np.tanh(mix * 1.25) * fade
mix /= np.abs(mix).max() / 0.89
with wave.open("public/audio/orvix-cinematic-soundtrack.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("ok")
