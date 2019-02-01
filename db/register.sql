INSERT INTO users (username, hash, favorite_food)
VALUES ($1,$2,(SELECT food_id FROM favorite_foods WHERE name = $3));