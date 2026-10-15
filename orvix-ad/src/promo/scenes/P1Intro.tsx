import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Ground, Logo, Tag, useLayout } from "../kit";
import { P, ci, easeIn, easeInOut, easeOut } from "../theme";

// 0–5 s · Pantalla oscura, líneas de precisión y aparición progresiva del logotipo.
export const P1Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { V, W, H } = useLayout();
  const logoW = V ? 720 : 900;
  const logoH = logoW / (855 / 173);
  const cx = W / 2;
  const cy = H / 2 - (V ? 60 : 30);
  // Marco que se dibuja alrededor del logotipo
  const fw = logoW + (V ? 120 : 220);
  const fh = logoH + (V ? 220 : 200);
  const draw = ci(f, [4, 40], [0, 1], easeInOut);
  const exit = ci(f, [124, 150], [0, 1], easeIn);
  const reveal = ci(f, [38, 70], [100, 0], easeInOut);

  return (
    <AbsoluteFill>
      <Ground dots={ci(f, [0, 40], [0, 1])} />
      <AbsoluteFill style={{ opacity: 1 - exit, transform: `scale(${1 + exit * 0.06})` }}>
        <svg width={W} height={H} style={{ position: "absolute" }}>
          {/* Cuatro trazos que convergen en un marco */}
          {[
            [cx - fw / 2, cy - fh / 2, cx + fw / 2, cy - fh / 2],
            [cx + fw / 2, cy - fh / 2, cx + fw / 2, cy + fh / 2],
            [cx + fw / 2, cy + fh / 2, cx - fw / 2, cy + fh / 2],
            [cx - fw / 2, cy + fh / 2, cx - fw / 2, cy - fh / 2],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * ci(f, [4 + i * 5, 34 + i * 5], [0, 1], easeInOut)}
              y2={y1 + (y2 - y1) * ci(f, [4 + i * 5, 34 + i * 5], [0, 1], easeInOut)}
              stroke={P.line2}
              strokeWidth={1.5}
            />
          ))}
          {/* Marcas de esquina y ejes */}
          {[
            [cx - fw / 2, cy - fh / 2],
            [cx + fw / 2, cy - fh / 2],
            [cx + fw / 2, cy + fh / 2],
            [cx - fw / 2, cy + fh / 2],
          ].map(([x, y], i) => (
            <rect key={i} x={x - 5} y={y - 5} width={10} height={10} fill={P.accent} opacity={ci(f, [20 + i * 4, 28 + i * 4], [0, 1])} />
          ))}
          <line x1={cx} y1={cy - fh / 2 - 60 * draw} x2={cx} y2={cy - fh / 2} stroke={P.line2} />
          <line x1={cx} y1={cy + fh / 2} x2={cx} y2={cy + fh / 2 + 60 * draw} stroke={P.line2} />
        </svg>

        {/* Logotipo revelado por máscara, de izquierda a derecha */}
        <div
          style={{
            position: "absolute",
            left: cx - logoW / 2,
            top: cy - logoH / 2,
            clipPath: `inset(0 ${reveal}% 0 0)`,
            transform: `scale(${ci(f, [38, 90], [1.04, 1], easeOut)})`,
          }}
        >
          <Logo width={logoW} />
        </div>
        {/* Barra de luz que acompaña la máscara */}
        <div
          style={{
            position: "absolute",
            left: cx - logoW / 2 + logoW * (1 - reveal / 100) - 2,
            top: cy - logoH / 2 - 20,
            width: 4,
            height: logoH + 40,
            background: P.accent,
            opacity: ci(f, [38, 42, 66, 72], [0, 1, 1, 0]),
          }}
        />

        <div
          style={{
            position: "absolute",
            top: cy + fh / 2 + (V ? 110 : 90),
            width: W,
            display: "flex",
            justifyContent: "center",
            opacity: ci(f, [72, 88], [0, 1]),
            transform: `translateY(${ci(f, [72, 90], [16, 0])}px)`,
          }}
        >
          <Tag size={V ? 26 : 22} color={P.muted}>
            Diseño · Tecnología · Estrategia
          </Tag>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
