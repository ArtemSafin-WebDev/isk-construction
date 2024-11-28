import home from "./pages-data/home";
import projects from "./pages-data/projects";
import about from "./pages-data/about";
import project from "./pages-data/project";
import clients from "./pages-data/clients";
import certificates from "./pages-data/certificates";
import sector from "./pages-data/sector";

const pagesConfig = {
  ...home,
  ...projects,
  ...about,
  ...project,
  ...clients,
  ...certificates,
  ...sector,
};

export default pagesConfig;
