package com.ejemplo.services;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.ejemplo.datatransfers.MyUserTransfer;
import com.ejemplo.model.MyException;
import com.ejemplo.model.MyUser;
import com.ejemplo.repository.UserRepository;

@Service
public class SAUser {

    @Autowired // gestiona la dependencia del repo con el SA automaticamente (no cuenta como attr)
    private UserRepository user_repo;

    @Autowired
    private final PasswordEncoder _password_encoder = new BCryptPasswordEncoder();

    // CREATE
    public MyUserTransfer register(MyUser u) {
        Optional<MyUser> cont = user_repo.findByUsername(u.getUsername());
        if (cont.isPresent()) {
            // PK ya existente (username)
            throw new MyException("Usuario ya existente", HttpStatus.BAD_REQUEST);
        } else {
            u.setHashPswd(_password_encoder.encode(u.getHashPswd())); // hashear contraseña
            MyUser savedUser = user_repo.save(u);
            return new MyUserTransfer(savedUser);
        } 
    }

    // READ
    public MyUserTransfer login(@RequestBody MyUser u) {
        Optional<MyUser> cont = user_repo.findByUsername(u.getUsername()); // username pk
        if (cont.isPresent()) {
            MyUserTransfer Tuser = new MyUserTransfer(cont.get());
            if (_password_encoder.matches(u.getHashPswd(), cont.get().getHashPswd()))
                return Tuser; 
            else
                throw new MyException("Incorrect Password", 
                    HttpStatus.UNAUTHORIZED);
        }
        else 
            throw new MyException("Invalid Credentials", 
                    HttpStatus.UNAUTHORIZED);    
    }

}