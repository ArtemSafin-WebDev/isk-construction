import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
import { hideLoader } from "./utils";
gsap.registerPlugin(ScrollTrigger);

/* The encoding is super important here to enable frame-by-frame scrubbing. */

// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -movflags faststart -vcodec libx264 -crf 23 -g 1 -pix_fmt yuv420p output.mp4
// ffmpeg -i ~/Downloads/Toshiba\ video/original.mov -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output_960.mp4

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    window.addEventListener("load", () => {
      const video = document.querySelector<HTMLVideoElement>(
        ".illustration__video"
      );
      if (!video) return;
      let src = video.currentSrc || video.src;
      console.log(video, src);

      /* Make sure the video is 'activated' on iOS */
      function once(el: HTMLElement, event: string, fn: Function, opts?: any) {
        var onceFn = function () {
          el.removeEventListener(event, onceFn);

          fn.apply(null, arguments);
        };
        el.addEventListener(event, onceFn, opts);
        return onceFn;
      }

      once(document.documentElement, "touchstart", function () {
        video.play();
        video.pause();
      });

      let tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: ".intro",
          endTrigger: ".experience",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      once(video, "loadedmetadata", () => {
        tl.fromTo(
          video,
          {
            currentTime: 0,
          },
          {
            currentTime: video.duration || 1,
          }
        );
        video.classList.add("ready");
        ScrollTrigger.refresh();
      });

      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const heading = element.querySelector<HTMLElement>(".intro__heading");

      let instance: SplitType | null = null;
      if (heading) instance = new SplitType(heading, options);

      callAfterResize(() => {
        if (instance) instance.split(options);
      });

      /* When first coded, the Blobbing was important to ensure the browser wasn't dropping previously played segments, but it doesn't seem to be a problem now. Possibly based on memory availability? */
      setTimeout(function () {
        if (window["fetch"]) {
          fetch(src)
            .then((response) => response.blob())
            .then((response) => {
              var blobURL = URL.createObjectURL(response);

              var t = video.currentTime;

              once(document.documentElement, "touchstart", function () {
                video.play();
                video.pause();
              });

              video.setAttribute("src", blobURL);
              video.currentTime = t + 0.01;
              ScrollTrigger.refresh();

              const loaderTl = hideLoader();

              loaderTl.from(
                ".intro__list-item",
                {
                  autoAlpha: 0,
                  x: 50,
                  duration: 0.6,
                  stagger: 0.2,
                },
                ">+=0.4"
              );
              if (instance?.lines) {
                loaderTl
                  .from(
                    instance?.lines,
                    {
                      autoAlpha: 0,
                      y: 20,
                      duration: 0.6,
                      stagger: 0.1,
                      delay: 0,
                    },
                    "<-=0.4"
                  )
                  .add(() => {
                    instance?.revert();
                  });
              }
            });
        }
      }, 1000);
    });
  });
}
