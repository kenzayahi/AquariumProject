package com.upem.fr.ressource;

import com.upem.fr.model.Bassin;
import com.upem.fr.service.BassinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class BassinRessource {
    @Autowired
    private BassinService bassinService;

    @GetMapping("/bassins")
    public Iterable<Bassin> getAll() {
        return bassinService.getAll();
    }

    @PostMapping("/bassins")
    public Bassin create(@RequestBody Bassin bassin) {
        return bassinService.create(bassin);
    }

    @GetMapping("bassins/{id}")
    public Optional<Bassin> getOne(@PathVariable Long id) {
        //@PathVariable {id}
        return bassinService.getOne(id);
    }

    @DeleteMapping("bassins/{id}")
    public void delete(@PathVariable Long id) {
        bassinService.delete(id);
    }

    @PostMapping("bassins/{id}")
    public Bassin update(@PathVariable Long id, @RequestBody Bassin bassin) {
        return bassinService.update(id, bassin);
    }
}
