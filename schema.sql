### Schema


CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
    createdAt timestamp NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE eaters
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
    createdAt timestamp NOT NULL,
	PRIMARY KEY (id)
);



ALTER TABLE burgers
ADD COLUMN eater_id INT;

LEFT OUTER JOIN eaters ON burgers.eater_id = eaters.id;