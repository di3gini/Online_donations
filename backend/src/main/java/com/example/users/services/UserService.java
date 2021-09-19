package com.example.users.services;

import at.favre.lib.crypto.bcrypt.BCrypt;
import com.example.common.errors.WSException;
import com.example.users.dto.UserDTO;
import com.example.users.models.User;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.core.Response;
import java.util.Optional;

@Transactional
@ApplicationScoped
public class UserService {

    public Optional<UserDTO> findById(Long id) {
        return User
                .find("id", id)
                .project(UserDTO.class)
                .singleResultOptional();
    }


    public UserDTO checkPassword(String email, String password) {
        WSException error = new WSException("Credenciales inválidas").as(Response.Status.UNAUTHORIZED);
        User user = User.<User>
                        find("email", email)
                .singleResultOptional()
                .orElseThrow(() -> error);

        BCrypt.Result result = BCrypt.verifyer().verify(password.getBytes(), user.getPassword().getBytes());
        if (!result.verified) {
            throw error;
        }

        return toDTO(user);
    }

    public UserDTO register(String email, String name, String surname, String idNumber, String password) {
        User user = User.<User>
                        find("email", email)
                .singleResultOptional()
                .orElse(null);

        if (user != null)
            throw new WSException("Ya existe un usuario registrado con este email");

        user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setIdNumber(idNumber);
        user.setPassword(BCrypt.withDefaults().hashToString(12, password.toCharArray()));
        user.persist();

        return toDTO(user);
    }

    private UserDTO toDTO(User user) {
        if (user != null) {
            return new UserDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getName(),
                    user.getSurname(),
                    user.getIdNumber()
            );
        }
        return null;
    }

}
