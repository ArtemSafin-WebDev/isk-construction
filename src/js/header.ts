export default function header() {
  const menuOpenBtn = document.querySelector<HTMLButtonElement>(
    ".page-header__burger"
  );
  const menuCloseBtn = document.querySelector<HTMLButtonElement>(
    ".page-header__menu-burger"
  );

  menuOpenBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.add("menu-open");
  });
  menuCloseBtn?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.remove("menu-open");
  });
}
