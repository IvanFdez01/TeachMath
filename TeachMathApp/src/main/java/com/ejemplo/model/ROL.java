package com.ejemplo.model;

public enum ROL {
    NONE("NONE"),
    TEACHER("TEACHER"),
    STUDENT("STUDENT");

    private final String label;
    ROL(String label) {
        this.label = label;
    }
    public String getLabel() {
        return label;
    }
}
