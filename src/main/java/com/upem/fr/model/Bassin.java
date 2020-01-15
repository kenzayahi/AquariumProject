package com.upem.fr.model;

import com.upem.fr.model.enumeration.Etat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;
@Entity
public class Bassin {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    public int capaciteMax;
    public long volumeEau;
    public Etat etat;

    @OneToMany
    public List<Espece> especeList=new ArrayList<>();

    public List<Espece> getEspeceList() {
        return especeList;
    }

    public void setEspece(Espece espece) {
        this.especeList.add(espece);
    }

    public Bassin() {
    }

    public Bassin(int capaciteMax, long volumeEau, Etat etat) {
        this.capaciteMax = capaciteMax;
        this.volumeEau = volumeEau;
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
