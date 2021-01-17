package com.sunboyy.sblearn.form;

import lombok.Getter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Getter
public class ChangeAllowSelfRegistrationForm {
    @Min(value = 0)
    @Max(value = 1)
    private short allowSelfRegistration;
}
