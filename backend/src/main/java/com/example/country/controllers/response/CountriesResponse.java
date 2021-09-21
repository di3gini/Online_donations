package com.example.country.controllers.response;

import com.example.country.dto.CountryDTO;
import com.example.users.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CountriesResponse {

    List<CountryDTO> countries;
}
