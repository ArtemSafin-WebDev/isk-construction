import Swiper from "swiper";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function otherArticles() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".other-articles")
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
      tl.from(".other-articles__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
      tl.from(
        ".other-articles__link",
        {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        },
        ">-=0.2"
      );
      tl.from(
        ".other-articles__slider",
        {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        },
        ">-=0.2"
      );
    }, element);
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    let instance: Swiper | null = null;
    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
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
