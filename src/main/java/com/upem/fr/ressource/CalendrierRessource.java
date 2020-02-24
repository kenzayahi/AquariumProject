package com.upem.fr.ressource;

import com.upem.fr.model.Calendrier;
import com.upem.fr.model.Employe;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.CalendrierService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.Optional;

@RestController
public class CalendrierRessource {
    @Autowired
    private CalendrierService calendrierService;
    @Autowired
    private ActivityService activityService;
    @GetMapping("/calendrier")
    public Iterable<Calendrier> getAll() {
        return calendrierService.getAll();
    }

    @PostMapping("/calendrier")
    public ResponseEntity<Calendrier> create(@Valid @RequestBody Calendrier calendrier) {
        return new ResponseEntity<>(calendrierService.create(calendrier), HttpStatus.CREATED);
    }

    @GetMapping("calendrier/{id}")
    public Optional<Calendrier> getOne(@PathVariable Long id) {
        try {
            return calendrierService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }
    @GetMapping("calendrierByEmploye/{employe}")
    public Iterable<Calendrier> getAllByEmploye(@PathVariable Employe employe) {
        try {
            return calendrierService.getAllByEmploye(employe);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  employe  "+  employe  +  " inconnu");
        }
    }

    @DeleteMapping("calendrier/{id}")
    public void delete(@PathVariable Long id) {
        calendrierService.delete(id);
    }

    @PostMapping("calendrier/{id}")
    public Calendrier update(@PathVariable Long id, @Valid @RequestBody Calendrier calendrier) {
        return calendrierService.update(id, calendrier);
    }

    @GetMapping("calendrierAddActivity/{calendrierId}/{activityId}")
    public Iterable<Calendrier> affectActivity(@PathVariable Long calendrierId, @PathVariable Long activityId) {
        calendrierService.addActivity(calendrierService.getOne(calendrierId), activityService.getOne(activityId));
        return calendrierService.getAll();
    }
    @GetMapping("calendrierRemoveActivity/{calendrierId}/{activityId}")
    public Iterable<Calendrier> deleteActivity(@PathVariable Long calendrierId, @PathVariable Long activityId) {
        calendrierService.removeActivity(calendrierService.getOne(calendrierId), activityService.getOne(activityId));
        return calendrierService.getAll();
    }


}
