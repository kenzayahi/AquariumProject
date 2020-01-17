package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.model.Bassin;
import com.upem.fr.model.Espece;
import com.upem.fr.repository.EspeceRepository;
import com.upem.fr.service.EspeceService;
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
import static com.upem.fr.model.enumeration.RegimeAlimentaire.piscivore;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EspeceRessourceTest {

    @LocalServerPort
    private int port;


    @MockBean
    private EspeceService especeService;
    @MockBean
    private EspeceRepository especeRepository;


    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getAll() {
        List especes = this.restTemplate.getForObject("http://localhost:" + port + "/especes", List.class);

        assertEquals(0, especes.size());
    }

    @Test
    void create() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        espece.setId(1L);
        when(especeService.create(espece)).thenReturn(espece);

        Espece result = this.restTemplate.postForObject("http://localhost:" + port + "/especes", espece, Espece.class);
        assertEquals(espece, result);
    }

    @Test
    void getOne() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        espece.setId(1L);
        when(especeService.getOne(1L)).thenReturn(Optional.of(espece));
        HttpEntity<Espece> request = new HttpEntity<>(espece);
        this.restTemplate.exchange("http://localhost:" + port + "/especes",
                HttpMethod.POST, request, Espece.class);

        Espece resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/especes/1", Espece.class);
        assertEquals(espece, resultGet);
    }

    @Test
    void delete() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        espece.setId(1L);

        when(especeService.getOne(1L)).thenReturn(Optional.of(espece));
        HttpEntity<Espece> request = new HttpEntity<>(espece);
        this.restTemplate.exchange("http://localhost:" + port + "/especes", HttpMethod.POST, request, Animal.class);

        List animalListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/especes", List.class);

        doNothing().when(especeRepository).delete(espece);
        Espece result = this.restTemplate.exchange("http://localhost:" + port + "/especes/1",
                HttpMethod.DELETE, null, Espece.class).getBody();
        List animalListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/especes", List.class);
        assertEquals(animalListAfter.size(), animalListBefore.size());
       // assertEquals(result.getMenacee(),espece.getMenacee());


    }

    @Test
    void update() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        espece.setId(1L);

        when(especeService.create(espece)).thenReturn(espece);

        Espece espece2 = new Espece("Poisson", piscivore, 5);
        espece2.setId(1L);

        when(especeService.update(1L, espece2)).thenReturn(espece2);

        this.restTemplate.postForObject("http://localhost:" + port + "/especes", espece, Espece.class);
        HttpEntity<Espece> request = new HttpEntity<>(espece2);

        Espece result = this.restTemplate.exchange("http://localhost:" + port + "/especes/1",
                HttpMethod.POST, request, Espece.class).getBody();

        assertEquals(result, espece2);

    }
}
