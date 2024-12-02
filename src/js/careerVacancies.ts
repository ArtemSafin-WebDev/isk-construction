import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function careerVacancies() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".career-vacancies")
  );

  let mm = gsap.matchMedia();

  elements.forEach((element) => {
    const accordions = Array.from(
      element.querySelectorAll<HTMLElement>(".career-vacancies__accordion")
    );
    accordions.forEach((accordion) => {
      const btn = accordion.querySelector<HTMLButtonElement>("button");
      const content = accordion.querySelector<HTMLElement>(
        ".career-vacancies__accordion-content"
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

    mm.add(
      "(min-width: 641px)",
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=30%",
          },
        });
        tl.from(".career-vacancies__heading", {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        });
        tl.from(".career-vacancies__list-item", {
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.2,
          x: 50,
        });
        tl.from(".career-vacancies__contacts", {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        });
      },
      element
    );
    mm.add(
      "(max-width: 640px)",
      () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=30%",
          },
        });
        tl.from(".career-vacancies__heading", {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        });
        tl.from(".career-vacancies__list-item", {
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.2,
          x: 50,
        });
        tl.from(".career-vacancies__contacts", {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        });
      },
      element
    );
  });
}
