package com.citronassur.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@Tag(name = "Hello", description = "Hello API")
public class HelloController {
    
    @GetMapping("/hello")
    @Operation(summary = "Get hello message", description = "Returns a greeting message")
    public String hello() {
        return "Hello Citron-Assur!";
    }
}