package com.mrsunboy.sblearn.form;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class UpdatePreferencesForm {
    @NotBlank
    @Pattern(regexp = "(en|th)")
    @Getter
    private String language;

    @Getter
    @Setter
    private String username;
}
