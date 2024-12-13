import { debounce } from "lodash";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function fixedHeader() {
  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  if (!pageHeader) return;
  const checkHeader = () => {
    if (window.scrollY > 20) {
      pageHeader.classList.add("page-header--fixed");
    } else {
      pageHeader.classList.remove("page-header--fixed");
    }
  };

  checkHeader();
  window.addEventListener("scroll", () => {
    checkHeader();
  });

  window.addEventListener("resize", debounce(checkHeader, 300));

  ScrollTrigger.create({
    onUpdate: (self) => {
      const direction = self.direction;
      if (direction === 1) {
        document.body.classList.add("header-hidden");
      } else {
        document.body.classList.remove("header-hidden");
      }
    },
  });
}
