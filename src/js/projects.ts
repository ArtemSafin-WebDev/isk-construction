import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Pagination } from "swiper/modules";
gsap.registerPlugin(ScrollTrigger);

export default function projects() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".projects")
  );

  const initSwiper = (card: HTMLElement) => {
    const container = card.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    const slidesCount = Array.from(
      card.querySelectorAll(".swiper-slide")
    ).length;
    let tracking = false;
    const instance = new Swiper(container, {
      modules: [Pagination, EffectFade],
      slidesPerView: 1,
      speed: 400,
      effect: "fade",
      longSwipesRatio: 0.2,
      fadeEffect: {
        crossFade: false,
      },

      pagination: {
        el: card.querySelector<HTMLElement>(".projects__card-pagination"),
        type: "bullets",
        clickable: true,
      },
    });

    card.addEventListener("mouseenter", () => {
      tracking = true;
    });
    card.addEventListener("mousemove", (event: MouseEvent) => {
      if (!tracking) return;
      const rect = card.getBoundingClientRect();

      const clampedXCoord = gsap.utils.clamp(
        0.1,
        card.offsetWidth,
        event.pageX - rect.left
      );

      const index = Math.ceil(
        gsap.utils.normalize(0, card.offsetWidth, clampedXCoord) * slidesCount
      );
      instance.slideTo(index - 1);
      //   console.log("Mousemove", index);
    });

    card.addEventListener("mouseleave", () => {
      tracking = false;
      instance.slideTo(0);
    });
  };

  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".projects__card")
    );

    cards.forEach((card) => initSwiper(card));

    const list = element.querySelector<HTMLUListElement>(".projects__list");
    if (list) {
      const config = { attributes: false, childList: true, subtree: false };

      const callback: MutationCallback = (mutationList, _observer) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            if (mutation?.addedNodes?.length) {
              const items = Array.from(mutation.addedNodes).filter(
                (node) => node.nodeType === 1
              ) as Element[];
              const filteredItems = items.filter((element) =>
                element.matches(".projects__list-item")
              );

              const cards = filteredItems.map((item) =>
                item.querySelector<HTMLElement>(".projects__card")
              );
              cards.forEach((card) => {
                if (card) initSwiper(card);
              });
              gsap.from(filteredItems, {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
              });

              console.log("Items added", filteredItems);
            }

            if (mutation?.removedNodes.length) {
              console.log("Nodes removed", mutation?.removedNodes);
            }

            ScrollTrigger.refresh();
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(list, config);
    }
  });
}
