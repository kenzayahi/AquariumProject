package com.upem.fr.ressource;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Bassin;
import com.upem.fr.model.Employe;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.EmployeService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
        return activityService.getAll();
    }

    @PostMapping("/activitiesCreate")
    public ResponseEntity<Activity> create(@Valid   @RequestBody Activity activity) {
        return new ResponseEntity<>(activityService.create(activity), HttpStatus.CREATED);

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

    @PostMapping("activities/{id}")
    public Activity update( @Valid @PathVariable Long id, @RequestBody Activity activity) {
        return activityService.update(id, activity);
    }
    @GetMapping("activitiesResponsable/{activityid}/{employeId}")
    public Iterable<Activity> affectEspece(@PathVariable Long activityid, @PathVariable Long employeId) {
        activityService.addEmploye(activityService.getOne(activityid), employeService.getOne(employeId));
        return activityService.getAll();
    }
    @GetMapping("deleteResponsable/{activityid}/{employeId}")
    public Iterable<Activity> deleteEspece(@PathVariable Long activityid, @PathVariable Long employeId) {
        activityService.removeEmploye(activityService.getOne(activityid), employeService.getOne(employeId));
        return activityService.getAll();
    }
}
