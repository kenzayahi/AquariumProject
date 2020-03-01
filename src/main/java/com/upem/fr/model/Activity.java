package com.upem.fr.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.upem.fr.model.enumeration.TypeActivity;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import static javax.persistence.GenerationType.AUTO;

@Entity
public class Activity {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;
    private TypeActivity type;
    private Date dateDebut;
    private Date dateFin;
    private boolean accessible;
    @ManyToMany
    private List<Employe> responsables;
    @ManyToOne(cascade = {CascadeType.MERGE})
    @JsonIgnoreProperties(value = {"activity"},allowSetters = true)
    private Bassin bassin;

    public Activity(Long id, TypeActivity type, Date dateDebut, Date dateFin, boolean accessible, List<Employe> responsable) {
        this.id = id;
        this.type = type;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.accessible = accessible;
        this.responsables = responsable;
    }

    public Activity(TypeActivity type,boolean accessible) {
        this.type = type;
        this.accessible=accessible;
    }

    public Activity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isAccessible() {
        return accessible;
    }

    public Bassin getBassin() {
        return bassin;
    }

    public void setBassin(Bassin bassin) {
        this.bassin = bassin;
    }

    public TypeActivity getType() {
        return type;
    }

    public void setType(TypeActivity type) {
        this.type = type;
    }

    public Date getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(Date dateDebut) {
        this.dateDebut = dateDebut;
    }

    public Date getDateFin() {
        return dateFin;
    }

    public void setDateFin(Date dateFin) {
        this.dateFin = dateFin;
    }

    public boolean getAccessible() {
        return accessible;
    }

    public void setAccessible(boolean accessible) {
        this.accessible = accessible;
    }

    public List<Employe> getResponsables() {
        return responsables;
    }
    public void setResponsables(List<Employe> responsables) {
        this.responsables=responsables;
    }

    public void addResponsables(Employe responsable) {
        this.responsables.add(responsable);
    }
    public void removeResponsables(Employe responsable) {
        this.responsables.remove(responsable);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Activity)) return false;
        Activity activity = (Activity) o;
        return id.equals(activity.id) &&
                type == activity.type &&
                accessible == ((Activity) o).accessible ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, dateDebut, dateFin, accessible, responsables);
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", type=" + type +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", accessible=" + accessible +
                ", responsable=" + responsables +
                '}';
    }
}
