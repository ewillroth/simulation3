SELECT username FROM users
INNER JOIN favorite_foods ON users.favorite_food = favorite_foods.food_id
WHERE favorite_foods.name = $1;