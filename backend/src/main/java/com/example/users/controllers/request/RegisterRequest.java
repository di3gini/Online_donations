package com.example.users.controllers.request;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class RegisterRequest {

    @NotEmpty
    private String email;

    @NotEmpty
    @Size(min = 8,message = "Password must be at least 8 characters.")
    private String password;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    @Size(min = 13, max = 13, message = "ID must have at least 13 digits")
    @Pattern(regexp = "[0-9]+", message = "ID must have at least 13 digits")
    private String idNumber;

}
