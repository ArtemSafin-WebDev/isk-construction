import Swiper from "swiper";
import "swiper/css";
import { Navigation, Thumbs } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function projectGallery() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".project-gallery")
  );
  const mql = window.matchMedia("(max-width: 640px)");

  elements.forEach((element) => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
        onComplete: () => {
          ctx && ctx.revert();
        },
      });
      tl.from(".project-gallery__slider", {
        autoAlpha: 0,
        duration: 0.6,
        y: 40,
      });
    }, element);
    const mainContainer = element.querySelector<HTMLElement>(
      ".project-gallery__slider .swiper"
    );
    const thumbsContainer = element.querySelector<HTMLElement>(
      ".project-gallery__slider-thumbs .swiper"
    );

    if (!mainContainer || !thumbsContainer) return;

    let main: Swiper | null = null;
    let thumbs: Swiper | null = null;
    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        if (main) main.destroy();
        if (thumbs) thumbs.destroy();
        main = null;
        thumbs = null;
        main = new Swiper(mainContainer, {
          slidesPerView: "auto",
          speed: 600,
        });
      } else {
        if (main) main.destroy();
        if (thumbs) thumbs.destroy();
        main = null;
        thumbs = null;
        thumbs = new Swiper(thumbsContainer, {
          loop: true,
          slidesPerView: "auto",
          speed: 600,
          centerInsufficientSlides: true,
          watchSlidesProgress: true,
        });
        main = new Swiper(mainContainer, {
          modules: [Navigation, Thumbs],
          slidesPerView: "auto",
          loop: true,
          centeredSlides: true,
          speed: 600,
          longSwipesRatio: 0.2,
          navigation: {
            prevEl: element.querySelector<HTMLButtonElement>(
              ".project-gallery__slider-arrow--prev"
            ),
            nextEl: element.querySelector<HTMLButtonElement>(
              ".project-gallery__slider-arrow--next"
            ),
          },
          thumbs: {
            swiper: thumbs,
          },
        });
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
