package com.example.common.db.services;

import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Page;
import io.quarkus.panache.common.Parameters;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NonNull;
import lombok.SneakyThrows;
import com.example.common.db.models.BaseModel;
import com.example.common.db.request.ListRequest;
import com.example.common.response.PagedResponse;


import java.lang.reflect.Method;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Builder(setterPrefix = "with")
public final class SearchService {

    private String query;
    private final Parameters parameters;
    private final List<QueryFilter> filters;

    @NonNull
    private final ListRequest request;

    @NonNull
    private final Class<? extends BaseModel> entity;

    @SneakyThrows
    public <K> PagedResponse<K> response(Class<K> type) {
        Parameters activeParameters = Parameters
                .with("active", request.isActive())
                .and("deleted", request.isDeleted());

        boolean shouldOrder = request.getSortOrder() != null
                && request.getSortProperty() != null
                && request.getSortOrder().matches("ASC|DESC");

        boolean shouldSearch = request.getSearch() != null && !request.getSearch().isBlank()
                && request.getSearchProperty() != null && !request.getSearchProperty().isBlank();

        if (shouldSearch) {
            query = query == null ? "" : query;
            String searchQuery = " " + request.getSearchProperty() + " LIKE :search";
            query += query.isBlank() ? searchQuery : " AND " + searchQuery;
            parameters.and("search", "%" + request.getSearch() + "%");
        }

        if (shouldOrder) {
            query = query == null ? "" : query;
            query += " ORDER BY " + request.getSortProperty() + " " + request.getSortOrder();
        }

        Method findAll = entity.getMethod("findAll");
        Method find = entity.getMethod("find", String.class, Parameters.class);
        Method findSimple = entity.getMethod("find", String.class, Map.class);
        PanacheQuery all = (PanacheQuery) (query == null ?
                findAll.invoke(null) :
                parameters == null || parameters.map().isEmpty() ?
                        findSimple.invoke(entity.getDeclaredConstructor().newInstance(), query, Map.of()) :
                        find.invoke(entity.getDeclaredConstructor().newInstance(), query, parameters)
        );
        boolean processLast = request.getLast() != null && !request.getLast().equals(-1);
        all = all.filter("active", activeParameters);
        if (filters != null && !filters.isEmpty()) {
            for (QueryFilter filter : filters) {
                all = all.filter(filter.getName(), filter.getParameters());
            }
        }
        if (processLast) {
            int maxPage = (request.getLast() / request.getPageSize());
            maxPage = Math.min(maxPage, request.getPage()) - 1;
            request.setPage(Math.max(maxPage + 1, 1));
            int pageSize = Math.min(request.getLast(), request.getPageSize());
            all = all.page(Page.of(Math.max(maxPage, 0), pageSize));
        } else {
            all = all.page(Page.of(Math.max(request.getPage() - 1, 0), request.getPageSize()));
        }

        PanacheQuery projected = all.project(type);
        List<K> list = projected.list();

        long count = all.count();
        long total = processLast ? Math.min(request.getLast(), all.count()) : count;
        int page = total > request.getPageSize() ? request.getPage() : 1;
        return PagedResponse.<K>
                        builder()
                .withTotal(total)
                .withCount(list.size())
                .withPage(page)
                .withPageSize(request.getPageSize())
                .withTotalPages(all.pageCount())
                .withItems(list)
                .withSortOrder(shouldOrder ? request.getSortOrder() : null)
                .withSortProperty(shouldOrder ? request.getSortProperty() : null)
                .build();
    }

}