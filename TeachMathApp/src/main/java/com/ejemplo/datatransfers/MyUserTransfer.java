package com.ejemplo.datatransfers;

import com.ejemplo.model.ROL;

public class MyUserTransfer {
    private String username;
    private ROL rol;

    public MyUserTransfer() {
        // Constructor vacío necesario para serialización
    }

    public MyUserTransfer(String username, ROL rol) {
        this.username = username;
        this.rol = rol;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public ROL getRol() {
        return rol;
    }

    public void setRol(ROL rol) {
        this.rol = rol;
    }
}
