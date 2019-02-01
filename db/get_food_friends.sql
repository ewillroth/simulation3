SELECT * FROM favorite_foods
INNER JOIN users ON users.favorite_food = favorite_foods.food_id
WHERE favorite_foods.food_id = $1;