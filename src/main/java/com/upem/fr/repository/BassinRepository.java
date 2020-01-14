package com.upem.fr.repository;

import com.upem.fr.model.Bassin;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BassinRepository  extends CrudRepository<Bassin,Long> {
}
