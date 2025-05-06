# 🧾 Order Management Frontend

This is the frontend application for the **Order Management System**, developed as part of a full-stack technical test. It allows users to create, view, update, and delete orders, and view summaries—all connected to a RESTful backend API.

---

## Tech Stack

- **Vue.js** – Progressive JavaScript framework
- **Tailwind CSS** – Utility-first styling
- **Axios** – For HTTP requests

## Dependencies

- **Vue toast notification** For message and feedBacks

---

## 📁 Project Structure

```bash
src/
├── assets/          # Static assets
├── components/      # Reusable components (e.g., OrderCard, FilterBar)
├── view/           # Pages like OrderList.vue, OrderForm.vue
├── router/          # Vue Router configuration
├── services/        # API calls (axios)
├── App.vue          # Root component
└── main.js          # Application entry point
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/order-management-frontend.git
cd order-management-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment configuration

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Start the development server

```bash
npm run serve
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## ✅ Features

- Create, read, update, and delete orders
- Filter orders by customer, status, or date
- View a summary of each order
- RESTful API integration
- Clean UI

---

## 👨‍💻 Author

Built by Valentin Niyonshuti.

## 🧾 API Reference

All API endpoints are defined and documented on the backend side via Swagger/OpenAPI.

📄 You can access the Swagger docs at:

```
http://localhost:8000/api/documentation
```

(Replace with your actual backend URL)

---

## 🐳 Docker

If Docker is used for the frontend:

```bash
docker build -t order-frontend .
docker run -p 3000:80 order-frontend
```

---

## 📌 Notes

- This project does **not** include user authentication.
- Adheres to MVC and component-based design.
- Code is managed via Git with clear commit messages and branching.

---
