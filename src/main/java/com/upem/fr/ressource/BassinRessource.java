package com.upem.fr.ressource;

import com.upem.fr.model.Bassin;
import com.upem.fr.service.BassinService;
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
public class BassinRessource {
    @Autowired
    private BassinService bassinService;

    @Autowired
    private EspeceService especeService;

    @GetMapping("/bassins")
    public Iterable<Bassin> getAll() {
        return bassinService.getAll();
    }

    @PostMapping("/bassins")
    public ResponseEntity<Bassin> create(@Valid @RequestBody Bassin bassin) {
        return new ResponseEntity<>(bassinService.create(bassin), HttpStatus.CREATED);
    }

    @GetMapping("bassins/{id}")
    public Optional<Bassin> getOne(@PathVariable Long id) {
        try {
            return bassinService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("bassins/{id}")
    public void delete(@PathVariable Long id) {
        try {
            bassinService.delete(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @PostMapping("bassins/{id}")
    public Bassin update(@Valid @PathVariable Long id, @RequestBody Bassin bassin) {
        try {
            return bassinService.update(id, bassin);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @GetMapping("bassins/{bassinId}/{especeId}")
    public Iterable<Bassin> affectEspece(@PathVariable Long bassinId, @PathVariable Long especeId) {
        try {
            bassinService.addEspece(bassinService.getOne(bassinId), especeService.getOne(especeId));
            return bassinService.getAll();
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bassin avec l'id  "+  bassinId  +
                    " inconnu ou Espèce avec l'id"+especeId+"inconnu");
        }
    }
    @GetMapping("deleteEspece/{bassinId}/{especeId}")
    public Iterable<Bassin> deleteEspece(@PathVariable Long bassinId, @PathVariable Long especeId) {
        try {
            bassinService.removeEspece(bassinService.getOne(bassinId), especeService.getOne(especeId));
            return bassinService.getAll();
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Bassin avec l'id  "+  bassinId  +
                    " inconnu ou Espèce avec l'id"+especeId+"inconnu");
        }
    }
}
