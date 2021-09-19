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
    @Size(min = 8,message = "La contraseña debe tener al menos 8 caracteres.")
    private String password;

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    @Size(min = 13, max = 13, message = "El DPI debe tener 13 digitos, sin espacios")
    @Pattern(regexp = "[0-9]+", message = "El DPI debe tener 13 digitos, sin espacios")
    private String idNumber;

}
