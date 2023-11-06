package com.gi2.carrental.repo;

import com.gi2.carrental.entity.Client;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface ClientRepository extends MongoRepository<Client,String> {
    @Query("{ 'cin' : ?0 }")
    Client findByCin(String cin);
    boolean existsByEmail(String email);

    boolean existsByCin(String cin);
}
