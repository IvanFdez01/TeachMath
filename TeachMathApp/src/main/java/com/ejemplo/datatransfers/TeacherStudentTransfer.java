package com.ejemplo.datatransfers;

import com.ejemplo.model.COURSES;
import com.ejemplo.model.TeacherStudent;

public class TeacherStudentTransfer {
    private String teacher;
    private String student;
    private COURSES course;

    public TeacherStudentTransfer() {
        // Constructor vacío necesario para serialización
    }

    public TeacherStudentTransfer(TeacherStudent ts) {
        this.teacher = ts.getTeacher().getUsername();
        this.student = ts.getStudent().getUsername();
        this.course = ts.getCourse();
    }

    public TeacherStudentTransfer(String teacher, String student, COURSES course) {
        this.teacher = teacher;
        this.student = student;
        this.course = course;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String username) {
        this.teacher = username;
    }

    public String getStudent() {
        return student;
    }

    public void setStudent(String username) {
        this.student = username;
    }

    public COURSES getCourse() {
        return course;
    }

    public void setCourse(COURSES c) {
        this.course = c;
    }
}
