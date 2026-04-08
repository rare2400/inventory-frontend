import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export const LayoutPage = () => {
    return (
        <>
        <Header />

        <main className="container">
            <Outlet />
        </main>

        <Footer />

        </>
    )
}