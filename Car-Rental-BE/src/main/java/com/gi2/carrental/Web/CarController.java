package com.gi2.carrental.Web;

import com.gi2.carrental.entity.Car;

import com.gi2.carrental.entity.Client;
import com.gi2.carrental.entity.Order;
import com.gi2.carrental.repo.CarRepo;

import com.gi2.carrental.repo.ClientRepository;
import com.gi2.carrental.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/car")
public class CarController {
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @PostMapping("/addCar")
    public Car saveCar(@RequestBody Car car) {
        System.out.println(car.toString());
        Car carsaved =carRepo.save(car);
        System.out.println(carsaved);
        return carsaved;
    }


    @PostMapping("/addOrder")
    public String saveOrder(@RequestBody Order order) {
        orderRepository.save(order);
        Car car = carRepo.findById(order.getCar().getId()).orElseThrow(() -> new IllegalArgumentException("Car not found"));
        car.setAvailable(false);
        carRepo.save(car);
        return "Added Order with id : " + order.getId();
    }

    @PostMapping("/addClient")
    public String saveBook(@RequestBody Client client) {
        clientRepository.save(client);
        return "Added Client with id : " + client.getId();
    }
    @GetMapping("/findAllCars")
    public List<Car> getCars() {
        return carRepo.findAll();
    }

    @PostMapping("/findByDates")
    public List<Car> getCarsByDates(@RequestBody Map<String, Object> payload) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date start_Date = null;
        Date end_Date = null;
        try {
            start_Date = formatter.parse(payload.get("start_Date").toString());
            end_Date = formatter.parse(payload.get("end_Date").toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return carRepo.findByStartOrEndDateAndAvailability(end_Date, start_Date);
    }
    @GetMapping("/brands")
    public String getBrands(){
        List<String> brands =carRepo.findDistinctBrands();
        return brands.toString();
    }
    @GetMapping("/cars/{brand}")
    public List<Car> getCarsByBrand(@PathVariable String brand){
        return carRepo.findByBrand(brand);
    }

    @DeleteMapping("/cars/{id}")
    public String deleteCar(@PathVariable String id){
        carRepo.deleteById(id);
        return "Car with id :"+id+" is deleted";
    }
    @PatchMapping("/updateCar/{id}")
    public String updateManager(@PathVariable("id") String id, @RequestBody Car updatedCar) {
        Car existingCar = mongoTemplate.findById(id, Car.class);
        if (existingCar != null) {
            existingCar.setModel(updatedCar.getModel());
            existingCar.setBrand(updatedCar.getBrand());
            existingCar.setDescription(updatedCar.getDescription());
            existingCar.setAvailable(updatedCar.isAvailable());
            existingCar.setPricePerDay(updatedCar.getPricePerDay());
            existingCar.setStart_Date(updatedCar.getStart_Date());
            existingCar.setEnd_Date(updatedCar.getEnd_Date());
            mongoTemplate.save(existingCar);
            return "Updated Car with id: " + existingCar.getId();
        } else {
            return "Car not found";
        }
    }

    @GetMapping("/searchCar/{keyword}")
    public List<Car> searchCars(@PathVariable String keyword){
        return carRepo.searchCarsByKeyword(keyword);
    }

    @PatchMapping("/cars/available/{id}")
    public String updateIsAvailable(@PathVariable String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Car car=carRepo.findById(id).get();
        Update update = new Update().set("a vailable", !car.isAvailable());
        mongoTemplate.updateFirst(query, update, Car.class);
        return "Car availability updated for car with id: " + id;
    }


    @GetMapping("/findByDates/{startDate}/{endDate}")
    public List<Car> getCarsByDates(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                    @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return carRepo.findByStartOrEndDateAndAvailability(endDate, startDate);
    }
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable String id){
        return carRepo.findById(id).get();
    }

    @GetMapping("/available")
    public Map<String, Integer> getNumberOfAvailableCars(){
        Map<String,Integer> map= new HashMap<>();
        map.put("available",carRepo.countByAvailable(true));
        map.put("unavailable",carRepo.countByAvailable(false));
        return map;
    }

}
