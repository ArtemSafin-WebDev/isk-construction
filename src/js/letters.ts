import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Flip);

export default function letters() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".letters")
  );

  elements.forEach((element) => {
    const showAllBtn = element.querySelector<HTMLElement>(".letters__show-all");
    const list = element.querySelector<HTMLUListElement>(".letters__list");
    const listItems = Array.from(
      element.querySelectorAll<HTMLLIElement>(".letters__list-item")
    );
    showAllBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      const state = Flip.getState([list, ...listItems]);
      showAllBtn.parentElement?.classList.toggle("show-all");
      Flip.from(state, {
        duration: 0.5,
        absoluteOnLeave: true,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
        onEnter: (elements) => {
          gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        },
        onLeave: (elements) =>
          gsap.fromTo(elements, { opacity: 1 }, { opacity: 0, duration: 0.4 }),
      });
    });

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

      tl.from(".letters__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });

      tl.from(".letters__list-item:nth-child(-n + 6)", {
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        x: 50,
      });

      tl.from(".letters__show-all", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
    }, element);
  });
}
