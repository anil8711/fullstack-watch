import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axiosConfig';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';



const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');

        console.log(response.data.data);


        const productList = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setProducts(productList);
      } catch (err) {
        console.error('Error fetching product data:', err);
        setError('Failed to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axiosInstance.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product. Please try again.');
      }
    }
  };


  const breadcrumbItems = [
    { label: 'Products', link: null },
  ]



  return (
    <div className="p-4">
      <div className='breadcrumb-container'>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/admin/products/create"
            className="bg-blue-600 text-white px-4 py-1 rounded "
          >
            Add New Product
          </Link>
        </div>
      </div>

      {error ? (
        <p className="text-red-500 mb-4">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-2 border-b text-left">Image</th>
                <th className="py-2 px-2 border-b text-left">Name</th>
                <th className="py-2 px-2 border-b text-left">Price</th>
                <th className="py-2 px-2 border-b text-left">Category</th>
                <th className="py-2 px-2 border-b text-left">Featured</th>
                <th className="py-2 px-2 border-b text-left">Discount</th>

                <th className="py-2 px-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="py-2 border-b">
                      {Array.isArray(product.image) && product.image.length > 0 && (
                        <img
                          src={`${import.meta.env.VITE_FILE_URL}products/${product.image[0]}`}

                          alt={product.productName}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      )}


                    </td>
                    <td className="py-2  border-b">{product.productName}</td>
                    <td className="py-2  border-b">₹ {product.price?.toFixed(2)}</td>
                    <td className="py-2 border-b">{product.category}</td>
                    <td className="py-2 border-b">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.isFeatured}
                          // onChange={handleToggle} // Replace with your own handler
                          className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 transition-all duration-200"></div>
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform peer-checked:translate-x-5"></div>
                      </label>
                    </td>

                    <td className="py-2  border-b">
                      {product.hasDiscount ? `${product.discountValue}%` : 'No'}
                    </td>
                    <td className="py-2 border-b">
                      <div className="flex space-x-2">
                        <Link
                          to={`${product._id}`}
                          title="View"
                          className="flex items-center justify-center text-blue-500   p-2 rounded hover:text--800"
                        >
                          <FaEye size={14} />
                        </Link>
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          title="Edit"
                          color="bg-red-600"
                          className="flex items-center justify-center text-yellow-500 p-2 rounded  transition-colors duration-200"
                        >
                          <FaPen size={14} />
                        </Link>

                        <button
                          onClick={() => handleDelete(product._id)}
                          title="Edit"
                          color="bg-red-600"
                          className="flex items-center justify-center text-red-500 p-2 rounded  transition-colors duration-200"
                        >
                          <FaTrash size={14} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
