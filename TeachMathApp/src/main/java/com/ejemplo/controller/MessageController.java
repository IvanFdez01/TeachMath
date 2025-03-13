package com.ejemplo.controller;

import com.ejemplo.model.Message;
import com.ejemplo.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // puerto del front
@RestController
@RequestMapping("/messages")
public class MessageController {

    @Autowired
    private MessageRepository msg_repo;

    @GetMapping
    public List<Message> get_messages() {
        return msg_repo.findAll();
    }

    @PostMapping
    public ResponseEntity<Message> create_message(@RequestBody Message msg) {
        Message savedMessage = msg_repo.save(msg);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMessage);
    }
}