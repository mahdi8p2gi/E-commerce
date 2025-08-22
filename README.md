# MERN E-Commerce Store 🛒

A full-stack e-commerce application built with **MongoDB, Express, React, and Node.js (MERN)**.  
The app includes user authentication, admin dashboard, product management, and order tracking.

---

## Features
- 🔐 User authentication (JWT, bcrypt)
- 👤 Role-based access (Admin & Customer)
- 🛍️ Product listing, categories, and search
- 🛒 Shopping cart & checkout
- 💳 Payment integration (Stripe)
- 📦 Order management (for admin)
- 📱 Responsive UI (React + Tailwind)

---

## Tech Stack
- **Frontend:** React, React Router, Context API, Axios  
- **Backend:** Express, Node.js, Mongoose  
- **Database:** MongoDB Atlas  
- **Deployment:** Render 

---

## Getting Started

### Prerequisites
- Node.js >= 16
- MongoDB Atlas account (or local MongoDB)

### Installation
```bash
# Clone repo
git clone https://github.com/mahdi8p2gi/E-commerce.githttps://github.com/mahdi8p2gi/E-commerce.git
cd E-commerce 

# Install dependencies
cd server && npm install
cd ../client && npm install

Environment Variables

Create a .env file inside /backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYMENT_KEY=your_payment_api_key



Run Development

# Run server
cd server
npm run dev

# Run client
cd client
npm start


Scripts

npm run dev → Run server (nodemon)

npm start → Run client

npm run build → Build client for production
