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
INSERT INTO users (id_number, user_name, address, contact_number, email) 
VALUES 
('21103295', 'Joseph Kahl Lendio Awi', 'Talamban, Cebu City, Cebu', '09912345627', '21103295@usc.edu.ph'),
('21102269', 'Rodjean Evangelista Gere', 'Talamban, Cebu City, Cebu', '09953234627', '21102269@usc.edu.ph'),
('18020919', 'Zach Riane Inting Machacon', 'Talamban, Cebu City, Cebu', '09912445542', '18020919@usc.edu.ph');

INSERT INTO attendance (id_number, time_entered, time_left)
VALUES
('21103295', '2023-03-27 09:20:00', '2023-03-27 05:20:00'),
('21102269', '2023-03-27 08:20:00', '2023-03-27 04:20:00'),
('18020919', '2023-03-27 07:20:00', '2023-03-27 06:20:00');