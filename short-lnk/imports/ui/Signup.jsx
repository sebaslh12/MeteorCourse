import React from 'react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        this.setState({
            error: 'Something went wrong'
        })
    }

    render() {
        return (
            <div>
                <h1>Signup to Short Link</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit}>
                    <input type="email" name="email" placeholder="E-mail" />
                    <input type="password" name="password" placeholder="password" />
                    <button>Create account</button>
                </form>
                <Link to="/">Already have an account</Link>
            </div>
        )
    }
}

export default Signup