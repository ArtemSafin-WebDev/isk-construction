document.addEventListener("DOMContentLoaded", () => {
  const forms = Array.from(document.querySelectorAll(".js-form"));

  forms.forEach((form) => {
    controller = new AbortController();
    const signal = controller.signal;

    const reset = form.querySelector('button[type="reset"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const validator = form.validator;
      validator.validate();
      if (!validator.valid) return;

      //   const res = await fetch(form.action, {
      //     method: "POST",
      //     body: new FormData(form),
      //     signal: signal,
      //   });
      //   if (!res.ok) throw new Error("Response is not OK");

      form.classList.add("success");
      // Do something
    });

    reset.addEventListener("click", () => {
      form.classList.remove("success");
    });
  });
});
