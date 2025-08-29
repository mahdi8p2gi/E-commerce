import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { categories } from "../../assets/assets";

const AddProduct = () => {
  const [files, setFiles] = useState([null, null, null, null]); // ۴ جای آپلود
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const onFileChange = (index, e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!name || !category || !price || !files) {
        toast.error("Please fill all required fields");
        return;
      }

      const productData = {
        name,
        description: description.split("\n"),
        category,
        price: Number(price),
        offerPrice: offerPrice && offerPrice > 0 ? offerPrice : price,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axios.post(
        `${API_URL}/product/add`,
        formData
      );

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([null, null, null, null]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="py-10 flex flex-col justify-center bg-white">
      <form
        onSubmit={onSubmitHandler}
        className="max-w-lg p-6 md:p-10 space-y-6 shadow-lg border border-gray-200 rounded-2xl bg-white"
      >
        {/* آپلود تصاویر */}
        <div>
          <p className="text-lg font-semibold text-gray-700">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {files.map((file, index) => (
              <label
                key={index}
                htmlFor={`image${index}`}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <input
                  type="file"
                  id={`image${index}`}
                  accept="image/*"
                  hidden
                  onChange={(e) => onFileChange(index, e)}
                />
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview ${index}`}
                    width={100}
                    height={100}
                    className="max-w-24 rounded-lg shadow-sm"
                  />
                ) : (
                  <img
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    alt="uploadArea"
                    width={100}
                    height={100}
                    className="max-w-24 rounded-lg border border-gray-300"
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* نام محصول */}
        <div className="flex flex-col gap-2">
          <label htmlFor="product-name" className="text-base font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none py-2.5 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* توضیحات */}
        <div className="flex flex-col gap-2">
          <label htmlFor="product-description" className="text-base font-medium text-gray-700">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none py-2.5 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary resize-none transition-all"
          />
        </div>

        {/* دسته بندی */}
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="category" className="text-base font-medium text-gray-700">
            Category
          </label>
          <div className="relative w-full">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full appearance-none bg-white text-gray-800 border border-primary rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            >
              <option value="">Select Category</option>
              {categories.map((item, index) => (
                <option key={index} value={item.path}>
                  {item.text}
                </option>
              ))}
            </select>

            {/* آیکن dropdown */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>


        {/* قیمت و تخفیف */}
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="product-price" className="text-base font-medium text-gray-700">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none py-2.5 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label htmlFor="offer-price" className="text-base font-medium text-gray-700">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none py-2.5 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* دکمه ثبت */}
        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-all shadow-md"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
