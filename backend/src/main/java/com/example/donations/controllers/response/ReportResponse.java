package com.example.donations.controllers.response;

import com.example.donations.dto.DonationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ReportResponse {
        List<DonationDTO> donations;
}
