package com.upem.fr.ressource;

import com.upem.fr.model.Calendrier;
import com.upem.fr.service.CalendrierService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class CalendrierRessource {
    @Autowired
    private CalendrierService calendrierService;
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

    @DeleteMapping("calendrier/{id}")
    public void delete(@PathVariable Long id) {
        calendrierService.delete(id);
    }

    @PostMapping("calendrier/{id}")
    public Calendrier update(@PathVariable Long id, @Valid @RequestBody Calendrier calendrier) {
        return calendrierService.update(id, calendrier);
    }


}
