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
    FOREIGN KEY (idNumber) REFERENCES users(idNumber) ON DELETE CASCADE
);

CREATE TABLE admins (
    adminId INT AUTO_INCREMENT PRIMARY KEY,
    idNumber VARCHAR(10),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    FOREIGN KEY (idNumber) REFERENCES users(idNumber) ON DELETE CASCADE
);

CREATE TABLE admin_requests (
    requestId INT AUTO_INCREMENT PRIMARY KEY,
    idNumber VARCHAR(10),
    email VARCHAR(255) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL
);

INSERT INTO users(idNumber, userName, address, contactNumber, email) VALUES ("18020919", "Zach Riane Machacon", "Cebu", "09173198899", "18020919@usc.edu.ph");
INSERT INTO admins(idNumber, email, password) VALUES ("18020919", "18020919@usc.edu.ph", "admin");
/* Test Cases */