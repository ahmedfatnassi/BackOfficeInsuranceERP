package com.ERP.authentification.contollers;

import com.ERP.authentification.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import com.ERP.authentification.Models.Event;
import com.ERP.authentification.Models.Medecin;
import com.ERP.authentification.Models.Person;
import com.ERP.authentification.Models.UserLoginForm;
import com.ERP.authentification.services.SecurityServiceImp;

import lombok.RequiredArgsConstructor;
@CrossOrigin()
@RequiredArgsConstructor
@RestController
@RequestMapping("/login")
public class LoginController {
	@Autowired
    private SecurityServiceImp securityService;
	 @Autowired
	    BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	PersonService personService ;
	@PostMapping
	public  ResponseEntity<?>  login( @RequestBody  UserLoginForm user ) {
		
		securityService.autoLogin(user.getUsername(), user.getPassword());
       System.out.println((RequestContextHolder.currentRequestAttributes().getSessionId()));
       user.setToken((RequestContextHolder.currentRequestAttributes().getSessionId()));
        Person p = personService.findbyUsername(user.getUsername());
        user.setType(p.getClass().getSimpleName());
		return ResponseEntity.status(200).body(user);
	}
}
