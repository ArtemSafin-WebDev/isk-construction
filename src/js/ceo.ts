import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

export default function ceo() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".ceo"));

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(".ceo__heading");
    gsap.context(() => {
      let text: SplitType | null = null;
      if (heading)
        text = new SplitType(heading, {
          types: "chars,words",
        });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=30%",
          markers: false,
        },
      });

      tl.from(".ceo__quotes", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
      if (text?.chars) {
        tl.from(
          text?.chars,
          {
            autoAlpha: 0,
            duration: 0.1 / 2,
            stagger: 0.05 / 2,
          },
          "<"
        );
      }

      tl.from(".ceo__info", {
        autoAlpha: 0,
        duration: 0.4,
        y: 20,
      });
    }, element);
  });
}
