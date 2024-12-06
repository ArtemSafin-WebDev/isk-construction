import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function pressCenter() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".press-center")
  );

  elements.forEach((element) => {
    const accordions = Array.from(
      element.querySelectorAll<HTMLElement>(
        ".press-center__materials-accordion"
      )
    );

    const openBtn = element.querySelector<HTMLButtonElement>(
      ".press-center__years-btn"
    );
    const closeBtn = element.querySelector<HTMLButtonElement>(
      ".press-center__years-close"
    );
    const dropdown = element.querySelector<HTMLElement>(
      ".press-center__years-dropdown"
    );
    const links = Array.from(
      element.querySelectorAll<HTMLElement>(".press-center__years-link")
    );

    openBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.add("years-shown");
    });
    closeBtn?.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.remove("years-shown");
    });
    dropdown?.addEventListener("click", (event) => {
      if (event.target === dropdown) {
        event.preventDefault();
        document.body.classList.remove("years-shown");
      }
    });
    links.forEach((link) =>
      link.addEventListener("click", () => {
        document.body.classList.remove("years-shown");
      })
    );
    accordions.forEach((accordion) => {
      const btn = accordion.querySelector<HTMLButtonElement>("button");
      const content = accordion.querySelector<HTMLElement>(
        ".press-center__materials-accordion-content"
      );
      btn?.addEventListener("click", (event) => {
        event.preventDefault();
        accordions.forEach((otherAccordion) => {
          console.log("Equals", otherAccordion === accordion);
          if (otherAccordion !== accordion) {
            otherAccordion.classList.remove("active");
          }
        });

        accordion.classList.toggle("active");
      });
      content?.addEventListener("transitionend", () => {
        ScrollTrigger.refresh();
      });
    });
  });
}
