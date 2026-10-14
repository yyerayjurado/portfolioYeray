"""Locución del vídeo «Quiénes somos» (reutiliza el motor de scripts/welcome_voiceover.py).
Genera public/audio/about-voice.wav, src/about/timeline.json y video/orvix-studio-quienes-somos.srt.
Uso: python3 scripts/about_voiceover.py /ruta/a/modelos   (o --recorded carpeta con 00.wav…NN.wav)"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import welcome_voiceover as vo  # noqa: E402

# Guion exacto. Cada bloque es una escena; «anchors» marca palabras para sincronizar la tipografía.
SCRIPT = [
    [  # 1 · Las ideas nacen
        {"chunks": ["En un mundo donde la tecnología evoluciona constantemente,", "las ideas necesitan algo más que imaginación."]},
        {"chunks": ["Necesitan visión, creatividad", "y la capacidad de convertirlas en realidad."], "anchors": ["visión", "creatividad", "convertirlas"]},
    ],
    [  # 2 · Presentación de Orvix Studio
        {
            "chunks": ["Somos Orvix Studio, un estudio digital", "donde el diseño y la tecnología se unen", "para crear nuevas posibilidades."],
            "tts": "Somos Órvix Estudio, un estudio digital, donde el diseño y la tecnología se unen, para crear nuevas posibilidades.",
            "anchors": ["diseño", "tecnología"],
        },
    ],
    [  # 3 · Nuestra forma de pensar
        {"chunks": ["Creemos que cada proyecto tiene algo único."]},
        {
            "chunks": ["Por eso, combinamos pensamiento creativo, innovación y desarrollo", "para construir soluciones adaptadas a las necesidades de cada negocio."],
            "anchors": ["pensamiento", "innovación", "desarrollo"],
        },
    ],
    [  # 4 · Nuestra filosofía
        {"chunks": ["No se trata únicamente de crear algo visualmente atractivo."], "anchors": ["crear"]},
        {
            "chunks": ["Se trata de encontrar nuevas formas de hacer las cosas,", "simplificar procesos", "y transformar ideas en herramientas útiles."],
            "anchors": ["encontrar", "simplificar", "transformar"],
        },
    ],
    [  # 5 · Miramos hacia delante
        {
            "chunks": ["Miramos hacia delante, exploramos nuevas posibilidades", "y trabajamos para conectar creatividad y tecnología", "con un propósito claro."],
            "anchors": ["exploramos", "conectar"],
        },
    ],
    [  # 6 · Cierre de marca
        {"chunks": ["Somos Orvix Studio."], "tts": "Somos Órvix Estudio."},
        {"chunks": ["Ideas que evolucionan."]},
        {"chunks": ["Tecnología que construye el futuro."]},
    ],
]

if __name__ == "__main__":
    vo.main(SCRIPT, name="about", srt_name="orvix-studio-quienes-somos.srt", lead_in=2.2, tail=5.5)
