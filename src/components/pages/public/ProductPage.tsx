import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReq } from "../../../api/api";
import { Product } from "../../../types/product.types";
import "./ProductPage.css";

/**
 * ProductPage component — displays detailed information about a single product.
 * Fetches product data from the API based on the `id` URL parameter.
 */
const ProductPage = () => {
    // Extract product ID from URL parameters
    const { id } = useParams<{ id: string }>();

    // State for the product data and any error messages
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState("");

    // Fetch product data when id changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getReq(`/products/${id}`);
                setProduct(data);
            } catch {
                setError("Produkten hittades inte.");
            }
        };
        fetchProduct();
    }, [id]);

    // Show error message if there was an error fetching the product
    if (error) return (
        <div className="detail">
            <p className="error">{error}</p>
            <Link to="/" className="back">Tillbaka</Link>
        </div>
    );

    // Show loading message while fetching product data
    if (!product) return <p className="loading">Laddar...</p>;

    return (
        <div className="detail">
            <Link to="/" className="back-link">Tillbaka till produkter</Link>

            <div className="detail-card">
                {/* Card header with product name and category badge  */}
                <div className="header">
                    <h1>{product.name}</h1>
                    {product.category && (
                        <span className="category">{product.category}</span>
                    )}
                </div>
                {/* Product price */}
                <p className="price">{product.price} kr</p>

                {/* Products stock status and creation date  */}
                <div className="meta">
                    <p>Lagersaldo:{" "}
                        <span className={product.quantity === 0 ? "out-of-stock" : "in-stock"}>
                            {product.quantity === 0 ? "Slut i lager" : `${product.quantity} st`}
                        </span>
                    </p>
                    <p className="date">
                        Tillagd: {new Date(product.createdAt).toLocaleDateString("sv-SE")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;