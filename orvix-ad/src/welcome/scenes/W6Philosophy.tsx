import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CUES, MONO, W, ci, easeInOut, local, TL } from "../theme";
import { BlueBg, Title, useV } from "../ui";

// Escena 6 · Filosofía: tres conceptos que se funden en uno y el mensaje central.
const LABELS = ["DISEÑO", "DESARROLLO", "AUTOMATIZACIÓN"];

export const W6Philosophy: React.FC = () => {
  const f = useCurrentFrame();
  const { V, Wd } = useV();
  const ideas = local(CUES.ideas, 5);
  const sentEnd = local(TL.sentences.find((s) => s.text.startsWith("Nuestro objetivo"))!.end, 5);
  const merge = ci(f, [ideas + 20, ideas + 70], [0, 1], easeInOut);
  const cx = Wd / 2;
  const cy = V ? 760 : 330;
  const r = V ? 170 : 150;
  const d = (1 - merge) * (V ? 190 : 210);
  const centers = [
    [cx - d, cy + d * 0.45],
    [cx, cy - d * 0.6],
    [cx + d, cy + d * 0.45],
  ];
  // Las palabras del mensaje se reparten a lo largo de la frase del locutor
  const words = "IDEAS QUE SE CONVIERTEN EN SOLUCIONES".split(" ");
  const span = Math.max(30, sentEnd - ideas - 20);
  const step = span / words.length;
  return (
    <AbsoluteFill>
      <BlueBg grid={0.4} />
      <svg width={Wd} height={V ? 1920 : 1080} style={{ position: "absolute" }}>
        {centers.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={merge > 0.95 ? "rgba(255,255,255,0.12)" : "none"} stroke={W.white} strokeWidth={3} opacity={ci(f, [i * 5, 15 + i * 5], [0, 1])} strokeDasharray={2 * Math.PI * r} strokeDashoffset={2 * Math.PI * r * (1 - ci(f, [i * 5, 30 + i * 5], [0, 1], easeInOut))} />
        ))}
        <circle cx={cx} cy={cy} r={8 + merge * 6} fill={W.white} opacity={merge} />
      </svg>
      {centers.map(([x, y], i) => (
        <div key={i} style={{ position: "absolute", left: x - 140, width: 280, top: y - 14, textAlign: "center", fontFamily: MONO, fontSize: V ? 24 : 22, letterSpacing: "0.12em", color: W.white, opacity: ci(f, [10 + i * 5, 22 + i * 5], [0, 1]) * (1 - merge) }}>
          {LABELS[i]}
        </div>
      ))}
      <div style={{ position: "absolute", top: V ? 1060 : 600, width: Wd, display: "flex", justifyContent: "center", padding: V ? "0 90px" : 0, boxSizing: "border-box" }}>
        <Title text={words.join(" ")} at={ideas + 6} step={step} size={V ? 84 : 78} align="center" maxWidth={V ? 900 : 1700} />
      </div>
    </AbsoluteFill>
  );
};
