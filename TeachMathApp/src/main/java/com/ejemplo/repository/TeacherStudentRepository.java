package com.ejemplo.repository;

import com.ejemplo.model.COURSES;
import com.ejemplo.model.MyUser;
import com.ejemplo.model.TeacherStudent;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherStudentRepository extends JpaRepository<TeacherStudent, Long> {
    boolean existsByTeacherAndStudentAndCourse(MyUser teacher, MyUser student, COURSES course);
    List<TeacherStudent> findByTeacher_Username(String username);
    List<TeacherStudent> findByStudent_Username(String username);
}