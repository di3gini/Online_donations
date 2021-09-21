package com.example.country.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;

@Data
@AllArgsConstructor
public class CountryDTO {

    private Long id;
    private String name;
}
