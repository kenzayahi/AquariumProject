package com.upem.fr.service;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Calendrier;
import com.upem.fr.model.Employe;
import com.upem.fr.repository.CalendrierRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CalendrierService {
    @Autowired
    private CalendrierRepository calendrierRepository;
    public Iterable<Calendrier> getAll() {
        return calendrierRepository.findAll();
    }

    public Optional<Calendrier> getOne(Long id) {

        return Optional.ofNullable(calendrierRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public Calendrier create(Calendrier calendrier) {
        return calendrierRepository.save(calendrier);
    }

    public void delete(Long id) {
        calendrierRepository.deleteById(id);
    }

    public Calendrier update(Long id, Calendrier calendrier) {
        calendrierRepository.findById(id).orElseThrow(NotFoundException::new);
        calendrier.setId(id);
        return calendrierRepository.save(calendrier);
    }

    public Calendrier addActivity(Optional<Calendrier> c, Optional<Activity> activity){
        Calendrier calendrier=c.get();
        calendrier.setActivities(activity.get());
        return calendrierRepository.save(calendrier);
    }
    public Calendrier removeActivity(Optional<Calendrier> c, Optional<Activity> activity) {
        Calendrier calendrier=c.get();
        calendrier.setActivityRemove(activity.get());
        return calendrierRepository.save(calendrier);
    }

    public Iterable<Calendrier> getAllByEmploye(Employe employe) {
        return Optional.ofNullable(calendrierRepository.findAllByEmploye(employe)).orElseThrow(NotFoundException::new);

    }
}
