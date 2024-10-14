import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function footer() {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 641px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".page-footer",
        start: "top bottom-=30%",
      },
    });

    tl.from(".page-footer__nav-list-item, .page-footer__contacts", {
      autoAlpha: 0,
      duration: 0.6,
      y: 30,
      stagger: 0.1,
    });
  });
}
