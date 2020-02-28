package com.upem.fr.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.upem.fr.model.enumeration.RoleEmploye;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Employe {
    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "employeId")
    private Long id;
    private String nom;
    private String prenom;
    private String adress;
    private Date dateNaissance;
    private int numSecurite;
    private String email;
    private String password;
    private RoleEmploye roleEmploye;
    @OneToMany
    private List<Secteur> secteursAffectees = new ArrayList<>();

    @JsonIgnoreProperties(value = {"employe"},allowSetters = true)
    @OneToMany(mappedBy = "employeResponsable",cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    private List<Bassin> bassinsresponsable = new ArrayList<>();

    public Employe() {
    }

    public Employe(String nom, String prenom, String adress, String email, String password, RoleEmploye roleEmploye) {
        this.nom=nom;
        this.prenom=prenom;
        this.adress=adress;
        this.email=email;
        this.password=password;
        this.roleEmploye=roleEmploye;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public RoleEmploye getRoleEmploye() {
        return roleEmploye;
    }

    public void setRoleEmploye(RoleEmploye roleEmploye) {
        this.roleEmploye = roleEmploye;
    }

    public List<Secteur> getSecteursAffectees() {
        return secteursAffectees;
    }

    public void setSecteursAffectees(List<Secteur> secteursAffectees) {
        this.secteursAffectees = secteursAffectees;
    }

    public List<Bassin> getBassinsresponsable() {
        return bassinsresponsable;
    }

    public void setBassinsresponsable(List<Bassin> bassinsresponsable) {
        this.bassinsresponsable = bassinsresponsable;
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
                getDateNaissance().equals(employe.getDateNaissance()) &&
                getEmail().equals(employe.getEmail()) &&
                getPassword().equals(employe.getPassword());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getNom(), getPrenom(), getAdress(), getDateNaissance(), getNumSecurite(), getEmail(), getPassword());
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
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public void addBassin(Bassin bassin) {
        this.bassinsresponsable.add(bassin);

    }
}
