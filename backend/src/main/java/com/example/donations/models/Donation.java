package com.example.donations.models;

import com.example.common.db.models.BaseModel;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;


@NamedQueries({
        @NamedQuery(
                name = "Report",
                query = "SELECT new com.example.donations.dto.ReportDTO(donation.id, donation.amount, institution.name, country.name, donation.date) \n" +
                        "FROM Donation donation \n " +
                        "INNER JOIN Institution institution ON donation.idInstitution = institution.id \n" +
                        "INNER JOIN Country country ON institution.id_country = country.id " +
                        "WHERE donation.idUser = :idUser "
        ),
        @NamedQuery(
                name = "PublicReport",
                query = "SELECT new com.example.donations.dto.PublicReportDTO(donation.id, user.name, user.surname, " +
                        "user.idNumber, institution.name, country.name, donation.amount, donation.date) \n" +
                        "FROM Donation donation \n " +
                        "INNER JOIN Institution institution ON donation.idInstitution = institution.id \n" +
                        "INNER JOIN Country country ON institution.id_country = country.id " +
                        "INNER JOIN User user ON donation.idUser = user.id "
        )
})

@Data
@Entity
@Table(name = "donation")
public class Donation extends BaseModel {

    @Column
    private Float amount;

    @Column
    private Long idUser;

    @Column
    private Long idInstitution;

    @Column
    private LocalDateTime date;

}
