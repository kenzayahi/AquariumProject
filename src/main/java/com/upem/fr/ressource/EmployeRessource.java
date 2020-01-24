package com.upem.fr.ressource;

import com.upem.fr.model.Employe;
import com.upem.fr.model.Espece;
import com.upem.fr.service.EmployeService;
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
public class EmployeRessource {
    @Autowired
    private EmployeService employeService;

    @GetMapping("/employes")
    public Iterable<Employe> getAll() {
        return employeService.getAll();
    }

    @PostMapping("/employes")
    public ResponseEntity<Employe> create(@Valid @RequestBody Employe employe) {
        return new ResponseEntity<>(employeService.create(employe), HttpStatus.CREATED);
    }

    @GetMapping("employes/{id}")
    public Optional<Employe> getOne(@PathVariable Long id) {
        try {
            return employeService.getOne(id);
        }catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"  l'id  "+  id  +  " inconnu");
        }
    }

    @DeleteMapping("employes/{id}")
    public void delete(@PathVariable Long id) {
        employeService.delete(id);
    }

    @PostMapping("employes/{id}")
    public Employe update(@PathVariable Long id, @Valid @RequestBody Employe employe) {
        return employeService.update(id, employe);
    }
}
