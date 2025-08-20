import { useState } from "react";
import { assets } from "../assets/assets";

export default function AddAddress() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("📦 آدرس ثبت شد:", formData);
    // اینجا می‌تونی با fetch یا axios به بک‌اند ارسال کنی
  };

  return (
    <div className="pb-16 mt-16">
      <p className="text-2xl text-gray-500 md:text-3xl">
        Add Shipping <span className="font-semibold text-primary">Address</span>
      </p>

      <div className="flex flex-col-reverse mt-10 md:flex-row justify-between">
        {/* فرم ورود آدرس */}
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-4 w-full max-w-md p-4 bg-white rounded shadow"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="bg-primary text-white py-2 rounded hover:bg-primary-dark"
          >
            Save Address
          </button>
        </form>

        {/* تصویر */}
        <img
          className="mb-16 md:mr-16 md:mt-0 w-64"
          src={assets.add_address_image}
          alt="add address"
        />
      </div>
    </div>
  );
}
