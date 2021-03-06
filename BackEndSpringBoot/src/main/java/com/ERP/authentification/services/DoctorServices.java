package com.ERP.authentification.services;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ERP.authentification.Models.Medecin;
import com.ERP.authentification.repositories.MedecinRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional 
public class DoctorServices {
@Autowired
public MedecinRepository medecinRepository ; 

public List<Medecin> findAll(){
	return this.medecinRepository.findAll();
			
}
public Medecin createMedecin(Medecin medecin) {
	return this.medecinRepository.save(medecin) ;
	
}
public Medecin findbyId(Long id ){
	return this.medecinRepository.findById(id).get() ;
			
}
public Medecin findbyUsername(String name ){
		return this.medecinRepository.findByUsername(name).get() ;

}
public void deleteAllAll(){
	 this.medecinRepository.deleteAll();
			
}
	public void deletebyid(Long id) {
		this.medecinRepository.deleteById(id); ;
		//this.personRepository.deleteById(id);

	}
}
