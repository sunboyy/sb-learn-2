package com.mrsunboy.sblearn.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtService {
    @Value("${auth.jwtSecret}")
    private String jwtSecret;

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    public String sign(String username) {
        String token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(getAlgorithm());
        return token;
    }

    public String getUsername(String jwtToken) {
        try {
            JWTVerifier verifier = JWT.require(getAlgorithm()).build();
            DecodedJWT jwt = verifier.verify(jwtToken);
            return jwt.getSubject();
        } catch (JWTVerificationException e) {
            return null;
        }
    }

    private Algorithm getAlgorithm() {
        System.out.println(jwtSecret);
        return Algorithm.HMAC256(jwtSecret);
    }
}
