package com.ejemplo.model;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(TeacherStudentId.class)
@Table(name = "teacher_student")
public class TeacherStudent implements Serializable {

    // referencedColumnName="x" ¿que hace?
    // el attr es un obj con campos username, hashpswd y rol, 
    // por lo que el id corresponde a teacher.x

    @Id
    @ManyToOne
    @JoinColumn(name = "teacher_username", referencedColumnName = "username")
    private MyUser teacher;

    @Id
    @ManyToOne
    @JoinColumn(name = "student_username", referencedColumnName = "username")
    private MyUser student;

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "course")
    private COURSES course; 


    // Constructors
    public TeacherStudent() {}

    public TeacherStudent(MyUser teacher, MyUser student, COURSES course) {
        this.teacher = teacher;
        this.student = student;
        this.course = course;
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

    public COURSES getCourse() {
        return course;
    }

    public void setCourse(COURSES c) {
        this.course = c;
    }

    // Opcional: equals y hashCode basados en ambos campos si se usan @Id compuesta
}
