package com.ejemplo.repository;

import com.ejemplo.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Message, Long> {}