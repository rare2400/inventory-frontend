import { createBrowserRouter } from "react-router-dom";
import { LayoutPage } from "./components/layout/LayoutPage";
import LoginPage from "./components/pages/public/LoginPage";
import Home from "./components/pages/public/Home";
import ProtectedRoute from "./components/protectedRoute";


const Register = () => <h1>Registrera dig</h1>;
const ProductPage = () => <h1>Produktdetaljer</h1>;

// Admin components
const Admin = () => <h1>Adminpanel</h1>;
const ProductList = () => <h1>Admin - Produktlista</h1>;
const ProductForm = () => <h1>Admin - Produktformulär</h1>;

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