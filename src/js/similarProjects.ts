import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
gsap.registerPlugin(ScrollTrigger);

export default function similarProjects() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".similar-projects")
  );

  elements.forEach((element) => {
    window.addEventListener("load", () => {
      let ctx: gsap.Context | null = null;
      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const heading = element.querySelector<HTMLElement>(
        ".similar-projects__secondary-heading"
      );
      let instance: SplitType | null = null;
      let prevWidth = window.innerWidth;
      if (heading) instance = new SplitType(heading, options);
      let animationPlayed = false;
      function createTimeline() {
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

          tl.from(
            ".similar-projects__heading",
            {
              autoAlpha: 0,
              duration: 0.4,

              y: 20,
            },
            "<+=0.2"
          );
          tl.from(
            ".similar-projects__count",
            {
              autoAlpha: 0,
              duration: 0.4,

              y: 20,
            },
            "<"
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
              "<+=0.2"
            );
          }

          if (window.matchMedia("(max-width: 640px)").matches) {
            tl.from(
              ".similar-projects__all-projects-btn",
              {
                autoAlpha: 0,
                duration: 0.4,
              },
              "<+=0.2"
            );
          }

          tl.from(
            ".similar-projects__arrows",
            {
              autoAlpha: 0,
              duration: 0.4,

              y: 20,
            },
            "<+=0.2"
          );
          tl.from(".experience__slider-card", {
            autoAlpha: 0,
            duration: 0.6,
            stagger: 0.2,
          });

          return () => {
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

    new Swiper(container, {
      slidesPerView: "auto",
      speed: 600,
      modules: [Navigation],
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".similar-projects__arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".similar-projects__arrow--next"
        ),
      },
    });
  });
}
