require('dotenv').config()
const express = require('express')
const {json} = require('body-parser')
const massive = require('massive')
const app = express()
const cors = require('cors')
const port = process.env.PORT
const controller = require('./controller')

app.use(json())
app.use(cors())

massive(process.env.CONNECTION_STRING)
	.then(db => {
		app.set('db', db);
		console.log('database connected');
	})


app.listen(port, ()=>console.log(`listening on ${port}`))