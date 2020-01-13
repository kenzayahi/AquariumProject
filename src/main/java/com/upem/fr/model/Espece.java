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
    public Long id;
    public String espéranceVie;
    public RegimeAlimentaire regimeAlimentaire;
    public int menacee;

    public Espece() {
    }
    public Espece(String espéranceVie, RegimeAlimentaire regimeAlimentaire, int menacee) {
        this.espéranceVie = espéranceVie;
        this.regimeAlimentaire = regimeAlimentaire;
        this.menacee = menacee;
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

    public void setEspéranceVie(String espéranceVie) {
        this.espéranceVie = espéranceVie;
    }

    public RegimeAlimentaire getRegimeAlimentaire() {
        return regimeAlimentaire;
    }

    public void setRegimeAlimentaire(RegimeAlimentaire regimeAlimentaire) {
        this.regimeAlimentaire = regimeAlimentaire;
    }

    public int getMenacee() {
        return menacee;
    }

    public void setMenacee(int menacee) {
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
