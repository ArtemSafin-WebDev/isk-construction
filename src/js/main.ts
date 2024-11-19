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
import ceo from "./ceo";
import park from "./park";
import footer from "./footer";
import intro from "./intro";
import projects from "./projects";
import consultation from "./consultation";
import forms from "./forms";
import clearInput from "./clearInput";
import advantages from "./advantages";
import career from "./career";
import aboutNumbers from "./aboutNumbers";
import aboutApproach from "./aboutApproach";
import letters from "./letters";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  forms();
  intro();
  header();
  competence();
  sectors();
  experience();

  partners();
  since();
  homeNews();
  ceo();
  park();
  footer();
  projects();
  clearInput();
  consultation();
  aboutNumbers();
  aboutApproach();
  advantages();
  career();
  letters();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
