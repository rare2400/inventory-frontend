import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import { useState } from "react";

const Header = () => {
    /* Hook to get the current user and logout function from context */
    const { user, logout } = useAuth();

    const [menuOpen, setMenuOpen] = useState(false);

    /* Function to close menu setting state to false */
    const closeMenu = () => setMenuOpen(false);

    const navLinkClass = ({ isActive }: { isActive: boolean }) => isActive ? "active nav-link" : "nav-link";

    return (
        <header>
            <div className="header-container">
                <NavLink to="/" className="header-logo">Lagersystem</NavLink>

                {/* Hamburger menu for mobile view */}
                <button className={`hamburger ${menuOpen ? "hamburger-open" : ""}`}
                    onClick={() => setMenuOpen((prev) => !prev)}>

                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                {/* Navigation links with conditional rendering based on authentication status */}
                <nav className={`header-nav ${menuOpen ? "header-nav--open" : ""}`}>
                    <ul className="nav-list">

                        {/* Public link */}
                        <li>
                            <NavLink to="/"
                                className={navLinkClass} onClick={closeMenu}>Hem</NavLink>
                        </li>

                        {!user ? (
                            <>
                                <li>
                                    <NavLink to="/login"
                                        className={navLinkClass} onClick={closeMenu}>
                                        Logga in</NavLink>
                                </li>

                                <li>
                                    <NavLink to="/register"
                                        className={navLinkClass} onClick={closeMenu}>
                                        Registrera dig</NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/admin"
                                        className={navLinkClass} onClick={closeMenu}>
                                        Hantera produkter</NavLink>
                                </li>
                                <li>

                                    <button onClick={() => { logout(); closeMenu(); }} className="logout-btn">Logga ut</button>
                                </li>
                            </>
                        )}

                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;