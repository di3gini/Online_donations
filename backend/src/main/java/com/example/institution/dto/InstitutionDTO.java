package com.example.institution.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class InstitutionDTO {
    private Long id;
    private String name;
    private Long id_country;

}
