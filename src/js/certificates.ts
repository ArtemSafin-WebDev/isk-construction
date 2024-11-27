import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, Flip);

export default function certificates() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".certificates")
  );

  elements.forEach((element) => {
    const showAllBtn = element.querySelector<HTMLElement>(
      ".certificates__show-all"
    );
    const list = element.querySelector<HTMLUListElement>(".certificates__list");
    const listItems = Array.from(
      element.querySelectorAll<HTMLLIElement>(".certificates__list-item")
    );
    showAllBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      const state = Flip.getState([list, ...listItems, showAllBtn]);
      list?.parentElement?.classList.toggle("show-all");
      showAllBtn.remove();
      Flip.from(state, {
        duration: 0.7,
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
  });
}
