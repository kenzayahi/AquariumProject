package com.upem.fr.ressource;

import com.upem.fr.model.Bassin;
import com.upem.fr.model.Secteur;
import com.upem.fr.service.BassinService;
import com.upem.fr.service.SecteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class SecteurRessource {
    @Autowired
    private SecteurService secteurService;
    @Autowired
    private BassinService bassinService;

    @GetMapping("/secteurs")
    public Iterable<Secteur> getAll() {
        return secteurService.getAll();
    }

    @PostMapping("/secteurs")
    public Secteur create(@RequestBody Secteur secteur) {
        Optional<Bassin>optionalBassin=(bassinService.getOne(secteur.getBassins().getId()));
        secteur.setBassins(optionalBassin.get());
        return secteurService.create(secteur);
    }

    @GetMapping("secteurs/{id}")
    public Optional<Secteur> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return secteurService.getOne(id);
    }

    @DeleteMapping("secteurs/{id}")
    public void delete(@PathVariable Long id) {
        secteurService.delete(id);
    }

    @PostMapping("secteurs/{id}")
    public Secteur update(@PathVariable Long id, @RequestBody Secteur secteur) {
        return secteurService.update(id, secteur);
    }
}
