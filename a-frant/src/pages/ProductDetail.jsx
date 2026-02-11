import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

// Format price as INR currency
const formatPrice = (price) => {
  const validPrice = Number(price);
  if (isNaN(validPrice) || price == null) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(validPrice);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const prod = res.data.data;
        setProduct(prod);
        setMainImage(prod.image);
      } catch (err) {
        setError("Product not found.");
      }
    };
    fetchProduct();
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div>Loading...</div>;

  const thumbnails = product.thumbnails?.length
    ? product.thumbnails
    : [product.image];

  const discountedPrice = product.hasDiscount
    ? Number(product.price)
    : Number(product.originalPrice || product.price);

  const totalPrice = discountedPrice * quantity;

  const handleAddToCart = () => {
  const finalPrice = product.hasDiscount
    ? Number(product.price)
    : Number(product.originalPrice || product.price);

  const cartItem = {
    _id: product._id, // important for unique key
    productName: product.productName,
    image: mainImage, // use mainImage to reflect selected thumbnail
    price: finalPrice,
    quantity,
  };

  addToCart(cartItem);
  toast.success("Added to cart!");
};

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-2 py-3">
        <div className="flex flex-wrap -mx-1">
          {/* Image Section */}
          <div className="w-full md:w-1/3 px-2">
            <img
              src={`${import.meta.env.VITE_FILE_URL}products/${mainImage}`}
              alt={product.productName}
              className="h-[400px] object-contain mb-4 rounded-2xl"
            />
            <div className="flex gap-3 py-2 justify-center overflow-x-auto">
              {thumbnails.map((imgName, idx) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_FILE_URL}products/${imgName}`}
                  alt={`thumb-${idx}`}
                  className={`w-16 sm:w-20 object-cover rounded-md cursor-pointer transition duration-300 ${
                    mainImage === imgName
                      ? "opacity-100 ring-2 ring-indigo-500"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => setMainImage(imgName)}
                />
              ))}
            </div>
          </div>

          {/* Detail Section */}
          <div className="w-full md:w-2/3 px-2">
            <h2 className="text-3xl font-bold mb-2">{product.productName}</h2>

            <div className="mb-4">
              <span className="text-2xl font-bold text-indigo-700 mr-2">
                {formatPrice(discountedPrice)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.hasDiscount && (
                <h2 className="text-md font-semibold text-green-700">
                  {product.discountValue}% off
                </h2>
              )}
            </div>

            <div className="flex items-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                  {i < Math.round(product.rating || 0) ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-500">
                ({product.numReviews || 0})
              </span>
              <span className="ml-2 text-gray-600">
                {product.rating?.toFixed(1)} ({product.reviewsCount})
              </span>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setQuantity(""); // allow empty temporarily
                  } else {
                    const parsed = parseInt(value, 10);
                    if (!isNaN(parsed) && parsed > 0) {
                      setQuantity(parsed);
                    }
                  }
                }}
                onBlur={() => {
                  if (!quantity || isNaN(quantity)) {
                    setQuantity(1); // reset to 1 if invalid
                  }
                }}
                className="w-16 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-800">
                Total:{" "}
                <span className="text-indigo-700 font-bold">
                  {formatPrice(totalPrice)}
                </span>
              </h4>
            </div>

            <div className="flex space-x-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
