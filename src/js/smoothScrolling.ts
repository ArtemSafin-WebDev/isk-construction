import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { isMobile, isTouch } from "./utils";
import { ScrollToPlugin } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const link = (target.matches("a") ||
      target.closest("a")) as HTMLAnchorElement | null;
    console.log("Link", link);
    if (!link || !link.hash) return;
    event.preventDefault();
    console.log("Hash", link.hash);
    gsap.to(window, {
      duration: 0.6,
      scrollTo: {
        y: link.hash,
        autoKill: false,
      },
    });
  });
}
