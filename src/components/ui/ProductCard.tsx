import { Link } from "react-router-dom";
import { Product } from "../../types/product.types";
import "./ProductCard.css";

// Component to show product as a card
// Fetch product-object via props and render the information
const ProductCard = ({ product }: { product: Product }) => (

    // The card is a clickable link to the products detailpage
    <Link to={`/products/${product._id}`} className="product-card" aria-label={`Visa detaljer för ${product.name}`}>

            {/* Header with name of the category and product */}
            <div className="card-header">
                <h2>{product.name}</h2>
                {product.category && (
                    <span className="product-category">{product.category}</span>
                )}
            </div>
            
            {/* The products price and stock status */}
            <p className="product-price">{product.price} kr</p>
            <p className={`product-stock ${product.quantity === 0 ? "product-stock-out" : ""}`}>
                {product.quantity === 0 ? "Slut i lager" : `${product.quantity} st i lager`}
            </p>
    </Link>
);

export default ProductCard;