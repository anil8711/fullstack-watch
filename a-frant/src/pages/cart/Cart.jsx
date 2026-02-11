import React from "react";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatPrice = (price) => {
  const validPrice = Number(price);
  if (isNaN(validPrice) || price == null) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(validPrice);
};

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaShoppingCart /> Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center border-b py-4 last:border-b-0"
              >
                <img
                  src={`${import.meta.env.VITE_FILE_URL}products/${item.image}`}
                  alt={item.productName}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{item.productName}</h4>
                  <p className="text-sm text-gray-700">
                    Price: {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1, item.stock)
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1, item.stock)
                      }
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mt-2">
                    Subtotal:{" "}
                    <span className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Stock available: {item.stock}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
              <h3 className="text-xl font-bold">
                Total: {formatPrice(totalAmount)}
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={clearCart}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
                <Link
                  to="/watch"
                  className="text-purple-700 border border-purple-700 hover:bg-purple-700 hover:text-white font-medium rounded-lg text-sm px-4 py-2"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
