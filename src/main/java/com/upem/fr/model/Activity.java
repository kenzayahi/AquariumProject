package com.upem.fr.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import com.upem.fr.model.enumeration.TypeActivity;
import java.util.Date;
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
    private boolean isPublic;
    @ManyToOne
    private Employe responsable;

    public Activity(Long id, TypeActivity type, Date dateDebut, Date dateFin, boolean isPublic, Employe responsable) {
        this.id = id;
        this.type = type;
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.isPublic = isPublic;
        this.responsable = responsable;
    }

    public Activity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean getPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }

    public Employe getResponsable() {
        return responsable;
    }

    public void setResponsable(Employe responsable) {
        this.responsable = responsable;
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
                isPublic == ((Activity) o).isPublic &&
                responsable.equals(activity.responsable);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, dateDebut, dateFin, isPublic, responsable);
    }

    @Override
    public String toString() {
        return "Activity{" +
                "id=" + id +
                ", type=" + type +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", isPublic=" + isPublic +
                ", responsable=" + responsable +
                '}';
    }
}
