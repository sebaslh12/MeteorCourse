import React from 'react'
import { Link } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'


class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: ''
		}
		this.onSubmit = this.onSubmit.bind(this)
	}

	onSubmit(e) {
		e.preventDefault()
		let email = this.refs.email.value.trim()
		let password = this.refs.password.value.trim()
		Meteor.loginWithPassword({ email }, password, (err) => {
			if (err) {
				this.setState({
					error: 'Unable to login. Check email or password.'
				})
			} else {
				this.setState({
					error: ''
				})
			}
		})
	}

	render() {
		return (
			<div className="boxed-view">
				<div className="boxed-view__box">
					<h1>Login to Short Link</h1>
					{this.state.error ? <p>{this.state.error}</p> : undefined}
					<form onSubmit={this.onSubmit} noValidate>
						<input type="email" ref="email" name="email" placeholder="E-mail" />
						<input type="password" ref="password" name="password" placeholder="password" />
						<button>Login</button>
					</form>
					<Link to="/signup">Don't have an account? Create one</Link>
				</div>
			</div>
		)
	}
}

export default Login