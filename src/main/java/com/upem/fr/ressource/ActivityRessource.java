package com.upem.fr.ressource;

import com.upem.fr.model.*;
import com.upem.fr.service.ActivityService;
import com.upem.fr.service.BassinService;
import com.upem.fr.service.CalendrierService;
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
    private final CalendrierService calendrierService;

    public ActivityRessource(ActivityService activityService, EmployeService employeService, BassinService bassinService, CalendrierService calendrierService) {
        this.activityService = activityService;
        this.employeService = employeService;
        this.bassinService = bassinService;
        this.calendrierService = calendrierService;
    }

    @GetMapping("/activities")
    public Iterable<Activity> getAll() {
        return activityService.getAll();
    }

    @PostMapping("/activitiesCreate/{idBassin}/{numSemaine}/{annee}")
    public ResponseEntity<Activity> create(@Valid @RequestBody Activity activity, @PathVariable long idBassin, @PathVariable Long numSemaine, @PathVariable Long annee) {
        Optional<Bassin> bassin= bassinService.getOne(idBassin);
        Optional<Calendrier> c = calendrierService.findBySemaineAndAnnee(numSemaine, annee);
        if(!c.isPresent()){
            Calendrier cal = new Calendrier();
            cal.setNumSemaine(numSemaine);
            cal.setAnnee(annee);
            calendrierService.create(cal);
        }
        activity.setBassin(bassin.get());
        return new ResponseEntity<>(activityService.create(activity, calendrierService.findBySemaineAndAnnee(numSemaine, annee).get()), HttpStatus.CREATED);
    }

    @GetMapping("activities/{id}")
    public Optional<Activity> getOne(@PathVariable Long id) {
        if(!activityService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return activityService.getOne(id);

    }

    @DeleteMapping("activities/{id}/{idSemaine}/{annee}")
    public void delete(@PathVariable Long id, @PathVariable Long idSemaine, @PathVariable Long annee) {

        if(!activityService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        activityService.delete(id, calendrierService.findBySemaineAndAnnee(idSemaine, annee));
    }

    @PostMapping("activities/{id}/{idBassin}/{numSemaineAncienne}/{anneeAncienne}/{numSemaineNouvelle}/{anneeNouvelle}")
    public Activity update(@Valid @PathVariable Long id, @RequestBody Activity activity, @PathVariable long idBassin,
                           @PathVariable Long numSemaineAncienne, @PathVariable Long anneeAncienne,
                           @PathVariable Long numSemaineNouvelle, @PathVariable Long anneeNouvelle) {

            Optional<Calendrier> c = calendrierService.findBySemaineAndAnnee(numSemaineNouvelle, anneeNouvelle);
            if(!c.isPresent()){
                Calendrier cal = new Calendrier();
                cal.setNumSemaine(numSemaineNouvelle);
                cal.setAnnee(anneeNouvelle);
                calendrierService.create(cal);
            }

            if(!bassinService.getOne(idBassin).isPresent())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

            if(!activityService.getOne(id).isPresent())
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");


            activity.setBassin(bassinService.getOne(idBassin).get());
            return activityService.update(id, activity, calendrierService.findBySemaineAndAnnee(numSemaineAncienne, anneeAncienne),
                    calendrierService.findBySemaineAndAnnee(numSemaineNouvelle, anneeNouvelle));

    }

    @GetMapping("activitiesResponsable/{activityid}/{employeId}")
    public Iterable<Activity> affectResponsable(@PathVariable Long activityid, @PathVariable Long employeId) {

        if(!activityService.getOne(activityid).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  activityid  +  " inconnu");

        if(!employeService.getOne(employeId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  employeId  +  " inconnu");

        activityService.addEmploye(activityService.getOne(activityid), employeService.getOne(employeId));
            return activityService.getAll();

    }
    @GetMapping("deleteResponsable/{activityid}/{employeId}")
    public Iterable<Activity> deleteResponsable(@PathVariable Long activityid, @PathVariable Long employeId) {

        if(!activityService.getOne(activityid).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  activityid  +  " inconnu");


        if(!employeService.getOne(employeId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  employeId  +  " inconnu");

        activityService.removeEmploye(activityService.getOne(activityid), employeService.getOne(employeId));
            return activityService.getAll();

    }

    @GetMapping("activity_get_bassin/{id}")
    public Optional<Bassin> getBassin(@PathVariable Long id) {

        if(!bassinService.getOne(activityService.getOne(id).get().getBassin().getId()).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  activityService.getOne(id).get().getBassin().getId()  +  " inconnu");

        if(!activityService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return bassinService.getOne(activityService.getOne(id).get().getBassin().getId());

    }
}
