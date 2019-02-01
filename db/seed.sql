CREATE TABLE favorite_foods (
	food_id SERIAL PRIMARY KEY,
	name VARCHAR(200) UNIQUE
);

CREATE TABLE users (
    username VARCHAR(200) PRIMARY KEY, 
    hash text, 
    favorite_food integer REFERENCES favorite_foods(food_id)
);

INSERT INTO favorite_foods (name)
VALUES ('pizza'),
('tacos'),
('burgers'),
('salad'),
('waffles'),
('ramen'),
('steak'),
('falafel');