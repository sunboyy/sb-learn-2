package com.sunboyy.sblearn.controller;

import com.sunboyy.sblearn.form.ChangePasswordForm;
import com.sunboyy.sblearn.form.UpdatePreferencesForm;
import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.domain.user.User;
import com.sunboyy.sblearn.domain.user.UserService;
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
    public Result<User> register(@Valid @RequestBody UserController.RegisterForm registerForm) {
        return userService.selfRegister(registerForm.getUsername(), registerForm.getPassword());
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

    private static class RegisterForm {
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
