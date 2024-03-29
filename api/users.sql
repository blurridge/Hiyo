DROP DATABASE IF EXISTS `user_database`;
CREATE DATABASE `user_database`;
USE `user_database`;

CREATE TABLE users (
    idNumber VARCHAR(10),
    userName VARCHAR(255),
    address VARCHAR(255),
    contactNumber VARCHAR(11),
    email VARCHAR(255),
    timeEntered DATETIME,
    timeLeft DATETIME NULL
);

CREATE TABLE attendance (
    idNumber INT,
    timeEntered DATETIME,
    timeLeft DATETIME
);

/* Test Cases */