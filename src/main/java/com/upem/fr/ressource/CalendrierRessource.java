package com.upem.fr.ressource;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Calendrier;
import com.upem.fr.service.CalendrierService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Optional;

@RestController
public class CalendrierRessource {
    @Autowired
    private CalendrierService calendrierService;
    @GetMapping("/calendrier")
    public Iterable<Calendrier> getAll() {
        return calendrierService.getAll();
    }
    @GetMapping("calendrierOf/{semaine}/{annee}/{idEmploye}")
    public Iterable<Activity> getActivitesOf(@PathVariable Long semaine, @PathVariable Long annee, @PathVariable Long idEmploye){
        if(!calendrierService.findBySemaineAndAnnee(semaine, annee).isPresent()) {
            return new ArrayList<>();
        }
        return calendrierService.findActivitesOf(semaine, annee, idEmploye);
    }
    @GetMapping("calendrierOf/{semaine}/{annee}")
    public Iterable<Activity> getActivitesOfEveryone(@PathVariable Long semaine, @PathVariable Long annee){
        if(!calendrierService.findBySemaineAndAnnee(semaine, annee).isPresent()) {
            return new ArrayList<>();
        }
        return calendrierService.findBySemaineAndAnnee(semaine, annee).get().getActivities();
    }

    @PostMapping("/calendrier")
    public ResponseEntity<Calendrier> create(@Valid @RequestBody Calendrier calendrier) {
        return new ResponseEntity<>(calendrierService.create(calendrier), HttpStatus.CREATED);
    }

    @GetMapping("calendrier/{id}")
    public Optional<Calendrier> getOne(@PathVariable Long id) {
        if(!calendrierService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return calendrierService.getOne(id);

    }

    @DeleteMapping("calendrier/{id}")
    public void delete(@PathVariable Long id) {
        if(!calendrierService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        calendrierService.delete(id);

    }

    @PostMapping("calendrier/{id}")
    public Calendrier update(@PathVariable Long id, @Valid @RequestBody Calendrier calendrier) {
        if(!calendrierService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return calendrierService.update(id, calendrier);

    }


}
