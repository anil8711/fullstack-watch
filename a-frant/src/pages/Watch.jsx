import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import b1 from"../images/banners/Amoled_display_dsk_001.webp";
import b2 from"../images/banners/Fusion.webp";
import b3 from"../images/banners/Boltt.png";
import { BrandPartners } from "./ShopComponents/BrandPartners";
const WATCH_TYPES = [
  "Analog Watch",
  "Digital Watch",
  "Smartwatch",
  "Hybrid Watch",
  "Wall Clock",
  "Table Clock",
  "Pocket Watch",
];

const Watch = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        const productList = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset to page 1 when filters change

    let filtered = selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, sortOrder, products]);

  const handleAddToCart = (product) => {
    console.log("Add to Cart:", product);
    // Add to cart logic here
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
   <>
    <div>
      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        className="mb-8"
      >
        <div>
          <img src={b1} alt="Banner 1" />
        </div>
        <div>
          <img src={b2} alt="Banner 2" />
        </div>
        <div>
          <img src={b3} alt="Banner 3" />
        </div>
      </Carousel>

      <div className="p-4 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/5">
          <h3 className="text-2xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${selectedCategory === "All" ? "font-bold text-blue-600" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </li>
            {WATCH_TYPES.map((type) => (
              <li
                key={type}
                className={`cursor-pointer capitalize ${selectedCategory === type ? "font-bold text-blue-600" : ""}`}
                onClick={() => setSelectedCategory(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Search by name or brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full max-w-md"
            />
            <select
              className="border p-2 rounded"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="asc">Price Low to High</option>
              <option value="desc">Price High to Low</option>
            </select>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col items-center relative"
              >
                <div className="absolute top-0 left-2 bg-slate-200 text-xs rounded-b px-2 py-1">
                  {product.category}
                </div>

                <Link to={`/productDetail/${product._id}`} className="w-full">
                  <div className="image-wrapper overflow-hidden rounded-xl">
                    <img
                      src={`${import.meta.env.VITE_FILE_URL}products/${product.image}`}
                      alt={product.productName}
                      loading="lazy"
                      className="h-[150px] w-full object-contain transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <h4 className="text-lg font-semibold mt-3 capitalize">
                    {product.productName}
                  </h4>
                  <p className="text-gray-700 font-medium">₹ {product.price}</p>
                </Link>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-black hover:bg-slate-800 text-white text-sm font-medium py-2 px-4 rounded-md transition duration-200"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`px-3 py-1 border rounded ${
                  currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-white"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
    <div>
      <BrandPartners/>
    </div>
   </>
  );
};

export default Watch;
