package com.sunboyy.sblearn.controller;

import com.sunboyy.sblearn.domain.config.Config;
import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.form.ChangeAllowSelfRegistrationForm;
import com.sunboyy.sblearn.domain.config.ConfigService;
import com.sunboyy.sblearn.service.StatusService;
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
