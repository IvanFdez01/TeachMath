package com.ejemplo.services;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ejemplo.datatransfers.MyUserTransfer;
import com.ejemplo.datatransfers.TeacherStudentTransfer;
import com.ejemplo.model.MyUser;
import com.ejemplo.model.TeacherStudent;
import com.ejemplo.repository.TeacherStudentRepository;
import com.ejemplo.repository.UserRepository;

@Service
public class SATeacherStudent {

    @Autowired // gestiona la dependencia del repo con el SA automaticamente (no cuenta como attr)
    private TeacherStudentRepository teacherstudent_repo;
    @Autowired
    private UserRepository user_repo;

    // CREATE
    public ResponseEntity<?> create(@RequestBody TeacherStudentTransfer Tts) {
        Optional<MyUser> teacherOpt = user_repo.findByUsername(Tts.getTeacher());
        Optional<MyUser> studentOpt = user_repo.findByUsername(Tts.getStudent());
        if(studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Alumno no existente.");
        } else if (teacherOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Profesor no existente.");
        }else {
            MyUser teacher = teacherOpt.get();
            MyUser student = studentOpt.get();
            if (!teacherstudent_repo.existsByTeacherAndStudent(teacher, student)) {
                TeacherStudent savedRelation = teacherstudent_repo.save(new TeacherStudent(teacher,student));
                return ResponseEntity.status(HttpStatus.CREATED)
                            .body(savedRelation);
            } else 
                return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("Pareja estudiante-profesor ya existente");
        } 
    }

    // READ
    /* 
    public ResponseEntity<?> findStudentsByTeacher(@RequestBody String uname) {
        Optional<MyUser> cont = user_repo.findByUsername(u.getUsername()); // username pk
        if (cont.isPresent()) {
            MyUserTransfer Tuser = new MyUserTransfer();
            Tuser.setUsername(cont.get().getUsername());
            Tuser.setRol(cont.get().getRol());
            if (_password_encoder.matches(u.getHashPswd(), cont.get().getHashPswd()))
                return ResponseEntity.ok(Tuser); // status=ok, body=Tuser
            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password"); 

        }
        else 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"); 
    }
    */
}