import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <header>
            <div className="header-container">
                <NavLink to="/" className="header-logo">Lagersystem</NavLink>
                <nav className="header-nav">
                    <ul>
                        <li><NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>Hem</NavLink></li>
                        <li>
                            {
                                !user ? <NavLink to="/login"
                                    className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                                    Logga in</NavLink> : <button onClick={logout}>Logga ut</button>
                            }
                        </li>
                        <li>
                            {
                                !user ? <NavLink to="/register"
                                    className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                                    Registrera dig</NavLink> : <NavLink to="/dashboard"
                                        className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}>
                                    Dashboard</NavLink>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;