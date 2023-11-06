package com.gi2.carrental.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Document(collection = "clients")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Client {
    @Id
    private String id;

    @Indexed(unique=true)
    private String cin;
    private String lastName;
    private String FirstName;
    private String address;
    private String PhoneNumber;
    @Indexed(unique=true)
    private String email;
    private List<Review> reviews;
}
