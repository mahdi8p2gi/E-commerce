import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

function Profile() {
  const { user, setUser, navigate } = useAppContext();
  const [form, setForm] = useState({ username: "", email: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user/me", { withCredentials: true });
        const { username, email, profileImage } = res.data;
        setForm({ username, email });
        if (profileImage) {
          setPreview(`data:image/png;base64,${profileImage}`);
        }
      } catch (err) {
        console.error(err);
        setError("خطا در دریافت اطلاعات کاربر");
      }
    };
    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      if (image) formData.append("profileImage", image);

      const res = await axios.put("/api/user/update", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data.user);
      setPreview(`data:image/png;base64,${res.data.user.profileImage || ""}`);
      setMessage("پروفایل با موفقیت به‌روزرسانی شد");
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در به‌روزرسانی پروفایل");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.put("/api/user/change-password", passwords, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setPasswords({ old: "", new: "" });
    } catch (err) {
      setError(err?.response?.data?.message || "خطا در تغییر رمز عبور");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("آیا مطمئن هستید که می‌خواهید حساب خود را حذف کنید؟")) return;
    try {
      await axios.delete("/api/user/delete", { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      setError("خطا در حذف حساب کاربری");
    }
  };

  return (
    <div className="max-w-xl p-6 mx-auto mt-10 bg-white shadow-md rounded-xl">
      <h2 className="mb-6 text-2xl font-semibold text-center text-primary">پروفایل من</h2>

      {message && <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">{message}</div>}
      {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={preview || "/default-avatar.png"}
            alt="Profile"
            className="object-cover w-16 h-16 border rounded-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="text-sm"
          />
        </div>

        <input
          type="text"
          placeholder="نام کاربری"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-primary"
        />

        <input
          type="email"
          placeholder="ایمیل"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 border rounded focus:outline-primary"
        />

        <button
          type="submit"
          className="w-full py-2 text-white transition rounded bg-primary hover:bg-primary-dull"
          disabled={loading}
        >
          {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </form>

      <hr className="my-6" />

      <div className="space-y-3">
        <input
          type="password"
          placeholder="رمز عبور فعلی"
          value={passwords.old}
          onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="رمز عبور جدید"
          value={passwords.new}
          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={handlePasswordChange}
          className="w-full py-2 text-white transition bg-blue-600 rounded hover:bg-blue-500"
          disabled={loading}
        >
          {loading ? "در حال تغییر رمز..." : "تغییر رمز عبور"}
        </button>
      </div>

      <hr className="my-6" />

      <button
        onClick={handleDelete}
        className="w-full py-2 text-white transition bg-red-600 rounded hover:bg-red-500"
      >
        حذف حساب کاربری
      </button>
    </div>
  );
}

export default Profile;
