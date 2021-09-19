package com.example.common.db.services;

import io.quarkus.panache.common.Parameters;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QueryFilter {
    private String name;
    private Parameters parameters;
}
