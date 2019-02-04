require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const session = require("express-session");
const cors = require('cors')
const controller = require('./controller')
const app = express()
const port = process.env.PORT

app.use(json())
app.use(cors())

massive(process.env.CONNECTION_STRING)
	.then(db => {
		app.set('db', db);
		console.log('database connected');
	})

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24
		}
	})
);

app.put('/api/login', controller.login)
app.post('/api/register', controller.register)
app.get('/api/user', controller.getUser)
app.get('/api/foodoptions', controller.foodOptions)
app.get('/api/logout', controller.logout)
app.get('/api/foodfriends/', controller.getFoodFriends)

app.listen(port, ()=>console.log(`listening on ${port}`))