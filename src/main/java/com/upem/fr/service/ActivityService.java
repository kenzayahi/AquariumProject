package com.upem.fr.service;

import com.upem.fr.model.Activity;
import com.upem.fr.repository.ActivityRepository;
import com.upem.fr.service.errors.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    public Activity create(Activity activity) {
        return activityRepository.save(activity);
    }

    public Iterable<Activity> getAll() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getOne(Long id) {
        return Optional.ofNullable(activityRepository.findById(id).orElseThrow(NotFoundException::new));
    }

    public void delete(Long id) {
        activityRepository.deleteById(id);
    }

    public Activity update(Long id, Activity activity) {
        activityRepository.findById(id).orElseThrow(NotFoundException::new);
        activity.setId(id);
        return activityRepository.save(activity);
    }
}
