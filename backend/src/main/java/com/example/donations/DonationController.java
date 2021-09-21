package com.example.donations;


import com.example.donations.controllers.request.DonationRequest;
import com.example.donations.controllers.response.DonationResponse;
import com.example.donations.dto.DonationDTO;
import com.example.donations.dto.PublicReportDTO;
import com.example.donations.dto.ReportDTO;
import com.example.donations.service.DonationService;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("donation")
@Tag(name = "Donation")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DonationController {

    @Inject
    DonationService donationService;

    @POST
    @Path("/donate/")
    public DonationResponse newDonation(@Valid DonationRequest donationRequest){

        DonationDTO donation = donationService.registerDonation(
                donationRequest.getAmount(),
                donationRequest.getIdUser(),
                donationRequest.getIdInstitution()
        );
        return new DonationResponse(donation);
    }

    @GET
    @Path("/byUser/{id_user}")
    public List<ReportDTO> donationsByUser(@PathParam("id_user") Long idUser){
        return donationService.donationsByUser(idUser);
    }

    @GET
    @Path("/donations/")
    public List<PublicReportDTO> publicReport(){
        return donationService.publicReport();
    }

}
