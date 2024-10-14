import Swiper from "swiper";
import { SwiperOptions, Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
gsap.registerPlugin(ScrollTrigger);

export default function experience() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".experience")
  );

  elements.forEach((element) => {
    window.addEventListener("load", () => {
      let ctx: gsap.Context | null = null;
      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const secondaryHeading = element.querySelector<HTMLElement>(
        ".experience__secondary-heading"
      );
      let instance: SplitType | null = null;
      let prevWidth = window.innerWidth;
      if (secondaryHeading) instance = new SplitType(secondaryHeading, options);
      let animationPlayed = false;
      function createTimeline() {
        console.log("Timeline created");
        ctx && ctx.revert();
        ctx = gsap.context(() => {
          instance?.split(options);
          const lines = instance?.lines;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=30%",
            },
            onComplete: () => {
              animationPlayed = true;
              ctx && ctx.revert();
            },
          });

          console.log("Exp lines", lines);

          tl.from(
            ".experience__heading",
            {
              autoAlpha: 0,
              duration: 0.4,
              y: 20,
            },
            0
          );
          tl.from(
            ".experience__count",
            {
              autoAlpha: 0,
              duration: 0.4,
              y: 20,
            },
            0
          );

          if (lines) {
            tl.from(
              lines,
              {
                autoAlpha: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
              },
              0
            );
          }

          tl.from(
            ".experience__all-projects",
            {
              autoAlpha: 0,
              duration: 0.4,
              y: 20,
            },
            ">-=0.3"
          );

          tl.from(
            ".experience__slider-card",
            {
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.1,
              y: 20,
            },
            ">-=0.4"
          );

          return () => {
            console.log("Clearing context");
            if (instance) instance.revert();
          };
        }, element);
      }

      createTimeline();

      callAfterResize(() => {
        if (animationPlayed) return;
        if (window.innerWidth === prevWidth) return;
        createTimeline();
        prevWidth = window.innerWidth;
      });
    });

    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    const mql = window.matchMedia("(max-width: 640px)");
    const options: SwiperOptions = {
      slidesPerView: "auto",
      speed: 600,
    };

    let instance: SwiperInstance | null = null;

    const handleWidthChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (instance) {
        instance.destroy();
        instance = null;
      }
      if (e.matches) {
        instance = new Swiper(container, options);
      }
    };

    mql.addEventListener("change", handleWidthChange);

    handleWidthChange(mql);
  });
}
