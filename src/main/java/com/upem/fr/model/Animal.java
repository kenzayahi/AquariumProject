package com.upem.fr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.upem.fr.model.enumeration.Sexe;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @JsonBackReference
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JsonIgnoreProperties(value = {"animal"},allowSetters = true)
    public Espece espece;
    @NotEmpty
    public String nom;
    public Sexe sexe;
    public String  signedistinctif;
    public Date dateArrivee;
    public Date dateDepart;

    public Animal() {
    }

    public Animal(String nom) {
        this.nom = nom;

    }

    public Animal(Espece espece, String nom, Sexe sexe, String signedistinctif) {
        this.espece = espece;
        this.nom = nom;
        this.sexe = sexe;
        this.signedistinctif = signedistinctif;
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

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

    public String getSignedistinctif() {
        return signedistinctif;
    }

    public void setSignedistinctif(String signedistinctif) {
        this.signedistinctif = signedistinctif;
    }

    public Date getDateArrivee() {
        return dateArrivee;
    }

    public void setDateArrivee(Date dateArrivee) {
        this.dateArrivee = dateArrivee;
    }

    public Date getDateDepart() {
        return dateDepart;
    }

    public void setDateDepart(Date dateDepart) {
        this.dateDepart = dateDepart;
    }

    public Espece getEspece() {
        return espece;
    }

    public void setEspece(Espece espece) {
        this.espece = espece;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Animal animal = (Animal) o;
        if (animal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animal.getId());
    }
    @JsonProperty("especeId")
    private void ignoreespeceId(Long especeId){
        this.espece=new Espece();
        espece.setId(especeId);
    }
}
