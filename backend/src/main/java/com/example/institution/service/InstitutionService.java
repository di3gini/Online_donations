package com.example.institution.service;

import com.example.institution.dto.InstitutionDTO;
import com.example.institution.models.Institution;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@ApplicationScoped
public class InstitutionService {
    public List<InstitutionDTO> getInstitutionsByCountry(Long country){
        List<Institution> list = Institution.list("id_country", country);
        return toInstitutionDTOList(list);

    }

    public List<InstitutionDTO> toInstitutionDTOList(List<Institution> list){
        if (!list.isEmpty()){
            List<InstitutionDTO> institutionDTOList = new ArrayList<InstitutionDTO>();
            for (Institution element: list) {
                institutionDTOList.add(new InstitutionDTO(
                        element.getId(),
                        element.getName(),
                        element.getId_country()
                ));
            }
            return institutionDTOList;
        }
        return null;
    }
}
