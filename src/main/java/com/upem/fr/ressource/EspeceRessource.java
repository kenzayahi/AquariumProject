package com.upem.fr.ressource;

import com.upem.fr.model.Espece;
import com.upem.fr.service.EspeceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class EspeceRessource {
    @Autowired
    private EspeceService ecpeceService;

    @GetMapping("/especes")
    public Iterable<Espece> getAll() {
        return ecpeceService.getAll();
    }

    @PostMapping("/especes")
    public Espece create(@RequestBody Espece espece) {
        return ecpeceService.create(espece);
    }

    @GetMapping("especes/{id}")
    public Optional<Espece> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return ecpeceService.getOne(id);
    }

    @DeleteMapping("especes/{id}")
    public void delete(@PathVariable Long id) {
        ecpeceService.delete(id);
    }

    @PostMapping("especes/{id}")
    public Espece update(@PathVariable Long id, @RequestBody Espece espece) {
        return ecpeceService.update(id, espece);
    }
}
