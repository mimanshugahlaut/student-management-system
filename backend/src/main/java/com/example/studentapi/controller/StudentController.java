package com.example.studentapi.controller;

import com.example.studentapi.model.Student;
import com.example.studentapi.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

/**
 * REST controller - exposes CRUD (Create, Read, Update, Delete) endpoints
 * for students under the /api/students path.
 *
 * @CrossOrigin allows the React app (running on a different port, e.g. 3000)
 * to call this API, which runs on port 8080.
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // GET /api/students -> list all students
    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll(org.springframework.data.domain.Sort.by("name").ascending());
    }

    // GET /api/students/5 -> get one student by id
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/students -> create a new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
        normalize(student);
        if (studentRepository.findByEmailIgnoreCase(student.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Student saved = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // PUT /api/students/5 -> update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @Valid @RequestBody Student updated) {
        normalize(updated);
        return studentRepository.findById(id)
                .map(existing -> {
                    if (studentRepository.findByEmailIgnoreCase(updated.getEmail())
                            .filter(student -> !student.getId().equals(id)).isPresent()) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).<Student>build();
                    }
                    existing.setName(updated.getName());
                    existing.setEmail(updated.getEmail());
                    existing.setCourse(updated.getCourse());
                    Student saved = studentRepository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private void normalize(Student student) {
        student.setName(student.getName().trim());
        student.setEmail(student.getEmail().trim().toLowerCase(Locale.ROOT));
        student.setCourse(student.getCourse().trim());
    }

    // DELETE /api/students/5 -> delete a student
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (!studentRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        studentRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
