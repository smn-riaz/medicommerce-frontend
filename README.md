# MediCommerce  
### A Full-stack e-commerce web application for purchasing medicines online. Developed using the MERN stack, it offers an awesome experience for both customers and administrators.

### 🌐 Live Links  
- **Client Website**: [medicommerce-client.vercel.app](https://medicommerce-client.vercel.app)  
- **Server Endpoint**: [medimart-server-three.vercel.app](https://medimart-server-three.vercel.app)  
- **Client GitHub**: [Client Repository](https://github.com/smn-riaz/medimart-6-mediCommerce-client)  
- **Server GitHub**: [Server Repository](https://github.com/smn-riaz/medimart-6-mediCommerce-server)

![MediCommerce Banner](https://github.com/user-attachments/assets/21419087-1e0b-42cf-bb40-e0bea891b62f)

---

## 🔥 Features

### Frontend
- Fully responsive UI for all devices
- Browse and search for medicine products by name, type, or brand
- Dynamic filtering and carousel view for special offers
- Users must upload prescriptions for specific medicines
- Add to cart, place orders, and track status
- Secure online payments using SSLCommerz
- Authentication & Authorization with JWT
- State Management via Redux Toolkit & RTK Query
- Role-based dashboard: Admin & User
- Testimonial section for customer reviews

### Backend
- RESTful API with Node.js & Express.js
- MongoDB & Mongoose for database management
- Role-based access (User/Admin)
- Password hashing with Bcrypt
- Authentication & Authorization with JWT
- Data validation with Zod
- Email notifications (order updates) using Nodemailer
- CRUD operations for Users, Products, and Orders

---

## 👥 User Flow Highlights
- Secure registration & login using JWT
- Order placement with real-time stock validation
- Prescription upload for restricted medicines
- Order status updates sent via email
- Admin can:
  - Manage users & products (Add/Edit/Delete)
  - Process and update customer orders
  - Monitor site activity

---

## 🚧 Challenges
- Implementing persistent and secure JWT-based authentication
- SSLCommerz integration for secure and seamless payments
- Building complex product filtering and search logic
- Designing responsive, accessible UI across all devices
- Real-time product stock tracking and consistency
- Maintaining seamless communication between frontend and backend

---

## ⚙️ Technologies Used

### Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- Framer Motion
- Redux Toolkit

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JWT
- Zod
- Nodemailer

---

## 🚀 Future Plans
- Real-time chat feature (Socket.io)
- Order tracking with delivery status updates
- Product ratings & reviews from users
- Discount codes and promotional offers
- Smart recommendation system based on purchase history
- Expansion of product catalog (more healthcare categories)

---

## 🛠️ Local Development Setup

1. Clone or download the repositories
2. Install dependencies using `npm install`
3. Set environment variables (.env)
4. Run the development server using `npm run dev`
5. Make sure to configure the backend API URL correctly in the client
6. Test all features locally (authentication, payments, orders, etc.)

---
