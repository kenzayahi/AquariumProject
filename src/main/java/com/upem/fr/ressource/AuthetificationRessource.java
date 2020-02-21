package com.upem.fr.ressource;

import com.upem.fr.model.Employe;
import com.upem.fr.service.AuthentificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
public class AuthetificationRessource {
    @Autowired
    private AuthentificationService authentificationService;

    @GetMapping("/authentificate/{login}/{password}")
    public Optional<Employe> authentificate(@PathVariable String login, @PathVariable String password){
        try{
           return Optional.of(authentificationService.getEmploye(login, password).get());
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"wrong login and password");
        }
    }


}
