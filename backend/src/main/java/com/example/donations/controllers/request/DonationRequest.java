package com.example.donations.controllers.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class DonationRequest {

    @NotNull
    private Float amount;

    @NotNull
    private Long idUser;

    @NotNull
    private Long idInstitution;

}
