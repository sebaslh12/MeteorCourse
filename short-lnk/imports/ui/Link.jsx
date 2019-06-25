import React from 'react'
import { Accounts } from 'meteor/accounts-base'

import { Links } from '../api/links';
import LinksList from './LinksList'
class Link extends React.Component {
    constructor(props) {
        super(props)
        this.onLogout = this.onLogout.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onLogout() {
        Accounts.logout()
    }

    onSubmit(e) {
        e.preventDefault()
        const url = this.refs.url.value.trim();
        if (url) {
            Links.insert({ url })
            this.refs.url.value = ''
        }
    }

    render() {
        return (
            <div>
                <h1>Links</h1>
                <button onClick={this.onLogout}>Logout</button>
                <LinksList />
                <p>Add link</p>
                <form onSubmit={(this.onSubmit)}>
                    <input type="text" ref="url" placeholder="URL" />
                    <button>Add Link</button>
                </form>
            </div>
        )
    }
}

export default Link