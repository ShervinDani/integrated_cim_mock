package com.cim.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DocumentService {
    private String imageBase64;
    private String documentBase64;

    public String getImageBase64() { return imageBase64; }
    public void setImageBase64(String imageBase64) { this.imageBase64 = imageBase64; }

    public String getDocumentBase64() { return documentBase64; }
    public void setDocumentBase64(String documentBase64) { this.documentBase64 = documentBase64; }
}