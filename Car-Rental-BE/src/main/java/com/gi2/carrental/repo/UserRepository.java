package com.gi2.carrental.repo;

import com.gi2.carrental.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User,Integer> {
    User findByEmail(String username);
}
