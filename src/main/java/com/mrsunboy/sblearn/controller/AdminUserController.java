package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@RestController
@RequestMapping("/admin")
public class AdminUserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user/all")
    public Result<Iterable<User>> listUsers() {
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        return userService.listUsers();
    }

    @PostMapping("/user/new")
    public Result<User> createNewUser(@Valid @RequestBody CreateUserDto createUserDto) {
        return userService.createUser(createUserDto.getUsername(), createUserDto.getPassword(), createUserDto.getAuthority());
    }

    private static class CreateUserDto {
        @NotBlank
        private String username;

        @Size(min = 6)
        private String password;

        @Pattern(regexp = "ROLE_(USER|ADMIN)")
        private String authority;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getAuthority() {
            return authority;
        }
    }
}
