import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, postReq, putReq } from "../../../api/api";
import "./ProductForm.css";

const ProductForm = () => {
    // // Extract product ID from URL parameters
    const { id } = useParams<{ id: string }>();

    // Decide if the form is in "edit" mode (if there's an ID) or "create" mode (no ID)
    const isEdit = !!id;

    // Hook for navigating after form submission or cancellation
    const navigate = useNavigate();

    // State for form fields, error messages, and loading status
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        price?: string;
        quantity?: string;
        general?: string;
    }>({});

    // Fetch existing product data if form is in edit mode
    useEffect(() => {
        if (isEdit) {
            getReq(`/products/${id}`)
                .then((data) => {
                    setName(data.name);
                    setPrice(String(data.price));
                    setQuantity(String(data.quantity));
                    setCategory(data.category ?? "");
                })
                .catch(() => setErrors({ general: "Kunde inte hämta produkt." }));
        } 
    }, [id, isEdit]);

    // Convert price and allowing comma and dot
    const parsedPrice = Number(price.replace(",", "."));

    // validate form inputs
    const validate = () => {
        const newErrors: {
            name?: string;
            price?: string;
            quantity?: string;
        } = {};

        // Name validation
        if (!name.trim()) {
            newErrors.name = "Namn är obligatoriskt.";
        }
        // Price validation
        if (!price) {
            newErrors.price = "Pris är obligatoriskt.";
        } else if (isNaN(parsedPrice) || parsedPrice < 0) {
            newErrors.price = "Pris måste vara ett positivt tal.";
        }
        // Quantity validation
        if (!quantity) {
            newErrors.quantity = "Lagersaldo är obligatoriskt.";
        } else if (isNaN(Number(quantity)) || Number(quantity) < 0) {
            newErrors.quantity = "Lagersaldo måste vara ett positivt heltal.";
        }

        return newErrors;
    };

    // Handle form submission for both creating and updating products
    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Create payload for API request, include category IF provided
        const payload = {
            name,
            price: parsedPrice,
            quantity: Number(quantity),
            ...(category && { category }),
        };

        try {
            setLoading(true);

            // Use PUT for editing existing product and use POST for creating new product
            if (isEdit) {
                await putReq(`/products/${id}`, payload);
            } else {
                await postReq("/products", payload);
            }

            // Redirect to admin page after successful save
            navigate("/admin");
        } catch (err) {
            // Handle API errors
            setErrors({ general: "Ett fel uppstod vid sparandet av produkten. Försök igen."});
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-form">
            {/* Dynamic heading depending on add or edit mode */}
            <h2>{isEdit ? "Redigera produkt" : "Ny produkt"}</h2>

            <p className="required-info">* Obligatoriskt fält</p>



            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Namn *</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Produktnamn"
                    />
                    {/* Show error message if something goes wrong */}
                    {errors && <div className="error">{errors.name}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Pris (kr) *</label>
                    <input
                        id="price"
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        min="0"
                    />
                    {/* Show error message if something goes wrong */}
                    {errors && <div className="error">{errors.price}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Lagersaldo *</label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="0"
                        min="0"
                    />
                    {/* Show error message if something goes wrong */}
                    {errors && <div className="error">{errors.quantity}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Kategori</label>
                    <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="T.ex. Hudvård"
                    />
                </div>

                <div className="product-form-actions">
                    {/* Cancel button navigating back to admin page */}
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/admin")}
                    >
                        Avbryt
                    </button>

                    {/* Submit button with loading state */}
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Sparar..." : isEdit ? "Spara ändringar" : "Lägg till produkt"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;