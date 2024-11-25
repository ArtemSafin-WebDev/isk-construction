import home from "./pages-data/home";
import projects from "./pages-data/projects";
import about from "./pages-data/about";
import project from "./pages-data/project";
import clients from "./pages-data/clients";

const pagesConfig = {
  ...home,
  ...projects,
  ...about,
  ...project,
  ...clients,
};

export default pagesConfig;
