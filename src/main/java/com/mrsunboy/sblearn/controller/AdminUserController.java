package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.data.User;
import com.mrsunboy.sblearn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.*;

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

    @PostMapping("/user/edit")
    public Result<User> editUser(@Valid @RequestBody EditUserDto editUserDto) {
        return userService.editUser(editUserDto.getUsername(), editUserDto.getPassword(), editUserDto.getAuthority(), editUserDto.getEnabled());
    }

    private static class CreateUserDto {
        @NotBlank
        private String username;

        @NotBlank
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

    private static class EditUserDto {
        @NotBlank
        private String username;

        @Size(min = 6)
        private String password;

        @Pattern(regexp = "ROLE_(USER|ADMIN)")
        private String authority;

        @Min(value = 0)
        @Max(value = 1)
        private short enabled;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getAuthority() {
            return authority;
        }

        public short getEnabled() {
            return enabled;
        }
    }
}
