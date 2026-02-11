import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { WATCH_TYPES } from '../../constants';
import Breadcrumb from '../../components/Breadcrumb';
import uploadFile from '../../../utils/uploadFile';
const AdminProductCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: '',
    description: '',
    isFeatured: false,
    hasDiscount: false,
    discountValue: '',
    image: []
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
  const { name, value, files, type } = e.target;

  if (type === "file") {
    setFormData({
      ...formData,
      [name]: files[0], // only get the first file
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};


  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const isValid = () => {
    const { productName, price, category, description, image, hasDiscount, discountValue } = formData;
    if (!productName || !price || !category || !description || !image) return false;
    if (hasDiscount && !discountValue) return false;
    return true;
  };

  const getInputClass = (name) => {
    const value = formData[name];
    const showError = touched[name] && (!value || (name === 'discountValue' && formData.hasDiscount && !value));
    return `mt-1 w-full px-4 py-2 border rounded-md ${showError ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'
      } focus:ring focus:ring-blue-100 focus:outline-none`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      toast.error('Please fill out all required fields.');
      return;
    }

    try {
      // Step 1: Upload the image first
      const uploadResult = await uploadFile(formData.image, 'products', '/assets', formData.productName);



      if (!uploadResult.success) {
        toast.error(uploadResult.error || 'Image upload failed.');
        return;
      }

      // Step 2: Replace the image file in formData with the uploaded file name
      const finalData = {
        ...formData,
        image: uploadResult.fileName,
        price: parseFloat(formData.price),
        discountValue: formData.hasDiscount ? parseFloat(formData.discountValue) : 0,
      };

      console.log(finalData);
      

      // Step 3: Submit the product with image file name
      const response = await axiosInstance.post('/products', finalData);

      if (response.status === 201) {
        toast.success('Product created successfully');
        navigate('/admin/products');
      } else {
        toast.error('Failed to create product.');
      }
    } catch (err) {
      toast.error('Submission failed. Please try again.');
      console.error(err);
    }
  };


  const breadcrumbItems = [
    { label: 'Products', link: '/admin/products' },
    { label: 'Create', link: null },
  ]

  return (
    <div className="p-4">
      <div className="breadcrumb-container">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className=" flex items-center justify-center">

        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                {WATCH_TYPES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                multiple
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClass("image")}

              />
            </div>
            


            <div className="flex justify-end  sticky bottom-0 py-1">
              <button
                type="submit"
                className="  bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-300  "
              >
                Add Product
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductCreate;
