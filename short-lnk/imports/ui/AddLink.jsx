import React from 'react'
import { Meteor } from 'meteor/meteor'
import Modal from 'react-modal';

Modal.setAppElement('#app');
export default class AddLink extends React.Component {

	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleModalClose = this.handleModalClose.bind(this);
		this.state = {
			url: '',
			isOpen: false,
			error: ''
		};
	}

	onSubmit(e) {
		e.preventDefault()
		const { url } = this.state;

		Meteor.call('links.insert', url, (error, res) => {
			if (!error) {
				this.handleModalClose();
			} else {
				this.setState({
					error: error.reason
				});
			}
		});
	}

	onChange(e) {
		this.setState({
			url: e.target.value.trim()
		});
	}

	handleModalClose() {
		this.setState({ isOpen: false, url: '', error: '' });
	}

	render() {
		return (
			<div>
				<button className="button" onClick={() => { this.setState({ isOpen: true }) }}>+ Add Link</button>
				<Modal
					isOpen={this.state.isOpen}
					contentLabel="Add Link"
					onAfterOpen={() => { this.refs.url.focus() }}
					onRequestClose={this.handleModalClose}
					className="boxed-view__box"
					overlayClassName="boxed-view boxed-view--modal">
					<h1>Add link</h1>
					{this.state.error && <p>{this.state.error}</p>}
					<form className="boxed-view__form" onSubmit={(this.onSubmit)}>
						<input type="text" placeholder="URL" ref="url" value={this.state.url} onChange={this.onChange} />
						<button className="button">Add Link</button>
						<button className="button button--secondary" onClick={this.handleModalClose} type="button">Cancel</button>
					</form>
				</Modal>
			</div>
		)
	}
}