package com.upem.fr.service;

import com.upem.fr.model.*;
import com.upem.fr.repository.ActivityRepository;
import com.upem.fr.repository.CalendrierRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;
    @Autowired
    private CalendrierRepository calendrierRepository;

    public Activity create(Activity activity, Calendrier c) {
        List<Activity> l = c.getActivities();
        l.add(activity);
        c.setActivities(l);
        activityRepository.save(activity);
        calendrierRepository.save(c);
        return null;
    }

    public Iterable<Activity> getAll() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getOne(Long id) {
        return Optional.ofNullable(activityRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public void delete(Long id, Optional<Calendrier> oldCal) {
        List<Activity> lst = oldCal.get().getActivities();
        for(int i = 0; i < lst.size(); i++){
            if(lst.get(i).getId() == id)
                lst.remove(i);
        }
        oldCal.get().setActivities(lst);
        activityRepository.deleteById(id);
    }

    public Activity update(Long id, Activity activity, Optional<Calendrier> oldCal, Optional<Calendrier> newCal) {
        activityRepository.findById(id).orElseThrow(NotFoundException::new);
        List<Activity> lst = oldCal.get().getActivities();
        for(int i = 0; i < lst.size(); i++){
            if(lst.get(i).getId() == id)
                lst.remove(i);
        }
        oldCal.get().setActivities(lst);
        newCal.get().getActivities().add(activity);
        activity.setId(id);
        return activityRepository.save(activity);
    }
    public Activity addEmploye(Optional<Activity> a, Optional<Employe> e){
        Activity activity=a.get();
        if(!activity.getResponsables().contains(e.get())){
            activity.addResponsables(e.get());
        }
        return activityRepository.save(activity);
    }
    public Activity removeEmploye(Optional<Activity> activity, Optional<Employe> employe) {
        Activity a=activity.get();
        a.removeResponsables(employe.get());
        return activityRepository.save(a);
    }
}
