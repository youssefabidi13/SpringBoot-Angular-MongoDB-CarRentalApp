package com.gi2.carrental.Web;

import com.gi2.carrental.Enums.Role;
import com.gi2.carrental.Enums.Statu;
import com.gi2.carrental.entity.Car;
import com.gi2.carrental.entity.Client;
import com.gi2.carrental.entity.Order;
import com.gi2.carrental.entity.User;
import com.gi2.carrental.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("/manager")
public class ManagerController {
    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addUser")
    public String addUser(@RequestBody User user) {
            user.setId(null);
           mongoTemplate.insert(user);
        return "User added successfully";
    }
    @GetMapping("/findAllManagers")
    public List<User> getManagers() {
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is(Role.MANAGER));
        return mongoTemplate.find(query, User.class);
    }
    @GetMapping("/findAllUsers")
    public List<User> getUsers() {
        return mongoTemplate.findAll(User.class);
    }

    @GetMapping("/findAllAdmins")
    public List<User> getAdmins() {
        Query query = new Query();
        query.addCriteria(Criteria.where("role").is(Role.ADMINISTRATEUR));
        return mongoTemplate.find(query, User.class);
    }

    @PatchMapping("/updateUser/{id}")
    public ResponseEntity<User> updateManager(@PathVariable("id") String id, @RequestBody User updatedManager) {
        User existingManager = mongoTemplate.findById(id, User.class);
            if (!Objects.equals(updatedManager.getLastName(), "")) {
                assert existingManager != null;
                existingManager.setLastName(updatedManager.getLastName());
            }
            if (!Objects.equals(updatedManager.getFirstName(), "")) {
                assert existingManager != null;
                existingManager.setFirstName(updatedManager.getFirstName());
            }
            if (!Objects.equals(updatedManager.getAddress(), "")) {
                assert existingManager != null;
                existingManager.setAddress(updatedManager.getAddress());
            }
            if (!Objects.equals(updatedManager.getEmail(), "")) {
                assert existingManager != null;
                existingManager.setEmail(updatedManager.getEmail());
            }
            if (!Objects.equals(updatedManager.getPhoneNumber(), "")) {
                assert existingManager != null;
                existingManager.setPhoneNumber(updatedManager.getPhoneNumber());
            }
            if (!Objects.equals(updatedManager.getMotDePasse(), "")) {
                assert existingManager != null;
                existingManager.setMotDePasse(updatedManager.getMotDePasse());
            }
            if (updatedManager.getRole() != null) {
                assert existingManager != null;
                existingManager.setRole(updatedManager.getRole());
            }

        assert existingManager != null;
        mongoTemplate.save(existingManager);
           return ResponseEntity.ok(existingManager);

    }


    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        User existingUser = mongoTemplate.findById(id, User.class);
        if (existingUser != null) {
            mongoTemplate.remove(existingUser);
            return "Deleted User with id: " + existingUser.getId();
        } else {
            return "User not found";
        }
    }
    @GetMapping("/findUserIdByEmail/{email}")
    //give me function the id of the user with this email
    public String getUserId(@PathVariable String email){
        User user = mongoTemplate.findOne(new Query(Criteria.where("email").is(email)), User.class);
        return user.getId();
    }

    @GetMapping("/statistics")
    public Map<String, Object> getStatistics() {
        List<String> month = Arrays.asList("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
        Map<String, Object> statistics = new HashMap<>();
        statistics.put("nbClients", mongoTemplate.findAll(Client.class).size());
        statistics.put("nbCars", mongoTemplate.findAll(Car.class).size());
        statistics.put("nbManagers", mongoTemplate.find(new Query(Criteria.where("role").is(Role.MANAGER)), User.class).size());
        statistics.put("nbOrders", mongoTemplate.findAll(Order.class).size());
        statistics.put("nbOrdersInHold", mongoTemplate.find(new Query(Criteria.where("State").is(Statu.InHold)), Order.class).size());
        statistics.put("nbOrdersAccepted", mongoTemplate.find(new Query(Criteria.where("State").is(Statu.Accepte)), Order.class).size());
        statistics.put("nbOrdersRefused", mongoTemplate.find(new Query(Criteria.where("State").is(Statu.Refuse)), Order.class).size());
        Map<String, Integer> nbOrdersByMonth = new HashMap<>();
        for (String m : month) {
            nbOrdersByMonth.put(m, 0);
        }

        List<Order> orders = mongoTemplate.findAll(Order.class);
        for (Order order : orders) {
            int monthValue = order.getStartDate().getMonthValue();
            String monthStr = String.format("%02d", monthValue);
            nbOrdersByMonth.put(monthStr, nbOrdersByMonth.get(monthStr) + 1);
        }

        statistics.put("nbOrdersByMonth", nbOrdersByMonth);
        return statistics;
    }

    @GetMapping("/checkEmailExist/{email}")
    public boolean checkEmailExist(@PathVariable("email") String email) {
        Query query = new Query();
        query.addCriteria(Criteria.where("email").is(email));
        return mongoTemplate.find(query, User.class).size() > 0;
    }

    @RequestMapping("/user")
    public User getUserDetailsAfterLogin(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName());
        System.out.println(user);
        return user;

    }

    @GetMapping("/findUserByEmail/{email}")
    public User getUserByEmail(@PathVariable String email){
        return mongoTemplate.findOne(new Query(Criteria.where("email").is(email)), User.class);
    }
}