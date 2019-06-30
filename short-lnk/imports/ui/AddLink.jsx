import React from 'react'
import { Meteor } from 'meteor/meteor'

export default class AddLink extends React.Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const url = this.refs.url.value.trim();
        if (url) {
            Meteor.call('links.insert', url)
            this.refs.url.value = ''
        }
    }

    render() {
        return (
            <div>
                <p>Add link</p>
                <form onSubmit={(this.onSubmit)}>
                    <input type="text" ref="url" placeholder="URL" />
                    <button>Add Link</button>
                </form>
            </div>
        )
    }
}