package com.example.common.errors;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.Map;

@Data
@RequiredArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class WSException extends WebApplicationException {

    @NonNull
    private String message;

    private Map<String, Object> errors;

    private Response.Status statusCode = Response.Status.BAD_REQUEST;

    public WSException(String message, Map<String, Object> errors){
        this.message = message;
        this.errors = errors;
    }

    public WSException as(Response.Status status){
        this.statusCode = status;
        return this;
    }
}