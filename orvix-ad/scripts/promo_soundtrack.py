"""Banda sonora original de «OrvixPromo» (43 s, 120 BPM), generada por síntesis: sin muestras de terceros.
Estructura: atmósfera (0–5 s) · tensión (5–12 s) · transformación (12–18 s) · groove (18–33 s)
· resultado (33–37 s) · cierre (37–43 s). Los efectos caen en los frames de src/promo/theme.ts.
Uso: python3 scripts/promo_soundtrack.py"""
import numpy as np, wave

SR = 48000
DUR = 43.0
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(11)
BEAT = 0.5
fr = lambda frame: frame / 30.0

def add(sig, start, gain=1.0, pan=0.0):
    i = int(start * SR)
    if i >= N: return
    j = min(N, i + len(sig)); s = sig[: j - i] * gain
    L[i:j] += s * min(1, 1 - pan); R[i:j] += s * min(1, 1 + pan)

def env(n, a, d):
    x = np.arange(n) / SR
    return np.minimum(1, x / max(a, 1e-4)) * np.exp(-x / d)

def onepole(x, alpha):
    # filtro paso bajo de un polo con coeficiente variable o fijo
    alpha = np.broadcast_to(alpha, x.shape); y = np.empty_like(x); acc = 0.0
    for k in range(len(x)):
        acc += alpha[k] * (x[k] - acc); y[k] = acc
    return y

hz = lambda m: 440 * 2 ** ((m - 69) / 12)

def boom(dur=2.5, f0=70, f1=30, noise=0.5):
    n = int(dur * SR); x = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-x * 5)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.003, 0.8) + onepole(rng.standard_normal(n), 0.06) * env(n, 0.001, 0.15) * noise

def kick(g=1.0):
    n = int(0.35 * SR); x = np.arange(n) / SR
    f = 46 + 120 * np.exp(-x * 32)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.13) * g

def hat(d=0.015):
    n = int(0.08 * SR); w = rng.standard_normal(n)
    return (w - onepole(w, 0.45)) * env(n, 0.0005, d)

def click():
    n = int(0.03 * SR); x = np.arange(n) / SR
    return np.sin(2 * np.pi * 2400 * x) * env(n, 0.0005, 0.004) + hat(0.004)[:n] * 0.5

def whoosh(dur=0.6, up=True):
    n = int(dur * SR); x = np.arange(n) / SR; t = x / dur
    a = 0.02 + 0.35 * (t if up else 1 - t) ** 2
    shape = np.sin(np.pi * t) ** 2
    return onepole(rng.standard_normal(n), a) * shape

def riser(dur=1.5):
    n = int(dur * SR); t = np.arange(n) / n
    return onepole(rng.standard_normal(n), 0.01 + 0.45 * t ** 2) * t ** 2.4

def pad(midis, dur, att=0.8, rel=1.2, bright=0.3):
    n = int(dur * SR); x = np.arange(n) / SR; s = np.zeros(n)
    for m in midis:
        for d in (0.997, 1.0, 1.003):
            s += np.sin(2 * np.pi * hz(m) * d * x) + bright * np.sin(4 * np.pi * hz(m) * d * x)
    s /= 3 * len(midis)
    return s * np.minimum(1, x / att) * np.minimum(1, np.maximum(0, (dur - x) / rel))

def bell(freq, dur=4.0):
    n = int(dur * SR); x = np.arange(n) / SR
    return sum(np.sin(2 * np.pi * freq * p * x) * np.exp(-x * (1.0 + i * 0.8)) / (i + 1) for i, p in enumerate([1, 2.0, 2.76, 4.07]))

def bass_note(m, dur=0.22):
    n = int(dur * SR); x = np.arange(n) / SR
    return np.tanh(2.5 * np.sin(2 * np.pi * hz(m) * x)) * env(n, 0.004, 0.1)

# ── 0–5 s · Atmósfera: dron grave, trazos y revelado del logotipo ──────────────
add(pad([33, 40], 5.6, att=2.0, rel=1.0, bright=0.1), 0, 0.35)
for i in range(4): add(click(), fr(4 + i * 5), 0.25, pan=-0.5 + i * 0.33)
add(whoosh(1.1), fr(38), 0.18)
add(bell(hz(81), 3.0), fr(44), 0.05)
add(whoosh(0.8, up=False), fr(124), 0.15)

# ── 5–12 s · Tensión: cluster disonante, tic-tac y apariciones de ventanas ────
add(pad([45, 46, 52], 7.4, att=1.0, rel=0.6, bright=0.15), 5.0, 0.12)
t = 5.0
while t < 12 - 1e-6:
    add(hat(0.006), t, 0.18, pan=0.5); add(hat(0.006), t + 0.25, 0.08, pan=-0.5)
    if int((t - 5) * 2) % 4 == 0: add(kick(0.45), t)
    t += BEAT
for i in range(5): add(click(), fr(150 + 4 + i * 10), 0.35, pan=-0.4 + i * 0.2)
add(riser(1.6), 10.4, 0.35)

# ── 12–18 s · Transformación: impacto, acorde que se abre y palabras en el beat ─
add(boom(3.0), 12.0, 0.95)
add(pad([48, 55, 60, 64], 6.2, att=0.4, rel=0.8, bright=0.35), 12.0, 0.11)
for k, fra in enumerate([418, 433, 448]):
    add(boom(0.9, 90, 40, 0.3), fr(fra), 0.35 + k * 0.08)
t = 13.0
while t < 18 - 1e-6:
    add(kick(0.8 if t >= 15 else 0.55), t)
    if t >= 15: add(hat(), t + 0.25, 0.22, pan=0.35)
    t += BEAT if t >= 15 else 1.0
add(riser(1.0), 17.0, 0.3)

# ── 18–33 s · Soluciones: groove completo, bajo, pad y efectos de interfaz ────
chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55, 60], [55, 59, 62]]
roots = [45, 41, 36, 43]
for bar in range(8):
    st = 18 + bar * 2.0
    if st >= 33: break
    add(pad(chords[bar % 4], 2.3, att=0.3, rel=0.6, bright=0.4), st, 0.075, pan=0.15 if bar % 2 else -0.15)
t = 18.0
while t < 33 - 1e-6:
    add(kick(0.85), t)
    add(hat(), t + 0.25, 0.24, pan=0.35)
    add(hat(0.008), t, 0.1, pan=-0.35)
    r = roots[int((t - 18) // 2) % 4]
    add(bass_note(r), t, 0.16); add(bass_note(r + 12 if int(t * 2) % 4 == 3 else r), t + 0.25, 0.12)
    t += BEAT
for wf in (540 + 120 - 8, 540 + 240 - 8, 540 + 330 - 8):
    add(whoosh(0.55), fr(wf), 0.3)
add(click(), fr(540 + 120 + 52), 0.6)                     # clic «Añadir al carrito»
for d in (14, 52, 70, 74, 92):
    add(bell(hz(88), 0.6), fr(540 + 330 + d), 0.035)        # confirmaciones del flujo
add(bell(hz(76), 1.2), fr(540 + 34), 0.03)                  # clic en la web

# ── 33–37 s · Resultado: el ritmo se retira, queda el bajo y un pad amplio ────
add(pad([48, 55, 59, 64, 67], 4.4, att=0.5, rel=1.0, bright=0.3), 33.0, 0.1)
t = 33.0
while t < 36 - 1e-6:
    add(bass_note(36, 0.3), t, 0.12); add(hat(0.01), t + 0.25, 0.1)
    t += BEAT
add(riser(1.4), 35.6, 0.35)

# ── 37–43 s · Cierre: impacto, firma sonora del logotipo y acorde final ───────
add(boom(4.0, 75, 28, 0.6), 37.0, 1.0)
for i, m in enumerate([69, 76, 81, 88]):
    add(bell(hz(m), 4.5), 37.3 + i * 0.13, 0.07)
add(pad([45, 52, 57, 60, 64], 6.0, att=0.3, rel=3.0, bright=0.3), 37.0, 0.13)
add(kick(0.7), 37.0)

mix = np.stack([L, R], 1)
x = np.arange(N) / SR
fade = np.minimum(1, np.minimum(x / 0.05, (DUR - x) / 3.0))[:, None]
mix = np.tanh(mix * 1.3) * fade
mix /= np.abs(mix).max() / 0.89
with wave.open("public/audio/orvix-promo-soundtrack.wav", "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("ok")
