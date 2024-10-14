import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType, { SplitTypeOptions } from "split-type";
import { callAfterResize } from "./utils";
import { hideLoader } from "./utils";
gsap.registerPlugin(ScrollTrigger);

export default function introTwo() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));

  elements.forEach((element) => {
    window.addEventListener("load", async () => {
      const options: Partial<SplitTypeOptions> = {
        types: "lines,words",
      };
      const heading = element.querySelector<HTMLElement>(".intro__heading");

      let instance: SplitType | null = null;
      if (heading) instance = new SplitType(heading, options);

      callAfterResize(() => {
        if (instance) instance.split(options);
      });
      const canvas = document.querySelector<HTMLCanvasElement>("#bg-canvas");
      if (canvas) {
        const context = canvas.getContext("2d")!;
        const frameCount = 181;
        let images: Array<Promise<HTMLImageElement>> = [];
        let imagesToUse: HTMLImageElement[] = [];
        const currentFrame = (index: number) =>
          `/images/sprite/logo-isk-logo.80.${index}.webp`;
        for (let i = 1; i <= frameCount; i++) {
          const url = currentFrame(i);
          const image = new Promise<HTMLImageElement>((resolve, reject) => {
            let img = new Image();
            img.addEventListener("load", () => {
              resolve(img);
            });
            img.addEventListener("error", () => {
              reject(new Error(`Failed to load image's URL: ${url}`));
            });
            img.src = url;
            if (img.complete) resolve(img);
          }).then((value) => {
            console.log("Returned value", value);
            imagesToUse.push(value);
            return value;
          });
          images.push(image);
        }
        await Promise.all(images);
        canvas.width = 1500;
        canvas.height = 938;
        // const img = new Image();
        // img.src = currentFrame(1);
        // img.onload = function () {
        //   context.drawImage(img, 0, 0);
        // };

        imagesToUse.sort((a, b) => {
          const aSrc = Number(a.src.split(".").at(-2));
          const bSrc = Number(b.src.split(".").at(-2));

          console.log("aSrc", aSrc);
          console.log("bSrc", bSrc);
          return aSrc - bSrc;
        });
        imagesToUse.forEach((img, index) => {
          console.log(`Index ${index} Src: ${img.src} `);
        });

        const obj = { num: 0 };

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imagesToUse[0], 0, 0);

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

        tl.to(obj, {
          num: frameCount - 1,
          ease: "steps(" + (frameCount - 1) + ")",
          onUpdate: () => {
            console.log("On update", obj.num);

            const image = imagesToUse[obj.num];
            console.log("Image", image);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(image, 0, 0);
          },
        });

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
      }
    });
  });
}
