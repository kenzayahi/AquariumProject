package com.upem.fr.service;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Calendrier;
import com.upem.fr.repository.CalendrierRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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

    public Optional<Calendrier> findBySemaineAndAnnee(Long numSemaine, Long annee) {
        Iterable l = calendrierRepository.findAll();
        Iterator<Calendrier> iterator = l.iterator();

        List<Calendrier> lst = new ArrayList<>();
        while (iterator.hasNext()) {
            lst.add(iterator.next());
        }

        for(int i = 0; i < lst.size();i++){
            if(lst.get(i).getNumSemaine() == numSemaine && lst.get(i).getAnnee() == annee){
                return Optional.of(lst.get(i));
            }
        }
        return Optional.empty();
    }
    public List<Activity> findActivitesOf(Long semaine, Long annee, Long idEmploye) {
        Optional<Calendrier> cal = findBySemaineAndAnnee(semaine, annee);
        List<Activity> lst = cal.get().getActivities();
        boolean find = false;
        for(int i = 0; i < lst.size(); i++){
            find = false;
            for(int j = 0; j < lst.get(i).getResponsables().size(); j++){
                if(lst.get(i).getResponsables().get(j).getId() == idEmploye){
                    find = true;
                }
            }
            if(!find){
                lst.remove(i);
                i--;
            }

        }
        return lst;
    }
}
