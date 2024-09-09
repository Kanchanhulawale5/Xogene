CREATE DATABASE drugs;

-- Select the database
USE drugs;

CREATE TABLE drugs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);
INSERT INTO drugs (name) VALUES
('Drug 1'),
('Drug 2'),
('Drug 3'),
('Drug 4');
