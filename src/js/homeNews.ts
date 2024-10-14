import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function homeNews() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".home-news")
  );

  elements.forEach((element) => {
    gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
        },
      });

      tl.from(".home-news__heading", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
      tl.from(".home-news__list-item", {
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.2,
        y: 20,
      });
      tl.from(
        ".home-news__more-link",
        {
          autoAlpha: 0,
          duration: 0.4,
          y: 20,
        },
        ">-=0.5"
      );
    }, element);
  });
}
