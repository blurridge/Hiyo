DROP DATABASE IF EXISTS `user_database`;
CREATE DATABASE `user_database`;
USE `user_database`;

CREATE TABLE users (
    id_number VARCHAR(10),
    user_name VARCHAR(255),
    address VARCHAR(255),
    contact_number VARCHAR(11),
    email VARCHAR(255)
);

CREATE TABLE attendance (
    id_number INT,
    time_entered DATETIME,
    time_left DATETIME
);

/* Test Cases */