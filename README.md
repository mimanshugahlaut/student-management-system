# Student Management System (Full-Stack Project)

A simple beginner-level full-stack web application for managing student records (Add, View, Edit, Delete).

**Tech stack:**
- **Frontend:** React (JavaScript)
- **Backend:** Java + Spring Boot (REST API)
- **Database:** H2 (in-memory, no installation required)

---

## Project Structure

```
student-management-project/
├── backend/        -> Spring Boot REST API (runs on port 8080)
└── frontend/        -> React app (runs on port 3000)
```

## How It Works (for your project report / viva)

1. The **React frontend** has a form to add/edit students and a table to list/delete them.
2. The frontend calls the **Spring Boot REST API** using `axios` (see `frontend/src/api.js`).
3. The **backend** has 3 layers:
   - `model/Student.java` — defines the Student entity (name, email, course).
   - `repository/StudentRepository.java` — talks to the database (Spring Data JPA).
   - `controller/StudentController.java` — exposes REST endpoints (`GET`, `POST`, `PUT`, `DELETE`).
4. Data is stored in an **H2 in-memory database** — no MySQL/Postgres installation needed. (Note: data resets every time you restart the backend. See "Using a permanent database" below if you want data to persist.)

### API Endpoints

| Method | URL                      | Description            |
|--------|--------------------------|------------------------|
| GET    | /api/students            | Get all students       |
| GET    | /api/students/{id}       | Get one student        |
| POST   | /api/students            | Add a new student      |
| PUT    | /api/students/{id}       | Update a student       |
| DELETE | /api/students/{id}       | Delete a student       |

---

## How to Run

You need **Java 17+**, **Maven**, and **Node.js** installed.

### 1. Run the backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

The API will start at **http://localhost:8080**.

You can check it's working by opening **http://localhost:8080/api/students** in your browser — it should show `[]` (empty list).

You can also view the database directly at **http://localhost:8080/h2-console**
(JDBC URL: `jdbc:h2:mem:studentdb`, username: `sa`, password: blank).

### 2. Run the frontend (React)

Open a **second terminal**:

```bash
cd frontend
npm install
npm start
```

The app will open automatically at **http://localhost:3000**.

> ⚠️ Make sure the backend is already running before you use the frontend, or you'll see a connection error banner.

---

## Using a Permanent Database (Optional Upgrade)

By default this uses H2 in-memory storage, which is simplest for a beginner project but **resets every time you restart the backend**. If your teacher wants persistent storage, switch to file-based H2 (still zero setup) by changing one line in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:h2:file:./data/studentdb
```

Or, for a real database, swap in MySQL by changing the datasource URL/driver and adding the MySQL connector dependency to `pom.xml`.

---

## Possible Enhancements (if you want to extend it further)

- Add search/filter by course
- Add pagination for large student lists
- Add authentication (login/signup)
- Add form validation messages shown inline
- Deploy backend (Render/Railway) and frontend (Vercel/Netlify)

---

## Author

Mimanshu Gahlaut — BE CSE (AI & ML), Chandigarh University
