import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/layout/LayoutPage";
import LoginPage from "./components/pages/public/LoginPage";
import Home from "./components/pages/public/Home";
import ProtectedRoute from "./components/protectedRoute";
import Register from "./components/pages/public/Register";
import ProductPage from "./components/pages/public/ProductPage";
import Admin from "./components/pages/admin/Admin";
import ProductList from "./components/pages/admin/ProductList";
import ProductForm from "./components/pages/admin/ProductForm";

const Error = () => <h1>Sidan existerar inte...</h1>;

// Define the routes
export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />,
        children: [
            {
                path: "/",
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
            {
                path: "admin",
                children: [
                    {
                        index: true,
                        element:
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                    },
                    {
                        path: "products",
                        element: <ProductList />

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
        element: <Error />
    }
]);