package com.upem.fr.service;

import com.upem.fr.model.Bassin;
import com.upem.fr.model.Employe;
import com.upem.fr.model.Espece;
import com.upem.fr.model.enumeration.RoleEmploye;
import com.upem.fr.repository.AnimalRepository;
import com.upem.fr.repository.EmployeRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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

    public Employe addBassin(Optional<Employe> employe, Optional<Bassin> bassin) {
        Employe e = employe.get();
        e.addBassin(bassin.get());
        bassin.get().setEmployeResponsable(e);
        return employeRepository.save(e);
    }

    public Employe removeBassin(Long employesId, Optional<Bassin> bassin) {
        Employe e = getOne(employesId).get();
        List<Bassin> l = e.getBassinsresponsable();
        l.remove(bassin.get());
        bassin.get().setEmployeResponsable(null);
        e.setBassinsresponsable(l);
        return employeRepository.save(e);
    }

    public List<Employe> getAllsimpleEmployes() {
        List<Employe>simpleEmployes =new ArrayList<>();
        List<Employe> employes= (List<Employe>) employeRepository.findAll();
        for(Employe e:employes){
            if(e.getRoleEmploye()== RoleEmploye.simpleEmploye){
                simpleEmployes.add(e);
            }
        }
        return simpleEmployes;
    }

    public Iterable<Employe> getAllGestionnaireEmployes() {
        List<Employe>gestEmployes =new ArrayList<>();
        List<Employe> employes= (List<Employe>) employeRepository.findAll();
        for(Employe e:employes){
            if(e.getRoleEmploye()== RoleEmploye.gestionnaire){
                gestEmployes.add(e);
            }
        }
        return gestEmployes;
    }
}
