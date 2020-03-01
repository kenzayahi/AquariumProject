package com.upem.fr.ressource;

import com.upem.fr.model.Espece;
import com.upem.fr.service.EspeceService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class EspeceRessource {
    @Autowired
    private EspeceService ecpeceService;

    @GetMapping("/especes")
    public Iterable<Espece> getAll() {
        return ecpeceService.getAll();
    }

    @PostMapping("/especes")
    public ResponseEntity<Espece> create(@Valid @RequestBody Espece espece) {

        return new ResponseEntity<>(ecpeceService.create(espece), HttpStatus.CREATED);
    }

    @GetMapping("especes/{id}")
    public Optional<Espece> getOne(@PathVariable Long id) {
        try {
            return ecpeceService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("especes/{id}")
    public void delete(@PathVariable Long id) {
        try {
            ecpeceService.delete(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @PostMapping("especes/{id}")
    public Espece update(@PathVariable Long id,@Valid @RequestBody Espece espece) {
        try {
            return ecpeceService.update(id, espece);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }
}
