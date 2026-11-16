import axios from 'axios';

// Base URL of the Spring Boot backend.
// Make sure the backend is running on this port before using the app.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/students';

// Get the list of all students
export const getStudents = () => axios.get(API_BASE_URL);

// Add a new student
export const addStudent = (student) => axios.post(API_BASE_URL, student);

// Update an existing student by id
export const updateStudent = (id, student) =>
  axios.put(`${API_BASE_URL}/${id}`, student);

// Delete a student by id
export const deleteStudent = (id) => axios.delete(`${API_BASE_URL}/${id}`);
