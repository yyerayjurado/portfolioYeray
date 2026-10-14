import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Wipe } from "../kit";
import { SOL } from "../theme";
import { WebSolution } from "../solutions/Web";
import { ShopSolution } from "../solutions/Shop";
import { BrandSolution } from "../solutions/Brand";
import { AutomationSolution } from "../solutions/Automation";

// 18–33 s · Cuatro soluciones, cada una con su propio lenguaje visual,
// enlazadas por una cortinilla en el azul de marca que cae en el beat.
export const P4Solutions: React.FC = () => (
  <AbsoluteFill>
    <Sequence name="Web" from={SOL.web.from} durationInFrames={SOL.web.dur}>
      <WebSolution />
    </Sequence>
    <Sequence name="Shopify" from={SOL.shop.from} durationInFrames={SOL.shop.dur}>
      <ShopSolution />
    </Sequence>
    <Sequence name="Branding" from={SOL.brand.from} durationInFrames={SOL.brand.dur}>
      <BrandSolution />
    </Sequence>
    <Sequence name="Automatización" from={SOL.auto.from} durationInFrames={SOL.auto.dur}>
      <AutomationSolution />
    </Sequence>
    {[SOL.shop.from, SOL.brand.from, SOL.auto.from].map((t) => (
      <Wipe key={t} at={t - 8} dur={16} />
    ))}
  </AbsoluteFill>
);
