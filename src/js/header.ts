export default function header() {
  const menuOpenBtn = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );
  const menuCloseBtn = document.querySelector<HTMLButtonElement>(
    ".page-header__menu-burger"
  );

  const dropdownLinks = Array.from(
    document.querySelectorAll<HTMLElement>(".page-header__nav-list-item")
  )
    .filter((item) => item.querySelector(".page-header__nav-submenu"))
    .map((item) =>
      item.querySelector<HTMLLinkElement>(".page-header__nav-link")
    );

  menuOpenBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.add("menu-open");
  });
  menuCloseBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.remove("menu-open");
  });

  dropdownLinks.forEach((link) => {
    link?.addEventListener("click", (event) => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        event.preventDefault();
        link?.parentElement?.classList.toggle("open");
      }
    });
  });
}
