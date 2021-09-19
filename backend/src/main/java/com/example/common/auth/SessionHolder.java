package com.example.common.auth;

import com.example.users.dto.UserDTO;
import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class SessionHolder {
    @Getter
    @Setter

    private UserDTO user;
}
