package com.example.common.db.models;

import com.example.common.auth.SessionHolder;
import com.example.users.dto.UserDTO;
import io.quarkus.arc.Unremovable;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.spi.CDI;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.lang.annotation.Annotation;

@Unremovable
@RequestScoped
public class BaseModelListener {

    @PrePersist
    private void onPersist(BaseModel model) {
        Long id = getCurrentUserId();
    }

    @PreUpdate
    private void onUpdate(BaseModel model) {
        Long id = getCurrentUserId();
    }

    private Long getCurrentUserId() {
        SessionHolder currentUser = CDI.current().select(SessionHolder.class, new Annotation[0]).get();
        UserDTO user = currentUser.getUser();
        return (user != null) ? user.getId() : null;
    }

}
