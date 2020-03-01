package com.upem.fr;

import com.upem.fr.model.Employe;
import com.upem.fr.model.enumeration.RoleEmploye;
import com.upem.fr.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Iterator;

@SpringBootApplication
public class AquariumProjectApplication implements CommandLineRunner {
    @Autowired
	private EmployeService employeService;

	public static void main(String[] args) {
		SpringApplication.run(AquariumProjectApplication.class, args);
	}
	public void run(String... args) throws Exception {
		int sum=0;
		Iterator<Employe> employes=employeService.getAll().iterator();
		while (employes.hasNext()){
			sum ++;
		}
		if(sum ==0) {

			employeService.create(new Employe("Yahi", "Kenza", "1 rue de l'eglise", "kenza", "yahi", RoleEmploye.gestionnaire));
			employeService.create(new Employe("Milan", "Milan", "1 rue de republique", "milan", "milan", RoleEmploye.simpleemploye));
			employeService.create(new Employe("Dilya", "Dilya", "15 rue de republique", "dilya", "dilya", RoleEmploye.responsablebassin));
			employeService.create(new Employe("victor", "victor", "15 rue de republique", "victor", "victor", RoleEmploye.responsablebassin));


		}
	}

}
