package com.upem.fr.service;
import com.upem.fr.model.Employe;
import com.upem.fr.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthentificationService {

    @Autowired
    private EmployeRepository employeRepository;

    public Optional<Employe> getEmploye(String login, String password) {
        Iterable<Employe> employe=employeRepository.findAll();
        for(Employe e:employe){
            if(e.getEmail().equals(login) && e.getPassword().equals(password)){
                return Optional.of(e);
            }
        }
        return Optional.empty();//Optional.ofNullable(userRepository.findByLoginAngPassword(login, password).orElseThrow(NotFoundException::new));

    }
}
