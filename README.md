Task Manager - Full Stack Application

A full-stack Task Manager application built with a focus on **scalability, security, and clean API design**.  
This project demonstrates backend engineering concepts like authentication, role-based access, REST APIs, and database integration, along with a functional frontend.

---


--------------Acess the Project website here--------------
https://task-manager-jet-alpha.vercel.app/


Features

Authentication & Authorization
- User Registration & Login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based access control (User / Admin)

---

Backend (Core)
- RESTful API design with versioning (`/api/v1`)
- CRUD operations for Tasks
- Protected routes using middleware
- Admin-specific operations
- Centralized error handling
- Input validation

---

Database
- PostgreSQL (Neon Cloud)
- Relational schema design
- Tables:
  - `users`
  - `tasks`

---

 Frontend
- Built with React.js
- Features:
  - User Registration & Login UI
  - Dashboard (protected via JWT)
  - Task CRUD operations
  - API integration using Axios
  - Error & success handling

---

Security Practices
- Password hashing (bcrypt)
- JWT token validation middleware
- Protected routes
- Input validation
- Role-based authorization

---

Deployment
- Backend: Render
- Frontend: Vercel
- Database: Neon (PostgreSQL Cloud)

---

API Endpoints

-> Auth Routes

POST /api/v1/auth/register
POST /api/v1/auth/login

-> Task Routes 

GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id

-> Admin Route 

DELETE /api/v1/tasks/admin/:id


Environment Variables

Backend (.env)

PORT=5000
DATABASE_URL=your_postgres_connection
JWT_SECRET=your_secret_key


Frontend (.env)

REACT_APP_API_URL=https://your-backend-url/api/v1


---Installation & Setup

Clone Repository

git clone https://github.com/your-username/task-manager.git
cd task-manager

->  Backend Setup

cd backend
npm install
npm run dev



-> Frontend Setup

cd frontend
npm install
npm start


API Documentation

Postman Collection / Swagger (add your link here)

Scalability Considerations

This project is designed with scalability in mind:

Modular architecture (controllers, routes, middleware)
Easily extendable for:
Load balancing


Author:
Tejesh Gadde
B.Tech CSE | Full Stack Developer
