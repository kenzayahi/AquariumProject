package com.upem.fr.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import java.util.Date;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Employe {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private String nom;
    private String prenom;
    private String adress;
    private Date dateNaissance;
    private int numSecurite;

    public Employe() {
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public int getNumSecurite() {
        return numSecurite;
    }

    public void setNumSecurite(int numSecurite) {
        this.numSecurite = numSecurite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Employe)) return false;
        Employe employe = (Employe) o;
        return getNumSecurite() == employe.getNumSecurite() &&
                getId().equals(employe.getId()) &&
                getNom().equals(employe.getNom()) &&
                getPrenom().equals(employe.getPrenom()) &&
                getAdress().equals(employe.getAdress()) &&
                getDateNaissance().equals(employe.getDateNaissance());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNom(), getPrenom(), getAdress(), getDateNaissance(), getNumSecurite());
    }

    @Override
    public String toString() {
        return "Employe{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", prenom='" + prenom + '\'' +
                ", adress='" + adress + '\'' +
                ", dateNaissance=" + dateNaissance +
                ", numSecurite=" + numSecurite +
                '}';
    }
}
