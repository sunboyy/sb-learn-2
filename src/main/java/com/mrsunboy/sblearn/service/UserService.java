package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.FailureResult;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.SuccessResult;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Result<User> registerNewUser(String username, String password) {
        if (userRepository.findByUsername(username) != null) {
            return new FailureResult<>("Username already exists");
        }
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        userRepository.save(user);
        return new SuccessResult<>(user);
    }
}
