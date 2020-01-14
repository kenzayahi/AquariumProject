package com.upem.fr.repository;

import com.upem.fr.model.Secteur;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecteurRepository extends CrudRepository<Secteur,Long> {
}
