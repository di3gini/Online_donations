package com.example.donations.service;

import com.example.common.errors.WSException;
import com.example.donations.dto.DonationDTO;
import com.example.donations.dto.PublicReportDTO;
import com.example.donations.dto.ReportDTO;
import com.example.donations.models.Donation;
import com.example.donations.models.DonationReport;


import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Transactional
@ApplicationScoped
public class DonationService {

    @PersistenceContext
    EntityManager db;

    public DonationDTO registerDonation(Float amount, Long idUser, Long idInstitution) {

        LocalDate date = LocalDate.now();
        LocalDateTime start = date.withDayOfMonth(1).atStartOfDay();
        LocalDateTime end = date.withDayOfMonth(date.lengthOfMonth()).atTime(23, 59, 59);

        long donations = Donation.<Donation>
                        find("date BETWEEN ?1 AND ?2 AND idUser= ?3 AND idInstitution = ?4 ", start, end, idUser, idInstitution)
                .count();



        if (donations > 0) {
            throw new WSException("User already did a donation to this country this month");
        }

        Donation donation = new Donation();
        donation.setAmount(amount);
        donation.setIdUser(idUser);
        donation.setIdInstitution(idInstitution);
        donation.setDate(LocalDateTime.now());

        donation.persist();

        return toDTO(donation);

    }

    public List<ReportDTO> donationsByUser(Long userID) {
        /*
        SELECT donation.amount, institution.name, country.name, donation.date
        FROM donation
        INNER JOIN institution ON donation.idInstitution = institution.id
        INNER JOIN country ON institution.idCountry = country.id
        */

        return db.createNamedQuery("Report", ReportDTO.class)
                .setParameter("idUser", userID)
                .getResultList();


    }

    public List<PublicReportDTO> publicReport() {
        return db.createNamedQuery("PublicReport", PublicReportDTO.class)
                .getResultList();
    }

    private DonationDTO toDTO(Donation donation) {
        if (donation != null) {
            return new DonationDTO(
                    donation.getId(),
                    donation.getAmount(),
                    donation.getIdUser(),
                    donation.getIdInstitution(),
                    donation.getDate()
            );
        }
        return null;
    }

}
