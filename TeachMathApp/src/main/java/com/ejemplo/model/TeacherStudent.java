package com.ejemplo.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(TeacherStudentId.class)
@Table(name = "teacher_student")
public class TeacherStudent implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "teacher_username", referencedColumnName = "username")
    private MyUser teacher;

    @Id
    @ManyToOne
    @JoinColumn(name = "student_username", referencedColumnName = "username")
    private MyUser student;

    // Constructors
    public TeacherStudent() {}

    public TeacherStudent(MyUser teacher, MyUser student) {
        this.teacher = teacher;
        this.student = student;
    }

    // Getters & Setters
    public MyUser getTeacher() {
        return teacher;
    }

    public void setTeacher(MyUser teacher) {
        this.teacher = teacher;
    }

    public MyUser getStudent() {
        return student;
    }

    public void setStudent(MyUser student) {
        this.student = student;
    }

    // Opcional: equals y hashCode basados en ambos campos si se usan @Id compuesta
}
