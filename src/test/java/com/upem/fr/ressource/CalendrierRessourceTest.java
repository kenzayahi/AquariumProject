package com.upem.fr.ressource;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Animal;
import com.upem.fr.model.Bassin;
import com.upem.fr.model.Calendrier;
import com.upem.fr.repository.CalendrierRepository;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.CalendrierService;
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
import static com.upem.fr.model.enumeration.TypeActivity.entretien;
import static com.upem.fr.model.enumeration.TypeActivity.nourrissage;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CalendrierRessourceTest {
    @LocalServerPort
    private int port;

    @MockBean
    private CalendrierRepository calendrierRepository;
    @MockBean
    private CalendrierService calendrierService;
    @Autowired
    private TestRestTemplate restTemplate;
    @Test
    void getAll() {
        List calendrierList = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier", List.class);

        assertEquals(0, calendrierList.size());
    }

    @Test
    void create() {
        Calendrier calendrier=new Calendrier(1,2000);
        calendrier.setId(3L);

        when(calendrierService.create(calendrier)).thenReturn(calendrier);
        when(calendrierService.findBySemaineAndAnnee(3L,2000L)).thenReturn(Optional.of(calendrier));

        Calendrier result = this.restTemplate.postForObject("http://localhost:" + port + "/calendrier", calendrier, Calendrier.class);
        assertEquals(calendrier, result);

    }

    @Test
    void getOne() {
        Calendrier calendrier=new Calendrier(1,2000);
        calendrier.setId(3L);

        when(calendrierService.getOne(3L)).thenReturn(Optional.of(calendrier));
        when(calendrierService.findBySemaineAndAnnee(3L,2000L)).thenReturn(Optional.of(calendrier));

        HttpEntity<Calendrier> request = new HttpEntity<>(calendrier);
        this.restTemplate.exchange("http://localhost:" + port + "/calendrier", HttpMethod.POST, request, Activity.class);

        Calendrier resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier/3", Calendrier.class);
        assertEquals(calendrier, resultGet);
    }

    @Test
    void delete() {
        Calendrier calendrier=new Calendrier(1,2000);
        calendrier.setId(3L);

        when(calendrierService.getOne(3L)).thenReturn(Optional.of(calendrier));

        HttpEntity<Calendrier> request = new HttpEntity<>(calendrier);
        this.restTemplate.exchange("http://localhost:" + port + "/calendrier", HttpMethod.POST, request, Animal.class);

        List calendrierListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/calendrier", List.class);
        doNothing().when(calendrierRepository).delete(calendrier);
        Calendrier result = this.restTemplate.exchange("http://localhost:" + port + "/calendrier/1",
                HttpMethod.DELETE, null, Calendrier.class).getBody();

        List calendrierListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/calendrier", List.class);
        assertEquals(calendrierListAfter.size(), calendrierListBefore.size());
    }

    @Test
    void update() {
        Calendrier calendrier=new Calendrier(1,2000);
        calendrier.setId(3L);

        Calendrier calendrier2=new Calendrier(2,2020);
        calendrier.setId(3L);

        when(calendrierService.create(calendrier)).thenReturn(calendrier);
        when(calendrierService.update(3L, calendrier2)).thenReturn(calendrier2);
        when(calendrierService.findBySemaineAndAnnee(3L,2000L)).thenReturn(Optional.of(calendrier));

        this.restTemplate.postForObject("http://localhost:" + port + "/calendrier", calendrier, Calendrier.class);
        HttpEntity<Calendrier> request = new HttpEntity<>(calendrier2);

        Calendrier result = this.restTemplate.exchange("http://localhost:" + port + "/calendrier/3" , HttpMethod.POST, request, Calendrier.class).getBody();

        assertEquals(result, calendrier2);
    }
}
