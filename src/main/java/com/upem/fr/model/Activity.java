package com.upem.fr.model;

import com.upem.fr.model.enumeration.TypeActivity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
    @OneToMany
    private List<Calendrier> calendrierList;

    public Activity(Long id, TypeActivity type, Date dateDebut, Date dateFin, boolean accessible) {
        this.id = id;
        this.type = type;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.accessible = accessible;
    }

    public Activity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Calendrier> getCalendrierList() {
        return calendrierList;
    }

    public void setCalendrierList(List<Calendrier> calendrierList) {
        this.calendrierList = calendrierList;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Activity)) return false;
        Activity activity = (Activity) o;
        return id.equals(activity.id) &&
                type == activity.type &&
                dateDebut.equals(activity.dateDebut) &&
                dateFin.equals(activity.dateFin) &&
                accessible == ((Activity) o).accessible;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, dateDebut, dateFin, accessible);
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", type=" + type +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", accessible=" + accessible +
                '}';
    }
}
