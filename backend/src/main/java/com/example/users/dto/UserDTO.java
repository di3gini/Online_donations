package com.example.users.dto;

import lombok.AllArgsConstructor;
import lombok.Data;



@Data
@AllArgsConstructor
public class UserDTO {

    private Long idUser;
    private String email;
    private String name;
    private String surname;
    private String idNumber;
}