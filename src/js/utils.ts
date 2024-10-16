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

export const animateLoaderSpinner = (paused: boolean = false) => {
  const loader = document.querySelector<HTMLElement>(".loader");
  const layers = Array.from(
    document.querySelectorAll<HTMLElement>(".loader__spinner-layer")
  );
  const selectLayer = (index: number) => {
    layers.forEach((layer) => layer.classList.remove("active"));
    layers[index]?.classList.add("active");
  };
  const tl = gsap.timeline({
    paused,
  });

  tl.fromTo(
    loader,
    {
      "--progress": 0,
    },
    {
      "--progress": 100,
      duration: 4,
      ease: "linear",
    }
  )
    .add(() => {
      selectLayer(1);
    }, 1)
    .add(() => {
      selectLayer(2);
    }, 2)
    .add(() => {
      selectLayer(3);
    }, 3);
  return tl;
};

export const hideLoader = () => {
  const loader = document.querySelector<HTMLElement>(".loader");
  const loaderInner = document.querySelector<HTMLElement>(".loader__inner");
  const loaderLogo = document.querySelector<HTMLElement>(".loader__logo");

  const tl = gsap.timeline();

  tl.to(loaderInner, {
    autoAlpha: 0,
    duration: 0.2,
    delay: 0.2,
  });

  tl.to(loaderLogo, {
    yPercent: -100,
    duration: 0.6,
    ease: "power2.out",
  });

  tl.to(loader, {
    duration: 1,
    yPercent: -100,
    ease: "power2.in",
  }).add(() => {
    loader?.remove();
  });

  return tl;
};

export function allProgress(
  proms: Array<Promise<unknown>>,
  progress_cb: Function
) {
  let d = 0;
  progress_cb(0);
  for (const p of proms) {
    p.then(() => {
      d++;
      progress_cb((d * 100) / proms.length);
    });
  }
  return Promise.all(proms);
}
