import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [form, setForm] = useState({ username: "", email: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/user/me", { withCredentials: true });
        setForm({
          username: res.data.username,
          email: res.data.email,
        });
        if (res.data.profileImage) {
          setPreview(`data:image/png;base64,${res.data.profileImage}`);
        }
      } catch {
        setError("خطا در دریافت اطلاعات");
      }
    }
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      if (image) formData.append("profileImage", image);

      const res = await axios.put("/api/user/update", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      if (res.data.user.profileImage) {
        setPreview(`data:image/png;base64,${res.data.user.profileImage}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "خطا در بروز رسانی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div>
        <img
          src={preview || "/default-avatar.png"}
          alt="Profile"
          width={100}
          height={100}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>

      <input
        type="text"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        placeholder="نام کاربری"
        required
      />

      <input
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="ایمیل"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default Profile;
