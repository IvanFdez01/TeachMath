package com.ejemplo.repository;

import com.ejemplo.model.MyUser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<MyUser, Long> {
    // Optional: contenedor que puede o no contener un MyUser, para asi evitar tratar con null
    // se ve con .isPresent()
    Optional<MyUser> findByUsername(String username);
}