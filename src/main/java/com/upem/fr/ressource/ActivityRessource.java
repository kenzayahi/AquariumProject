package com.upem.fr.ressource;

import com.upem.fr.model.*;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.BassinService;
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
    private final ActivityService activityService;
    private final EmployeService employeService;
    private final BassinService bassinService;

    public ActivityRessource(ActivityService activityService, EmployeService employeService, BassinService bassinService) {
        this.activityService = activityService;
        this.employeService = employeService;
        this.bassinService = bassinService;
    }

    @GetMapping("/activities")
    public Iterable<Activity> getAll() {
        return activityService.getAll();
    }

    @PostMapping("/activitiesCreate/{idBassin}")
    public ResponseEntity<Activity> create(@Valid @RequestBody Activity activity, @PathVariable long idBassin) {
        Optional<Bassin> bassin= bassinService.getOne(idBassin);
        activity.setBassin(bassin.get());
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

    @PostMapping("activities/{id}/{idBassin}")
    public Activity update(@Valid @PathVariable Long id, @RequestBody Activity activity, @PathVariable long idBassin) {
        activity.setBassin(bassinService.getOne(idBassin).get());
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

    @GetMapping("activity_get_bassin/{id}")
    public Optional<Bassin> getBassin(@PathVariable Long id) {
        try {
            return bassinService.getOne(activityService.getOne(id).get().getBassin().getId());
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }
}
