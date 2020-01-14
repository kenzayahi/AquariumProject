package com.upem.fr.model;

import javax.persistence.*;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;
@Entity
public class Secteur {
    @Id
    @GeneratedValue(strategy = AUTO)
    public Long id;
    public String nom;
    public String localisation;
    @ManyToOne
    public Bassin bassins;

    public Secteur() {
            }

    public Secteur(String nom, String localisation, Bassin bassins) {
        this.nom = nom;
        this.localisation = localisation;
        this.bassins = bassins;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Secteur)) return false;
        Secteur secteur = (Secteur) o;
        return getId().equals(secteur.getId()) &&
                getNom().equals(secteur.getNom()) &&
                getLocalisation().equals(secteur.getLocalisation()) &&
                getBassins().equals(secteur.getBassins());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNom(), getLocalisation(), getBassins());
    }

    public Bassin getBassins() {
        return bassins;
    }

    public void setBassins(Bassin bassins) {
        this.bassins = bassins;
    }


    @Override
    public String toString() {
        return "Secteur{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", localisation='" + localisation + '\'' +
                ", bassins=" + bassins +
                '}';
    }
}
