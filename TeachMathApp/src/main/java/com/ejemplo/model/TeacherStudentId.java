package com.ejemplo.model;

import java.io.Serializable;
import java.util.Objects;

public class TeacherStudentId implements Serializable {
    private MyUser teacher;
    private MyUser student;

    public TeacherStudentId() {}

    public TeacherStudentId(MyUser teacher, MyUser student) {
        this.teacher = teacher;
        this.student = student;
    }

    // OBLIGATORIOS
    @Override
    public boolean equals(Object o) {
        if (this == o) 
            return true;
        if (!(o instanceof TeacherStudentId)) 
            return false;
        TeacherStudentId that = (TeacherStudentId) o;
        return teacher.equals(that.teacher) && student.equals(that.student);
    }

    @Override
    public int hashCode() {
        return Objects.hash(teacher, student);
    }
}

