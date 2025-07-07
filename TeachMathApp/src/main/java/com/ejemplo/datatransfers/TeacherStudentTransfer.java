package com.ejemplo.datatransfers;

public class TeacherStudentTransfer {
    private String teacher;
    private String student;

    public TeacherStudentTransfer() {
        // Constructor vacío necesario para serialización
    }

    public TeacherStudentTransfer(String teacher, String student) {
        this.teacher = teacher;
        this.student = student;
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
}
