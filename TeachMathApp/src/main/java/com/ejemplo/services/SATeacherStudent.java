package com.ejemplo.services;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ejemplo.datatransfers.TeacherStudentTransfer;
import com.ejemplo.model.MyUser;
import com.ejemplo.model.TeacherStudent;
import com.ejemplo.repository.TeacherStudentRepository;
import com.ejemplo.repository.UserRepository;

@Service
public class SATeacherStudent {

    //JPA
    @Autowired // gestiona la dependencia del repo con el SA automaticamente (no cuenta como attr)
    private TeacherStudentRepository teacherstudent_repo;
    @Autowired
    private UserRepository user_repo;

    // CREATE
    public ResponseEntity<?> create(TeacherStudentTransfer Tts) {
        Optional<MyUser> teacherOpt = user_repo.findByUsername(Tts.getTeacher());
        Optional<MyUser> studentOpt = user_repo.findByUsername(Tts.getStudent());
        if(studentOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Alumno no existente.");
        } else if (teacherOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Profesor no existente.");
        } else {
            MyUser teacher = teacherOpt.get();
            MyUser student = studentOpt.get();
            if (!teacherstudent_repo.existsByTeacherAndStudentAndCourse(teacher, student, Tts.getCourse())) {
                TeacherStudent savedRelation = teacherstudent_repo.save(new TeacherStudent(teacher,student,Tts.getCourse()));
                return ResponseEntity.status(HttpStatus.CREATED)
                            .body(savedRelation);
            } else 
                return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("El estudiante '" + student.getUsername() + "' ya es tu alumno del curso " + Tts.getCourse() + ".");
        } 
    }

    // READ
    public ResponseEntity<?> findStudentsByTeacher(String uname) {
        // profe existe? de momento es garantizado 
        List<TeacherStudent> list = teacherstudent_repo.findByTeacher_Username(uname);
        if (list.isEmpty()) 
            return ResponseEntity.noContent().build(); // 204 NO_CONTENT
        List<TeacherStudentTransfer> Tlist = list.stream()
            .map(tts -> new TeacherStudentTransfer(uname, tts.getStudent().getUsername(), tts.getCourse())).toList();
        return ResponseEntity.ok(Tlist);
    }
    
}