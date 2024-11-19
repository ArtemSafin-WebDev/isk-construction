import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function aboutNumbers() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".about-numbers")
  );

  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
      });

      tl.from(".about-numbers__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
      tl.from(
        ".about-numbers__image",
        {
          autoAlpha: 0,
          duration: 1,
          scale: 0.6,
          ease: "power2.out",
        },
        0
      );
      tl.from(".about-numbers__list-item", {
        autoAlpha: 0,
        x: 50,
        duration: 0.6,
        stagger: 0.2,
      });
    }, element);
  });
}
