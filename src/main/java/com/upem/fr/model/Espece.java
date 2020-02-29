package com.upem.fr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.upem.fr.model.enumeration.RegimeAlimentaire;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Espece {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "especeId")
    private Long id;
    private String nom;
    @NotEmpty
    private String esperanceVie;
    private RegimeAlimentaire regimeAlimentaire;
    private int menacee;
    @JsonIgnoreProperties(value = {"espece"},allowSetters = true)
    @OneToMany(mappedBy = "espece",cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private List<Animal>animalList= new ArrayList<>();

    public Espece() {
    }
    public Espece(String esperanceVie, RegimeAlimentaire regimeAlimentaire, int menacee) {
        this.esperanceVie = esperanceVie;
        this.regimeAlimentaire = regimeAlimentaire;
        this.menacee = menacee;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEsperanceVie() {
        return esperanceVie;
    }

    public void setEsperanceVie(String espéranceVie) {
        this.esperanceVie = espéranceVie;
    }

    public RegimeAlimentaire getRegimeAlimentaire() {
        return regimeAlimentaire;
    }

    public void setRegimeAlimentaire(RegimeAlimentaire regimeAlimentaire) {
        this.regimeAlimentaire = regimeAlimentaire;
    }
    public String getNom() { return nom; }

    public void setNom(String nom) { this.nom = nom; }

    public int getMenacee() {
        return menacee;
    }

    public void setMenacee(int menacee) {
        this.menacee = menacee;
    }

    public List<Animal> getAnimalList() {
        return animalList;
    }

    public void setAnimalList(List<Animal> lst) {
        this.animalList = lst;
    }

    public void addAnimalList(Animal animal) {
        this.animalList.add(animal);
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

    @Override
    public String toString() {
        return "Espece{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", esperanceVie='" + esperanceVie + '\'' +
                ", regimeAlimentaire=" + regimeAlimentaire +
                ", menacee=" + menacee +
                ", animalList=" + animalList +
                '}';
    }
}
