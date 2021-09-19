package com.example.common.db.request;

import lombok.Data;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

import javax.ws.rs.QueryParam;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.temporal.ChronoUnit;

@Data
public class ListRequestWithDates extends ListRequest {

    @QueryParam("from")
    @Parameter(description = "Retrieve from this date, default is 30 days ago, must be a UNIX timestamp in SECONDS")
    private Long createdFrom;

    @QueryParam("to")
    @Parameter(description = "Retrieve to this date, default is today, must be a UNIX timestamp in SECONDS")
    private Long createdTo;

    public LocalDateTime getFrom() {

        if (this.createdFrom == null) {
            return LocalDateTime
                    .now(ZoneId.of("America/Guatemala"))
                    .minus(30, ChronoUnit.DAYS);
        } else {
            return LocalDateTime.ofEpochSecond(this.createdFrom, 0, ZoneOffset.ofHours(-6));
        }
    }

    public LocalDateTime getTo() {
        if (this.createdTo == null) {
            return LocalDateTime
                    .now(ZoneId.of("America/Guatemala"));
        } else {
            return LocalDateTime.ofEpochSecond(this.createdTo, 0, ZoneOffset.ofHours(-6));
        }
    }
}