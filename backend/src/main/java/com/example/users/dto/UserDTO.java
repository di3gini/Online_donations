package com.example.users.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Column;

@Data
@AllArgsConstructor
public class UserDTO {

    private Long id;
    private String email;
    private String name;
    private String surname;
    private String idNumber;
}