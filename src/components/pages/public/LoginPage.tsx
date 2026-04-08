import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setError("");

        try {
            await login({ username, password });
            setLoading(true);

            navigate("/admin");
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ett fel uppstod. Kontrollera dina uppgifter och försök igen.");
            }
        } finally {
            setLoading(false);
        }
    };

    // check user
    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [user, navigate]);

    return (
        <div className="login-form">
            <h2>Logga in</h2>

            <form onSubmit={handleSubmit}>
                {error && (<p className="error">{error}</p>)}

                <div className="form-group">
                    <label htmlFor="username">Användarnamn</label>
                    <input id="username" type="text"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        placeholder="Välj användarnamn" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input id="password" type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        placeholder="Lösenord" />
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? "Loggar in..." : "Logga in"}
                </button>
            </form>
        </div>
    )
}

export default LoginPage;