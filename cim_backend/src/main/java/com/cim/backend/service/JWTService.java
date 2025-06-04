package com.cim.backend.service;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
	
	@Autowired
	@Lazy
    private UserService service;
	@Autowired
	private CustomerService customerService;
	

    // ✅ Use a constant 32+ character string (base64 encoded preferred)
    private static final String SECRET_KEY = Base64.getEncoder().encodeToString("my-super-secret-key-1234567890123456".getBytes());

//    public String generateToken(String username) {
//        Map<String, Object> claims = new HashMap<>();
//        return Jwts.builder()
//                .claims()
//                .add(claims)
//                .subject(username)
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
//                .and()
//                .signWith(getKey())
//                .compact();
//    }

    public String generateTokenFromUsername(String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "username");
        claims.put("userDetails", service.getUser(username));
        return createToken(claims, username);
    }

    // Generate token for Customer (uses email)
    public String generateTokenFromEmail(String email) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "email");
        //claims.put("userDetails", customerService.getByEmail(email));
        return createToken(claims, email);
    }

    @SuppressWarnings("deprecation")
	private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject) // either username or email
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(getKey())
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
