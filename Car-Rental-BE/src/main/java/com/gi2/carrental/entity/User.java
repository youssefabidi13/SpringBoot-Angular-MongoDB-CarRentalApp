package com.gi2.carrental.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gi2.carrental.Enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String lastName;
    private String firstName;
    private String address;
    private String email;
    private String PhoneNumber;
    private String motDePasse;
    private Role role;

    @JsonIgnore
    private Set<Role> roles = new HashSet<>();
    public Set<Role> addRole(Role role) {
        this.roles.add(role);
        return this.roles;
    }




}
