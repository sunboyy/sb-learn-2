package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.form.UpdatePreferencesForm;
import com.mrsunboy.sblearn.data.*;
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

    @Autowired
    private ConfigService configService;

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

    public Result<Object> changePassword(String currentPassword, String newPassword, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        if (!user.comparePassword(currentPassword, passwordEncoder)) {
            return new FailureResult<>("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return new SuccessResult<>(null);
    }

    public Result<User> editUser(String username, String password, String authority, short enabled) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        if (password != null) {
            user.setPassword(passwordEncoder.encode(password));
        }
        if (authority != null) {
            user.setAuthority(authority);
        }
        user.setEnabled(enabled);
        userRepository.save(user);
        return new SuccessResult<>(user);
    }

    public Result<User> selfRegister(String username, String password) {
        if (!isAllowSelfRegistration()) {
            return new FailureResult<>("Self-registration is not allowed");
        }
        String authority = userRepository.count() == 0 ? "ROLE_ADMIN" : "ROLE_USER";
        return createUser(username, password, authority);
    }

    public boolean isAllowSelfRegistration() {
        Config config = configService.getConfig(Config.ALLOW_SELF_REGISTRATION);
        return config.getValue() > 0 || userRepository.count() == 0;
    }

    public Result<User> updatePreferences(UpdatePreferencesForm form) {
        User user = userRepository.findByUsername(form.getUsername());
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        user.setLanguage(form.getLanguage());
        userRepository.save(user);
        return new SuccessResult<>(user);
    }
}
