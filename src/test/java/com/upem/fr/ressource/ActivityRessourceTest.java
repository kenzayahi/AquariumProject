package com.upem.fr.ressource;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Animal;
import com.upem.fr.model.Bassin;
import com.upem.fr.repository.ActivityRepository;
import com.upem.fr.service.ActivityService;
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
import static com.upem.fr.model.enumeration.TypeActivity.entretien;
import static com.upem.fr.model.enumeration.TypeActivity.nourrissage;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ActivityRessourceTest {
    @LocalServerPort
    private int port;

    @MockBean
    private ActivityService activityService;
    @MockBean
    private BassinService bassinService;
    @MockBean
    private ActivityRepository activityRepository;
    @Autowired
    private TestRestTemplate restTemplate;
    @Test
    void getAll() {
        List activityList = this.restTemplate.getForObject("http://localhost:" + port + "/activities", List.class);

        assertEquals(0, activityList.size());
    }

    @Test
    void create() {
        Activity activity= new Activity(nourrissage, true);
        activity.setId(1L);
        Activity activity2= new Activity(nourrissage, true);
        activity2.setId(1L);
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(2L);
        activity2.setBassin(bassin);
        when(activityService.create(activity)).thenReturn(activity2);
        when(bassinService.getOne(2L)).thenReturn(Optional.of(bassin));
        Activity result = this.restTemplate.postForObject("http://localhost:" + port + "/activitiesCreate/2", activity, Activity.class);
        assertEquals(activity2, result);
    }

    @Test
    void getOne() {
        Activity activity= new Activity(nourrissage, true);
        activity.setId(1L);
        when(activityService.getOne(1L)).thenReturn(Optional.of(activity));
        HttpEntity<Activity> request = new HttpEntity<>(activity);
        this.restTemplate.exchange("http://localhost:" + port + "/activities",
                HttpMethod.POST, request, Activity.class);
        Activity resultGet = this.restTemplate.getForObject("http://localhost:" + port + "/activities/1", Activity.class);
        assertEquals(activity, resultGet);
    }

    @Test
    void delete() {
        Activity activity= new Activity(nourrissage, true);
        activity.setId(1L);

       when(activityService.getOne(1L)).thenReturn(Optional.of(activity));

        HttpEntity<Activity> request = new HttpEntity<>(activity);
        this.restTemplate.exchange("http://localhost:" + port + "/activities", HttpMethod.POST, request, Animal.class);
        List activityListBefore= this.restTemplate.getForObject("http://localhost:" + port + "/activities", List.class);
        doNothing().when(activityRepository).delete(activity);
        Activity result = this.restTemplate.exchange("http://localhost:" + port + "/activities/1",
                HttpMethod.DELETE, null, Activity.class).getBody();
        List activityListAfter = this.restTemplate.getForObject("http://localhost:" + port + "/activities", List.class);
        assertEquals(activityListAfter.size(), activityListBefore.size());
   }

    @Test
    void update() {
        Activity activity= new Activity(nourrissage, true);
        activity.setId(1L);
        when(activityService.create(activity)).thenReturn(activity);
        Activity activity2= new Activity(entretien, true);
        activity2.setId(2L);
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(9L);
        activity2.setBassin(bassin);

        when(activityService.update(1L, activity2)).thenReturn(activity2);
        when(bassinService.getOne(9L)).thenReturn(Optional.of(bassin));

        this.restTemplate.postForObject("http://localhost:" + port + "/activities", activity, Activity.class);
        HttpEntity<Activity> request = new HttpEntity<>(activity2);

        Activity result = this.restTemplate.exchange("http://localhost:" + port + "/activities/1/9",
                HttpMethod.POST, request, Activity.class).getBody();

        assertEquals(result, activity2);
    }
    @Test
    void getBassin(){
        Activity activity2= new Activity(entretien, true);
        activity2.setId(2L);
        Bassin bassin = new Bassin(10,1000,propre);
        bassin.setId(9L);
        activity2.setBassin(bassin);

        when(activityService.create(activity2)).thenReturn(activity2);
        when(bassinService.getOne(9L)).thenReturn(Optional.of(bassin));
        when(activityService.getOne(1L)).thenReturn(Optional.of(activity2));


        this.restTemplate.postForObject("http://localhost:" + port + "/activities", activity2, Activity.class);
        HttpEntity<Activity> request = new HttpEntity<>(activity2);

        Bassin result = this.restTemplate.exchange("http://localhost:" + port + "/activity_get_bassin/1",
                HttpMethod.GET, request, Bassin.class).getBody();

        assertEquals(result,bassin);
    }
}
