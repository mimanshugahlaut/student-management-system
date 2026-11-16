import React, { useEffect, useState } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { getStudents, addStudent, updateStudent, deleteStudent } from './api';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = () => {
    setLoading(true);
    getStudents()
      .then((res) => { setStudents(res.data); setError(''); })
      .catch(() => setError('Could not reach the backend. Make sure the Spring Boot server is running on http://localhost:8080'))
      .finally(() => setLoading(false));
  };

  const handleSave = (studentData) => {
    setSaving(true);
    setError('');
    setNotice('');
    const request = editingStudent ? updateStudent(editingStudent.id, studentData) : addStudent(studentData);
    request
      .then(() => {
        setNotice(editingStudent ? 'Student record updated.' : 'Student added successfully.');
        setEditingStudent(null);
        loadStudents();
      })
      .catch((requestError) => {
        setError(requestError.response?.status === 409
          ? 'A student with this email already exists.'
          : 'Failed to save student. Please check the form and try again.');
      })
      .finally(() => setSaving(false));
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setError('');
    setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setError('');
      deleteStudent(id)
        .then(() => { setNotice('Student record deleted.'); loadStudents(); })
        .catch(() => setError('Failed to delete student.'));
    }
  };

  const visibleStudents = students.filter((student) =>
    `${student.name} ${student.email} ${student.course}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p>Manage student records with React, Spring Boot, and H2.</p>
      </header>

      {error && <div className="status-banner error-banner" role="alert">{error}</div>}
      {notice && <div className="status-banner success-banner" role="status">{notice}</div>}

      <StudentForm editingStudent={editingStudent} onSave={handleSave} onCancelEdit={() => setEditingStudent(null)} saving={saving} />

      <section className="records-section" aria-label="Student records">
        <div className="records-toolbar">
          <h2>Student Records <span>{students.length}</span></h2>
          <label className="search-label">
            <span className="visually-hidden">Search students</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, email, or course" />
          </label>
        </div>
        <StudentList students={visibleStudents} loading={loading} hasSearch={Boolean(query.trim())} onEdit={handleEdit} onDelete={handleDelete} />
      </section>
    </div>
  );
}

export default App;
