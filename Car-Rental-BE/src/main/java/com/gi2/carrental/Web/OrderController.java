package com.gi2.carrental.Web;

import com.gi2.carrental.Enums.Statu;
import com.gi2.carrental.entity.Car;
import com.gi2.carrental.entity.Order;
import com.gi2.carrental.repo.CarRepo;
import com.gi2.carrental.repo.OrderRepository;
import com.gi2.carrental.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CarRepo carRepository;

    @Autowired
    private OrderService orderService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderRepository.findAll();
    }
    @PostMapping("/addOrder")
    public String saveOrder(@RequestBody Order order) {
        orderRepository.save(order);
        return "Added Order with id : " + order.getId();
    }
    @GetMapping("/allOrders")
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }
    @GetMapping("/search")
    public Page<Order> search(
            @RequestParam(required = false) String id,
            @RequestParam(required = false) Statu State,
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate,
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "5") Integer size){
        Pageable pageable = PageRequest.of(page, size);

        return orderService.search(id,State, startDate, endDate, pageable);
    }
    @GetMapping("/orderSingle/{id}")
    public Order getOrder(@PathVariable String id) {
        return orderRepository.findById(id).orElse(null);
    }

    @PatchMapping("/updateState/{id}")
    public String updateState(@PathVariable String id, @RequestBody Order order) {
        if(order.getState() == Statu.Refuse){

            Car car = carRepository.findById(order.getCar().getId()).orElseThrow(() -> new IllegalArgumentException("Car not found"));
            car.setAvailable(true);
            carRepository.save(car);
        }
        Order order1 = orderRepository.findById(id).orElse(null);
        order1.setState(order.getState());
        orderRepository.save(order1);
        return "Order updated";
    }
    @GetMapping("/ClientOrders/{id}")

    public List<Order> getClientOrders(@PathVariable String id) {
        return orderRepository.findByClientId(id);
    }
    @GetMapping("/findAllOrdersInHold")
    //use criteria to find orders in hold
    public List<Order> findAllOrdersInHold() {
        return mongoTemplate.find(Query.query(Criteria.where("State").is(Statu.InHold)), Order.class);
    }
    @GetMapping("/findAllOrdersAccepted")
    //use criteria to find orders accepted
    public List<Order> findAllOrdersAccepted() {
        return mongoTemplate.find(Query.query(Criteria.where("State").is(Statu.Accepte)), Order.class);
    }
    @GetMapping("/findAllOrdersRefused")
    //use criteria to find orders refused
    public List<Order> findAllOrdersRefused() {
        return mongoTemplate.find(Query.query(Criteria.where("State").is(Statu.Refuse)), Order.class);
    }
}
