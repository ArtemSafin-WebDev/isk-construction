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
import projectIntro from "./projectIntro";
import projectDescription from "./projectDescription";
import projectVideo from "./projectVideo";
import projectHistory from "./projectHistory";
import projectResults from "./projectResults";
import similarProjects from "./similarProjects";
import projectGallery from "./projectGallery";
import certificates from "./certificates";
import fancybox from "./fancybox";
import subjects from "./subjects";
import sectorAdvantages from "./sectorAdvantages";
import careerVacancies from "./careerVacancies";
import careerApproach from "./careerApproach";
import otherArticles from "./otherArticles";
import pressCenter from "./pressCenter";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  forms();
  intro();
  header();
  competence();
  sectors();
  experience();
  fancybox();
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
  projectIntro();
  projectDescription();
  projectVideo();
  projectHistory();
  projectResults();
  similarProjects();
  projectGallery();
  certificates();
  subjects();
  sectorAdvantages();
  careerVacancies();
  careerApproach();
  otherArticles();
  pressCenter();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
