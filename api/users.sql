DROP DATABASE IF EXISTS `user_database`;
CREATE DATABASE `user_database`;
USE `user_database`;

CREATE TABLE users (
    idNumber VARCHAR(10) PRIMARY KEY,
    userName VARCHAR(255),
    address VARCHAR(255),
    contactNumber VARCHAR(11),
    email VARCHAR(255)
);

CREATE TABLE attendance (
    attendanceId INT AUTO_INCREMENT PRIMARY KEY,
    idNumber VARCHAR(10),
    timeEntered DATETIME,
    timeLeft DATETIME NULL,
    FOREIGN KEY (idNumber) REFERENCES users(idNumber)
);

/* Test Cases */