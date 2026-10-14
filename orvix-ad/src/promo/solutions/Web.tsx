import React from "react";
import { useCurrentFrame } from "remotion";
import { Cursor, In, Line, Window, useLayout } from "../kit";
import { FONT, MONO, P, SOL, ci, easeInOut } from "../theme";
import { SolutionFrame } from "./Frame";

// Web de demostración (marca genérica «tu marca»): se construye y se recorre con scroll.
const DW = 1200;
const DH = 760;

const Hero: React.FC = () => (
  <div style={{ display: "flex", gap: 40, padding: "56px 60px 40px", height: 560 }}>
    <div style={{ flex: 1.1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <In at={8} dy={20}>
        <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: "0.14em", color: P.brand }}>ESTUDIO · TALLER · TIENDA</div>
      </In>
      <In at={12} dy={24}>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 64, lineHeight: 1.0, letterSpacing: "-0.035em", color: P.ink, marginTop: 18 }}>
          Un espacio
          <br />a la altura
          <br />de tu marca.
        </div>
      </In>
      <In at={18} dy={20}>
        <div style={{ fontFamily: FONT, fontSize: 20, color: "#55565C", marginTop: 22, lineHeight: 1.4, maxWidth: 420 }}>
          Contenido claro, navegación sencilla y una experiencia pensada para cada pantalla.
        </div>
      </In>
      <In at={22} dy={16}>
        <div style={{ display: "flex", gap: 14, marginTop: 30 }}>
          <div style={{ padding: "16px 28px", borderRadius: 40, background: P.brand, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 18 }}>
            Pide tu presupuesto
          </div>
          <div style={{ padding: "16px 28px", borderRadius: 40, border: "1.5px solid #C8C8C3", color: P.ink, fontFamily: FONT, fontSize: 18 }}>
            Ver servicios
          </div>
        </div>
      </In>
    </div>
    <In at={14} dy={30} style={{ flex: 1 }}>
      <div style={{ height: 460, borderRadius: 22, background: P.brand, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 60, top: 70, width: 220, height: 220, borderRadius: "50%", background: "#F6F6F3" }} />
        <div style={{ position: "absolute", right: 50, bottom: 50, width: 200, height: 200, borderRadius: 30, background: P.ink }} />
        <div style={{ position: "absolute", left: 200, top: 230, width: 140, height: 140, borderRadius: 20, background: "#7E86FF", transform: "rotate(18deg)" }} />
      </div>
    </In>
  </div>
);

const Services: React.FC = () => (
  <div style={{ padding: "40px 60px" }}>
    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 40, color: P.ink, letterSpacing: "-0.03em" }}>Servicios</div>
    <div style={{ display: "flex", gap: 22, marginTop: 26 }}>
      {["Consultoría", "Proyectos", "Soporte"].map((t, i) => (
        <div key={t} style={{ flex: 1, height: 230, borderRadius: 18, background: "#fff", border: "1px solid #E2E2DD", padding: 26 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 1 ? P.brand : "#E9E9FF" }} />
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.ink, marginTop: 22 }}>{t}</div>
          <Line w="90%" h={9} c="#E2E2DD" style={{ marginTop: 16 }} />
          <Line w="70%" h={9} c="#E2E2DD" style={{ marginTop: 10 }} />
        </div>
      ))}
    </div>
  </div>
);

const Contact: React.FC = () => (
  <div style={{ margin: "30px 60px", borderRadius: 24, background: P.ink, padding: 50, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 44, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
      ¿Empezamos?
    </div>
    <div style={{ padding: "18px 30px", borderRadius: 40, background: "#fff", color: P.ink, fontFamily: FONT, fontWeight: 700, fontSize: 20 }}>Contactar</div>
  </div>
);


// Versión móvil (9:16): la misma web, recompuesta en un teléfono.
const PW = 560;
const PH = 860;
const PhoneSite: React.FC<{ scroll: number }> = ({ scroll }) => (
  <div style={{ width: PW, height: PH, borderRadius: 64, background: "#16171C", padding: 14, boxSizing: "border-box", boxShadow: "0 40px 80px rgba(0,0,0,0.55)", border: `1.5px solid ${P.line2}` }}>
    <div style={{ width: "100%", height: "100%", borderRadius: 52, background: P.paper, overflow: "hidden", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 96, paddingTop: 30, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "30px 34px 0", background: P.paper, zIndex: 3, borderBottom: "1px solid #E2E2DD" }}>
        <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 26, color: P.ink }}>tu marca</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 30, height: 3, borderRadius: 2, background: P.ink }} />
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: 96, left: 0, right: 0, padding: "34px 34px", transform: `translateY(${-scroll}px)` }}>
        <In at={8} dy={20}>
          <div style={{ fontFamily: MONO, fontSize: 15, letterSpacing: "0.14em", color: P.brand }}>ESTUDIO · TALLER · TIENDA</div>
        </In>
        <In at={12} dy={24}>
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 54, lineHeight: 1.0, letterSpacing: "-0.035em", color: P.ink, marginTop: 16 }}>
            Un espacio a la altura de tu marca.
          </div>
        </In>
        <In at={18} dy={20}>
          <div style={{ marginTop: 26, padding: "18px 0", borderRadius: 40, background: P.brand, color: "#fff", fontFamily: FONT, fontWeight: 700, fontSize: 21, textAlign: "center" }}>
            Pide tu presupuesto
          </div>
        </In>
        <In at={14} dy={30}>
          <div style={{ marginTop: 26, height: 300, borderRadius: 24, background: P.brand, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 40, top: 40, width: 160, height: 160, borderRadius: "50%", background: P.paper }} />
            <div style={{ position: "absolute", right: 36, bottom: 36, width: 150, height: 150, borderRadius: 24, background: P.ink }} />
            <div style={{ position: "absolute", left: 160, top: 140, width: 110, height: 110, borderRadius: 18, background: "#7E86FF", transform: "rotate(18deg)" }} />
          </div>
        </In>
        <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 38, color: P.ink, marginTop: 40, letterSpacing: "-0.03em" }}>Servicios</div>
        {["Consultoría", "Proyectos", "Soporte"].map((t, i) => (
          <div key={t} style={{ marginTop: 16, borderRadius: 18, background: "#fff", border: "1px solid #E2E2DD", padding: 22, display: "flex", gap: 18, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: i === 1 ? P.brand : "#E9E9FF", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: P.ink }}>{t}</div>
              <Line w="80%" h={8} c="#E2E2DD" style={{ marginTop: 10 }} />
            </div>
          </div>
        ))}
        <div style={{ marginTop: 28, borderRadius: 22, background: P.ink, padding: 30, fontFamily: FONT, fontWeight: 700, fontSize: 34, color: "#fff" }}>¿Empezamos?</div>
      </div>
    </div>
  </div>
);

export const WebSolution: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = ci(f, [40, 96], [0, 640], easeInOut);
  // Recorrido del cursor: menú → botón principal → scroll
  const cx = ci(f, [16, 34], [980, 150], easeInOut);
  const cy = ci(f, [16, 34], [120, 470], easeInOut) + ci(f, [40, 96], [0, -20]);
  const navHover = f > 10 && f < 26;
  const { V } = useLayout();
  if (V) {
    return (
      <SolutionFrame n="01" title={["Diseño y", "desarrollo web"]} sub="Webs a medida, rápidas y claras en cualquier pantalla." dur={SOL.web.dur} dw={DW} dh={DH} dwV={PW} dhV={PH}>
        <PhoneSite scroll={ci(f, [40, 96], [0, 560], easeInOut)} />
      </SolutionFrame>
    );
  }
  return (
    <SolutionFrame n="01" title={["Diseño y", "desarrollo web"]} sub="Webs a medida, rápidas y claras en cualquier pantalla." dur={SOL.web.dur} dw={DW} dh={DH}>
      <Window title="tu-marca.demo" w={DW} h={DH} light>
        {/* Navegación fija */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 70, display: "flex", alignItems: "center", padding: "0 60px", background: "rgba(246,246,243,0.94)", borderBottom: "1px solid #E2E2DD", zIndex: 5 }}>
          <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 24, color: P.ink }}>tu marca</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 34, fontFamily: FONT, fontSize: 17, color: "#55565C" }}>
            <span style={{ color: navHover ? P.brand : undefined }}>Inicio</span>
            <span>Servicios</span>
            <span>Proyectos</span>
            <span>Contacto</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: 70, left: 0, right: 0, transform: `translateY(${-scroll}px)` }}>
          <Hero />
          <Services />
          <Contact />
        </div>
        {/* Barra de scroll */}
        <div style={{ position: "absolute", right: 6, top: 80 + (scroll / 640) * 420, width: 6, height: 160, borderRadius: 3, background: "rgba(0,0,0,0.18)" }} />
        <Cursor x={cx} y={cy} o={ci(f, [12, 18], [0, 1])} press={ci(f, [34, 37, 41], [1, 0.85, 1])} />
      </Window>
    </SolutionFrame>
  );
};
