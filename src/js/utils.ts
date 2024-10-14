import gsap from "gsap";

export const isTouch = () => !window.matchMedia("(hover: hover)").matches;
export const isMobile = () => window.matchMedia("(max-width: 640px)").matches;
export const isSafari = () => {
  const userAgentString = navigator.userAgent;
  let chromeAgent = userAgentString.indexOf("Chrome") > -1;
  let safariAgent = userAgentString.indexOf("Safari") > -1;
  if (chromeAgent && safariAgent) safariAgent = false;
  return safariAgent;
};

export const callAfterResize = (func: Function, delay?: number) => {
  let dc = gsap.delayedCall(delay || 0.2, func).pause(),
    handler = () => dc.restart(true);
  window.addEventListener("resize", handler);
  return handler; // in case you want to window.removeEventListener() later
};
