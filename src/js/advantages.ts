import Swiper from "swiper";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function advantages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".advantages")
  );
  const mql = window.matchMedia("(max-width: 640px)");
  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
      });

      tl.from(".advantages__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });

      tl.from(
        ".advantages__slider-card",
        {
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          y: 20,
        },
        0
      );
    }, element);

    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    let instance: Swiper | null = null;
    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (instance) instance.destroy();
        instance = new Swiper(container, {
          slidesPerView: "auto",
          speed: 600,
        });
      } else {
        if (instance) instance.destroy();
        instance = null;
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
