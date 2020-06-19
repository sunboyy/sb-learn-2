package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Status;
import com.mrsunboy.sblearn.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @Autowired
    private StatusService statusService;

    @GetMapping("/status")
    public Status getStatus() {
        return statusService.getStatus();
    }
}
