import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BlueBg, Title } from "../../welcome/ui";
import { FONT, HIT, MONO, W, ci, easeInOut, easeOut } from "../theme";

// Escena 2 · Qué hacemos: un boceto (la idea) se convierte en un proyecto digital terminado.
export const P2What: React.FC = () => {
  const f = useCurrentFrame();
  const wipe = ci(f, [0, 14], [0, 1], easeInOut);
  const draw = ci(f, [10, 50], [0, 1], easeInOut);
  const make = ci(f, [HIT.idea, HIT.idea + 24], [0, 1], easeInOut);
  const grow = ci(f, [HIT.idea + 30, HIT.idea + 70], [0, 1], easeInOut);
  const cx = 540;
  const top = 700;
  const cw = 640;
  const ch = 640;
  const dash = (len: number) => ({ strokeDasharray: `${len}`, strokeDashoffset: len * (1 - draw) });
  return (
    <AbsoluteFill>
      <BlueBg />
      {/* Transición: una cortina blanca diagonal barre el plano */}
      <AbsoluteFill style={{ background: W.white, clipPath: `polygon(${wipe * 200 - 40}% 0, ${wipe * 200}% 0, ${wipe * 200 - 40}% 100%, ${wipe * 200 - 80}% 100%)` }} />
      <div style={{ position: "absolute", top: 260, left: 90, width: 900 }}>
        <Title text="AYUDAMOS A LOS NEGOCIOS A CRECER EN EL MUNDO DIGITAL" at={8} size={76} step={3} maxWidth={900} />
      </div>
      {/* Tarjeta: boceto → interfaz terminada */}
      <div style={{ position: "absolute", left: cx - cw / 2, top, width: cw, height: ch, borderRadius: 32, background: W.white, boxShadow: "0 40px 80px rgba(0,0,40,0.35)", transform: `rotate(${(1 - make) * -3}deg) scale(${ci(f, [6, 22], [0.9, 1], easeOut)})`, opacity: ci(f, [6, 16], [0, 1]), overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 30, top: 24, fontFamily: MONO, fontSize: 20, letterSpacing: "0.12em", color: W.blue }}>{make < 0.5 ? "IDEA" : "PROYECTO DIGITAL"}</div>
        {/* Boceto a trazos */}
        <svg width={cw} height={ch} style={{ position: "absolute", opacity: 1 - make }}>
          <rect x={40} y={80} width={560} height={60} rx={10} fill="none" stroke={W.blue} strokeWidth={4} style={dash(1240)} />
          <rect x={40} y={170} width={330} height={190} rx={14} fill="none" stroke={W.blue} strokeWidth={4} style={dash(1040)} />
          <rect x={400} y={170} width={200} height={190} rx={14} fill="none" stroke={W.blue} strokeWidth={4} style={dash(780)} />
          <line x1={40} y1={410} x2={480} y2={410} stroke={W.blue} strokeWidth={4} style={dash(440)} />
          <line x1={40} y1={450} x2={380} y2={450} stroke={W.blue} strokeWidth={4} style={dash(340)} />
          <rect x={40} y={500} width={200} height={70} rx={35} fill="none" stroke={W.blue} strokeWidth={4} style={dash(560)} />
        </svg>
        {/* Interfaz terminada */}
        <div style={{ position: "absolute", inset: 0, opacity: make }}>
          <div style={{ position: "absolute", left: 40, top: 80, width: 560, height: 60, borderRadius: 12, background: "#F0F0FF", display: "flex", alignItems: "center", padding: "0 20px", boxSizing: "border-box", fontFamily: FONT, fontWeight: 700, fontSize: 24, color: W.navy }}>
            tu marca<span style={{ marginLeft: "auto", width: 90, height: 14, borderRadius: 7, background: "#C8C8F5" }} />
          </div>
          <div style={{ position: "absolute", left: 40, top: 170, width: 330, height: 190, borderRadius: 16, background: W.blue, padding: 24, boxSizing: "border-box", fontFamily: FONT, fontWeight: 700, fontSize: 38, lineHeight: 1, color: W.white }}>Tu proyecto, online.</div>
          <div style={{ position: "absolute", left: 400, top: 170, width: 200, height: 190, borderRadius: 16, background: "#E6E6FF", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 40, top: 40, width: 110, height: 110, borderRadius: "50%", background: W.blue }} />
          </div>
          <div style={{ position: "absolute", left: 40, top: 400, width: 440, height: 18, borderRadius: 9, background: "#D8D8F5" }} />
          <div style={{ position: "absolute", left: 40, top: 440, width: 340, height: 18, borderRadius: 9, background: "#D8D8F5" }} />
          <div style={{ position: "absolute", left: 40, top: 500, width: 200, height: 70, borderRadius: 35, background: W.blue, color: W.white, fontFamily: FONT, fontWeight: 700, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>Empezar</div>
          {/* Curva de crecimiento ilustrativa (sin cifras) */}
          <svg width={200} height={130} style={{ position: "absolute", left: 400, top: 460 }}>
            <path d="M 10 120 C 60 110, 90 80, 120 60 S 170 20, 190 10" fill="none" stroke={W.blue} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - grow} />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", top: top + ch + 60, width: 1080, display: "flex", justifyContent: "center", gap: 26, fontFamily: MONO, fontSize: 26, letterSpacing: "0.12em", color: W.white }}>
        <span style={{ opacity: ci(f, [20, 30], [0.4, 1]) * (1 - make * 0.6) }}>IDEA</span>
        <span style={{ width: ci(f, [HIT.idea - 10, HIT.idea + 10], [0, 120], easeOut), height: 3, background: W.white, alignSelf: "center" }} />
        <span style={{ opacity: ci(f, [HIT.idea, HIT.idea + 10], [0.3, 1]) }}>PROYECTO</span>
      </div>
    </AbsoluteFill>
  );
};
