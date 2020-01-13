package com.upem.fr.service;

import com.upem.fr.model.Espece;
import com.upem.fr.repository.EspeceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EspeceService {
    @Autowired
    private EspeceRepository especeRepository;

    public Iterable<Espece> getAll() {
        return especeRepository.findAll();
    }

    public Optional<Espece> getOne(Long id) {
        return especeRepository.findById(id);
    }

    public Espece create(Espece espece) {
        return especeRepository.save(espece);
    }

    public void delete(Long id) {
        especeRepository.deleteById(id);
    }

    public Espece update(Long id, Espece espece) {
        especeRepository.findById(id);
        espece.setId(id);
        return especeRepository.save(espece);
    }
}
