# ORVIX STUDIO · Vídeos promocionales (Remotion)

Proyecto Remotion con cinco piezas:

| Composición | Formato | Duración | Vídeo renderizado |
|---|---|---|---|
| `OrvixAbout` | 1920×1080 · 16:9 · 30 fps | 67,9 s (2038 frames) | `video/orvix-studio-quienes-somos.mp4` + `video/orvix-studio-quienes-somos.srt` |
| `OrvixWelcome` | 1920×1080 · 16:9 · 30 fps | 76,2 s (2287 frames) | `video/orvix-studio-bienvenida-16x9.mp4` + `video/orvix-studio-bienvenida.srt` |
| `OrvixWelcomeVertical` | 1080×1920 · 9:16 · 30 fps | 76,2 s | `video/orvix-studio-bienvenida-9x16.mp4` |
| `OrvixCinematic` | 1920×1080 · 16:9 · 30 fps | 40 s (1200 frames) | `video/orvix-studio-cinematic-16x9.mp4` |
| `OrvixCinematicVertical` | 1080×1920 · 9:16 · 30 fps | 40 s (1200 frames) | `video/orvix-studio-cinematic-9x16.mp4` |
| `OrvixPromo` | 1920×1080 · 16:9 · 30 fps | 43 s (1290 frames) | `video/orvix-studio-promo-16x9.mp4` |
| `OrvixPromoVertical` | 1080×1920 · 9:16 · 30 fps | 43 s (1290 frames) | `video/orvix-studio-promo-9x16.mp4` |
| `OrvixAd` (anuncio anterior) | 1080×1920 · 9:16 · 30 fps | 30 s (900 frames) | `video/orvix-studio-anuncio-9x16.mp4` |

`OrvixPromo` y `OrvixPromoVertical` usan el mismo componente: cada escena consulta `useLayout()`
y se **recompone** para móvil (texto arriba, visual debajo; web en teléfono, tienda apilada con
carrito inferior, flujo de IA de arriba abajo), en lugar de recortar el horizontal.

## Comandos

```bash
npm i
npm run dev                                      # Remotion Studio (elige la composición)
npx remotion render OrvixPromo         out/orvix-studio-promo-16x9.mp4 --codec=h264 --crf=18
npx remotion render OrvixPromoVertical out/orvix-studio-promo-9x16.mp4 --codec=h264 --crf=18
npx remotion still  OrvixPromo out/frame.png --frame=1250            # fotograma suelto
python3 scripts/promo_soundtrack.py              # regenera la música (requiere numpy)
```

## OrvixAbout — «Quiénes somos» (motion graphics, locución y subtítulos)

Pieza de identidad construida solo con motion graphics (puntos, líneas, módulos y tipografía cinética) sobre
azul `#1010FF` y blanco. Duración ampliada a 67,9 s para no acelerar la locución; las escenas se adaptan al audio.

```bash
python3 scripts/about_voiceover.py /ruta/a/modelos-kokoro      # locución + src/about/timeline.json + SRT
python3 scripts/about_music.py                                 # música y efectos sincronizados con la voz
python3 scripts/verify_subtitles.py /ruta/sherpa-onnx-whisper-small about   # verificación opcional
npx remotion render OrvixAbout out/quienes-somos.mp4 --codec=h264 --crf=18
```

| Escena | Locución | Archivo (`src/about/scenes/`) |
|---|---|---|
| 1 · Las ideas nacen | «En un mundo donde la tecnología evoluciona…» | `A1Ideas.tsx` |
| 2 · Orvix Studio | «Somos Orvix Studio, un estudio digital…» · CREATIVIDAD / DISEÑO / TECNOLOGÍA | `A2Brand.tsx` |
| 3 · Nuestra forma de pensar | «Creemos que cada proyecto tiene algo único…» · IDEAS QUE SE CONVIERTEN EN REALIDAD | `A3Thinking.tsx` |
| 4 · Nuestra filosofía | «No se trata únicamente…» · PENSAR / CREAR / TRANSFORMAR | `A4Philosophy.tsx` |
| 5 · Miramos hacia delante | «Miramos hacia delante…» | `A5Forward.tsx` |
| 6 · Cierre de marca | «Somos Orvix Studio. Ideas que evolucionan. Tecnología que construye el futuro.» | `A6Close.tsx` |

Las palabras animadas se sincronizan con las palabras del locutor mediante `CUES` (`src/about/theme.ts`),
calculadas a partir del audio. Tipografía cinética en `src/about/ui.tsx` (`DropWord`, `WipeWord`, `DecodeWord`).
Para usar un locutor humano: `python3 scripts/about_voiceover.py --recorded carpeta` (archivos `00.wav`…`10.wav`).

## OrvixWelcome — vídeo oficial de bienvenida (con locución y subtítulos)

La duración se amplió de 60 a 76 s para que la locución completa suene natural; las escenas se
cronometran automáticamente a partir del audio real (`src/welcome/timeline.json`).

```bash
# 1) Locución + tiempos de subtítulos (requiere: pip install kokoro-onnx soundfile)
#    Modelos: kokoro-v1.0.onnx y voices-v1.0.bin de
#    https://github.com/thewh1teagle/kokoro-onnx/releases/tag/model-files-v1.0
python3 scripts/welcome_voiceover.py /ruta/a/modelos
# 2) Música y efectos (siguen los tiempos de la locución)
python3 scripts/welcome_music.py
# 3) (opcional) Verificar subtítulos contra el audio con Whisper (pip install sherpa-onnx; modelo
#    sherpa-onnx-whisper-small de https://github.com/k2-fsa/sherpa-onnx/releases/tag/asr-models)
python3 scripts/verify_subtitles.py /ruta/a/sherpa-onnx-whisper-small
# 4) Render
npx remotion render OrvixWelcome         out/bienvenida-16x9.mp4 --codec=h264 --crf=18
npx remotion render OrvixWelcomeVertical out/bienvenida-9x16.mp4 --codec=h264 --crf=18
```

| Escena | Locución | Archivo (`src/welcome/scenes/`) |
|---|---|---|
| 1 · Bienvenida | «El mundo digital evoluciona…» | `W1Welcome.tsx` |
| 2 · Quiénes somos | «En Orvix Studio, unimos creatividad, diseño y tecnología…» | `W2Who.tsx` |
| 3 · Web y Shopify | «Diseñamos y desarrollamos páginas web… Creamos tiendas online con Shopify…» | `W3WebShop.tsx` |
| 4 · Branding, marketing y 3D | «Y trabajamos la identidad visual… marketing digital y diseño 3D…» | `W4BrandMkt3D.tsx` |
| 5 · Automatización e IA | «Y damos un paso más…» | `W5Automation.tsx` |
| 6 · Filosofía | «Nuestro objetivo es convertir tus ideas…» | `W6Philosophy.tsx` |
| 7 · Cierre | «Somos Orvix Studio… Descubre todo lo que podemos construir juntos en orvixstudio.es» | `W7Close.tsx` |

- **Voz:** síntesis neuronal Kokoro-82M (Apache-2.0), voz masculina `em_alex`, fonetización de español
  de España. No es un locutor humano. Para sustituirla por una grabación profesional: guarda cada frase
  del guion como `NN.wav` (00–11, en el orden de `SCRIPT`) y ejecuta
  `python3 scripts/welcome_voiceover.py --recorded carpeta`; los tiempos de escenas y subtítulos se recalculan solos.
- **Subtítulos:** salen de los tiempos reales de cada frase y de las pausas detectadas en el audio;
  `verify_subtitles.py` transcribe cada tramo y lo compara con el texto.
- **Ducking:** la música baja al 14 % mientras habla el locutor y sube en las pausas y en el cierre
  (`musicVolume` en `src/welcome/Welcome.tsx`).
- **Colores:** `W` en `src/welcome/theme.ts` (azul `#1010FF`, blanco y azul noche de apoyo).

## OrvixCinematic — anuncio cinematográfico (40 s)

```bash
npx remotion render OrvixCinematic         out/orvix-studio-cinematic-16x9.mp4 --codec=h264 --crf=18
npx remotion render OrvixCinematicVertical out/orvix-studio-cinematic-9x16.mp4 --codec=h264 --crf=18
python3 scripts/cinematic_soundtrack.py      # regenera la música (requiere numpy)
```

| Tiempo | Escena | Archivo (`src/cinematic/scenes/`) |
|---|---|---|
| 00:00–00:05 | Introducción · «TODO EMPIEZA CON UNA IDEA» (2 s), transición a los 4 s | `C1Intro.tsx` |
| 00:05–00:11 | El mundo digital · cámara sobre web, tienda e identidad · «DISEÑO QUE CONECTA» → «TECNOLOGÍA QUE IMPULSA» | `C2Digital.tsx` |
| 00:11–00:18 | Automatización e IA · solicitud → recepción → agente IA → CRM/agenda → respuesta automática | `C3Automation.tsx` |
| 00:18–00:26 | Clímax · cortes en cada beat · DISEÑAMOS (22 s) · DESARROLLAMOS (23 s) · AUTOMATIZAMOS (24 s) · convergencia (25 s) | `C4Climax.tsx` |
| 00:26–00:33 | Revelación del logotipo · «ORVIX STUDIO» · «SOLUCIONES DIGITALES PARA NEGOCIOS QUE AVANZAN» | `C5Reveal.tsx` |
| 00:33–00:40 | Cierre · «TU PRÓXIMA IDEA EMPIEZA AQUÍ» · `orvixstudio.es` · fundido a negro | `C6Close.tsx` |

- Tiempos y golpes centralizados en `src/cinematic/theme.ts` (`SC`, `HITS`); la música usa los mismos frames.
- Piezas de interfaz reutilizables con reloj propio en `src/cinematic/pieces.tsx` (web, tienda, identidad, flujo).
- Música: `public/audio/orvix-cinematic-soundtrack.wav` (cambia `CINEMATIC_MUSIC` en `src/cinematic/Cinematic.tsx`).

## Concepto de OrvixPromo: «La tecnología adecuada transforma la manera de hacer negocios»

| Tiempo | Escena | Archivo |
|---|---|---|
| 0–5 s | **Inicio.** Trazos de precisión dibujan un marco; el logotipo se revela con una máscara. | `src/promo/scenes/P1Intro.tsx` |
| 5–12 s | **Problema.** Herramientas dispersas, un bucle de copiar/pegar y conexiones rotas. «Tu negocio puede llegar más lejos.» | `P2Problem.tsx` + `Workspace.tsx` |
| 12–18 s | **Transformación.** En el golpe musical las ventanas se alinean y se convierten en nodos conectados a un núcleo Orvix. «Diseñamos. Desarrollamos. Automatizamos.» | `P3Transform.tsx` |
| 18–33 s | **Soluciones.** Web con scroll y navegación · Shopify con producto 3D, ficha y carrito · Branding y campañas · Agente de IA y flujo automatizado. | `P4Solutions.tsx` + `src/promo/solutions/*` |
| 33–37 s | **Resultado.** Web, tienda y automatización en un mismo sistema. «Tecnología con propósito. Soluciones para avanzar.» | `P5Result.tsx` |
| 37–43 s | **Cierre.** Logotipo sobre el azul de marca, «Hablemos de tu próximo proyecto.» y `orvixstudio.es`. | `P6Close.tsx` |

Las interfaces son demostraciones conceptuales con una marca genérica («tu marca», dominios `.demo`);
no muestran clientes, cifras ni resultados reales.

## Cómo cambiar…

- **Logotipo:** sustituye `public/orvix-logo.png` (PNG blanco con fondo transparente). Si cambia la
  proporción, actualiza `LOGO_RATIO` en `src/promo/kit.tsx`.
- **Colores:** `P` en `src/promo/theme.ts` (`brand` es el azul del logotipo, `#040ADE`).
- **Tipografías:** archivos en `public/fonts/` y `FONT`/`MONO` en `src/orvix/theme.ts`.
- **Textos:** están en cada escena (`src/promo/scenes/*.tsx`) y en cada solución (`src/promo/solutions/*.tsx`).
- **Duraciones:** `SCENES` y `SOL` en `src/promo/theme.ts` (si cambias el total, ajusta `TOTAL`).
- **Música:** reemplaza `public/audio/orvix-promo-soundtrack.wav` o cambia `PROMO_MUSIC` en
  `src/promo/Promo.tsx`. Los cortes caen en múltiplos de 15 frames (120 BPM).

## Recursos y licencias

| Recurso | Origen | Licencia |
|---|---|---|
| Logotipo `public/orvix-logo.png` | Extraído de la imagen oficial facilitada por Orvix Studio | Propiedad de Orvix Studio |
| Space Grotesk (`public/fonts/space-grotesk-*`) | Florian Karsten, vía Fontsource | SIL Open Font License 1.1 |
| JetBrains Mono (`public/fonts/jetbrains-mono-*`) | JetBrains, vía Fontsource | SIL Open Font License 1.1 |
| Música y efectos (`public/audio/*.wav`) | Sintetizados por `scripts/*soundtrack.py` y `scripts/welcome_music.py` para este proyecto | Original, sin material de terceros |
| Locución (`public/audio/welcome-voice.wav`) | Generada con Kokoro-82M (hexgrad) vía kokoro-onnx, voz `em_alex` | Modelo Apache-2.0; audio generado para este proyecto |
| Mockups, iconos, 3D | Creados con CSS/SVG en el propio código | Original |

No se usan fotografías de stock ni vídeos externos.

Nota: `orvixstudio.es` no era accesible desde el entorno de producción, así que la identidad se
tomó del logotipo oficial (azul `#040ADE` + wordmark blanco). Las tipografías son una elección
propia; si la web usa otras, basta con cambiarlas en los archivos indicados.
