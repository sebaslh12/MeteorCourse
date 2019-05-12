import React from 'react'
import { Link } from 'react-router-dom'


class Login extends React.Component {
    render() {
        return (
            <div>
                <h1>Login to Short Link</h1>
                Login form
                <Link to="/signup">Have an account? Create one</Link>
            </div>
        )
    }
}

export default Login