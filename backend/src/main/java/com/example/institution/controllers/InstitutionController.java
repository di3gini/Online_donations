package com.example.institution.controllers;

import com.example.institution.controllers.request.InstitutionRequest;
import com.example.institution.controllers.response.InstitutionResponse;
import com.example.institution.dto.InstitutionDTO;
import com.example.institution.service.InstitutionService;
import com.mysql.cj.log.Log;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import org.jboss.logging.annotations.Pos;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;
import java.io.Console;

@Path("catalog")
@Tag(name = "Catalog")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class InstitutionController {
    @Inject
    InstitutionService institutionService;

    @GET
    @Path("/institutions/{id_institution}")
    public InstitutionResponse getInstitutionsByCountry(@PathParam("id_institution") Long institutionId){
        List<InstitutionDTO> list = institutionService.getInstitutionsByCountry(institutionId);
        return new InstitutionResponse(list);
    }

}
