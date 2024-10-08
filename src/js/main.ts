import "virtual:svg-icons-register";
import "../scss/style.scss";
import competence from "./competence";
import sectors from "./sectors";
import experience from "./experience";
import videoScrub from "./videoScrub";

document.addEventListener("DOMContentLoaded", () => {
  competence();
  sectors();
  experience();
  videoScrub();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});