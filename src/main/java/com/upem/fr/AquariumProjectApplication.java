package com.upem.fr;

import com.upem.fr.model.Employe;
import com.upem.fr.model.enumeration.RoleEmploye;
import com.upem.fr.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AquariumProjectApplication implements CommandLineRunner {
    @Autowired
	private EmployeService employeService;

	public static void main(String[] args) {
		SpringApplication.run(AquariumProjectApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
   		employeService.create(new Employe("Yahi","Kenza","1 rue de l'eglise","kenza","yahi", RoleEmploye.gestionnaire));
		employeService.create(new Employe("Milan","Milan","1 rue de republique","milan","milan", RoleEmploye.simpleEmploye));

	}

}
