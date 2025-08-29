# E-commerce

**Green Cart** – An online shopping platform built with **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with user authentication, cart, orders, comments, and seller/admin functionalities.

Live Demo: [https://e-commerce-client-27qd.onrender.com](https://e-commerce-client-27qd.onrender.com)

---

## 🚀 Features🛒

* 🛒 Browse products by category
* ❤️ Wishlist & Like/Dislike products
* 💬 User comments with replies
* 🏷️ Product offers & discounts
* 🏠 Multiple addresses for shipping
* 💳 Place COD orders
* 🔒 Secure JWT-based authentication
* 🖥️ Seller/Admin dashboard
* ☁️ Cloudinary integration for product images
* 📦 Cart management

---

## 📦 Tech Stack

* **Frontend:** React.js, TailwindCSS, React Router, Context API
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT (cookies + localStorage)
* **File Upload:** Multer & Cloudinary
* **Real-time Updates:** Socket.io (future support)

---

## 📁 Folder Structure

```text
Green-Cart/
├─ client/ 💻
│  ├─ public/ 🌟
│  ├─ src/
│  │  ├─ assets/ 🖼️
│  │  ├─ components/ 🧩
│  │  ├─ context/ 🌍
│  │  ├─ pages/ 📄
│  │  ├─ routes/ 🛣️
│  │  ├─ App.jsx 🚪
│  │  └─ index.jsx ⚡
│  ├─ package.json 📦
│  └─ .gitignore ❌
├─ server/ 🌐
│  ├─ controllers/ 📝
│  ├─ models/ 💾
│  ├─ routes/ 🌐
│  ├─ configs/ 🔧
│  ├─ middleware/ 🛡️
│  ├─ server.js 🚀
│  ├─ package.json 📦
│  └─ .gitignore ❌
├─ .env
├─ .gitignore ❌
└─ README.md 📘
```

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/green-cart.git
cd green-cart
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_jwt_secret
SELLER_EMAIL=example@seller.com
SELLER_PASSWORD=yourpassword
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm start
```

Runs on `http://localhost:3000` by default.

---

## 🔑 API Endpoints

### User

* `POST /api/users/register` → Register a user
* `POST /api/users/login` → Login user
* `POST /api/users/logout` → Logout user
* `PUT /api/users/updateProfile` → Update user profile

### Seller/Admin

* `POST /api/seller/login` → Login seller
* `POST /api/seller/logout` → Logout seller
* `GET /api/seller/is-auth` → Check seller auth

### Products

* `POST /api/product/add` → Add product
* `GET /api/product/list` → List all products
* `POST /api/product/id` → Get single product by ID
* `POST /api/product/stock` → Change stock status

### Orders

* `POST /api/cod` → Place COD order
* `POST /api/order/user` → Get user orders
* `GET /api/order/seller` → Get all orders for seller/admin

### Comments

* `GET /api/comments/:productId` → Get comments
* `POST /api/comments` → Add comment
* `POST /api/comments/:id/reply` → Reply to comment
* `POST /api/comments/:id/like` → Like comment
* `POST /api/comments/:id/dislike` → Dislike comment

### Cart

* `POST /api/cart/update` → Update user cart

### Address

* `POST /api/address/add` → Add address
* `POST /api/address/get` → Get user addresses

---

## 💡 Contribution

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 🛠️ Developer Info

**Mahdi Karimi**

* GitHub: [https://github.com/mahdi8p2gi](https://github.com/mahdi8p2gi)
* Email: [mahdi.karimi@example.com](mailto:mahdi.karimi@example.com)

---

## 📞 Support

* Email: [themahdikga@gmail.com](mailto:themahdikga@gmail.com)
* GitHub Issues: [https://github.com/mahdi8p2gi/E-commerce/issues](https://github.com/mahdi8p2gi/E-commerce/issues)

---

## ⚡ License

MIT License
