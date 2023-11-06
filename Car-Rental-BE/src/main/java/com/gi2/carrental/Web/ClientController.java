package com.gi2.carrental.Web;

import com.gi2.carrental.entity.Client;
import com.gi2.carrental.entity.Order;
import com.gi2.carrental.repo.ClientRepository;
import com.gi2.carrental.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/client")
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private OrderRepository orderRepository;
    @GetMapping("/findOrderByClient")
    public List<Client> getOrdersByClient() {
        return clientRepository.findAll();
    }
    @PostMapping("/addClient")
    public String saveBook(@RequestBody Client client) {
        clientRepository.save(client);
        return "Added Client with id : " + client.getId();
    }
    @PatchMapping("/updateClient/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable String id, @RequestBody Client client) {
        Optional<Client> existingClient = clientRepository.findById(id) ;
        Client updatedClient = existingClient.get();
        if(client.getLastName()!="")
            updatedClient.setLastName(client.getLastName());
        if(client.getFirstName()!="")
            updatedClient.setFirstName(client.getFirstName());
        if(client.getCin()!="")
            updatedClient.setCin(client.getCin());
        if(client.getEmail()!="")
            updatedClient.setEmail(client.getEmail());
        if(client.getPhoneNumber()!="")
            updatedClient.setPhoneNumber(client.getPhoneNumber());
        if(client.getAddress()!="")
            updatedClient.setAddress(client.getAddress());
        if(client.getReviews()!=null)
            updatedClient.setReviews(client.getReviews());
        clientRepository.save(updatedClient);
        return ResponseEntity.ok(updatedClient);
    }
    /*@DeleteMapping("/deleteClient/{id}")
    public String deleteClient(@PathVariable String id) {
        clientRepository.deleteById(id);
        return "Deleted Client with id : " + id;
    }*/
    @DeleteMapping("/deleteClient/{id}")
    public String deleteClient(@PathVariable String id) {
        // Retrieve the client to be deleted
        Client client = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found"));

        // Delete the client's orders
        List<Order> clientOrders = orderRepository.findByClient(client);
        orderRepository.deleteAll(clientOrders);

        // Delete the client
        clientRepository.deleteById(id);

        return "Deleted Client with id: " + id;
    }

    @GetMapping("/findClientByCin/{cin}")
    public Client getClientByCin(@PathVariable String cin) {
        return clientRepository.findByCin(cin);
    }
    @GetMapping("/findClientById/{id}")
    public Client getClientById(@PathVariable String id) {
        return clientRepository.findById(id).get();
    }
    @GetMapping("/findAllClients")
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/checkEmailExist/{email}")
    public boolean checkEmailExist(@PathVariable String email) {
        return clientRepository.existsByEmail(email);
    }
    @GetMapping("/checkCinExist/{cin}")
    public boolean checkCinExist(@PathVariable String cin) {
        return clientRepository.existsByCin(cin);
    }

    @GetMapping("/numberOfReviews/{id}")
    public int getNumberOfReviews(@PathVariable String id) {
        return clientRepository.findById(id).get().getReviews().size();
    }
}
