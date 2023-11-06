package com.gi2.carrental.entity;

import com.gi2.carrental.Enums.Rate;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Data
@Builder
public class Review {
    private String id;
    private String comment;
    private int rating;
    @DBRef
    private User user;
}
