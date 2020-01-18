package com.upem.fr.repository;

import com.upem.fr.model.Employe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeRepository extends CrudRepository<Employe,Long> {
}
