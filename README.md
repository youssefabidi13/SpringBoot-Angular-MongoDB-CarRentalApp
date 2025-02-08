# Car Rental Management App
==========================

## Overview
-----------

Car Rental Management App is a web-based application designed to manage a car rental agency. The application allows admins and managers to handle user accounts, vehicle inventory, reservations, and generate reports based on user data and rental statistics.

## Technologies Used
--------------------

* **Frontend:** Angular (version 14.0.7)
* **Backend:** Spring Boot (version 3.0.6)
* **Database:** MongoDB

## Features
------------

### User Management

* Admins and managers can add, update, or remove users
* Admins can update the roles of both managers and users

### Vehicle Management

* Managers and admins can add new cars, update prices, upload photos, and manage the availability of cars

### Reservation System

* Clients can register and reserve cars based on availability
* Admins and managers can accept or reject reservation requests based on the client's history

### Analytics

* The application provides detailed charts and statistics to help admins and managers make informed decisions based on rental data

## Frontend Components
----------------------

* `shop.component.html`: A page for displaying available cars
* `dashboard.component.html`: A dashboard for admins and managers to manage the application
* `profile-details.component.html`: A page for users to view and edit their profiles
* `productsingle.component.html`: A page for displaying a single car's details
* `cars.component.html`: A page for displaying a list of cars
* `car-by-date.component.html`: A page for displaying cars available on a specific date
* `car-detai.component.html`: A page for displaying a car's details
* `orders-accepted.component.html`: A page for displaying accepted orders
* `orders-refused.component.html`: A page for displaying refused orders
* `logout.component.html`: A page for logging out

## Backend
------------

* The Spring Boot application is configured using a `pom.xml` file, which specifies the project's dependencies and build settings
* The application uses MongoDB as its database

## Security
------------

* The application uses an interceptor (`AppRequestInterceptor`) to handle HTTP requests and responses
* The `RouterguardGuard` is used to protect routes from unauthorized access

## Build and Deployment
-----------------------

* The Angular application is built using the `@angular-devkit/build-angular` package
* The application is deployed to a production environment using the `@angular-devkit/build-angular:dev-server` package

## Skills
---------

* Java
* Angular
* Spring Boot
* MongoDB
* TypeScript

## Getting Started
---------------

To get started with the project, follow these steps:

1. Clone the repository using `git clone`
2. Install the dependencies using `npm install`
3. Start the backend server using `mvn spring-boot:run`
4. Start the frontend server using `ng serve`
5. Open the application in your web browser at `http://localhost:4200`
