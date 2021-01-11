package com.sunboyy.sblearn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunboyy.sblearn.data.Status;
import com.sunboyy.sblearn.domain.user.UserService;

@Service
public class StatusService {
    @Autowired
    private UserService userService;

    public Status getStatus() {
        Status status = new Status();
        status.setAllowSelfRegistration(userService.isAllowSelfRegistration());
        return status;
    }
}
