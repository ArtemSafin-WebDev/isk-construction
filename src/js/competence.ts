export default function competence() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".competence")
  );

  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".competence__bg-item")
    );
    const links = Array.from(
      element.querySelectorAll<HTMLElement>(".competence__link")
    );

    links.forEach((link, linkIndex) => {
      link.addEventListener("mouseenter", () => {
        items.forEach((item) => item.classList.remove("active"));
        links.forEach((link) => link.classList.remove("active"));
        items[linkIndex]?.classList.add("active");
        links[linkIndex]?.classList.add("active");
      });
      link.addEventListener("mouseleave", () => {
        items.forEach((item) => item.classList.remove("active"));
        links.forEach((link) => link.classList.remove("active"));
      });
    });
  });
}
