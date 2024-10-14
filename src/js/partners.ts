import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

export default function partners() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".partners")
  );

  elements.forEach((element) => {
    const heading = element.querySelector<HTMLElement>(".partners__heading");
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".partners__list-item")
    );

    let text: SplitType | null = null;
    if (heading) text = new SplitType(heading);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom-=30%",
      },
    });

    if (text) {
      tl.from(text.chars, {
        autoAlpha: 0,
        duration: 0.15,
        stagger: 0.05,
        y: 5,
      });
    }

    tl.from(
      items,
      {
        autoAlpha: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
      },
      "<"
    );
  });
}
