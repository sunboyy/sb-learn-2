package com.sunboyy.sblearn.controller;

import com.sunboyy.sblearn.data.AuthTokens;
import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.security.UserCredentials;
import com.sunboyy.sblearn.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/sign-in")
    public Result<AuthTokens> signIn(@Valid @RequestBody UserCredentials credentials) {
        return authService.signIn(credentials.getUsername(), credentials.getPassword());
    }
}
