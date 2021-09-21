package com.example.donations.models;

import com.example.common.db.models.BaseModel;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;


@Data
@Entity
@Table(name = "donation")
public class DonationReport extends BaseModel {

    @Column
    private Float amount;

    @Column
    private Long idUser;

    @Column
    private String institutionName;
    @Column
    private LocalDateTime date;

    @Column
    private String countryName;


}
