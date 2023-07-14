CREATE DATABASE IF NOT EXISTS ordering_db;

USE ordering_db;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    refreshToken VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO Users (name, email, password) 
VALUES 
('Test', 'test@t.com', '$2a$10$dWtXQHSXqNO4dPU1LeASku.Cj0rFiHjyZ2/UcPvlECDS0Nf2BpTrW'); -- password: tpwd

CREATE TABLE IF NOT EXISTS DishCategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS DishItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    rating FLOAT NOT NULL,
    image VARCHAR(255),
    categoryId INT,
    FOREIGN KEY (categoryId) REFERENCES DishCategories(id)
);

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    dishId INT NOT NULL,
    quantity INT NOT NULL,
    price FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (dishId) REFERENCES DishItems(id)
);
