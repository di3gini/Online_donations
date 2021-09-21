package com.example.country.services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.example.common.errors.WSException;
import com.example.country.dto.CountryDTO;
import com.example.country.models.Country;
import com.example.users.dto.UserDTO;
import com.example.users.models.User;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Transactional
@ApplicationScoped
public class CountryService {

    public List<CountryDTO> getCountry() {
        List<Country> countries = Country.listAll();
        return toCountryDTOList(countries);
    }

    public List<CountryDTO> toCountryDTOList (List<Country> list){
        List<CountryDTO> countryDTOList = new ArrayList<CountryDTO>();
        if (!list.isEmpty()) {
            for (Country element: list) {
                countryDTOList.add(new CountryDTO(
                        element.getId(),
                        element.getName()
                ));
            }
            return countryDTOList;
        }
        return null;

    }

}
