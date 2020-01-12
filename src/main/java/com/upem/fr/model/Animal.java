package com.upem.fr.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Animal {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    public String espèce;
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

    public Animal(String espèce, String nom, String sexe, String signedistinctif, Date dateArrivee, Date dateDépart) {
        this.espèce = espèce;
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

    public String getEspèce() {
        return espèce;
    }

    public void setEspèce(String espèce) {
        this.espèce = espèce;
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
}
