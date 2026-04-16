CREATE DATABASE Controle_temperatura;
USE Controle_temperatura;

CREATE TABLE Objeto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255)
);

CREATE TABLE Local (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(360) NOT NULL,
    cidade VARCHAR(200),
    localizacao VARCHAR(360)
);

CREATE TABLE Medicao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    valortemp DOUBLE NOT NULL,
    data_hora DATETIME NOT NULL,

    id_objeto INT NOT NULL,
    id_local INT NOT NULL,

    FOREIGN KEY (id_objeto) REFERENCES Objeto(id),
    FOREIGN KEY (id_local) REFERENCES Local(id)
);

INSERT INTO Objeto (nome, descricao)
VALUES 
('Água', 'Água em experimento'),
('Ambiente', 'Temperatura do ambiente');

INSERT INTO Local (nome, cidade)
VALUES 
('Laboratório', 'São Carlos'),
('Sala 1', 'São Carlos');

SHOW TABLES;
DESCRIBE Medicao;
INSERT INTO Medicao (valortemp, data_hora, id_objeto, id_local)
VALUES (30.5, '2026-04-15 14:00:00', 1, 1);
SELECT * FROM Medicao;