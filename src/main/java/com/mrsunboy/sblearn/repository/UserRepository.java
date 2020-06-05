package com.mrsunboy.sblearn.repository;

import com.mrsunboy.sblearn.data.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
