package com.upem.fr.service;

import com.upem.fr.model.Secteur;
import com.upem.fr.repository.SecteurRepository;
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
        return secteurRepository.findById(id);
    }

    public Secteur create(Secteur secteur) {
        return secteurRepository.save(secteur);
    }

    public void delete(Long id) {
        secteurRepository.deleteById(id);
    }

    public Secteur update(Long id, Secteur secteur) {
        secteurRepository.findById(id);
        secteur.setId(id);
        return secteurRepository.save(secteur);
    }
}
