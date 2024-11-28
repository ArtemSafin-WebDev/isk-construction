import Swiper from "swiper";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function sectorAdvantages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".sector-advantages")
  );

  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
      });
      tl.from(".sector-advantages__heading", {
        autoAlpha: 0,
        duration: 0.4,

        y: 20,
      });
      tl.from(".sector-advantages__slider-card", {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.2,
        y: 20,
      });
    }, element);
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const mql = window.matchMedia("(max-width: 640px)");
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 600,
    };

    let instance: Swiper | null = null;

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        instance = new Swiper(container, options);
      } else {
        if (instance) {
          instance.destroy();
          instance = null;
        }
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
