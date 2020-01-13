package com.upem.fr.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    @ManyToOne
    public Espece espece;
    public String nom;
    public String sexe;
    public String  signedistinctif;
    public Date dateArrivee;
    public Date dateDépart;

    public Animal() {
    }

    public Animal(String nom) {
        this.nom = nom;

    }

    public Animal(Espece espece, String nom, String sexe, String signedistinctif, Date dateArrivee, Date dateDépart) {
        this.espece = espece;
        this.nom = nom;
        this.sexe = sexe;
        this.signedistinctif = signedistinctif;
        this.dateArrivee = dateArrivee;
        this.dateDépart = dateDépart;
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

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
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

    public Date getDateDépart() {
        return dateDépart;
    }

    public void setDateDépart(Date dateDépart) {
        this.dateDépart = dateDépart;
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
}
