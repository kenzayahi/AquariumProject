package com.upem.fr.service;

import com.upem.fr.model.Bassin;
import com.upem.fr.model.Espece;
import com.upem.fr.repository.BassinRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class BassinService {

    @Autowired
    private BassinRepository bassinRepository;

    public Iterable<Bassin> getAll() {
        return bassinRepository.findAll();
    }

    public Optional<Bassin> getOne(Long id) {

        return Optional.ofNullable(bassinRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public Bassin create(Bassin bassin) {
        return bassinRepository.save(bassin);
    }

    public void delete(Long id) {
        bassinRepository.deleteById(id);
    }

    public Bassin update(Long id, Bassin bassin) {
        bassinRepository.findById(id).orElseThrow(NotFoundException::new);
        bassin.setId(id);
        return bassinRepository.save(bassin);
    }

    public Bassin addEspece(Optional<Bassin> b, Optional<Espece> espece){
        Bassin bassin=b.get();
        bassin.setEspece(espece.get());
        return bassinRepository.save(bassin);
    }
    public Bassin removeEspece(Optional<Bassin> bassin, Optional<Espece> espece) {
        Bassin b=bassin.get();
        b.setEspeceRemove(espece.get());
        return bassinRepository.save(b);
    }
}
