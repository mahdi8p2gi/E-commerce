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

  // وقتی فایل انتخاب می‌شود
  const onFileChange = (index, e) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!name || !category || !price) {
        toast.error("Please fill all required fields");
        return;
      }

      const productData = {
        name,
        description: description.split("\n"),  // رشته => آرایه بر اساس خط‌ها
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));

      files.forEach((file) => {
        if (file) formData.append("images", file);
      });

      const { data } = await axios.post("http://localhost:5000/api/product/add", formData)
       
   

      if (data.success) {
        toast.success(data.message);

        // پاک کردن فرم
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
        className="max-w-lg p-4 md:p-10 space-y-5"
      >
        {/* آپلود تصاویر */}
        <div>
          <p className="text-base font-medium">Product Images</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {files.map((file, index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
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
                    className="max-w-24"
                  />
                ) : (
                  <img
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                    alt="uploadArea"
                    width={100}
                    height={100}
                    className="max-w-24"
                  />
                )}
              </label>
            ))}
          </div>
        </div>

        {/* نام محصول */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-name" className="text-base font-medium">
            Product Name
          </label>
          <input
            id="product-name"
            type="text"
            placeholder="Type here"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* توضیحات */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="product-description" className="text-base font-medium">
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          />
        </div>

        {/* دسته بندی */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="category" className="text-base font-medium">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
                <option key={index} value={item.path}>
                  {item.text}
                </option>
              ))}
          </select>
        </div>

        {/* قیمت */}
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex flex-col flex-1 w-32 gap-1">
            <label htmlFor="product-price" className="text-base font-medium">
              Product Price
            </label>
            <input
              id="product-price"
              type="number"
              placeholder="0"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex flex-col flex-1 w-32 gap-1">
            <label htmlFor="offer-price" className="text-base font-medium">
              Offer Price
            </label>
            <input
              id="offer-price"
              type="number"
              placeholder="0"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2.5 bg-indigo-500 text-white font-medium rounded"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
