import React from 'react'
import { Link } from 'react-router-dom'

class Signup extends React.Component {
    render() {
        return (
            <div>
                <h1>Signup to Short Link</h1>
                Signup form
                <Link to="/">Already have an account</Link>
            </div>
            )
    }
}

export default Signup