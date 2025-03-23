package com.milkepadho.MilkePadho.controllers;

import com.milkepadho.MilkePadho.entities.Doubt;
import com.milkepadho.MilkePadho.services.DoubtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/api/doubts")
public class DoubtController {

    @Autowired
    private DoubtService doubtService;

    @PostMapping("/post")
    public ResponseEntity<Doubt> postDoubt(@RequestBody Doubt doubt) {
        System.out.println("Received Doubt: " + doubt); 
        return ResponseEntity.ok(doubtService.saveDoubt(doubt));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Doubt>> getAllDoubts() {
        return ResponseEntity.ok(doubtService.getAllDoubts());
    }
}
