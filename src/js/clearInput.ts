export default function clearInput() {
  const elements = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".js-clear-input")
  );
  elements.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const input =
        element.parentElement?.querySelector<HTMLInputElement>("input");
      if (!input) return;
      input.value = "";
    });
  });
}
