package com.mrsunboy.sblearn.controller;

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

    @GetMapping("/profile")
    public Result<User> getProfile() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getProfile(username);
    }

    @PostMapping("/change-password")
    public Result<Object> changePassword(@Valid @RequestBody ChangePasswordDto changePasswordDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.changePassword(changePasswordDto.currentPassword, changePasswordDto.newPassword, username);
    }

    private static class ChangePasswordDto {
        @NotBlank
        private String currentPassword;

        @Size(min = 6)
        private String newPassword;

        public String getCurrentPassword() {
            return currentPassword;
        }

        public String getNewPassword() {
            return newPassword;
        }
    }
}
