import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { isMobile, isTouch } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function smoothScrolling() {
  let lenis: Lenis | null = null;

  if (isTouch() || isMobile()) return;
  lenis = new Lenis({
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    if (lenis) {
      lenis.raf(time * 1000);
    }
  });

  gsap.ticker.lagSmoothing(0);
}
