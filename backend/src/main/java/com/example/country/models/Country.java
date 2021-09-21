package com.example.country.models;

import com.example.common.db.models.BaseModel;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "country")
public class Country extends BaseModel{

    @Column
    private String name;
}
