# ORVIX STUDIO — «TU NEGOCIO. SIN LÍMITES.»

Anuncio vertical en Remotion · 1080×1920 · 30 fps · 30 s (900 frames).

**Vídeo renderizado:** `video/orvix-studio-anuncio-9x16.mp4`

## Comandos

```bash
npm i
npm run dev                          # Remotion Studio (composición "OrvixAd")
npx remotion render OrvixAd out/orvix-studio-anuncio-9x16.mp4 --codec=h264 --crf=18
npx remotion still OrvixAd out/frame.png --frame=860   # fotograma suelto
python3 scripts/soundtrack.py        # regenera la banda sonora (requiere numpy)
```

## Estructura

| Tiempo | Frames | Escena | Archivo |
|---|---|---|---|
| 0–3 s | 0–90 | Gancho | `src/orvix/scenes/S1Hook.tsx` |
| 3–7 s | 90–210 | Universo Orvix | `S2Universe.tsx` |
| 7–14 s | 210–420 | Servicios (web, Shopify, branding, marketing) | `S3Services.tsx` |
| 14–20 s | 420–600 | Tecnología / agente IA conceptual | `S4Tech.tsx` |
| 20–25 s | 600–750 | Convergencia | `S5Converge.tsx` |
| 25–30 s | 750–900 | Cierre + CTA | `S6Close.tsx` |

- Tiempos centralizados en `src/orvix/theme.ts` (`T`), colores (`C`) y fuentes locales.
- Logotipo oficial: `public/orvix-logo.png` (extraído del original, proporción 855×173 intacta).
- Audio: `public/audio/orvix-soundtrack.wav`, pista original generada por `scripts/soundtrack.py` a 120 BPM;
  todos los cortes caen en múltiplos de 15 frames. Para usar otra música, reemplaza el archivo o cambia `MUSIC` en `src/orvix/OrvixAd.tsx`.
- Zonas seguras Reels/TikTok: textos clave entre y≈250 y y≈1500, márgenes laterales de 90 px.
- Las interfaces (web, tienda, chat de reservas, analítica) son mockups conceptuales, sin cifras ni clientes reales.
