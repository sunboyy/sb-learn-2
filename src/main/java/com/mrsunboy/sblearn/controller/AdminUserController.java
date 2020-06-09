package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public Result<User> createNewUser(@RequestParam String username, @RequestParam String password, @RequestParam(defaultValue = "user") String role) {
        return userService.createUser(username, password, role);
    }
}
