package com.upem.fr.ressource;

import com.upem.fr.model.Bassin;
import com.upem.fr.model.Employe;
import com.upem.fr.service.BassinService;
import com.upem.fr.service.EmployeService;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class EmployeRessource {
    @Autowired
    private EmployeService employeService;

    @Autowired
    private BassinService bassinService;

    @GetMapping("/employes")
    public Iterable<Employe> getAll() {
        return employeService.getAll();
    }

    @GetMapping("/simpleEmployes")
    public Iterable<Employe> getAllsimpleEmployes() {
        return employeService.getAllsimpleEmployes();
    }

    @GetMapping("/gestionnaireEmployes")
    public Iterable<Employe> getAllGestionnaireEmployes() {
        return employeService.getAllGestionnaireEmployes();
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

    @GetMapping("employesAddBassin/{employesId}/{bassinId}")
    public ResponseEntity<Employe> affectBassin(@PathVariable Long employesId, @PathVariable Long bassinId) {
        Bassin bassin =bassinService.getOne(bassinId).get();
        if(bassin.getEmployeResponsable() ==null) {
             employeService.addBassin(employeService.getOne(employesId), bassinService.getOne(bassinId));
        }else{
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"le bassin "+bassin.numBassin+"a un responsable");
        }
        return new ResponseEntity<>(employeService.getOne(employesId).get(),HttpStatus.CREATED);
    }
    @GetMapping("employesRemoveBassin/{employesId}/{bassinId}")
    public Iterable<Employe> deleteBassin(@PathVariable Long employesId, @PathVariable Long bassinId) {
        employeService.removeBassin(employesId, bassinService.getOne(bassinId));
        return employeService.getAll();
    }
}
