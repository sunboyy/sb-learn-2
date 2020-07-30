package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Config;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.form.ChangeAllowSelfRegistrationForm;
import com.mrsunboy.sblearn.service.ConfigService;
import com.mrsunboy.sblearn.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/admin/config")
public class AdminConfigController {
    @Autowired
    private ConfigService configService;

    @Autowired
    private StatusService statusService;

    @PostMapping("/self-registration")
    public Result<Config> changeAllowSelfRegistration(@Valid @RequestBody ChangeAllowSelfRegistrationForm changeAllowSelfRegistrationForm) {
        return configService.updateConfig(Config.ALLOW_SELF_REGISTRATION, changeAllowSelfRegistrationForm.getAllowSelfRegistration());
    }
}
