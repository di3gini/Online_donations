package com.example.institution.controllers.response;

import com.example.institution.dto.InstitutionDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class InstitutionResponse {

    List<InstitutionDTO> institutions;
}
