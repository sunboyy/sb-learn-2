package com.mrsunboy.sblearn.form;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
public class ChangePasswordForm {
    @NotBlank
    private String currentPassword;

    @Size(min = 6)
    private String newPassword;
}
