package com.example.common.db.request;

import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

import javax.validation.constraints.Min;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.QueryParam;

@Data
public class ListRequest {

    @DefaultValue("true")
    @QueryParam("active")
    @Parameter(description = "Include active entities")
    boolean active;

    @DefaultValue("false")
    @QueryParam("deleted")
    @Parameter(description = "Include deleted entities")
    boolean deleted;

    @DefaultValue("1")
    @QueryParam("page")
    @Parameter(description = "Page to retrieve")
    private int page;

    @Min(10)
    @DefaultValue("25")
    @QueryParam("pageSize")
    @Parameter(description = "How many items per page")
    private int pageSize;

    @QueryParam("last")
    @Parameter(description = "Retrieve last n results")
    private Integer last;

    @QueryParam("sortOrder")
    @Parameter(description = "Order the results by ASC or DESC")
    private String sortOrder;

    @QueryParam("sortProperty")
    @Parameter(description = "Order the results by this property")
    private String sortProperty;

    @QueryParam("search")
    @Parameter(description = "Search String")
    private String search;

    @QueryParam("searchProperty")
    @Parameter(description = "Property to apply the search")
    private String searchProperty;

}