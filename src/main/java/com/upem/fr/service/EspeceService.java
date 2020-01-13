package com.upem.fr.service;

import com.upem.fr.model.Animal;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.repository.EcpeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EcpeceService {
    @Autowired
    private EcpeceRepository ecpeceRepository;

    public Iterable<Animal> getAll() {
        return ecpeceRepository.findAll();
    }

    public Optional<Animal> getOne(Long id) {
        return ecpeceRepository.findById(id);
    }

    public Animal create(Animal animal) {
        return ecpeceRepository.save(animal);
    }

    public void delete(Long id) {
        ecpeceRepository.deleteById(id);
    }

    public Animal update(Long id, Animal animal) {
        ecpeceRepository.findById(id);
        animal.setId(id);
        return ecpeceRepository.save(animal);
    }
}
