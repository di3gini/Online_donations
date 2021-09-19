package com.example.common.db.models;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.Data;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import javax.persistence.*;
import java.time.LocalDateTime;

@FilterDef(name = "active", parameters = {@ParamDef(name = "active", type = "boolean"), @ParamDef(name = "deleted", type = "boolean")})
@Filter(name = "active", condition = "(( :active = :deleted AND :active = true AND :deleted = true) OR (deleted = false AND :active = true) OR (deleted = true AND :deleted = true))")

@Data
@MappedSuperclass
@EntityListeners({BaseModelListener.class})

public class BaseModel extends PanacheEntityBase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
