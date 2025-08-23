import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [name, setName] = useState("Ali Rezaei");
  const [email, setEmail] = useState("ali@example.com");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const orders = [
    {
      id: "123",
      date: "2024-07-23",
      total: "$1,200",
      status: "Delivered",
    },
    {
      id: "124",
      date: "2024-07-25",
      total: "$850",
      status: "In Transit",
    },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = "64235a1e6b4c7a1234567890"; // Example ObjectId

      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, username: name, email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.message || "Error updating profile");
      } else {
        setMessage("✅ Profile updated successfully");
      }
    } catch (err) {
      setMessage("❌ Failed to connect to the server");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Or however you handle authentication
    navigate("/login");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto mt-10 bg-white rounded shadow">
      <h2 className="mb-6 text-2xl font-bold text-center">User Profile</h2>

      {message && (
        <div className="p-2 mb-4 text-center text-green-700 bg-green-100 rounded">
          {message}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Form & Image Section */}
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Change password if needed"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Profile Picture</label>
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
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2 mt-2 text-white transition bg-red-500 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </form>
        </div>

        {/* Orders Section */}
        <div className="w-full md:w-1/2">
          <h3 className="mb-4 text-lg font-semibold">My Orders</h3>
          <ul className="space-y-3">
            {orders.map((order) => (
              <li
                key={order.id}
                className="flex flex-col gap-1 p-3 text-sm border rounded bg-gray-50"
              >
                <div>
                  <strong>Order ID:</strong> {order.id}
                </div>
                <div>
                  <strong>Date:</strong> {order.date}
                </div>
                <div>
                  <strong>Total:</strong> {order.total}
                </div>
                <div>
                  <strong>Status:</strong> {order.status}
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
