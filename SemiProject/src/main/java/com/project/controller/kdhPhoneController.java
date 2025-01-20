package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.service.kdhUserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/phone")
public class kdhPhoneController {

    @Autowired
    private kdhUserService userservice;

    @GetMapping("/check")
    public ResponseEntity<Map<String, Boolean>> checkPhone(@RequestParam("phone") String phone) {
        try {
            System.out.println("검사할 휴대폰 번호: " + phone);
            boolean exists = userservice.isPhoneNumberExists(phone);
            
            Map<String, Boolean> response = new HashMap<>();
            response.put("exists", exists);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Boolean> response = new HashMap<>();
            response.put("error", true);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
