package com.example.donations.controllers.request;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class ReportRequest {
    @NotNull
    private Long idUser;
}
