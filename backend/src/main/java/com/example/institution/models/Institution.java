package com.example.institution.models;

import com.example.common.db.models.BaseModel;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "institution")
public class Institution extends BaseModel {

    @Column
    private String name;

    @Column
    private Long id_country;

}
