CREATE TABLE user
(
	idUser varchar(500)PRIMARY KEY NOT NULL,
	firstname varchar(40),
	lastname varchar(40),
	passwords varchar(60),
	image varchar(500),
	email varchar(50)
)	

CREATE TABLE groups
(
    idGroups INT AUTO_INCREMENT NOT NULL,
	name varchar(40),
	permission varchar(5)
)


CREATE TABLE reponse
(
  idReponse varchar(500) PRIMARY KEY NOT NULL,
	idUser varchar(500),
	content varchar(200),
	file blob,
	dates datetime,
	FOREIGN KEY(idUser) REFERENCES user(idUser)
)



CREATE TABLE ticket
(
	id varchar(500) PRIMARY key NOT NULL,
	title varchar(20),
	content varchar(200),
	file blob,
	status INT,
	dates datetime
)



CREATE TABLE tags
(
	id INT AUTO_INCREMENT NOT NULL,
	name varchar(60)
)



	
CREATE TABLE relation_group_user
(
	idRelation_group_user INT PRIMARY KEY NOT NULL,
	userID INT,
	groupID INT,
	FOREIGN KEY(idRelation_group_user) REFERENCES user(idUser)
)



CREATE TABLE relation_reponse_ticket
(
	id INT PRIMARY KEY NOT NULL,
	id_response varchar(500) NOT NULL,
	id_ticket varchar(500)NOT NULL,
	FOREIGN KEY(id_ticket) REFERENCES user(idticket)
	FOREIGN KEY(id_response) REFERENCES user(idReponse)


)	





CREATE TABLE relation_user_tag
(
	idRelation_user_tag INT PRIMARY KEY NOT NULL,
	id_tag INT NOT NULL,
	id_ticket varchar(500) NOT NULL,
	FOREIGN KEY(id_tag) REFERENCES user(idtags),
	FOREIGN KEY(id_ticket) REFERENCES user(idticket)


)



CREATE TABLE relation_tag_group
(
	idRelation_tag_group INT PRIMARY KEY NOT NULL,
	id_tag INT NOT NULL,
	id_group INT NOT NULL,
	FOREIGN KEY(id_tag) REFERENCES user(idtags),
	FOREIGN KEY(id_group) REFERENCES user(idGroups)


)