const bcrypt = require('bcryptjs')

const login = (req,res) => {
	console.log('username', req.body.username)
	req.app.get('db').login(req.body.username)
	.then(async response=>{
		console.log(response)
		let isValid = await bcrypt.compare(req.body.password, response[0].hash)
		if(isValid){
			req.session.user=response[0]
			res.status(200).json(req.session.user)
		}else {
			res.sendStatus(400)
		}
	})
	.catch(err=>console.log(err))
}

const register = async (req,res) => {
	const db = req.app.get('db')
	const hash = await bcrypt.hash(req.body.password, 12)
	db.register([req.body.username, hash, req.body.food])
	.then(()=>{
		db.login(req.body.username)
		.then(async response=>{
			let isValid = await bcrypt.compare(req.body.password, response[0].hash)
			if(isValid){
				req.session.user=response[0]
				res.status(200).json(req.session.user)
			}else {
				res.sendStatus(400)
			}
		})
		.catch(err=>console.log(err))
	})
	.catch(err=>console.log(err))
}

const getUser = (req,res) => {
	res.status(200).json(req.session.user)
}

const logout = (req,res) => {
	req.session.destroy()
	res.sendStatus(200)
}

const foodOptions = (req,res) => {
	req.app.get('db').get_food_options()
	.then(response=>res.status(200).json(response))
	.catch(err=>console.log(err))
}

const getFoodFriends = (req,res) => {
	req.app.get('db').get_food_friends(req.body.food_id)
	.then(response=>res.status(200).json(response))
	.catch(err=>console.log(err))
}

module.exports = {
	login,
	register,
	getUser,
	foodOptions,
	logout,
	getFoodFriends
}