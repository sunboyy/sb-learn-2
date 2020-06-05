package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.*;
import com.mrsunboy.sblearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public Result<AuthTokens> login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user == null || !user.comparePassword(password)) {
            return new FailureResult<>("Login failed");
        }
        return new SuccessResult<>(new AuthTokens(""));
    }
}
