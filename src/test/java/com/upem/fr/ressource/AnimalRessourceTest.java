package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.model.Espece;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.service.AnimalService;
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
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AnimalRessourceTest {
    @LocalServerPort
    private int port;


    @MockBean
    private AnimalService animalService;
    @MockBean
    private AnimalRepository animalRepository;
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getAll() {
        List animalList = this.restTemplate.getForObject("http://localhost:" + port + "/animaux", List.class);

        assertEquals(0, animalList.size());
    }

    @Test
    void create() {
        Animal animal = new Animal("Requin");
        animal.setId(1L);
        when(animalService.create(animal)).thenReturn(animal);

        Animal result = this.restTemplate.postForObject("http://localhost:" + port + "/animaux", animal, Animal.class);
        assertEquals(animal, result);
    }

    @Test
    void getOne() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        Animal animal = new Animal(espece,"Requin", "mal", "aucun");
        animal.setId(1L);
        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));
        HttpEntity<Animal> request = new HttpEntity<>(animal);
        this.restTemplate.exchange("http://localhost:" + port + "/animaux",
                HttpMethod.POST, request, Animal.class);

        Animal resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/animaux/1", Animal.class);
        assertEquals(animal, resultGet);
    }

    @Test
    void delete() {

        Espece espece = new Espece("Poisson", piscivore, 0);
        Animal animal = new Animal(espece,"Requin", "mal", "aucun");
        animal.setId(1L);

        when(animalService.getOne(1L)).thenReturn(Optional.of(animal));
        HttpEntity<Animal> request = new HttpEntity<>(animal);
        this.restTemplate.exchange("http://localhost:" + port + "/animaux", HttpMethod.POST, request, Animal.class);

        List animalListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/animaux", List.class);

        doNothing().when(animalRepository).delete(animal);
        Animal result = this.restTemplate.exchange("http://localhost:" + port + "/animaux/1",
                HttpMethod.DELETE, null, Animal.class).getBody();
        List animalListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/animaux", List.class);

       assertEquals(animalListAfter.size(), animalListBefore.size());

       // assertThat(animalListAfter).hasSize(animalListBefore.size() - 1);

    }

    @Test
    void update() {
        Espece espece = new Espece("Poisson", piscivore, 0);
        Animal animal = new Animal(espece,"Requin", "mal", "aucun");
        animal.setId(1L);
        when(animalService.create(animal)).thenReturn(animal);
        Animal animal2 = new Animal(espece,"Requin", "mal", "aucun");
        animal2.setId(2L);
        when(animalService.update(1L, animal2)).thenReturn(animal2);

        this.restTemplate.postForObject("http://localhost:" + port + "/animaux", animal, Animal.class);
        HttpEntity<Animal> request = new HttpEntity<>(animal2);

        Animal result = this.restTemplate.exchange("http://localhost:" + port + "/animaux/1",
                HttpMethod.POST, request, Animal.class).getBody();

        assertEquals(result, animal2);

    }
}
