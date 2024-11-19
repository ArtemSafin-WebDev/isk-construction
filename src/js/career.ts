import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export default function career() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".career")
  );

  elements.forEach((element) => {
    window.addEventListener("load", () => {
      let ctx: gsap.Context | null = null;
      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const secondaryHeading = element.querySelector<HTMLElement>(
        ".career__secondary-heading"
      );
      let instance: SplitType | null = null;
      let prevWidth = window.innerWidth;
      if (secondaryHeading) instance = new SplitType(secondaryHeading, options);
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
            ".career__heading",
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

          tl.from(".career__text", {
            autoAlpha: 0,
            duration: 0.4,
            y: 20,
          });
          tl.from(".career__link", {
            autoAlpha: 0,
            duration: 0.4,
            y: 20,
          });

          tl.from(".career__list-item", {
            autoAlpha: 0,
            x: 50,
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
  });
}
