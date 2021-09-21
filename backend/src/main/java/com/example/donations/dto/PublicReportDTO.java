package com.example.donations.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PublicReportDTO {
    private Long id;
    private String name;
    private String surname;
    private String idNumber;
    private String institution;
    private String country;
    private Float amount;
    private LocalDateTime Date;
}
