package com.example.donations.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReportDTO {

    private Long id;
    private Float amount;
    private String institution;
    private String country;
    private LocalDateTime Date;

}
