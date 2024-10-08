import "virtual:svg-icons-register";
import "../scss/style.scss";
import competence from "./competence";
import sectors from "./sectors";
import experience from "./experience";

document.addEventListener("DOMContentLoaded", () => {
  competence();
  sectors();
  experience();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
