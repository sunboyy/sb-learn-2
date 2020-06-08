package com.mrsunboy.sblearn.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.Date;

@Service
public class TokenAuthenticationService {
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;
    private static final String HEADER_STRING = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer";

    private static final Algorithm algorithm = Algorithm.HMAC256("secret");

    public static void addAuthentication(HttpServletResponse res, String username) {
        String token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + token);
    }

    public static Authentication getAuthentication(HttpServletRequest req) {
        String token = req.getHeader(HEADER_STRING);
        if (token == null) {
            return null;
        }
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(token.replace(TOKEN_PREFIX, "").trim());
            String username = jwt.getSubject();

            return new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
        } catch (JWTVerificationException e) {
            return null;
        }
    }
}
