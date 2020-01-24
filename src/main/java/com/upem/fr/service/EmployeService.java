package com.upem.fr.service;

import com.upem.fr.model.Employe;
import com.upem.fr.model.Espece;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.repository.EmployeRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepository employeRepository;
    public Iterable<Employe> getAll() {
        return employeRepository.findAll();
    }

    public Employe create(Employe employe) {
        return employeRepository.save(employe);
    }

    public Optional<Employe> getOne(Long id) {
        return Optional.ofNullable(employeRepository.findById(id).orElseThrow(NotFoundException::new));
    }
    public void delete(Long id) {
        employeRepository.deleteById(id);
    }

    public Employe update(Long id, Employe employe) {
        employeRepository.findById(id).orElseThrow(NotFoundException::new);
        employe.setId(id);
        return employeRepository.save(employe);
    }
}
