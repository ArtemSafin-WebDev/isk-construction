import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
gsap.registerPlugin(ScrollTrigger);

export default function since() {
  window.addEventListener("load", () => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".since")
    );

    elements.forEach((element) => {
      const heading = element.querySelector<HTMLElement>(".since__heading");
      const link = element.querySelector<HTMLLinkElement>(".since__link");
      const year = element.querySelector<HTMLElement>(".since__year");
      let containerElement = element.querySelector<HTMLElement>(
        ".since__text-content"
      );

      let animationPlayed = false;
      let tl: gsap.core.Timeline | null = null;
      let resizeObserver: ResizeObserver | null = null;
      let instance: SplitType | null = null;
      let options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };

      let initialLoad = false;

      const createTimeLine = (lines: HTMLElement[] | null): void => {
        if (animationPlayed) return;
        if (tl) {
          tl.revert();
        }
        if (!lines || !lines?.length) return;
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=30%",
            scrub: false,
          },
          onComplete: () => {
            animationPlayed = true;
            if (instance) instance.revert();
            if (resizeObserver) resizeObserver.disconnect();
          },
        });
        tl.from(lines, {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
        });
        tl.from(
          link,
          {
            autoAlpha: 0,
            duration: 0.3,
          },
          ">-=0.2"
        );

        tl.from(
          year,
          {
            autoAlpha: 0,
            duration: 0.4,
          },
          0
        );
      };
      function handleResize() {
        if (!initialLoad) {
          initialLoad = true;
          return;
        }
        if (instance) instance.split(options);
        const lines = instance?.lines;
        if (lines) {
          createTimeLine(lines);
        }
      }

      if (window.ResizeObserver !== undefined && containerElement && heading) {
        resizeObserver = new ResizeObserver(handleResize);
        instance = new SplitType(heading, options);
        const lines = instance?.lines;
        if (lines) {
          createTimeLine(lines);
        }
        resizeObserver.observe(containerElement);
      }
    });
  });
}
