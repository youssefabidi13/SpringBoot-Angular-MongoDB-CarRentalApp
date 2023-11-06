package com.gi2.carrental.service;

import com.gi2.carrental.Enums.Statu;
import com.gi2.carrental.entity.Order;
import com.gi2.carrental.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public Page<Order> search(String id,Statu state, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        Query query = new Query().with(pageable);
        List<Criteria> criteria = new ArrayList<>();
        if (id != null) {
            criteria.add(Criteria.where("id").is(id));
        }
        if (state != null) {
            criteria.add(Criteria.where("state").is(state));
        }
        if(startDate != null && endDate != null){
            criteria.add(Criteria.where("startDate").is(startDate).and("endDate").is(endDate));
        }
        if(!criteria.isEmpty()){
            query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[0])));
        }

        Page<Order> orders = PageableExecutionUtils.getPage(
                mongoTemplate.find(query, Order.class),
                pageable,
                () -> mongoTemplate.count(query.skip(0).limit(0), Order.class));


        return orders;
    }
}
