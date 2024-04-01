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
INSERT INTO users(idNumber, userName, address, contactNumber, email) VALUES ("21012010", "Juan Dela Cruz", "Cebu", "09173198899", "21012010@usc.edu.ph");
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026890', 'Ricardo Rivera', 'Cagayan de Oro', '0953599249', '25026890@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026891', 'Maria Dela Cruz', 'Davao', '0917528042', '25026891@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026892', 'Elena Rivera', 'Manila', '0926439164', '25026892@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026893', 'Ana Santos', 'Bacolod', '0950173549', '25026893@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026894', 'Isabela Silva', 'Laguna', '0995161753', '25026894@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026895', 'Carmen Dela Cruz', 'Laguna', '0977645870', '25026895@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026896', 'Maria Silva', 'Cagayan de Oro', '0957366256', '25026896@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026897', 'Juan Rivera', 'Cagayan de Oro', '0962133605', '25026897@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026898', 'Elena Reyes', 'Cebu', '0914972351', '25026898@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026899', 'Maria Reyes', 'Manila', '0966725535', '25026899@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026900', 'Carlos Ocampo', 'Bacolod', '0964590540', '25026900@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026901', 'Isabela Dela Cruz', 'Laguna', '0990792477', '25026901@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026902', 'Jose Garcia', 'Zamboanga', '0922565530', '25026902@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026903', 'Jose Silva', 'Baguio', '0990589470', '25026903@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026904', 'Ana Rivera', 'Bacolod', '0951942963', '25026904@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026905', 'Juan Reyes', 'Cebu', '0927554392', '25026905@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026906', 'Juan Santos', 'Manila', '0957676424', '25026906@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026907', 'Jose Bautista', 'Pampanga', '0978095453', '25026907@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026908', 'Luis Silva', 'Davao', '0923384170', '25026908@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026909', 'Isabela Dela Cruz', 'Cagayan de Oro', '0993765894', '25026909@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026910', 'Maria Rivera', 'Zamboanga', '0994185436', '25026910@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026911', 'Elena Santos', 'Laguna', '0980584461', '25026911@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026912', 'Juan Reyes', 'Laguna', '0969026487', '25026912@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026913', 'Carmen Garcia', 'Laguna', '0934568578', '25026913@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026914', 'Carlos Garcia', 'Manila', '0988866106', '25026914@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026915', 'Carmen Ocampo', 'Iloilo', '0916627819', '25026915@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026916', 'Maria Reyes', 'Davao', '0912808364', '25026916@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026917', 'Isabela Rivera', 'Manila', '0950802263', '25026917@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026918', 'Elena Reyes', 'Baguio', '0958293874', '25026918@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026919', 'Maria Silva', 'Iloilo', '0951323556', '25026919@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026920', 'Elena Silva', 'Zamboanga', '0970697828', '25026920@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026921', 'Isabela Navarro', 'Baguio', '0963552887', '25026921@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026922', 'Isabela Garcia', 'Bacolod', '0987901387', '25026922@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026923', 'Jose Garcia', 'Zamboanga', '0939206150', '25026923@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026924', 'Ricardo Ocampo', 'Cagayan de Oro', '0931465939', '25026924@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026925', 'Ana Dela Cruz', 'Cebu', '0952142726', '25026925@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026926', 'Ricardo Santos', 'Baguio', '0995193277', '25026926@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026927', 'Jose Navarro', 'Pampanga', '0996644865', '25026927@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026928', 'Jose Rivera', 'Pampanga', '0922325284', '25026928@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026929', 'Isabela Rivera', 'Baguio', '0984041885', '25026929@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026930', 'Ricardo Garcia', 'Laguna', '0999904839', '25026930@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026931', 'Elena Navarro', 'Iloilo', '0930335702', '25026931@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026932', 'Carmen Mercado', 'Iloilo', '0926088989', '25026932@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026933', 'Carmen Rivera', 'Manila', '0918867342', '25026933@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026934', 'Maria Bautista', 'Bacolod', '0928968406', '25026934@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026935', 'Jose Mercado', 'Laguna', '0919220042', '25026935@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026936', 'Ricardo Dela Cruz', 'Manila', '0957643102', '25026936@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026937', 'Maria Santos', 'Baguio', '0958838758', '25026937@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026938', 'Isabela Bautista', 'Bacolod', '0912857631', '25026938@usc.edu.ph');
INSERT INTO users (idNumber, userName, address, contactNumber, email) VALUES ('25026939', 'Ricardo Santos', 'Manila', '0975442156', '25026939@usc.edu.ph');
INSERT INTO admins (idNumber, email, password) VALUES ('18020919', '18020919@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026890', '25026890@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026891', '25026891@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026892', '25026892@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026893', '25026893@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026894', '25026894@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026895', '25026895@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026896', '25026896@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026897', '25026897@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026898', '25026898@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');
INSERT INTO admin_requests (idNumber, email, passwordHash) VALUES ('25026899', '25026899@usc.edu.ph', '$2b$12$SpqgWyi9sEaiHQAkMjiut.FXbRydwRJULCzsHPPTXpbxxQBOWXhmO');