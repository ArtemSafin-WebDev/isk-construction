import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
gsap.registerPlugin(ScrollTrigger);

export default function projectVideo() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".project-video")
  );

  elements.forEach((element) => {
    window.addEventListener("load", () => {
      let ctx: gsap.Context | null = null;
      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const heading = element.querySelector<HTMLElement>(
        ".project-video__secondary-heading"
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
            ".project-video__heading",
            {
              autoAlpha: 0,
              duration: 0.4,
              y: 20,
            },
            0
          );

          if (lines) {
            tl.from(lines, {
              autoAlpha: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.1,
            });
          }

          tl.from(".project-video__play", {
            autoAlpha: 0,
            duration: 0.4,

            y: 20,
          });
          if (window.matchMedia("(max-width: 640px)").matches) {
            tl.from(
              ".project-video__bg",
              {
                autoAlpha: 0,
                duration: 0.4,
              },
              "<"
            );
          }
          tl.from(
            ".project-video__description",
            {
              autoAlpha: 0,
              duration: 0.4,
              y: 20,
            },
            "<+=0.1"
          );

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
  });
}
