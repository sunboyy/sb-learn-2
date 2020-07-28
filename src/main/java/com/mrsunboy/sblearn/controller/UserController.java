package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.form.ChangePasswordForm;
import com.mrsunboy.sblearn.form.UpdatePreferencesForm;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public Result<User> register(@Valid @RequestBody RegisterDto registerDto) {
        return userService.selfRegister(registerDto.getUsername(), registerDto.getPassword());
    }

    @GetMapping("/profile")
    public Result<User> getProfile() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getProfile(username);
    }

    @PostMapping("/change-password")
    public Result<Object> changePassword(@Valid @RequestBody ChangePasswordForm changePasswordForm) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.changePassword(changePasswordForm.getCurrentPassword(), changePasswordForm.getNewPassword(), username);
    }

    @PostMapping("/preferences")
    public Result<User> updatePreferences(@Valid @RequestBody UpdatePreferencesForm updatePreferencesForm) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        updatePreferencesForm.setUsername(username);
        return userService.updatePreferences(updatePreferencesForm);
    }

    private static class RegisterDto {
        @NotBlank
        private String username;

        @NotBlank
        @Size(min = 6)
        private String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }
}
