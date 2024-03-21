import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Menu/Layout.jsx";
import Menu from "./pages/Menu/Menu.jsx";
import Restaurant from "./pages/Restaurant/Restaurant.jsx";
import ErrorPage from "./pages/Error/Error.jsx";
import RestaurantItem from "./pages/Restaurant/RestaurantItem.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Menu />,
            },
            {
                path: "/restaurant",
                element: <Restaurant />,
            },
            {
                path: "/restaurant-item/:id",
                element: <RestaurantItem />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);
