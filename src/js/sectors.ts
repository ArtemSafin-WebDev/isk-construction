export default function sectors() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".sectors")
  );

  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".sectors__bg-item")
    );
    const links = Array.from(
      element.querySelectorAll<HTMLElement>(".sectors__link")
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
