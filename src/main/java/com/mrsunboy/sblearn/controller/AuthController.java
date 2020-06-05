package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.AuthTokens;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Result<AuthTokens> login(@RequestParam String username, @RequestParam String password) {
        return authService.login(username, password);
    }
}
