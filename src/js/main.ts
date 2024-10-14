import "virtual:svg-icons-register";
import "../scss/style.scss";
import competence from "./competence";
import sectors from "./sectors";
import experience from "./experience";
import videoScrub from "./videoScrub";
import header from "./header";
import smoothScrolling from "./smoothScrolling";
import partners from "./partners";
import since from "./since";
import homeNews from "./homeNews";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  header();
  competence();
  sectors();
  experience();
  videoScrub();
  partners();
  since();
  homeNews();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
