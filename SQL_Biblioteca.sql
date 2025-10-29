-- =====================================
-- BANCO DE DADOS: Biblioteca Online
-- =====================================


-- =====================================
-- Tabela de Usuários
-- =====================================
CREATE TABLE Usuarios (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    SenhaHash NVARCHAR(255) NOT NULL
);
GO

-- =====================================
-- Tabela de Livros
-- =====================================
CREATE TABLE Livros (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Titulo NVARCHAR(150) NOT NULL,
    Autor NVARCHAR(100) NOT NULL,
    AnoPublicacao INT,
    Genero NVARCHAR(50),
    Editora NVARCHAR(100),
    ISBN NVARCHAR(20) UNIQUE,
    Disponivel BIT DEFAULT 1
);
GO

-- =====================================
-- Tabela de Reservas
-- =====================================
CREATE TABLE Reservas (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UsuarioId INT NOT NULL,
    LivroId INT NOT NULL,
    DataReserva DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) DEFAULT 'ativa',
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id),
    FOREIGN KEY (LivroId) REFERENCES Livros(Id)
);
GO

