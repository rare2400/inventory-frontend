import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/layout/LayoutPage";
import LoginPage from "./components/pages/public/LoginPage";
import Home from "./components/pages/public/Home";
import Register from "./components/pages/public/Register";
import ProductPage from "./components/pages/public/ProductPage";
import Admin from "./components/pages/admin/Admin";
import ProductForm from "./components/pages/admin/ProductForm";
import AdminLayout from "./components/layout/AdminLayout";

const NotFound = () => <h1>Sidan existerar inte...</h1>;

// Define the routes
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
               index: true,
                element: <Home />
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/products/:id",
                element: <ProductPage />
            },
            // Protected admin routes
            {
                path: "admin",
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element:
                                <Admin />
                    },
                    {
                        path: "products/new",
                        element: <ProductForm />

                    },
                    {
                        path: "products/:id/edit",
                        element: <ProductForm />

                    },
                ]
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);