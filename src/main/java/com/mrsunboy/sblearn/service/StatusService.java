package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
