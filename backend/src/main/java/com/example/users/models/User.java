package com.example.users.models;

import com.example.common.db.models.BaseModel;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "user")
public class User extends BaseModel {

        @Column
        private String email;

        @Column
        private String name;

        @Column
        private String surname;

        @Column(name = "idNumber")
        private String idNumber;

        @Column
        private String password;
}