import React, { useEffect, useState } from 'react';

const emptyStudent = { name: '', email: '', course: '' };

function StudentForm({ editingStudent, onSave, onCancelEdit, saving }) {
  const [form, setForm] = useState(emptyStudent);

  useEffect(() => { setForm(editingStudent || emptyStudent); }, [editingStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => { event.preventDefault(); onSave(form); };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <div className="form-row">
        <label htmlFor="student-name">Name</label>
        <input id="student-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Alex Johnson" required minLength="2" />
      </div>
      <div className="form-row">
        <label htmlFor="student-email">Email</label>
        <input id="student-email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. student@example.com" required />
      </div>
      <div className="form-row">
        <label htmlFor="student-course">Course</label>
        <input id="student-course" type="text" name="course" value={form.course} onChange={handleChange} placeholder="e.g. B.E. CSE" required />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={saving}>{saving ? 'Saving…' : `${editingStudent ? 'Update' : 'Add'} Student`}</button>
        {editingStudent && <button type="button" className="secondary" onClick={onCancelEdit} disabled={saving}>Cancel</button>}
      </div>
    </form>
  );
}

export default StudentForm;
