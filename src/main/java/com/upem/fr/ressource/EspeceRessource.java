package com.upem.fr.ressource;

import com.upem.fr.model.Animal;
import com.upem.fr.service.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@RestController
public class AnimalRessource {
    @Autowired
    private AnimalService animalService;

    @GetMapping("/animaux")
    public Iterable<Animal> getAll() {
        return animalService.getAll();
    }

    @PostMapping("/animaux")
    public Animal create(@RequestBody Animal animal) {
        return animalService.create(animal);
    }

    @GetMapping("animaux/{id}")
    public Optional<Animal> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return animalService.getOne(id);
    }

    @DeleteMapping("animaux/{id}")
    public void delete(@PathVariable Long id) {
        animalService.delete(id);
    }

    @PostMapping("animaux/{id}")
    public Animal update(@PathVariable Long id, @RequestBody Animal animal) {
        return animalService.update(id, animal);
    }
}
