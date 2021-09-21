package com.example.donations.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DonationDTO {
    private Long id;
    private Float amount;
    private Long idUser;
    private Long idInstitution;
    private LocalDateTime date;

    public DonationDTO(Long id, Float amount, Long idUser, Long idInstitution, LocalDateTime date) {
        this.id = id;
        this.amount = amount;
        this.idUser = idUser;
        this.idInstitution = idInstitution;
        this.date = date;
    }

    public DonationDTO(Float amount, Long idUser, Long idInstitution) {
        this.amount = amount;
        this.idUser = idUser;
        this.idInstitution = idInstitution;
    }


}
