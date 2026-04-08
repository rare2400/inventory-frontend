import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { User, LoginCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

// create context
const AuthContext = createContext<AuthContextType | null>(null);

export interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Log in user on app load if token exists
    const login = async (credentials: LoginCredentials) => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) {
                throw new Error("Fel användarnamn eller lösenord.");
            }

            const data = await res.json() as AuthResponse;

            localStorage.setItem("AuthToken", data.token);
            setUser(data.user);

        } catch (err) {
            throw err;
        }
    }

    // Log out user
    const logout = () => {
        localStorage.removeItem("AuthToken");
        setUser(null);
    }

    // Check for existing token on app load
    const checkToken = async () => {
        const token = localStorage.getItem("AuthToken");

        if (!token) {
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json() as AuthResponse;
                setUser(data.user);
            }

        } catch (err) {
            localStorage.removeItem("AuthToken");
            setUser(null);
        }
    }

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}