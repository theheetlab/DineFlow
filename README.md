
<p align="center">
  <br>
  <img src="https://readme-typing-svg.herokuapp.com?font=Playfair+Display&weight=700&size=42&duration=3000&pause=1000&color=E94560&center=true&vCenter=true&width=500&height=70&lines=DineFlow;Restaurant+Management;Reimagined." alt="DineFlow Typing SVG" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Production Ready"/>
  <img src="https://img.shields.io/badge/Version-1.0.0-e94560?style=for-the-badge&logo=semver&logoColor=white" alt="Version 1.0.0"/>
  <img src="https://img.shields.io/badge/License-MIT-0f3460?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="MIT License"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-10b981?style=for-the-badge&logo=github-actions&logoColor=white" alt="PRs Welcome"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=JSON%20web%20tokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=flat-square&logo=recharts&logoColor=white" alt="Recharts"/>
</p>

<br>

<div align="center">
  <table>
    <tr>
      <td align="center">
        <strong>🚀 Public Website</strong><br>
        <sub>Menu · Reservations · Gallery · About · Contact</sub>
      </td>
      <td align="center">
        <strong>⚙️ Admin Dashboard</strong><br>
        <sub>Analytics · CRUD · Customer Mgmt · Activity Logs</sub>
      </td>
      <td align="center">
        <strong>🌙 Dark Mode</strong><br>
        <sub>Light/Dark theme with CSS Variables</sub>
      </td>
      <td align="center">
        <strong>📱 Responsive</strong><br>
        <sub>320px → 3440px adaptive design</sub>
      </td>
    </tr>
  </table>
</div>

<br>

---

<h2 align="center">✨ The Ultimate Restaurant Operating System</h2>

<p align="center">
  <b>DineFlow</b> is a production-grade, enterprise-ready restaurant management platform built on the <b>MERN stack</b>. From a stunning public-facing website to a powerful admin command center, DineFlow gives you everything you need to run a modern restaurant — <i>beautifully</i>.
</p>

<br>

## 🎯 Features at a Glance

### 🌐 Public Website
| Feature | Description |
|---------|-------------|
| 🏠 **Hero Section** | Full-screen branded welcome with animated CTAs |
| 🍽️ **Menu Browsing** | Category filters, search, sort, dish detail modals |
| 📅 **Reservation System** | Date picker, live time slots, guest count, instant booking |
| 📸 **Gallery** | Category-filtered restaurant & food photography |
| 📖 **About Page** | Restaurant story, mission, timeline, team profiles |
| ✉️ **Contact** | Contact form, business hours, Google Maps integration |
| ⭐ **Testimonials** | Live customer reviews with star ratings |

### ⚡ Admin Dashboard
| Feature | Description |
|---------|-------------|
| 📊 **Analytics** | Reservation trends, revenue overview, popular dishes |
| 🍳 **Menu Management** | Full CRUD — name, price, category, image, featured status |
| 📋 **Reservation Management** | Confirm, reject, complete, delete with status badges |
| 👥 **Customer Management** | Search, view profiles, reservation history |
| ⭐ **Testimonial Management** | CRUD with image, rating, active/inactive toggle |
| ✉️ **Message Center** | Read, reply, archive contact form submissions |
| 📋 **Activity Log** | Full audit trail of all admin actions |
| 🔍 **Global Search** | Cross-entity search (customers, reservations, menu, testimonials) |

### 🛡️ Technical Features
- **JWT Authentication** with bcrypt password hashing & protected routes
- **Light/Dark Theme** with smooth CSS variable transitions
- **Responsive Design** — 16 breakpoints, 320px to 3440px
- **Animations** — Staggered fade-ins, slide effects, micro-interactions
- **Loading Skeletons** & lazy-loaded components
- **Toast Notifications** with success/error/info types
- **SEO Meta Tags** via custom `<SEO />` component
- **CSV Export** for reservations, customers & contacts
- **Image Upload** with preview & remove functionality
- **Comprehensive Error Handling** across all API interactions

<br>

## 🏗️ Architecture

```
DINEFLOW
│
├── 🎨 FRONTEND (React.js)
│   ├── 📁 public/              # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/      # Reusable UI (Navbar, Footer, Toast, Search...)
│   │   ├── 📁 context/         # React Context (Auth, Theme, Toast)
│   │   ├── 📁 pages/
│   │   │   ├── 🏠 Home, Menu, Reservation, Gallery, About, Contact
│   │   │   └── ⚙️ admin/      # Dashboard, CRUD pages, Activity Log
│   │   ├── 📁 services/        # Axios API integration layer
│   │   ├── 📁 utils/           # Helpers (formatDate, formatCurrency...)
│   │   └── 📁 styles/          # Global CSS
│   └── 📄 index.css            # CSS Variables & global styles
│
├── ⚙️ BACKEND (Express.js)
│   ├── 📁 config/              # DB connection, env config
│   ├── 📁 controllers/         # Route handlers
│   ├── 📁 middleware/          # Auth (JWT), error handling
│   ├── 📁 models/              # Mongoose schemas (Menu, Reservation...)
│   ├── 📁 routes/              # API route definitions
│   └── 📁 scripts/             # Seed data (menu, testimonials, admin)
│
└── 📄 Deployment               # Vercel + Render + MongoDB Atlas
```

<br>

## 💻 Tech Stack

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>Technology</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>🎨 Frontend</b></td>
      <td>
        <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" alt="React"/>
        <img src="https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white" alt="React Router"/>
        <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" alt="Axios"/>
        <img src="https://img.shields.io/badge/Recharts-22b5bf?logo=recharts&logoColor=white" alt="Recharts"/>
      </td>
      <td>UI components, routing, HTTP, data viz</td>
    </tr>
    <tr>
      <td><b>⚙️ Backend</b></td>
      <td>
        <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js"/>
        <img src="https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white" alt="Express"/>
        <img src="https://img.shields.io/badge/JWT-000000?logo=JSON%20web%20tokens&logoColor=white" alt="JWT"/>
        <img src="https://img.shields.io/badge/bcrypt-003A70?logo=lock&logoColor=white" alt="bcrypt"/>
      </td>
      <td>REST API, auth, password hashing</td>
    </tr>
    <tr>
      <td><b>🗄️ Database</b></td>
      <td>
        <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
        <img src="https://img.shields.io/badge/Mongoose-880000?logo=leaflet&logoColor=white" alt="Mongoose"/>
      </td>
      <td>Document store, ODM</td>
    </tr>
    <tr>
      <td><b>☁️ Deployment</b></td>
      <td>
        <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" alt="Vercel"/>
        <img src="https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white" alt="Render"/>
        <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB Atlas"/>
      </td>
      <td>Frontend hosting, backend hosting, managed DB</td>
    </tr>
  </tbody>
</table>

<br>

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### 1️⃣ Clone & Install
```bash
git clone https://github.com/theheetlab/DineFlow.git
cd DineFlow
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env        # Configure your environment
npm run seed:admin           # Creates admin account
npm run seed:data            # Seeds menu items & testimonials
npm run dev                  # Starts dev server on :5000
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start                    # Starts dev server on :3000
```

### 4️⃣ Open Browser
```
🌐 http://localhost:3000        → Public website
🔐 http://localhost:3000/admin  → Admin dashboard
```

<br>

## 🔐 Default Admin Credentials

<p align="center">
  <table>
    <tr>
      <td align="right"><b>Email</b></td>
      <td><code>admin@dineflow.com</code></td>
    </tr>
    <tr>
      <td align="right"><b>Password</b></td>
      <td><code>Admin@123</code></td>
    </tr>
  </table>
</p>

<br>

## 🌍 Environment Variables

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/dineflow
JWT_SECRET=<your_jwt_secret>
NODE_ENV=development
PORT=5000
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000/api/v1
```

<br>

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/login` | Admin login |
| `GET` | `/api/v1/auth/me` | Get current admin |

### Menu
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/menu` | Get all menu items |
| `GET` | `/api/v1/menu/:id` | Get single item |
| `POST` | `/api/v1/menu` | Create item 🔐 |
| `PUT` | `/api/v1/menu/:id` | Update item 🔐 |
| `DELETE` | `/api/v1/menu/:id` | Delete item 🔐 |

### Reservations
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/reservations` | Get reservations 🔐 |
| `GET` | `/api/v1/reservations/stats` | Reservation stats 🔐 |
| `POST` | `/api/v1/reservations` | Create reservation |
| `PUT` | `/api/v1/reservations/:id` | Update reservation 🔐 |
| `DELETE` | `/api/v1/reservations/:id` | Delete reservation 🔐 |

### Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/customers` | Get customers 🔐 |
| `GET` | `/api/v1/customers/stats` | Customer stats 🔐 |
| `GET` | `/api/v1/customers/:id` | Customer details 🔐 |

### Testimonials
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/testimonials` | Get testimonials |
| `POST` | `/api/v1/testimonials` | Create 🔐 |
| `PUT` | `/api/v1/testimonials/:id` | Update 🔐 |
| `DELETE` | `/api/v1/testimonials/:id` | Delete 🔐 |

### Contacts
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/contacts` | Submit contact form |
| `GET` | `/api/v1/contacts` | Get messages 🔐 |
| `PUT` | `/api/v1/contacts/:id/read` | Mark read 🔐 |
| `DELETE` | `/api/v1/contacts/:id` | Delete 🔐 |

🔐 = Requires admin authentication (JWT)

<br>

## 🧩 Responsive Design

| Breakpoint | Devices |
|------------|---------|
| **320px** | Small phones |
| **360px·375px** | Medium phones |
| **390px·412px·430px** | Large phones |
| **480px** | Large phones landscape |
| **600px·768px** | Small tablets |
| **820px·912px·1024px** | Large tablets |
| **1280px·1366px·1440px** | Laptops |
| **1600px·1920px** | Monitors |
| **2560px·3440px** | Ultra-wide displays |

<br>

## 📦 Deployment

<table>
  <tr>
    <th>Service</th>
    <th>What</th>
    <th>How</th>
  </tr>
  <tr>
    <td><b>▲ Vercel</b></td>
    <td>Frontend (React)</td>
    <td>Connect GitHub → Set <code>REACT_APP_API_URL</code> → Deploy</td>
  </tr>
  <tr>
    <td><b>⬡ Render</b></td>
    <td>Backend (Express)</td>
    <td>Connect GitHub → Set env vars → Deploy web service</td>
  </tr>
  <tr>
    <td><b>🍃 MongoDB Atlas</b></td>
    <td>Database</td>
    <td>Free M0 cluster → Whitelist IP → Copy connection string</td>
  </tr>
</table>

> 📖 See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions.

<br>

## 🤝 Contributing

Contributions are **welcome and appreciated!** Here's how to contribute:

1. 🍴 **Fork** the repository
2. 🌿 **Create a branch** (`git checkout -b feature/amazing`)
3. 💻 **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** (`git push origin feature/amazing`)
5. 🔀 **Open a Pull Request**

<p align="center">
  <img src="https://img.shields.io/badge/First%20Timers%20Welcome-10b981?style=for-the-badge" alt="First Timers Welcome"/>
</p>

<br>

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

<br>

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/theheetlab">@theheetlab</a>
  <br>
  <sub>Built with React, Express, MongoDB & lots of ☕</sub>
</p>

<p align="center">
  <a href="#readme">
    <img src="https://img.shields.io/badge/⬆%20Back%20to%20Top-e94560?style=for-the-badge" alt="Back to Top"/>
  </a>
</p>
