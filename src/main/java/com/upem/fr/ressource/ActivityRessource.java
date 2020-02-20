package com.upem.fr.ressource;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Animal;
import com.upem.fr.model.Employe;
import com.upem.fr.model.Espece;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.AnimalService;
import com.upem.fr.service.EmployeService;
import com.upem.fr.service.EspeceService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class ActivityRessource {
    @Autowired
    private ActivityService activityService;
    @Autowired
    private EmployeService employeService;

    @GetMapping("/activities")
    public Iterable<Activity> getAll() {
        activityService.getAll().forEach(x -> System.out.println(x));
        return activityService.getAll();
    }

    @PostMapping("/activitiesCreate/{idEmploye}")
    public Activity create(@Valid   @RequestBody Activity activity,@PathVariable Long idResponsable) {
        Optional<Employe>responsable=(employeService.getOne(idResponsable));
        activity.setResponsable(responsable.get());
        return activityService.create(activity);
    }

    @GetMapping("activities/{id}")
    public Optional<Activity> getOne(@PathVariable Long id) {
        try {
            return activityService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("activities/{id}")
    public void delete(@PathVariable Long id) {
        activityService.delete(id);
    }

    @PostMapping("activities/{id}/{idResponsable}")
    public Activity update( @Valid @PathVariable Long id, @Valid @PathVariable Long idResponsable, @RequestBody Activity activity) {
        Optional<Employe> responsable =(employeService.getOne(idResponsable));
        activity.setResponsable(responsable.get());
        return activityService.update(id, activity);
    }
}
