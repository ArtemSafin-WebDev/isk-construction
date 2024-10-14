import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function park() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".park"));

  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
          markers: false,
        },
      });
      tl.from(".park__heading", {
        autoAlpha: 0,
        duration: 0.4,
      });

      tl.from(
        ".park__image-wrapper",
        {
          xPercent: 30,
          autoAlpha: 0,
          duration: 1,
          ease: "power2.out",
        },
        "<"
      );
      tl.from(".park__link", {
        autoAlpha: 0,
        duration: 0.4,
      });
    }, element);
  });
}
