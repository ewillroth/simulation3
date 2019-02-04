import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(){
		super()
		this.state={
			username: '',
			password: '',
			foods: [],
			food: '',
			foodfriends: [],
			loaded: false,
			login: true,
			loggedin: false,
			user: '',
			update: false
		}
	}

	componentDidMount(){
		axios.get('/api/user')
		.then(response=>{
			if(response.data){
				console.log(response.data)
				this.setState({user: response.data, loaded: true, loggedin: true})
			}
			axios.get('/api/foodoptions')
				.then(response => {
					this.setState({
						foods: response.data,
						loaded: true
					})
				})
				.catch(err => console.log(err))
		})
		.catch(err=>console.log(err))
	}

	display = () => {
		axios.get(`/api/foodfriends/?food=${this.state.food}`)
			.then(response => console.log(response.data)||this.setState({foodfriends:response.data}))
			.catch(err => console.log(err))
	}

	login = (e) => {
		e.preventDefault()
		let {username, password} = this.state
		axios.put('/api/login', {username, password})
		.then(response=>console.log(response.data)||this.setState({user:response.data,loggedin:true}))
			.catch(err => alert('username or password is incorrect'))
	}

	logout = (e) => {
		axios.get('/api/logout')
		.then(response=>{
			this.setState({loggedin:false})
		}).catch(err=>console.log(err))
	}

	register = (e) => {
		e.preventDefault()
		let {username, password, food} = this.state
		axios.post('/api/register', {username, password, food})
		.then(response=>this.setState({user:response[0],loggedin:true}))
		.catch(err=>alert('this username is taken'))
	}

	toggleForm = () => {
		this.setState(prevState=>{return {login: !prevState.login}})
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]:e.target.value
		})
	}

	render() {
		const foodfriends = this.state.foodfriends.map((user, i) => <li key={i}>{user.username}</li>)
		const map = this.state.loaded?this.state.foods.map((food, i)=><option key={i}>{food.name}</option>):<option> </option>
		return (
		<div className="App">
			<button className={this.state.loggedin?"hide":"toggle"} onClick={this.toggleForm}>{this.state.login?"Switch to Registration Form":"Switch to Login Form"}</button>
			{this.state.loggedin?
			<div className="column">
				<button onClick={this.logout}>logout</button>
				<select className="logininput" name="food" onChange={this.onChange}>
					{map}
				</select>
				<button name="foodfriends" onClick={this.display}>Display users who enjoy this food</button>
				<ul>
					{foodfriends}
				</ul>
			</div>
			:
			this.state.login?
			<form className="loginform" onSubmit={this.login}>
				<p>Username:</p>
				<input className="logininput" name="username" type="text" value={this.state.username} onChange={this.onChange}></input>
				<p>Password:</p>
				<input className="logininput" name="password" type="password" value={this.state.password} onChange={this.onChange}></input>
				<button>Login</button>
			</form>
			:
			<form className="loginform" onSubmit={this.register}>
				<p>Username:</p>
				<input className="logininput" name="username" type="text" value={this.state.username} onChange={this.onChange}></input>
				<p>Password:</p>
				<input className="logininput" name="password" type="password" value={this.state.password} onChange={this.onChange}></input>
				<p>Favorite Food:</p>
				<select className="logininput" name="food" onChange={this.onChange}>
					{map}
				</select>
				<button>Register</button>
			</form>
			}
		</div>
		);
	}
}

export default App;
