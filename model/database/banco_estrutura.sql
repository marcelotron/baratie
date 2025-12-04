-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS baratie;
USE baratie;

-- Tabela Prato
CREATE TABLE IF NOT EXISTS Prato (
    id_prato INT AUTO_INCREMENT PRIMARY KEY,
    nome_prato VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    categoria ENUM('comida', 'bebida') NOT NULL,
    imagem VARCHAR(255),
    tipo_imagem VARCHAR(50)
);

-- Tabela Mesa
CREATE TABLE IF NOT EXISTS Mesa (
    id_mesa INT AUTO_INCREMENT PRIMARY KEY,
    status_atual ENUM('livre', 'ocupada', 'reservada') DEFAULT 'livre'
);

-- Tabela Pedido
CREATE TABLE IF NOT EXISTS Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_mesa INT NOT NULL,
    id_prato INT NOT NULL,
    quantidade_unidade INT NOT NULL DEFAULT 1,
    nome_cliente VARCHAR(100),
    observacao TEXT,
    status_pedido ENUM('aberto', 'fechado', 'cancelado') DEFAULT 'fechado',
    FOREIGN KEY (id_mesa) REFERENCES Mesa(id_mesa) ON DELETE CASCADE,
    FOREIGN KEY (id_prato) REFERENCES Prato(id_prato) ON DELETE CASCADE
);

-- Tabela Pedido_Interface (View materializada como tabela ou view)
CREATE OR REPLACE VIEW Pedido_Interface AS
SELECT 
    ped.id_pedido,
    ped.id_mesa,
    ped.id_prato,
    pra.nome_prato,
    pra.preco AS preco_unidade,
    ped.quantidade_unidade,
    (pra.preco * ped.quantidade_unidade) AS soma_prato,
    ped.observacao,
    USER() AS atendente_UserBanco
FROM 
    Pedido ped
INNER JOIN 
    Prato pra ON ped.id_prato = pra.id_prato;

-- Inserir algumas mesas de exemplo
INSERT INTO Mesa (status_atual) VALUES 
('livre'),
('livre'),
('livre'),
('livre'),
('livre');
