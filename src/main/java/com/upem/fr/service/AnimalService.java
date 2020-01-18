package com.upem.fr.service;

import com.upem.fr.model.Animal;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AnimalService {
    @Autowired
    private AnimalRepository animalRepository;

    public Iterable<Animal> getAll() {
        return animalRepository.findAll();
    }

    public Optional<Animal> getOne(Long id) {

        return Optional.ofNullable(animalRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public Animal create(Animal animal) {

        return animalRepository.save(animal);
    }

    public void delete(Long id) {
          animalRepository.deleteById(id);
    }

    public Animal update(Long id, Animal animal) {

        animalRepository.findById(id).orElseThrow(NotFoundException::new);
        animal.setId(id);
        return animalRepository.save(animal);
    }
}
