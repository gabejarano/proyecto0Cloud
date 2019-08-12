create database db_abc;

use db_abc;

CREATE TABLE usuarios(
    id INT (11) NOT NULL,
    email VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL
);
ALTER TABLE usuarios ADD PRIMARY KEY (id);
ALTER TABLE usuarios MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


CREATE TABLE EVENTOS (
    id INT(11) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    lugar VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    fechainicial date not null,
    fechafinal date not null,
    presencial boolean not null,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES usuarios(id)
);
ALTER TABLE eventos ADD PRIMARY KEY (id);
ALTER TABLE eventos MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;