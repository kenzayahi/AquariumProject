package com.upem.fr.model;

import com.upem.fr.model.enumeration.RegimeAlimentaire;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Espece {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String espéranceVie;
    private RegimeAlimentaire regimeAlimentaire;
    private Boolean menacee;
    @OneToMany
    private Set<Animal> animals = new HashSet<>();

    public Espece(String espéranceVie, RegimeAlimentaire regimeAlimentaire, Boolean menacee) {
        this.espéranceVie = espéranceVie;
        this.regimeAlimentaire = regimeAlimentaire;
        this.menacee = menacee;
    }

    public Espece(String espéranceVie) {
        this.espéranceVie = espéranceVie;
    }

    public Espece() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEspéranceVie() {
        return espéranceVie;
    }

    public Set<Animal> getAnimals() {
        return animals;
    }

    public void setAnimals(Set<Animal> animals) {
        this.animals = animals;
    }

    public void setEspéranceVie(String espéranceVie) {
        this.espéranceVie = espéranceVie;
    }

    public RegimeAlimentaire getRegimeAlimentaire() {
        return regimeAlimentaire;
    }

    public void setRegimeAlimentaire(RegimeAlimentaire regimeAlimentaire) {
        this.regimeAlimentaire = regimeAlimentaire;
    }

    public Boolean getMenacee() {
        return menacee;
    }

    public void setMenacee(Boolean menacee) {
        this.menacee = menacee;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Espece espece = (Espece) o;
        if (espece.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), espece.getId());
    }
}
