import React from 'react';

function StudentList({ students, loading, hasSearch, onEdit, onDelete }) {
  if (loading) return <p className="empty-message" role="status">Loading student records…</p>;
  if (students.length === 0) return <p className="empty-message">{hasSearch ? 'No students match your search.' : 'No students yet. Add one using the form above.'}</p>;

  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Course</th><th>Actions</th></tr></thead>
        <tbody>{students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td><td>{student.name}</td><td>{student.email}</td><td>{student.course}</td>
            <td className="actions-cell"><button className="edit-btn" onClick={() => onEdit(student)}>Edit</button><button className="delete-btn" onClick={() => onDelete(student.id)}>Delete</button></td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

export default StudentList;
