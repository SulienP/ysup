
DROP TABLE IF EXISTS relation_groups_users;
DROP TABLE IF EXISTS relation_reponses_tickets;
DROP TABLE IF EXISTS relation_tags_groups;
DROP TABLE IF EXISTS relation_tickets_tags;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS responses;
DROP TABLE IF EXISTS tickets;
DROP TABLE IF EXISTS tags;


CREATE TABLE users
(
	idUser VARCHAR(255) PRIMARY KEY NOT NULL,
	firstname VARCHAR(40) NOT NULL,
	lastname VARCHAR(40) NOT NULL,
	password VARCHAR(60) NOT NULL,
	image VARCHAR(500),
	email VARCHAR(50) NOT NULL
);

CREATE TABLE groups
(
    idGroup INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name VARCHAR(40) NOT NULL,
	permission VARCHAR(5) NOT NULL
);


CREATE TABLE responses
(
	idResponse VARCHAR(500) PRIMARY KEY NOT NULL,
	idUser VARCHAR(500) NOT NULL,
	content VARCHAR(200) NOT NULL,
	file BLOB,
	mailingDate DATE NOT NULL,
	FOREIGN KEY(idUser) REFERENCES users(idUser)
);



CREATE TABLE tickets
(
	idTicket VARCHAR(500) PRIMARY KEY NOT NULL,
	title VARCHAR(30) NOT NULL,
	content VARCHAR(200) NOT NULL,
	file BLOB,
	status INTEGER NOT NULL,
	dates DATE NOT NULL
);



CREATE TABLE tags
(
	idTag INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	name VARCHAR(30) NOT NULL
);



	
CREATE TABLE relation_groups_users
(
	idRelationGroupUser INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	userID VARCHAR(255) NOT NULL,
	groupID INTEGER NOT NULL,
	FOREIGN KEY(userID) REFERENCES users(idUser),
	FOREIGN KEY(groupID) REFERENCES groups(idGroup)
);



CREATE TABLE relation_reponses_tickets
(
	id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	idResponse VARCHAR(500) NOT NULL,
	idTicket VARCHAR(500)NOT NULL,
	FOREIGN KEY(idTicket) REFERENCES tickets(idTicket)
	FOREIGN KEY(idResponse) REFERENCES responses(idResponse)
);	





CREATE TABLE relation_tickets_tags
(
	idRelationTicketTag INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	idTag INTEGER NOT NULL,
	idTicket VARCHAR(500) NOT NULL,
	FOREIGN KEY(idTag) REFERENCES tags(idTag),
	FOREIGN KEY(idTicket) REFERENCES tickets(idTicket)
);



CREATE TABLE relation_tags_groups
(
	idRelationTagGroup INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	idTag INTEGER NOT NULL,
	idGroup INTEGER NOT NULL,
	FOREIGN KEY(idTag) REFERENCES tags(idTag),
	FOREIGN KEY(idGroup) REFERENCES groups(idGroup)
);

INSERT INTO users (idUser, firstname, lastname, password, image, email)
VALUES (
    '2f3f51c3318c',
    'John',
    'Doe',
    'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=',
    'profile_image_url',
    'john.doe@example.com'
);

INSERT INTO groups (name, permission)
VALUES ('MyGroup', 'r-'),('MyGroup2', '-W');

INSERT INTO relation_groups_users (userID , groupID)
VALUES ('2f3f51c3318c',1),('2f3f51c3318c',2);
