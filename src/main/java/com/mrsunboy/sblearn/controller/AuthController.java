package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.AuthTokens;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.security.UserCredentials;
import com.mrsunboy.sblearn.service.AuthService;
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
