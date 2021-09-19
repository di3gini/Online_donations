package com.example.users.controllers.response;

import com.example.users.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private UserDTO user;
    private String token;

}
