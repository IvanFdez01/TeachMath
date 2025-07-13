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
import com.ejemplo.model.MyException;
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
    public TeacherStudentTransfer create(TeacherStudentTransfer Tts) {
        Optional<MyUser> teacherOpt = user_repo.findByUsername(Tts.getTeacher());
        Optional<MyUser> studentOpt = user_repo.findByUsername(Tts.getStudent());
        
        if(studentOpt.isEmpty()) 
            throw new MyException("Alumno no existente", HttpStatus.NOT_FOUND);
        if (teacherOpt.isEmpty()) 
            throw new MyException("Profesor no existente", HttpStatus.NOT_FOUND);
        
        MyUser teacher = teacherOpt.get();
        MyUser student = studentOpt.get();
        boolean relationExists = teacherstudent_repo.existsByTeacherAndStudentAndCourse(teacher, student, Tts.getCourse());
        if (relationExists) {
            throw new MyException("El estudiante '" + student.getUsername() + "' ya es tu alumno del curso " + Tts.getCourse() + ".",
                HttpStatus.CONFLICT);
        }  
        TeacherStudent savedRelation = teacherstudent_repo.save(new TeacherStudent(teacher,student,Tts.getCourse()));
        return new TeacherStudentTransfer(savedRelation); 
    }

    // READ
    public List<TeacherStudentTransfer> findStudentsByTeacher(String uname) {
        // profe existe? de momento es garantizado 
        List<TeacherStudent> list = teacherstudent_repo.findByTeacher_Username(uname);
        if (list.isEmpty()) 
            throw new MyException("Profesor no existente", HttpStatus.NO_CONTENT);

        return list.stream()
            .map(tts -> new TeacherStudentTransfer(uname, tts.getStudent().getUsername(), tts.getCourse()))
            .toList();
    }
    
}