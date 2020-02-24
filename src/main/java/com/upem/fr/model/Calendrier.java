package com.upem.fr.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Calendrier {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private long jourMois;
    private long mois;
    private long annee;
    @OneToOne
    private Employe employe;

    @OneToMany
    private List<Activity>activities= new ArrayList<>();

    public Calendrier() {
    }

    public Calendrier(long jourMois, long mois, long année, List<Activity> activities) {
        this.jourMois = jourMois;
        this.mois = mois;
        this.annee = année;
        this.activities = activities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public long getJourMois() {
        return jourMois;
    }

    public void setJourMois(long jourMois) {
        this.jourMois = jourMois;
    }

    public long getMois() {
        return mois;
    }

    public void setMois(long mois) {
        this.mois = mois;
    }

    public long getAnnee() {
        return annee;
    }

    public void setAnnee(long annee) {
        this.annee = annee;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Calendrier)) return false;
        Calendrier that = (Calendrier) o;
        return getJourMois() == that.getJourMois() &&
                getMois() == that.getMois() &&
                getAnnee() == that.getAnnee() &&
                getId().equals(that.getId()) &&
                getActivities().equals(that.getActivities());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getJourMois(), getMois(), getAnnee(), getActivities());
    }

}
