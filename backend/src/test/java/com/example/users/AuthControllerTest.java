package com.example.users;

import com.example.common.utils.PasswordUtils;
import com.example.users.controllers.AuthController;
import com.example.users.controllers.request.LoginRequest;
import com.example.users.controllers.request.RegisterRequest;
import com.example.users.controllers.response.LoginResponse;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.core.MediaType;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.OK;

@QuarkusTest
@TestHTTPEndpoint(AuthController.class)
public class AuthControllerTest {

    @Test
    public void testLogin(){
        Jsonb jsonb = JsonbBuilder.create();
        LoginRequest request = new LoginRequest();
        request.setEmail("di3gini3094@gmail.com");
        request.setPassword("12345678");
        String body = jsonb.toJson(request);

        LoginResponse response = given()
                .body(body)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .when()
                .post("/login")
                .then()
                .statusCode(OK.getStatusCode())
                .extract().as(LoginResponse.class);

        Assertions.assertNotNull(response.getToken());
    }

    /*@Test
    public void testRegistration() {
        String uuid = UUID.randomUUID().toString();
        Jsonb jsonb = JsonbBuilder.create();
        RegisterRequest request = new RegisterRequest();

        request.setEmail(uuid+"@email.com");
        request.setName("Usuario");
        request.setSurname("Pruebas");
        request.setIdNumber("12345678901010");
        request.setPassword("La onda ya no es onda");
        request.setPassword(PasswordUtils.generate(8));
        String body = jsonb.toJson(request);

        LoginResponse response = given()
                .body(body)
                .header("Content-Type", MediaType.APPLICATION_JSON)
                .when()
                .post("/register")
                .then()
                .statusCode(OK.getStatusCode())
                .extract().as(LoginResponse.class);
        Assertions.assertNotNull(response.getToken());
    }*/
}
