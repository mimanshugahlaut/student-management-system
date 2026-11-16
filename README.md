# Student Management System

A full-stack student-record application with a React frontend and a Spring Boot REST API. It supports creating, viewing, editing, deleting, and searching student records.

## Features

- Add a student with a name, email address, and course
- List all students, sorted alphabetically by name
- Edit existing student records
- Delete records with confirmation
- Search the loaded records by name, email, or course
- Client- and server-side required-field and email validation
- Case-insensitive duplicate-email protection
- Loading, success, and error states in the frontend
- H2 web console for inspecting the in-memory database

## Technology

- **Frontend:** React 18, Axios, Create React App
- **Backend:** Java 17, Spring Boot 3.2.5, Spring Web, Spring Data JPA
- **Database:** H2 in-memory database
- **Build tools:** npm and Maven

## Project structure

```text
student-management-project/
├── backend/
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/example/studentapi/
│       │   ├── StudentApiApplication.java
│       │   ├── controller/
│       │   │   ├── ApiExceptionHandler.java
│       │   │   └── StudentController.java
│       │   ├── model/Student.java
│       │   └── repository/StudentRepository.java
│       └── resources/application.properties
├── frontend/
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── api.js
│       └── components/
│           ├── StudentForm.js
│           └── StudentList.js
└── README.md
```

## Prerequisites

Install the following:

- Java 17 or newer
- Maven 3.8 or newer
- Node.js and npm

## Run locally

### 1. Start the backend

From the project root:

```bash
cd backend
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

### 2. Start the frontend

Open a second terminal at the project root:

```bash
cd frontend
npm install
npm start
```

The React development server starts at `http://localhost:3000`.

The frontend uses `http://localhost:8080/api/students` by default. To point it at another API URL, set `REACT_APP_API_URL` before starting or building the frontend:

```bash
REACT_APP_API_URL=http://localhost:8080/api/students npm start
```

On Windows PowerShell:

```powershell
$env:REACT_APP_API_URL = "http://localhost:8080/api/students"
npm start
```

## REST API

Base URL: `http://localhost:8080/api/students`

| Method | Endpoint | Success response | Description |
| --- | --- | --- | --- |
| `GET` | `/api/students` | `200 OK` | Returns all students sorted by name |
| `GET` | `/api/students/{id}` | `200 OK` | Returns one student |
| `POST` | `/api/students` | `201 Created` | Creates a student |
| `PUT` | `/api/students/{id}` | `200 OK` | Updates a student |
| `DELETE` | `/api/students/{id}` | `204 No Content` | Deletes a student |

### Student object

```json
{
  "id": 1,
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "course": "B.E. CSE"
}
```

For `POST` and `PUT`, `name`, `email`, and `course` are required. Emails must be valid and are normalized to lowercase. A duplicate email returns `409 Conflict`. Validation errors return `400 Bad Request` with a `message` and field-level `errors`. Requests for missing IDs return `404 Not Found`.

Example:

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Alex Johnson\",\"email\":\"alex@example.com\",\"course\":\"B.E. CSE\"}"
```

## Database and H2 console

The backend uses an H2 in-memory database with:

- JDBC URL: `jdbc:h2:mem:studentdb`
- Username: `sa`
- Password: blank

Open `http://localhost:8080/h2-console` while the backend is running and use the JDBC URL above to connect. Because the database is in memory, records are reset when the backend restarts.

## Build commands

Build the backend:

```bash
cd backend
mvn clean package
```

Create a production frontend build:

```bash
cd frontend
npm run build
```

The generated frontend files are written to `frontend/build/` and are excluded from Git.

## Notes

- The backend allows cross-origin requests so the development frontend can call the API on port 8080.
- Frontend search filters the records already loaded from the API; it does not make a separate search request.
- The default H2 configuration is intended for local development and demonstrations. Use a persistent database and review CORS and H2-console settings before production deployment.

## Author

Mimanshu Gahlaut — BE CSE (AI & ML), Chandigarh University
