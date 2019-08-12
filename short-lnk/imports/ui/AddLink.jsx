import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends React.Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			url: ''
		};
	}

	onSubmit(e) {
		e.preventDefault()
		const { url } = this.state;
		if (url) {
			Meteor.call('links.insert', url, (error, res) => {
				if (!error) {
					this.setState({
						url: ''
					});
				}
			});
		}
	}

	onChange(e) {
		this.setState({
			url: e.target.value.trim()
		});
	}

	render() {
		return (
			<div>
				<p>Add link</p>
				<form onSubmit={(this.onSubmit)}>
					<input type="text" placeholder="URL" value={this.state.url} onChange={this.onChange} />
					<button>Add Link</button>
				</form>
			</div>
		)
	}
}