package com.example.country.controllers;

import com.example.country.controllers.response.CountriesResponse;
import com.example.country.dto.CountryDTO;
import com.example.country.services.CountryService;
import com.example.users.controllers.request.RegisterRequest;
import com.example.users.controllers.response.LoginResponse;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("catalog")
@Tag(name = "Catalog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CountryController {

    @Inject
    CountryService countryService;


    @GET
    @Path("/countries")
    public CountriesResponse getCountries(){
        List<CountryDTO> countries = countryService.getCountry();
        return new CountriesResponse(countries);
    }
}
