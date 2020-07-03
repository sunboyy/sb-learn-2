package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Config;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.service.ConfigService;
import com.mrsunboy.sblearn.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@RestController
@RequestMapping("/admin/config")
public class AdminConfigController {
    @Autowired
    private ConfigService configService;

    @Autowired
    private StatusService statusService;

    @PostMapping("/self-registration")
    public Result<Config> changeAllowSelfRegistration(@Valid @RequestBody ChangeAllowSelfRegistrationDto changeAllowSelfRegistrationDto) {
        return configService.updateConfig(Config.ALLOW_SELF_REGISTRATION, changeAllowSelfRegistrationDto.getAllowSelfRegistration());
    }

    private static class ChangeAllowSelfRegistrationDto {
        @Min(value = 0)
        @Max(value = 1)
        private short allowSelfRegistration;

        public short getAllowSelfRegistration() {
            return allowSelfRegistration;
        }
    }
}
