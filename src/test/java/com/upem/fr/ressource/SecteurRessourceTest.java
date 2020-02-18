package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.model.Espece;
import com.upem.fr.model.Secteur;
import com.upem.fr.repository.SecteurRepository;
import com.upem.fr.service.BassinService;
import com.upem.fr.service.SecteurService;
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

import java.util.List;
import java.util.Optional;

import static com.upem.fr.model.enumeration.RegimeAlimentaire.piscivore;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SecteurRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private SecteurService secteurService;
    @MockBean
    private SecteurRepository secteurRepository;

    @MockBean
    private BassinService bassinService;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getAll() {
        List secteurs = this.restTemplate.getForObject("http://localhost:" + port + "/secteurs", List.class);

        assertEquals(0, secteurs.size());
    }

    @Test
    void create() {
        Secteur secteur = new Secteur("Secteur 7G", "Sud");
        secteur.setId(1L);
        when(secteurService.create(secteur)).thenReturn(secteur);

        Secteur result = this.restTemplate.postForObject("http://localhost:" + port + "/secteurs", secteur, Secteur.class);
        assertEquals(secteur, result);

    }

    @Test
    void getOne() {
        Secteur secteur = new Secteur("Poissons-tropicaux", "Est");
        secteur.setId(1L);
        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteurs",
                HttpMethod.POST, request, Secteur.class);

        Secteur resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/secteurs/1", Secteur.class);
        assertEquals(secteur, resultGet);
    }

    @Test
    void delete() {
        Secteur secteur = new Secteur("Poissons-tropicaux", "Est");
        secteur.setId(1L);

        when(secteurService.getOne(1L)).thenReturn(Optional.of(secteur));
        HttpEntity<Secteur> request = new HttpEntity<>(secteur);
        this.restTemplate.exchange("http://localhost:" + port + "/secteurs", HttpMethod.POST, request, Animal.class);

        List ListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/secteurs", List.class);

        doNothing().when(secteurRepository).delete(secteur);
        Espece result = this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1",
                HttpMethod.DELETE, null, Espece.class).getBody();
        List ListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/secteurs", List.class);
        assertEquals(ListAfter.size(), ListBefore.size());
    }

    @Test
    void update() {
        Secteur secteur = new Secteur("Poissons-tropicaux", "Est");
        secteur.setId(1L);

        Secteur secteur2 = new Secteur("Poissons-tropicaux", "Nord");
        secteur2.setId(1L);

        when(secteurService.create(secteur)).thenReturn(secteur);
        when(secteurService.update(1L, secteur2)).thenReturn(secteur2);

        this.restTemplate.postForObject("http://localhost:" + port + "/secteurs", secteur, Secteur.class);
        HttpEntity<Secteur> request = new HttpEntity<>(secteur2);

        Secteur result = this.restTemplate.exchange("http://localhost:" + port + "/secteurs/1",
                HttpMethod.POST, request, Secteur.class).getBody();

        assertEquals(result, secteur2);
    }
}
