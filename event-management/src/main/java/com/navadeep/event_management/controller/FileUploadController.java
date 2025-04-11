package com.navadeep.event_management.controller;

import com.navadeep.event_management.cloud.ImageUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/files")
public class FileUploadController {


    private final ImageUploadService cloudinaryService;

    public FileUploadController(ImageUploadService cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile image) {
        try {
            // Upload the image to Cloudinary
            String imageUrl = cloudinaryService.uploadImage(image);
            return ResponseEntity.ok(imageUrl);  // Return the image URL as response
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Image upload failed: " + e.getMessage());
        }
    }
}
