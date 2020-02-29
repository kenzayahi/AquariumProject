package com.upem.fr.service;

import com.upem.fr.model.*;
import com.upem.fr.repository.SecteurRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class SecteurService {
    @Autowired
    private SecteurRepository secteurRepository;

    public Iterable<Secteur> getAll() {
        return secteurRepository.findAll();
    }

    public Optional<Secteur> getOne(Long id) {
        return Optional.ofNullable(secteurRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public Secteur create(Secteur secteur) {
        return secteurRepository.save(secteur);
    }

    public void delete(Long id) {
        secteurRepository.deleteById(id);
    }

    public Secteur update(Long id, Secteur secteur) {
        secteurRepository.findById(id).orElseThrow(NotFoundException::new);
        secteur.setId(id);
        return secteurRepository.save(secteur);
    }
    public Secteur addBassin(Optional<Secteur> s, Optional<Bassin> b){
        Secteur secteur=s.get();
        secteur.addBassin(b.get());
        return secteurRepository.save(secteur);
    }
    public Secteur removeBassin(Optional<Secteur> secteur, Optional<Bassin> bassin) {
        Secteur s=secteur.get();
        s.removeBassin(bassin.get());
        return secteurRepository.save(s);
    }
}
