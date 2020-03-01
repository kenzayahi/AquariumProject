package com.upem.fr.ressource;

import com.upem.fr.model.Employe;
import com.upem.fr.model.enumeration.RoleEmploye;
import com.upem.fr.service.AuthentificationService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthetificationRessourceTest {
    @LocalServerPort
    private int port;

    @MockBean
    private AuthentificationService authentificationService;
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void authentificate() {
       Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
       employe.setId(1L);
       when(authentificationService.getEmploye("kenza","yahi")).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employes",
                HttpMethod.POST, request, Employe.class);
        Employe resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/authentificate/kenza/yahi", Employe.class);
        assertEquals(employe, resultGet);
    }
}
