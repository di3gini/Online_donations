package com.example.common.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder(setterPrefix = "with")
@Schema(name="PagedResponse", description="POJO that represents a list of items paginated")
public class PagedResponse<T> {

    @Schema(name="total", description="Total of items on the entire list")
    private long total;

    @Schema(name="count", description="Total of items on this response")
    private long count;

    @Schema(name="page", description="Requested page number")
    private int page;

    @Schema(name="limit", description="Requested number of items per page")
    private int pageSize;

    @Schema(name="totalPages", description="Total pages this query can retrieve")
    private int totalPages;

    @Schema(name="sortOrder", description="Sort order, DESC or ASC")
    private String sortOrder;

    @Schema(name="sortProperty", description="property sorted by")
    private String sortProperty;

    @Schema(name="items", description="Items found by the query")
    private List<T> items;

}