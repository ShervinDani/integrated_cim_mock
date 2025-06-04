package com.cim.backend.service;


import com.macasaet.fernet.Key;
import com.macasaet.fernet.Token;
import com.macasaet.fernet.Validator;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtServiceFernet {

    // JWT signing key (base64-encoded)
    private static final String SECRET_KEY = Base64.getEncoder()
            .encodeToString("my-super-secret-key-1234567890123456".getBytes());

    // ✅ Hardcoded Fernet key (must be 32 url-safe base64 characters)
    private static final String FERNET_KEY = "IFp-GhZx2pcSR2yKFbSJ-Ot_-l_HRvJ-4QJSq9sUfeI";

    // Generate JWT and encrypt it using Fernet
    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        String jwt = Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                .and()
                .signWith(getKey())
                .compact();

        return encryptWithFernet(jwt);
    }

    // Validate the Fernet-encrypted JWT against username
    public boolean validateToken(String encryptedToken, UserDetails userDetails) {
        try {
            String jwt = decryptWithFernet(encryptedToken);
            final String userName = extractUserName(jwt);
            return (userName.equals(userDetails.getUsername()) && !isTokenExpired(jwt));
        } catch (Exception e) {
            return false;
        }
    }

    
    // Extract username from encrypted JWT
    public String extractUserName(String encryptedToken) {
        try {
            String jwt = decryptWithFernet(encryptedToken);
            return extractClaim(jwt, Claims::getSubject);
        } catch (Exception e) {
            return null;
        }
    }

    // ========== Private Utility Methods ==========

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
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

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Encrypt JWT with Fernet
    private String encryptWithFernet(String jwt) {
        Key key = new Key(FERNET_KEY);
        Token token = Token.generate(key, jwt.getBytes());
        return token.serialise();
    }


    private String decryptWithFernet(String encryptedToken) {
        Key key = new Key(FERNET_KEY);
        Validator<String> validator = new Validator<String>() {
        	@Override
            public Function<byte[], String> getTransformer() {
                return bytes -> new String(bytes);
            }

            @Override
            public Duration getTimeToLive() {
                return Duration.ofHours(1); // Optional TTL validation
            }
        };
        Token token = Token.fromString(encryptedToken);
        return token.validateAndDecrypt(key, validator);
    }
    
    // Decrypt Fernet token to get original JWT
//  private String decryptWithFernet(String encryptedToken) {
//      Key key = new Key(FERNET_KEY);
//      Validator<String> validator = new Validator<>() {
//          public String validate(final byte[] message) {
//              return new String(message);
//          }
//      };
//      Token token = Token.fromString(encryptedToken);
//      return token.validateAndDecrypt(key, validator, Instant.now(), Duration.ofHours(1));
//  }
  

}

