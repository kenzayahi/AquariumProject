package com.upem.fr.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Calendrier {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private Date date;
    @OneToOne
    private Employe employe;

    @OneToMany
    private List<Activity>activities= new ArrayList<>();

    public Calendrier() {
    }

    public Calendrier(long jourMois, long mois, long année, List<Activity> activities) {
        this.activities = activities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(Activity  activity) {
        this.activities.add(activity);
    }

    public void setActivityRemove(Activity activity) {
        this.activities.remove(activity);
    }

    public Employe getEmploye() {
        return employe;
    }

    public void setEmploye(Employe employe) {
        this.employe = employe;
    }


}
