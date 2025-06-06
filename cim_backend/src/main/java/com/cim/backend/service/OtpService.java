package com.cim.backend.service;

import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.cim.backend.model.OtpVerification;
import com.cim.backend.repository.OtpRepository;

@Service
public class OtpService {
	
	@Autowired
    private JWTService jwtService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private OtpRepository otpRepo;

    public void sendOtp(String email) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        // Save to DB
        otpRepo.save(new OtpVerification(null, email, otp, null));

        // Send mail
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);
    }

    public String verifyOtp(String email, String inputOtp) {
        Optional<OtpVerification> latestOtp = otpRepo.findTopByEmailOrderByCreatedAtDesc(email);

        if (latestOtp.isPresent() && latestOtp.get().getOtp().equals(inputOtp)) {
            return jwtService.generateTokenFromEmail(email);
        }
        return null;
    }
}
