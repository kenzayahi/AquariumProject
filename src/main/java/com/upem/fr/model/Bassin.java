package com.upem.fr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.upem.fr.model.enumeration.Etat;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;
@Entity
public class Bassin {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    public int numBassin;
    public int capaciteMax;
    public long volumeEau;
    public Etat etat;
   @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JsonIgnoreProperties(value = {"bassin"},allowSetters = true)
    private Employe employeResponsable;

    @OneToMany
    public List<Espece> especeList=new ArrayList<>();

    @JsonIgnoreProperties(value = {"bassin"},allowSetters = true)
    @OneToMany(mappedBy = "bassin",cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private List<Activity>activities= new ArrayList<>();

    public Bassin() {
    }

    public Bassin(int capaciteMax, long volumeEau, Etat etat) {
        this.capaciteMax = capaciteMax;
        this.volumeEau = volumeEau;
        this.etat = etat;
    }

    public int getNumBassin() {
        return numBassin;
    }

    public void setNumBassin(int numBassin) {
        this.numBassin = numBassin;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Espece> getEspeceList() {
        return especeList;
    }

    public void setEspece(Espece espece) {
        this.especeList.add(espece);
    }
    public void setEspeceRemove(Espece espece) {
        this.especeList.remove(espece);
    }

    public int getCapaciteMax() {
        return capaciteMax;
    }

    public void setCapaciteMax(int capaciteMax) {
        this.capaciteMax = capaciteMax;
    }

    public long getVolumeEau() {
        return volumeEau;
    }

    public void setVolumeEau(long volumeEau) {
        this.volumeEau = volumeEau;
    }

    public Etat getEtat() {
        return etat;
    }

    public void setEtat(Etat etat) {
        this.etat = etat;
    }

    public Employe getEmployeResponsable() {
        return employeResponsable;
    }

    public void setEmployeResponsable(Employe employeResponsable) {
        this.employeResponsable = employeResponsable;
    }

    public void setEspeceList(List<Espece> especeList) {
        this.especeList = especeList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Bassin)) return false;
        Bassin bassin = (Bassin) o;
        return getCapaciteMax() == bassin.getCapaciteMax() &&
                getVolumeEau() == bassin.getVolumeEau() &&
                getId().equals(bassin.getId()) &&
                getEtat() == bassin.getEtat();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getCapaciteMax(), getVolumeEau(), getEtat());
    }

    @Override
    public String toString() {
        return "Bassin{" +
                "id=" + id +
                ", capaciteMax=" + capaciteMax +
                ", volumeEau=" + volumeEau +
                ", etat=" + etat +
                '}';
    }
}
