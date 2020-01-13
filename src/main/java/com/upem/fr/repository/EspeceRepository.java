package com.upem.fr.repository;

import com.upem.fr.model.Espece;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspeceRepository extends CrudRepository<Espece,Long> {
}
