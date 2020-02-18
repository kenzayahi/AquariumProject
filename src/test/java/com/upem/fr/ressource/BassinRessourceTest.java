package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.model.Bassin;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.repository.BassinRepository;
import com.upem.fr.service.AnimalService;
import com.upem.fr.service.BassinService;
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

import static com.upem.fr.model.enumeration.Etat.propre;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BassinRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private BassinService bassinService;
    @MockBean
    private BassinRepository bassinRepository;
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getAll() {
        List bassinList = this.restTemplate.getForObject("http://localhost:" + port + "/bassins", List.class);

        assertEquals(0, bassinList.size());
    }

    @Test
    void create() {
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(1L);
        when(bassinService.create(bassin)).thenReturn(bassin);

        Animal result = this.restTemplate.postForObject("http://localhost:" + port + "/bassins", bassin, Animal.class);
        assertEquals(bassin, result);
    }

    @Test
    void getOne() {
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(1L);
        when(bassinService.getOne(1L)).thenReturn(Optional.of(bassin));

        HttpEntity<Bassin> request = new HttpEntity<>(bassin);
        this.restTemplate.exchange("http://localhost:" + port + "/bassins",
                HttpMethod.POST, request, Bassin.class);

        Bassin resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/bassins/1", Bassin.class);
        assertEquals(bassin, resultGet);
    }

    @Test
    void delete() {
    }

    @Test
    void update() {
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(1L);

        Bassin bassin2 = new Bassin(20,2000,propre);
        bassin2.setId(1L);

        when(bassinService.create(bassin)).thenReturn(bassin);
        when(bassinService.update(1L, bassin2)).thenReturn(bassin2);

        this.restTemplate.postForObject("http://localhost:" + port + "/bassins", bassin, Bassin.class);
        HttpEntity<Bassin> request = new HttpEntity<>(bassin2);

        Bassin result = this.restTemplate.exchange("http://localhost:" + port + "/bassins/1",
                HttpMethod.POST, request, Bassin.class).getBody();

        assertEquals(result, bassin2);
    }

    @Test
    void affectEspece() {
    }
}
