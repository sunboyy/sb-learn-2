package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.*;
import com.mrsunboy.sblearn.repository.UserRepository;
import com.mrsunboy.sblearn.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public Result<AuthTokens> signIn(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !user.comparePassword(password, passwordEncoder)) {
            return new FailureResult<>("Incorrect username or password");
        }
        if (user.getEnabled() <= 0) {
            return new FailureResult<>("This user has been disabled.");
        }
        user.setLastLoggedIn(new Date());
        userRepository.save(user);
        return new SuccessResult<>(new AuthTokens(jwtService.sign(username)));
    }
}
