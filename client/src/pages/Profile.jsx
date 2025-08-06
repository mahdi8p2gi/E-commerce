import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("علی رضایی");
  const [email, setEmail] = useState("ali@example.com");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const orders = [
    {
      id: "123",
      date: "1403/05/01",
      total: "1,200,000 تومان",
      status: "تحویل شده",
    },
    {
      id: "124",
      date: "1403/05/03",
      total: "850,000 تومان",
      status: "در حال ارسال",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (image) formData.append("avatar", image);

    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ پروفایل با موفقیت آپدیت شد");
      } else {
        setMessage(data.message || "❌ خطا در آپدیت");
      }
    } catch (err) {
      setMessage("❌ خطا در اتصال به سرور");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // یا هر چیزی که برای احراز هویت استفاده می‌کنی
    navigate("/login");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded shadow">
      <h2 className="mb-6 text-2xl font-bold text-center">پروفایل کاربر</h2>

      {message && (
        <div className="p-2 mb-4 text-center text-green-700 bg-green-100 rounded">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* بخش فرم و عکس */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">نام</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="نام کامل"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">ایمیل</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">رمز عبور جدید</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="در صورت نیاز رمز را تغییر دهید"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">عکس پروفایل</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-24 h-24 mt-2 border rounded-full"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
            >
              ذخیره تغییرات
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 mt-2 text-white transition bg-red-500 rounded hover:bg-red-600"
            >
              خروج از حساب
            </button>
          </form>
        </div>

        {/* بخش لیست سفارشات */}
        <div className="w-full md:w-1/2">
          <h3 className="mb-4 text-lg font-semibold">سفارشات من</h3>
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-1 p-3 text-sm border rounded bg-gray-50"
              >
                <div>
                  <strong>کد سفارش:</strong> {order.id}
                </div>
                <div>
                  <strong>تاریخ:</strong> {order.date}
                </div>
                <div>
                  <strong>مبلغ:</strong> {order.total}
                </div>
                <div>
                  <strong>وضعیت:</strong> {order.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
