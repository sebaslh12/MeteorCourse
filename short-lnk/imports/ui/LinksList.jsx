import React from 'react'
import { Tracker } from 'meteor/tracker'

import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';

export default class LinksList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            links: []
        }
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links')
            const links = Links.find().fetch()
            this.setState({
                links
            })
        })
    }

    componentWillUnmount() {
        this.linksTracker.stop()
    }

    renderLinksListItems() {
        const links = this.state.links
        if (links.length)
            return links.map((link) => <p key={link._id}>{link.url}</p>)
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