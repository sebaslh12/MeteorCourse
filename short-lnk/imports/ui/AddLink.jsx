import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal';
export default class AddLink extends React.Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			url: '',
			isOpen: false
		};
	}

	onSubmit(e) {
		e.preventDefault()
		const { url } = this.state;
		if (url) {
			Meteor.call('links.insert', url, (error, res) => {
				if (!error) {
					this.setState({
						url: '',
						isOpen: false
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
				<button onClick={() => { this.setState({ isOpen: true }) }}>+ Add Link</button>
				<Modal isOpen={this.state.isOpen} contentLabel="Add Link">
					<p>Add link</p>
					<form onSubmit={(this.onSubmit)}>
						<input type="text" placeholder="URL" value={this.state.url} onChange={this.onChange} />
						<button>Add Link</button>
					</form>
					<button onClick={() => { this.setState({ url: '', isOpen: false }) }}>Cancel</button>
				</Modal>
			</div>
		)
	}
}