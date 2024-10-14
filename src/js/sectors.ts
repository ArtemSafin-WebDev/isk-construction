import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function sectors() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".sectors")
  );

  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".sectors__bg-item")
    );
    const links = Array.from(
      element.querySelectorAll<HTMLElement>(".sectors__link")
    );

    links.forEach((link, linkIndex) => {
      link.addEventListener("mouseenter", () => {
        items.forEach((item) => item.classList.remove("active"));
        links.forEach((link) => link.classList.remove("active"));
        items[linkIndex]?.classList.add("active");
        links[linkIndex]?.classList.add("active");
      });
      link.addEventListener("mouseleave", () => {
        items.forEach((item) => item.classList.remove("active"));
        links.forEach((link) => link.classList.remove("active"));
      });
    });

    // gsap.context(() => {
    //   const tl = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: element,
    //       start: "top bottom-=30%",
    //       markers: false,
    //     },
    //   });
    //   tl.from(".sectors__heading", {
    //     autoAlpha: 0,
    //     duration: 0.4,
    //   });

    //   tl.from(".sectors__list-item", {
    //     autoAlpha: 0,
    //     duration: 0.6,
    //     stagger: 0.2,
    //   });
    //   tl.from(".sectors__show-all", {
    //     autoAlpha: 0,
    //     duration: 0.4,
    //   });
    // }, element);
  });
}
