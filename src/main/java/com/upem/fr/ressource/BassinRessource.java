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
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return bassinService.getOne(id);

    }

    @DeleteMapping("bassins/{id}")
    public void delete(@PathVariable Long id) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

            bassinService.delete(id);

    }

    @PostMapping("bassins/{id}")
    public Bassin update(@Valid @PathVariable Long id, @RequestBody Bassin bassin) {
        if(!bassinService.getOne(id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");

        return bassinService.update(id, bassin);

    }

    @GetMapping("bassins/{bassinId}/{especeId}")
    public Iterable<Bassin> affectEspece(@PathVariable Long bassinId, @PathVariable Long especeId) {
        if(!bassinService.getOne(bassinId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  bassinId  +  " inconnu");

        if(!especeService.getOne(especeId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  especeId  +  " inconnu");

        bassinService.addEspece(bassinService.getOne(bassinId), especeService.getOne(especeId));
            return bassinService.getAll();

    }
    @GetMapping("deleteEspece/{bassinId}/{especeId}")
    public Iterable<Bassin> deleteEspece(@PathVariable Long bassinId, @PathVariable Long especeId) {
        if(!bassinService.getOne(bassinId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  bassinId  +  " inconnu");

        if(!especeService.getOne(especeId).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  especeId  +  " inconnu");

        bassinService.removeEspece(bassinService.getOne(bassinId), especeService.getOne(especeId));
            return bassinService.getAll();

    }
}
