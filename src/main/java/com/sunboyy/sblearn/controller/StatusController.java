package com.sunboyy.sblearn.controller;

import com.sunboyy.sblearn.data.Status;
import com.sunboyy.sblearn.service.StatusService;
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
