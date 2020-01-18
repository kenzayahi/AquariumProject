package com.upem.fr.repository;

import com.upem.fr.model.Activity;
import com.upem.fr.model.Animal;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends CrudRepository<Activity,Long> {
}
