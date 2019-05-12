import React from 'react'

class Link extends React.Component {
    constructor(props) {
        super(props)
        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        this.props.history.push('/')
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