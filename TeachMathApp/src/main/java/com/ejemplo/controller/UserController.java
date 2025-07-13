
package com.ejemplo.controller;

import com.ejemplo.datatransfers.MyUserTransfer;
import com.ejemplo.datatransfers.TeacherStudentTransfer;
import com.ejemplo.model.COURSES;
import com.ejemplo.model.MyUser;
import com.ejemplo.services.SAFiles;
import com.ejemplo.services.SATeacherStudent;
import com.ejemplo.services.SAUser;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

@CrossOrigin(origins = "http://localhost:5173") // puerto del front
@RestController
@RequestMapping("/users")
public class UserController {

    private final SAUser sa_user;
    private final SATeacherStudent sa_teacher_student;
    private final SAFiles sa_files;
    
    public UserController(SAUser sa1, SATeacherStudent sa2, SAFiles sa3) {
        this.sa_user = sa1;
        this.sa_teacher_student = sa2;
        this.sa_files = sa3;
    }

    // TODAS LAS EXCEPCIONES SE TRATAN EN ExceptionsHandler.java
    // (para ello necesario @RestController y @ControllerAdvice)

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MyUser u) {
        MyUserTransfer res = sa_user.register(u);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MyUser u) {
        MyUserTransfer res = sa_user.login(u);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/teachers/{teacher_uname}/add-student")
    public ResponseEntity<?> createTeacherStudentRelation(@PathVariable String teacher_uname, @RequestBody Map<String, String> body) {
        // asumir que en el mapa existen las claves courseName y student_uname
        // asumir que enums de front y back son iguales y restrictivos
        COURSES c = COURSES.valueOf(body.get("courseName")); 
        TeacherStudentTransfer res = sa_teacher_student
            .create(new TeacherStudentTransfer(teacher_uname, body.get("student_uname"), c));
        return ResponseEntity.ok(res);
    }
     
    @GetMapping("/teachers/{teacher_uname}/students")
    public ResponseEntity<?> findStudentsByTeacher(@PathVariable String teacher_uname) {
        List<TeacherStudentTransfer> res = sa_teacher_student.findStudentsByTeacher(teacher_uname);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/uploads/{teacher_uname}")
    public ResponseEntity<?> upload(@PathVariable String teacher_uname, @RequestParam("file") MultipartFile file) {
        sa_files.upload(teacher_uname, file);
        return ResponseEntity.ok().build();
    }

    @GetMapping("uploads/{teacher_uname}/")
    public ResponseEntity<?> getUploads(@PathVariable String teacher_uname) {
        List<String> res = sa_files.getUploads(teacher_uname);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/uploads/{teacher_uname}/{filename:.+}")
    public ResponseEntity<?> getFile(@PathVariable String teacher_uname, @PathVariable String filename) {
        Resource res = sa_files.getFile(teacher_uname, filename);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .body(res);
    }
    
} 
