package com.ERP.authentification.contollers;

import com.ERP.authentification.Models.IndividualChatHistory;
import com.ERP.authentification.Models.Medecin;
import com.ERP.authentification.Models.Message;
import com.ERP.authentification.services.DoctorServices;
import com.ERP.authentification.services.IndividualChatHistoryService;
import com.ERP.authentification.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService messageService ;
    @Autowired
    private DoctorServices doctorServices ;
    @Autowired
    private IndividualChatHistoryService individualChatHistoryService ;

    @PostMapping
    public ResponseEntity<Message> create(@RequestBody Message message   ) {
        /*if(individualChatHistoryService.findAllById(message.getId_indiv_chat()).isEmpty()){
           Medecin doc =  doctorServices.findbyId(message.getidreceiver()) ;
        /*   IndividualChatHistory indiv = new IndividualChatHistory(message.getidsender() , doc.getUsername(),message.getSend_date(),message.getidreceiver()) ;
           individualChatHistoryService.create(indiv);
        }*/
        return ResponseEntity.status(201).body(this.messageService.createPatient(message));
    }
    @GetMapping("{id}")
    public ResponseEntity<List<Message>> getAllbySenderID(@PathVariable Long id){
      //  this.messageService.findTopMessagebysenderId(id);

        return ResponseEntity.ok().body(messageService.findAllbysenderId(id)) ;
    }
    @GetMapping("/container/{id}")
    public ResponseEntity<List<Message>> findallbyContainerMessageId(@PathVariable Long id){
        return ResponseEntity.ok().body(messageService.findallbyContainerMessageId(id)) ;
    }
    @GetMapping()
    public ResponseEntity<List<Message>> getAll(){



        return ResponseEntity.ok().body(messageService.findAll()) ;
    }
}
