package com.upem.fr.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;
@Entity
public class Secteur {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    @NotEmpty
    public String nom;
    @NotEmpty
    public String localisation;

    @OneToMany
    public List<Bassin> bassinList=new ArrayList<>();

    public Secteur() {
            }

    public Secteur(String nom, String localisation) {
        this.nom = nom;
        this.localisation = localisation;
    }

    public List<Bassin> getBassinList() {
        return bassinList;
    }

    public void setBassin(Bassin bassin) {
        this.bassinList.add(bassin);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public void addBassin(Bassin bassin) {
        this.bassinList.add(bassin);
    }
    public void removeBassin(Bassin bassin) {
        this.bassinList.remove(bassin);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Secteur)) return false;
        Secteur secteur = (Secteur) o;
        return getId().equals(secteur.getId()) &&
                getNom().equals(secteur.getNom()) &&
                getLocalisation().equals(secteur.getLocalisation()) &&
                getBassinList().equals(secteur.getBassinList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNom(), getLocalisation(), getBassinList());
    }


    @Override
    public String toString() {
        return "Secteur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", localisation='" + localisation + '\'' +
                ", bassins=" + bassinList +
                '}';
    }
}
