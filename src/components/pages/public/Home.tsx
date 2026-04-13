import { useEffect, useState } from "react";
import { getReq } from "../../../api/api";
import type { Product } from "../../../types/product.types";
import ProductCard from "../../ui/ProductCard"
import "./Home.css";

const Home = () => {
    // States for products from API, search field, category, loading and error messages
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetches products from API when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getReq("/products");
                setProducts(data);
            } catch {
                setError("Kunde inte hämta produkter. Försök igen senare.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Create a list with unique categories from the products for the category filter dropdown
    const categories = Array.from(
        new Set(products.map((p) => p.category).filter(Boolean))
    ) as string[];

    // Filter products based on search and category
    const filtered = products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category ? p.category === category : true;
        return matchSearch && matchCategory;
    });


    // Update search and category states
    const handleSearch = (val: string) => {
        setSearch(val);
    };

    const handleCategory = (val: string) => {
        setCategory(val);
    };

    return (
        <div className="home-container">

            {/* Hero/page-header */}
            <div className="hero">
                <div className="hero-title">
                    <h1>Produkter</h1>
                    <p>Bläddra bland våra produkter</p>
                </div>

                {/* Filtersection (search and category) */}
                <div className="filter-section">
                    <input
                        type="text"
                        placeholder="Sök produkt..."
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="filter-input"
                    />
                    <select
                        value={category}
                        onChange={(e) => handleCategory(e.target.value)}
                        className="filter-select"
                    >
                        <option value="">Alla kategorier</option>
                        {/* Dynamic categories */}
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="reset">
                        <button className="reset-btn" onClick={() => { setSearch(""); setCategory(""); }}>
                            Rensa filter
                        </button>
                    </div>
                </div>
            </div>

            {/* Loading status, error messages and empty result message*/}
            {loading && <p className="status-text">Laddar produkter...</p>}
            {error && <p className="status-text status-error">{error}</p>}
            {!loading && !error && filtered.length === 0 && (
                <p className="status-text">Inga produkter hittades.</p>
            )}

            {/* The product grid with product card component */}
            <div className="product-grid">
                {filtered.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Home;