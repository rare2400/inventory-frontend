import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postReq } from "../../../api/api";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<{
        username?: string;
        password?: string;
        confirm?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors: typeof error = {};

        if (username.trim().length < 3) {
            newErrors.username = "Användarnamnet måste vara minst 3 tecken";
        }

        if (password.length < 6) {
            newErrors.password = "Lösenordet måste vara minst 6 tecken";
        }

        if (password !== confirm) {
            newErrors.confirm = "Lösenorden matchar inte";
        }

        // update error state
        setError(newErrors);

        //return true if no errors exists
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);
            await postReq("/auth/register", { username: username.trim(), password: password.trim(), });
            navigate("/login");

        } catch (err) {
            setError({ username: "Användarnamnet är redan taget eller annat fel uppstod" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form">
            <h2>Skapa konto</h2>
            <p>Registrera dig och få tillgång till lagersystemet</p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Användarnamn</label>
                    <input id="username" type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Välj användarnamn" />
                    {error.username && <p className="error">{error.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input id="password" type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Lösenord" />
                    {error.password && <p className="error">{error.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirm">Bekräfta lösenord</label>
                    <input id="confirm" type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Bekräfta lösenord" />
                    {error.confirm && <p className="error">{error.confirm}</p>}
                </div>

                <div className="btn-row">
                    <button type="submit" disabled={loading} className="submit-btn">{loading ? "Skapar konto..." : "Skapa konto"}</button>
                </div>
            </form>

            <p>Har du redan ett konto? {" "}
                <Link to="/login" className="link">
                    Logga in
                </Link>
            </p>
        </div>
    )
}

export default Register;