package com.example.donations.controllers.response;

import com.example.donations.dto.DonationDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DonationResponse {
    private DonationDTO donation;
}
