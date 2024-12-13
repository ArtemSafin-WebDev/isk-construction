import Validator from "./classes/Validator";

export default function contacts() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".contacts")
  );
  elements.forEach((element) => {
    const form = element.querySelector<HTMLFormElement>("form")!;
    const resetBtn = element.querySelector<HTMLButtonElement>(
      ".contacts__success-cross"
    );
    const validator = new Validator(form);
    form?.addEventListener("submit", async (event) => {
      event.preventDefault();
      validator.validate();
      if (validator.valid) {
        let response: Response | null = null;
        try {
          response = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
          });
        } catch (err) {
          console.error(err);
        }

        form?.parentElement?.classList.add("form-send");

        if (response?.ok) {
          form?.parentElement?.classList.add("form-send");
        }
      }
    });

    resetBtn?.addEventListener("click", () => {
      form?.parentElement?.classList.remove("form-send");
    });
  });
}
