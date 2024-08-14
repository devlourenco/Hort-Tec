create database bd_hortec2;
use bd_hortec2;

create table usuarios (
id int auto_increment primary key,
nome varchar (50),
email varchar (100) unique,
senha varchar (50),
tipo_usuario varchar (10),
deletado boolean default false
);

create table arduinos (

id int auto_increment primary key,
nome_arduino varchar(50),
usuario_id int,
foreign key (usuario_id) references usuarios(id)
);


create table leituras (
id int auto_increment primary key,
arduino_id int,
data_hora datetime,
mensagem text,
umidade decimal (3,2),

foreign key (arduino_id) references arduinos(id)
);    


create table plantas (
id int auto_increment primary key,
nome varchar (50),
umidade_ideal decimal (3,2),
temperatura_ideal decimal (3,2),
arduino_id int,
foreign key (arduino_id) references arduinos(id)    
);
   
   
  


   
   


