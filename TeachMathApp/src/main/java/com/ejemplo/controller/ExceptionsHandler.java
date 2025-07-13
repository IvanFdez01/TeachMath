package com.ejemplo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.ejemplo.model.MyException;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(MyException.class)
    public ResponseEntity<String> handleApiException(MyException e) {
        return ResponseEntity
            .status(e.getStatus())
            .body(e.getMessage());
    }

}

