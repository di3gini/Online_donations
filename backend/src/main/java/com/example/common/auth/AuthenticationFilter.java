package com.example.common.auth;

import com.example.common.errors.WSException;
import com.example.users.dto.UserDTO;
import com.example.users.services.UserService;
import lombok.SneakyThrows;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.ext.Provider;


@Secured
@Provider
@Priority(Priorities.AUTHENTICATION)

public class AuthenticationFilter implements ContainerRequestFilter {
    @Inject
    SessionHolder session;

    @Inject
    UserService userService;

    @Inject
    JsonWebToken token;

    @Override
    @SneakyThrows

    public void filter(ContainerRequestContext requestContext){
        WSException noAuthenticated = new WSException("Not authenticated");

        if (token == null || token.getSubject() == null) {
            throw noAuthenticated;
        }

        Long id = Long.valueOf(token.getSubject());
        UserDTO user = userService
                .findById(id)
                .orElseThrow(() -> noAuthenticated);

        session.setUser(user);
    }
}



