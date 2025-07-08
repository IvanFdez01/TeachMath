package com.ejemplo.model;

import java.io.Serializable;
import java.util.Objects;

public class TeacherStudentId implements Serializable {
    private String teacher;
    private String student;
    private COURSES course;

    public TeacherStudentId() {}

    public TeacherStudentId(String teacher, String student, COURSES course) {
        this.teacher = teacher;
        this.student = student;
        this.course = course;
    }

    // OBLIGATORIOS
    @Override
    public boolean equals(Object o) {
        if (this == o) 
            return true;
        if (!(o instanceof TeacherStudentId)) 
            return false;
        TeacherStudentId that = (TeacherStudentId) o;
        return teacher.equals(that.teacher) && student.equals(that.student) && course == that.course;
    }

    @Override
    public int hashCode() {
        return Objects.hash(teacher, student, course);
    }
}

