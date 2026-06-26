# 🛒 Green Cart

<div align="center">

# Green Cart

### Modern MERN Stack E-commerce Platform

A full-featured e-commerce application built with the **MERN Stack** featuring secure authentication, seller dashboard, product management, shopping cart, comments, wishlist, order management, and a responsive modern UI.

### Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge\&logo=tailwind-css\&logoColor=white)

---

### Live Demo

https://e-commerce-client-27qd.onrender.com

</div>

---

# ✨ Features

### 👤 Authentication

* Secure JWT Authentication
* Login & Register
* Persistent Sessions
* Profile Management

---

### 🛍️ Shopping

* Browse Products
* Categories
* Product Details
* Wishlist
* Like / Dislike
* Product Discounts
* Stock Management

---

### 🛒 Cart

* Add to Cart
* Update Quantity
* Remove Products
* Real-time Cart

---

### 💳 Orders

* Cash On Delivery
* Order History
* Order Tracking
* Seller Order Management

---

### 💬 Comments

* Product Reviews
* Nested Replies
* Like / Dislike Comments

---

### 📍 Address

* Multiple Addresses
* Shipping Address Selection

---

### 👨‍💼 Seller Dashboard

* Product Management
* Image Upload (Cloudinary)
* Inventory Control
* Order Management

---

### ☁️ Cloud Integration

* Cloudinary Image Upload
* Optimized Images

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router
* Context API
* TailwindCSS
* Axios

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer
* Cloudinary

## Database

* MongoDB Atlas
* Mongoose

---

# 📂 Project Structure

```text
Green-Cart
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── routes
│   │   └── App.jsx
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── configs
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/mahdi8p2gi/E-commerce.git
```

```bash
cd E-commerce
```

---

## Backend

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

SELLER_EMAIL=

SELLER_PASSWORD=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=
```

Start Server

```bash
npm run dev
```

---

## Frontend

```bash
cd client
npm install
npm start
```

---

# 📡 API Overview

## Authentication

```
POST /api/users/register
POST /api/users/login
POST /api/users/logout
PUT  /api/users/updateProfile
```

## Products

```
GET  /api/product/list
POST /api/product/add
POST /api/product/id
POST /api/product/stock
```

## Orders

```
POST /api/cod
POST /api/order/user
GET  /api/order/seller
```

## Comments

```
GET  /api/comments/:productId
POST /api/comments
POST /api/comments/:id/reply
POST /api/comments/:id/like
POST /api/comments/:id/dislike
```

## Cart

```
POST /api/cart/update
```

## Address

```
POST /api/address/add
POST /api/address/get
```



# 👨‍💻 Developer

**Mahdi Karimi**

GitHub

https://github.com/mahdi8p2gi

Email

[themahdikga@gmail.com](mailto:themahdikga@gmail.com)

---

# 🤝 Contributing

Contributions are welcome.

Fork → Create Branch → Commit → Push → Pull Request

---

# ⭐ Support

If you like this project, don't forget to give it a **Star ⭐**

---

# 📜 License

MIT License
