
package com.ejemplo.controller;

import com.ejemplo.datatransfers.TeacherStudentTransfer;
import com.ejemplo.model.MyUser;
import com.ejemplo.services.SATeacherStudent;
import com.ejemplo.services.SAUser;

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

    @PostMapping("/teachers/{username}/add-student")
    public ResponseEntity<?> createTeacherStudentRelation(@RequestBody TeacherStudentTransfer Tts) {
        return sa_teacher_student.create(Tts);
    }
/*
    @PostMapping("/teachers/{username}/students")
    public ResponseEntity<?> findStudentsByTeacher(@RequestBody MyUser u) {
        return sa_teacher_student.findStudentsByTeacher();
    }
*/
} 
