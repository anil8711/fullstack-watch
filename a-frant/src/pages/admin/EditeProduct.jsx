// src/pages/admin/products/EditProduct.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosConfig';
import uploadFile from '../../../utils/uploadFile';
import Breadcrumb from '../../components/Breadcrumb';
import { WATCH_TYPES } from '../../constants';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    description: '',
    isFeatured: false,
    hasDiscount: false,
    discountValue: '',
    image: null,
  });

  const [touched, setTouched] = useState({});
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    axiosInstance.get(`/products/${id}`)
      .then(res => {
        const data = res.data.data || res.data;
        setFormData({
          productName: data.productName || '',
          price: data.price?.toString() || '',
          category: data.category || '',
          description: data.description || '',
          isFeatured: data.isFeatured || false,
          hasDiscount: data.hasDiscount || false,
          discountValue: data.hasDiscount
            ? data.discountValue?.toString() || ''
            : '',
          image: null,
        });
        setPreviewImage(data.image);
      })
      .catch(err => {
        toast.error('Failed to load product');
        console.error(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    let val;
    if (type === 'checkbox') val = checked;
    else if (type === 'file') {
      val = files[0];
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      val = value;
    }
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleBlur = (e) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isValid = () => {
    const { productName, price, category, description, image, hasDiscount, discountValue } = formData;
    if (!productName || !price || !category || !description) return false;
    if (formData.image === null && !previewImage) return false;
    if (hasDiscount && !discountValue) return false;
    return true;
  };

  const getInputClass = (name) => {
    const value = formData[name] || (name === 'image' ? previewImage : '');
    const showError = touched[name] &&
      (!value ||
        (name === 'discountValue' && formData.hasDiscount && !value));
    return `mt-1 w-full px-4 py-2 border rounded-md ${
      showError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
    } focus:ring focus:ring-blue-100 focus:outline-none`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      let imageFileName = previewImage;
      if (formData.image) {
        const uploadResult = await uploadFile(formData.image, 'products', '/assets', formData.productName);
        if (!uploadResult.success) {
          toast.error(uploadResult.error || 'Image upload failed.');
          return;
        }
        imageFileName = uploadResult.fileName;
      }

      const payload = new FormData();
      payload.append('productName', formData.productName);
      payload.append('price', parseFloat(formData.price));
      payload.append('category', formData.category);
      payload.append('description', formData.description);
      payload.append('isFeatured', formData.isFeatured);
      payload.append('hasDiscount', formData.hasDiscount);
      payload.append('discountValue', formData.hasDiscount ? parseFloat(formData.discountValue) : 0);
      payload.append('image', imageFileName);

      const res = await axiosInstance.put(`/products/${id}`, payload);
      if (res.status === 200) {
        toast.success('Product updated successfully');
        navigate('/admin/products');
      } else {
        toast.error('Failed to update product');
      }
    } catch (err) {
      toast.error('Update failed. Please try again.');
      console.error(err);
    }
  };

  const breadcrumbItems = [
    { label: 'Products', link: '/admin/products' },
    { label: 'Edit', link: null },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('productName')}
                placeholder="Product Name"
              />
            </div>
            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('price')}
                placeholder="0.00"
              />
            </div>
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('category')}
              >
                <option value="">Select a category</option>
                {WATCH_TYPES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="4"
                className={getInputClass('description')}
                placeholder="Product description"
              />
            </div>
            {/* Featured & Discount toggles */}
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                />
                <span>Featured</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="hasDiscount"
                  checked={formData.hasDiscount}
                  onChange={handleChange}
                />
                <span>Has Discount</span>
              </label>
            </div>
            {formData.hasDiscount && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Discount Value (%)</label>
                <input
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('discountValue')}
                  placeholder="Discount amount"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              {previewImage && (
                <img src={previewImage} alt="Preview" className="w-24 h-24 object-cover mb-2 rounded border" />
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass('image')}
              />
            </div>
            {/* Submit */}
            <div className="flex justify-end sticky bottom-0 py-1">
              <button
                type="submit"
                className="bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300"
              >
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
