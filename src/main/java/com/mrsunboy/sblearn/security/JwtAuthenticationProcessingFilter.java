package com.mrsunboy.sblearn.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtAuthenticationProcessingFilter extends AbstractAuthenticationProcessingFilter {
    public JwtAuthenticationProcessingFilter(String url, AuthenticationManager manager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(manager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
        UserCredentials credentials = new ObjectMapper().readValue(request.getInputStream(), UserCredentials.class);

        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(
                credentials.getUsername(), credentials.getPassword(), Collections.emptyList()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) {
        JwtService jwtService = new JwtService();
        response.addHeader("Authorization", "Bearer " + jwtService.sign(authResult.getName()));
    }
}
