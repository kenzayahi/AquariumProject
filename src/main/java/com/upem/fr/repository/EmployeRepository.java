package com.upem.fr.repository;

import com.upem.fr.model.Employe;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeRepository extends CrudRepository<Employe,Long> {
   // List<Employe> findAllByRoleEmployeEqualssimpleEmploye();
   /*@Query("select e from Employe e where e.roleEmploye = 'simpleEmploye'")
   List<Employe> findAllByRoleEmployeEqualssimpleEmploye();*/
}
