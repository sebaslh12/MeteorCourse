import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import { Links } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			links: []
		}
	}

	componentDidMount() {
		this.linksTracker = Tracker.autorun(() => {
			Meteor.subscribe('links');
			const links = Links.find({
				visible: Session.get('showVisible')
			}).fetch();
			this.setState({
				links
			});
		})
	}

	componentWillUnmount() {
		this.linksTracker.stop();
	}

	renderLinksListItems() {
		const links = this.state.links;
		if (links.length)
			return links.map((link) => {
				const shortUrl = Meteor.absoluteUrl(link._id)
				return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
			})
		else
			return (
				<div>
					<p>There are no links</p>
				</div>
			)
	}

	render() {
		return (
			<div>
				<p>Links List</p>
				<div>
					{this.renderLinksListItems()}
				</div>
			</div>
		)
	}
}