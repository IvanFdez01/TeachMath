package com.ejemplo.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "MYUSER")
public class MyUser {

    @Id
    @JsonProperty("username")
    @Column(name = "USERNAME")
    private String username;

    @JsonProperty("hash_pswd")
    @Column(name = "HASH_PSWD")
    private String hash_pswd;

    @Enumerated(EnumType.STRING)
    @JsonProperty("rol")
    @Column(name = "ROL")
    private ROL rol;

    public String getUsername() {
        return username;
    }

    public void setUsername(String uname) {
        this.username = uname;
    }

    public String getHashPswd() {
        return hash_pswd;
    }

    public void setHashPswd(String hp) {
        this.hash_pswd = hp;
    }

    public ROL getRol() {
        return rol;
    }

    public void setRol(ROL Rol) {
        this.rol = Rol;
    }
}