import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReq, deleteReq } from "../../../api/api";
import { Product } from "../../../types/product.types";
import "./Admin.css";
import { useAuth } from "../../../context/AuthContext";

const AdminProductList = () => {
    // State for products, delete confirmation, and error messages
    const [products, setProducts] = useState<Product[]>([]);
    const [confirmId, setConfirmId] = useState<string | null>(null);
    const [error, setError] = useState("");

    // Get the authenticated user from context
    const { user } = useAuth();

    // Fetch products from the API
    const fetchProducts = async () => {
        try {
            const data = await getReq("/products");
            setProducts(data);
        } catch {
            setError("Kunde inte hämta produkter.");
        }
    };

    // Fetch products on component mount
    useEffect(() => { fetchProducts(); }, []);

    // Delete product by ID
    const handleDelete = async (id: string) => {
        try {
            await deleteReq(`/products/${id}`);

            // Update the product list after deletion
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch {
            setError("Kunde inte ta bort produkten.");
        }
    };

    return (
        <div className="admin-products">
            <h1>Välkommen, {user?.username} </h1>
            <p className="admin-ingress">Här kan du administrera lagret och produkter</p>

            <div className="products-header">
                <h2>Hantera produkter</h2>
                <Link to="/admin/products/new" className="btn-primary">+ Ny produkt</Link>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Namn</th>
                            <th>Kategori</th>
                            <th>Pris</th>
                            <th>Lager</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop through all products */}
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td className="table-name">{p.name}</td>
                                <td>{p.category || "—"}</td>
                                <td>{p.price} kr</td>
                                {/* Apply different styles based on stock quantity */}
                                <td className={p.quantity === 0 ? "table-out" : "table-in"}>
                                    {p.quantity} st
                                </td>
                                <td>
                                    {/* Action buttons for editing and deleting products */}
                                    <div className="table-actions">
                                        <Link to={`/admin/products/${p._id}/edit`} className="action-link">
                                            Redigera
                                        </Link>
                                        {/* Open confirmation dialog on delete */}
                                        <button onClick={() => setConfirmId(p._id)} className="action-delete">
                                            Ta bort
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Show message if there are no products and no error */ }
                {products.length === 0 && !error && (
                    <p className="products-empty">Inga produkter ännu.</p>
                )}
            </div>

            {/* Confirmation dialog for deleting a product */ }
            {confirmId && (
                <div className="confirm-layer">
                    <div className="confirm-box">
                        <p>Är du säker på att du vill ta bort denna produkt?</p>
                        <div className="confirm-actions">
                            {/* Cancel delete */ }
                            <button onClick={() => setConfirmId(null)} className="btn-primary">
                                Avbryt
                            </button>
                            <button onClick={() => {
                                handleDelete(confirmId);
                                setConfirmId(null);
                            }}
                                className="btn-cancel">
                                Ja, ta bort
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminProductList;