import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout";
import AboutMe from "~/pages/aboutme";
import Blog from "~/pages/blog";
import Home from "~/pages/home";
import NotFound from "~/pages/not-found";
import Projects from "~/pages/projects";

const routes =  createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "home",
                element: <Home />
            },
            {
                path: "aboutme",
                element: <AboutMe />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "blog",
                element: <Blog />
            },
            {
                path: '*',
                element: <NotFound />
            }
        ]
    },
])

export default routes