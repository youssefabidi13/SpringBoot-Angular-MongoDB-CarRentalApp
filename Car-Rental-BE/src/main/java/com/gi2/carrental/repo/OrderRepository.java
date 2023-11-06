package com.gi2.carrental.repo;


import com.gi2.carrental.Enums.Statu;
import com.gi2.carrental.entity.Client;
import com.gi2.carrental.entity.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order,String> {
    List<Order> findByClientId(String id);

    List<Order> findByClient(Client client);
}
