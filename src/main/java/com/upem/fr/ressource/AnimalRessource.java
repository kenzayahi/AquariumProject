package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.model.Espece;
import com.upem.fr.service.AnimalService;
import com.upem.fr.service.EspeceService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;
@RestController
public class AnimalRessource {
    @Autowired
    private AnimalService animalService;
    @Autowired
    private EspeceService especeService;

    @GetMapping("/animaux")
    public Iterable<Animal> getAll() {
        return animalService.getAll();
    }

    @PostMapping("/animaux/{id}")
    public Animal create(@Valid   @RequestBody Animal animal, @PathVariable Long id) {
        Optional<Espece>optionalEspece=(especeService.getOne(id));
        animal.setEspece(optionalEspece.get());
        return animalService.create(animal);
    }

    @GetMapping("animaux/{id}")
    public Optional<Animal> getOne(@PathVariable Long id) {
        try {
            return animalService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @GetMapping("animaux_get_espece/{id}")
    public Optional<Espece> getEspece(@PathVariable Long id) {
        try {
            return especeService.getOne(animalService.getOne(id).get().getEspece().getId());
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("animaux/{id}")
    public void delete(@PathVariable Long id) {
        animalService.delete(id);
    }


    @PostMapping("animaux/{id}/{id2}")
    public Animal update( @Valid @PathVariable Long id, @Valid @PathVariable Long id2, @RequestBody Animal animal) {
        animal.espece = especeService.getOne(id2).get();
        return animalService.update(id, animal);
    }
}
