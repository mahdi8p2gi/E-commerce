import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from 'axios';

const AddProduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');


    // وقتی کاربر فایل انتخاب میکنه
    const onFileChange = (e) => {
        setFiles([e.target.files[0]]); // فقط اولین فایل را می‌گیریم به صورت آرایه با یک عنصر
    };

    // وقتی فرم ارسال می‌شود
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                name,
                description: description.split('\n'),
                category,
                price,
                offerPrice,
            };

            const formData = new FormData();
            formData.append('productData', JSON.stringify(productData));

            if (files.length > 0) {
                formData.append('image', files[0]); // فقط یک عکس
            }

            const { data } = await axios.post('/api/products', formData, {
             
            });

            if (data.success) {
                toast.success(data.message);
                setName('');
                setCategory('');
                setOfferPrice('');
                setPrice('');
                setFiles([]);
                setDescription('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };



    return (
        <div className="flex flex-col justify-between py-10 bg-white">
            <form className="max-w-lg p-4 space-y-5 md:p-10" onSubmit={onSubmitHandler}>

                {/* فایل آپلود */}
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <label htmlFor="imageUpload" className="cursor-pointer">
                            <input
                                accept="image/*"
                                type="file"
                                id="imageUpload"
                                multiple
                                hidden
                                onChange={onFileChange}
                            />
                            <img
                                className="max-w-24"
                                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
                                alt="uploadArea"
                                width={100}
                                height={100}
                            />
                        </label>
                    </div>
                    {files.length > 0 && (
                        <p className="text-sm mt-2">{files.length} file(s) selected</p>
                    )}
                </div>

                {/* نام محصول */}
                <div className="flex flex-col max-w-md gap-1">
                    <label htmlFor="product-name" className="text-base font-medium">Product Name</label>
                    <input
                        id="product-name"
                        type="text"
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* توضیحات */}
                <div className="flex flex-col max-w-md gap-1">
                    <label htmlFor="product-description" className="text-base font-medium">Product Description</label>
                    <textarea
                        id="product-description"
                        rows={4}
                        placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* دسته بندی */}
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="category" className="text-base font-medium">Category</label>
                    <select
                        id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {[
                            { name: 'Organic veggies' }, { name: 'Fresh Fruits' }, { name: 'Cold Drinks' },
                            { name: 'Instant Food' }, { name: 'Dairy Products' }, { name: 'Bakerys & Breads' }, { name: 'Grains & Cereals' }
                        ].map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                {/* قیمت */}
                <div className="flex flex-wrap items-center gap-5">
                    <div className="flex flex-col flex-1 w-32 gap-1">
                        <label htmlFor="product-price" className="text-base font-medium">Product Price</label>
                        <input
                            id="product-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col flex-1 w-32 gap-1">
                        <label htmlFor="offer-price" className="text-base font-medium">Offer Price</label>
                        <input
                            id="offer-price"
                            type="number"
                            placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                        />
                    </div>
                </div>

                <button type="submit" className="px-8 py-2.5 bg-primary text-white font-medium rounded">ADD</button>
            </form>
        </div>
    );
};

export default AddProduct;
