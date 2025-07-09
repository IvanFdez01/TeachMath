
package com.ejemplo.controller;

import com.ejemplo.datatransfers.TeacherStudentTransfer;
import com.ejemplo.model.COURSES;
import com.ejemplo.model.MyUser;
import com.ejemplo.services.SATeacherStudent;
import com.ejemplo.services.SAUser;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") // puerto del front
@RestController
@RequestMapping("/users")
public class UserController {

    private final SAUser sa_user;
    private final SATeacherStudent sa_teacher_student;
    
    @Autowired
    public UserController(SAUser sa1, SATeacherStudent sa2) {
        this.sa_user = sa1;
        this.sa_teacher_student = sa2;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser u) {
        System.out.println("Login in process...");
        return sa_user.login(u);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MyUser u) {
        System.out.println("Register in process...");
        return sa_user.register(u);
    }

    @PostMapping("/teachers/{teacher_uname}/add-student")
    public ResponseEntity<?> createTeacherStudentRelation(@PathVariable String teacher_uname, @RequestBody Map<String, String> body) {
        COURSES c = COURSES.valueOf(body.get("courseName")); // asumir que enums de front y back son iguales
        return sa_teacher_student.create(new TeacherStudentTransfer(teacher_uname, body.get("student_uname"), c));
    }
     
    @GetMapping("/teachers/{teacher_uname}/students")
    public ResponseEntity<?> findStudentsByTeacher(@PathVariable String teacher_uname) {
        return sa_teacher_student.findStudentsByTeacher(teacher_uname);
    }
    
} 
