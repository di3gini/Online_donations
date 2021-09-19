package com.example.common.errors;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class WSExceptionMapper implements ExceptionMapper<WSException> {

    @Override
    public Response toResponse(WSException exception) {
        WSError error = new WSError(exception.getMessage(), exception.getErrors());
        return Response
                .status(exception.getStatusCode())
                .entity(error)
                .type(MediaType.APPLICATION_JSON)
                .build();
    }
}
