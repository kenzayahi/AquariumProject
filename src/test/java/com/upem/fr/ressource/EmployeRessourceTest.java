package com.upem.fr.ressource;

import com.upem.fr.model.Employe;
import com.upem.fr.model.enumeration.RoleEmploye;
import com.upem.fr.repository.EmployeRepository;
import com.upem.fr.service.EmployeService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EmployeRessourceTest {
    @LocalServerPort
    private int port;

    @MockBean
    private EmployeService employeService;
    @Autowired
    private TestRestTemplate restTemplate;
    @MockBean
    private EmployeRepository employeRepository;

    @Test
    void getAll() {
        List employes = this.restTemplate.getForObject("http://localhost:" + port + "/employes", List.class);

        assertEquals(0, employes.size());
    }

    @Test
    void getAllsimpleEmployes() {
        Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
        employe.setId(1L);
        List<Employe>gestionnaireEmployes=new ArrayList<>();
        gestionnaireEmployes.add(employe);

        Employe simpleEmploye=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.simpleemploye);
        simpleEmploye.setId(2L);
        List<Employe>simpleEmployes=new ArrayList<>();
        simpleEmployes.add(simpleEmploye);

        when(employeService.getAllsimpleEmployes()).thenReturn(simpleEmployes);

        HttpEntity<Employe> request1 = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employes", HttpMethod.POST, request1, Employe.class);

        HttpEntity<Employe> request2 = new HttpEntity<>(simpleEmploye);
        this.restTemplate.exchange("http://localhost:" + port + "/employes", HttpMethod.POST, request2, Employe.class);

        List<Employe> resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/simpleEmployes", List.class);
        assertEquals(1, resultGet.size());
    }

    @Test
    void create() {
        Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
        employe.setId(1L);
        when(employeService.create(employe)).thenReturn(employe);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        Employe result = this.restTemplate.postForObject("http://localhost:" + port + "/employes",employe, Employe.class);
        assertEquals(employe, result);
    }

    @Test
    void getOne() {
        Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
        employe.setId(1L);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employes",
                HttpMethod.POST, request, Employe.class);
        Employe resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/employes/1", Employe.class);
        assertEquals(employe, resultGet);
    }

    @Test
    void delete() {
        Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
        employe.setId(1L);
        when(employeService.getOne(1L)).thenReturn(Optional.of(employe));
        HttpEntity<Employe> request = new HttpEntity<>(employe);
        this.restTemplate.exchange("http://localhost:" + port + "/employes", HttpMethod.POST, request, Employe.class);
        List employeListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/employes", List.class);
        doNothing().when(employeRepository).delete(employe);
        Employe result = this.restTemplate.exchange("http://localhost:" + port + "/employes/1",
                HttpMethod.DELETE, null, Employe.class).getBody();
        List employeListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/employes", List.class);
        assertEquals(employeListAfter.size(), employeListBefore.size());
    }

    @Test
    void update() {
        Employe employe=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire);
        employe.setId(1L);
        when(employeService.create(employe)).thenReturn(employe);
        Employe employe2=new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza@gmail.com", "kenza", RoleEmploye.gestionnaire);
        employe2.setId(2L);
        when(employeService.update(1L, employe2)).thenReturn(employe2);
        this.restTemplate.postForObject("http://localhost:" + port + "/employes", employe, Employe.class);
        HttpEntity<Employe> request = new HttpEntity<>(employe2);

        Employe result = this.restTemplate.exchange("http://localhost:" + port + "/employes/1",
                HttpMethod.POST, request, Employe.class).getBody();

        assertEquals(result, employe2);
    }
}
