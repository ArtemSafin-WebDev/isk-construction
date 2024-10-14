import "virtual:svg-icons-register";
import "../scss/style.scss";
import competence from "./competence";
import sectors from "./sectors";
import experience from "./experience";

import header from "./header";
import smoothScrolling from "./smoothScrolling";
import partners from "./partners";
import since from "./since";
import homeNews from "./homeNews";
import intro from "./intro";
import ceo from "./ceo";
import park from "./park";
import introTwo from "./intro2";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  // intro();
  introTwo();
  header();
  competence();
  sectors();
  experience();

  partners();
  since();
  homeNews();
  ceo();
  park();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
