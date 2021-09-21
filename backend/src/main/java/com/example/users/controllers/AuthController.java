package com.example.users.controllers;

import com.example.users.controllers.request.LoginRequest;
import com.example.users.controllers.request.RegisterRequest;
import com.example.users.controllers.response.LoginResponse;
import com.example.users.dto.UserDTO;
import com.example.users.services.UserService;
import io.smallrye.jwt.build.Jwt;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.MediaType;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Path("auth")
@Tag(name = "Auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthController {

    @Inject
    UserService userService;

    @Inject
    @ConfigProperty(name = "mp.jwt.verify.issuer")
    String issuer;

    @POST
    @Path("/login")
    public LoginResponse login(@Valid LoginRequest request){
        UserDTO user = userService.checkPassword(request.getEmail(), request.getPassword());
        return getLoginResponse(user);
    }

    @POST
    @Path("/register/")
    public LoginResponse register(@Valid RegisterRequest request){
        UserDTO user = userService.register(
                request.getEmail(),
                request.getName(),
                request.getSurname(),
                request.getIdNumber(),
                request.getPassword()
        );
        return getLoginResponse(user);
    }

    private LoginResponse getLoginResponse(UserDTO user) {
        String token = Jwt
                .claims()
                .subject(String.valueOf(user.getIdUser()))
                .upn(user.getEmail())
                .issuedAt(Instant.now())
                .issuer(issuer)
                .expiresAt(Instant.now().plus(12L, ChronoUnit.HOURS))
                .sign();

        return new LoginResponse(user, token);
    }
}
