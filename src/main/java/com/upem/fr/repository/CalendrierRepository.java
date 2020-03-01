package com.upem.fr.repository;

import com.upem.fr.model.Calendrier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendrierRepository extends CrudRepository<Calendrier,Long> {
}
