package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.FailureResult;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.SuccessResult;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Result<User> getProfile(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        } else {
            return new SuccessResult<>(user);
        }
    }

    public Result<Iterable<User>> listUsers() {
        Iterable<User> users = userRepository.findAll();
        return new SuccessResult<>(users);
    }

    public Result<User> createUser(String username, String password, String role) {
        if (userRepository.findByUsername(username) != null) {
            return new FailureResult<>("Username already exists");
        } else if (password.length() < 6) {
            return new FailureResult<>("Password must have at least 6 characters");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setAuthority(role);
        userRepository.save(user);
        return new SuccessResult<>(user);
    }
}
