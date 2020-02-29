package com.upem.fr.repository;

import com.upem.fr.model.Calendrier;
import com.upem.fr.model.Employe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendrierRepository extends CrudRepository<Calendrier,Long> {
    List<Calendrier> findAllByEmploye_Id(long idEmploye);

}
