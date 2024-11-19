import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
import Validator from "./classes/Validator";
gsap.registerPlugin(ScrollTrigger);

export default function consultation() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".consultation")
  );

  elements.forEach((element) => {});
}
