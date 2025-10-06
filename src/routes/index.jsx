import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "~/layout";
import AboutMe from "~/pages/aboutme";
import Blog from "~/pages/blog";
import Home from "~/pages/home";
import NotFound from "~/pages/not-found";
import Projects from "~/pages/projects";

export default function MainRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
