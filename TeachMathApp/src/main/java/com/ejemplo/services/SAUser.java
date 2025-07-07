package com.ejemplo.services;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ejemplo.datatransfers.MyUserTransfer;
import com.ejemplo.model.MyUser;
import com.ejemplo.repository.UserRepository;

@Service
public class SAUser {

    @Autowired // gestiona la dependencia del repo con el SA automaticamente (no cuenta como attr)
    private UserRepository user_repo;

    @Autowired
    private final PasswordEncoder _password_encoder = new BCryptPasswordEncoder();

    // CREATE
    public ResponseEntity<?> register(@RequestBody MyUser u) {
        Optional<MyUser> cont = user_repo.findByUsername(u.getUsername());
        if (cont.isPresent()) {
            // PK ya existente (username)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                             .body(Collections.singletonMap("error", "Usuario ya existente."));
        } else {
            u.setHashPswd(_password_encoder.encode(u.getHashPswd())); // hashear contraseña
            MyUser savedUser = user_repo.save(u);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } 
    }

    // READ
    public ResponseEntity<?> login(@RequestBody MyUser u) {
        Optional<MyUser> cont = user_repo.findByUsername(u.getUsername()); // username pk
        if (cont.isPresent()) {
            MyUserTransfer Tuser = new MyUserTransfer();
            Tuser.setUsername(cont.get().getUsername());
            Tuser.setRol(cont.get().getRol());
            if (_password_encoder.matches(u.getHashPswd(), cont.get().getHashPswd()))
                return ResponseEntity.ok(Tuser); // status=ok, body=Tuser
            else
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password"); 

        }
        else 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials"); 
    }

}