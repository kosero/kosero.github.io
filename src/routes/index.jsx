import { createBrowserRouter } from "react-router-dom";
import Layout from "~/layout";
import Home from "~/pages/home";
import NotFound from "~/pages/not-found";

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
                path: '*',
                element: <NotFound />
            }
        ]
    },
])

export default routes