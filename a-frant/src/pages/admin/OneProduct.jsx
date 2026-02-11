import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosConfig';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../components/ConfirmationModal'; // Ensure this path is correct

const OneProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        const data = response.data?.data || response.data;

        if (response.status === 200 && data) {
          setProduct(data);
          toast.success('Product data fetched successfully');
        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        toast.error('Failed to fetch product');
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      if (response.status === 200) {
        toast.success('Product deleted successfully');
        navigate('/admin/products');
      }
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  if (!product) {
    return <div className="text-center py-10 text-gray-500">Loading product details...</div>;
  }
const getFullImageUrl = (imagePath) => {
  const baseUrl = 'http://localhost:9000'; // change this to your actual server URL
  return imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;
};

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">Product Details</h2>

        <div className="space-y-3 text-gray-700">
          {product.image ? (
            <img
              src={getFullImageUrl(product.image)}
              alt={product.productName}
              className="w-32 h-32 object-cover rounded mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500 mb-4">
              No image
            </div>
          )}

          <p><span className="font-semibold">Name:</span> {product.productName}</p>
          <p><span className="font-semibold">Price:</span> ₹{Number(product.price).toFixed(2)}</p>
          <p><span className="font-semibold">Category:</span> {product.category}</p>
          <p><span className="font-semibold">Description:</span> {product.description}</p>
          <p><span className="font-semibold">Featured:</span> {product.isFeatured ? 'Yes' : 'No'}</p>
          <p><span className="font-semibold">Has Discount:</span> {product.hasDiscount ? 'Yes' : 'No'}</p>
          {product.hasDiscount && (
            <p><span className="font-semibold">Discount Value:</span> {product.discountValue}%</p>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message={<p>Are you sure you want to delete this product?</p>}
      />
    </>
  );
};

export default OneProduct;
