package com.upem.fr.ressource;

import com.upem.fr.model.Bassin;
import com.upem.fr.model.Employe;
import com.upem.fr.model.Secteur;
import com.upem.fr.service.BassinService;
import com.upem.fr.service.SecteurService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class SecteurRessource {
    @Autowired
    private SecteurService secteurService;
    @Autowired
    private BassinService bassinService;

    @GetMapping("/secteurs")
    public Iterable<Secteur> getAll() {
        return secteurService.getAll();
    }

    @PostMapping("/secteurs")
    public ResponseEntity<Secteur> create(@Valid @RequestBody Secteur secteur) {
        return new ResponseEntity<>(secteurService.create(secteur), HttpStatus.CREATED);
    }

    @GetMapping("secteurs/{id}")
    public Optional<Secteur> getOne(@PathVariable Long id) {
        try {
            return secteurService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("secteurs/{id}")
    public void delete(@PathVariable Long id) {
        try {
            secteurService.delete(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @PostMapping("secteurs/{id}")
    public Secteur update(@Valid @PathVariable Long id, @RequestBody Secteur secteur) {
        try {
            return secteurService.update(id, secteur);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @GetMapping("secteurBassin/{secteurId}/{bassinId}")
    public Iterable<Secteur> affectBassintosecteur(@PathVariable Long secteurId, @PathVariable Long bassinId) {
        try {
            secteurService.addBassin(secteurService.getOne(secteurId), bassinService.getOne(bassinId));
            return secteurService.getAll();
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"SecteurId "+  secteurId  +
                    " inconnu or BassinId"+bassinId+"inconnu");
        }
    }
    @GetMapping("deleteBassinSecteur/{secteurId}/{bassinId}")
    public Iterable<Secteur> deleteBassinInSecteur(@PathVariable Long secteurId, @PathVariable Long bassinId) {
        try {
            secteurService.removeBassin(secteurService.getOne(secteurId), bassinService.getOne(bassinId));
            return secteurService.getAll();
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"SecteurId "+  secteurId  +
                    " inconnu or BassinId"+bassinId+"inconnu");
        }
    }
}
