import { Composition, Folder } from "remotion";
import { OrvixAd } from "./orvix/OrvixAd";
import { T } from "./orvix/theme";
import { OrvixPromo } from "./promo/Promo";
import { TOTAL } from "./promo/theme";
import { OrvixCinematic } from "./cinematic/Cinematic";
import { TOTAL as CINE_TOTAL } from "./cinematic/theme";
import { S1Hook } from "./orvix/scenes/S1Hook";
import { S2Universe } from "./orvix/scenes/S2Universe";
import { S3Services } from "./orvix/scenes/S3Services";
import { S4Tech } from "./orvix/scenes/S4Tech";
import { S5Converge } from "./orvix/scenes/S5Converge";
import { S6Close } from "./orvix/scenes/S6Close";

const V = { width: 1080, height: 1920, fps: 30 };

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="OrvixCinematic" component={OrvixCinematic} durationInFrames={CINE_TOTAL} width={1920} height={1080} fps={30} />
    <Composition id="OrvixCinematicVertical" component={OrvixCinematic} durationInFrames={CINE_TOTAL} width={1080} height={1920} fps={30} />
    <Composition id="OrvixPromo" component={OrvixPromo} durationInFrames={TOTAL} width={1920} height={1080} fps={30} />
    <Composition id="OrvixPromoVertical" component={OrvixPromo} durationInFrames={TOTAL} width={1080} height={1920} fps={30} />
    <Composition id="OrvixAd" component={OrvixAd} durationInFrames={T.end} {...V} />
    <Folder name="OrvixAd-Escenas">
      <Composition id="S1-Gancho" component={S1Hook} durationInFrames={T.universe - T.hook} {...V} />
      <Composition id="S2-Universo" component={S2Universe} durationInFrames={T.services - T.universe} {...V} />
      <Composition id="S3-Servicios" component={S3Services} durationInFrames={T.tech - T.services} {...V} />
      <Composition id="S4-Tecnologia" component={S4Tech} durationInFrames={T.converge - T.tech} {...V} />
      <Composition id="S5-Convergencia" component={S5Converge} durationInFrames={T.close - T.converge} {...V} />
      <Composition id="S6-Cierre" component={S6Close} durationInFrames={T.end - T.close} {...V} />
    </Folder>
  </>
);
