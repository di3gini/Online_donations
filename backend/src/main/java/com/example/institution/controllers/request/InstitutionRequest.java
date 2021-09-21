package com.example.institution.controllers.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class InstitutionRequest {
    @NotEmpty
    private Long id_country;
}
