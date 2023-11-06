package com.gi2.carrental.service;

import com.gi2.carrental.Enums.Statu;
import com.gi2.carrental.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface OrderService {

    Page<Order> search(String id,Statu state, LocalDate startDate, LocalDate endDate, Pageable pageable);
}
