import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function subjects() {
  let mm = gsap.matchMedia();

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".subjects")
  );

  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
      });

      tl.from(".subjects__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 30,
      });

      tl.from(".subjects__list-item", {
        y: 30,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    }, element);
  });
}
