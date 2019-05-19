import React from 'react'
import { Accounts } from 'meteor/accounts-base'

class Link extends React.Component {
    constructor(props) {
        super(props)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        Accounts.logout()
    }

    render() {
        return (
            <div>
                <h1>Links</h1>
                <button onClick={this.onLogout}>Logout</button>
            </div>
        )
    }
}

export default Link