package com.upem.fr.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Calendrier {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private long numSemaine;
    private long annee;

    @OneToMany
    private List<Activity>activities= new ArrayList<>();

    public Calendrier() {
    }
    public Calendrier(long numSemaine,long annee) {
        this.annee=annee;
        this.numSemaine=numSemaine;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getNumSemaine() {
        return numSemaine;
    }

    public void setNumSemaine(long numSemaine) {
        this.numSemaine = numSemaine;
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

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Calendrier)) return false;
        Calendrier that = (Calendrier) o;
        return Objects.equals(getId(), that.getId()) &&
                Objects.equals(getActivities(), that.getActivities());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getActivities());
    }

}
