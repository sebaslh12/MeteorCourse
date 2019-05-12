import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { createBrowserHistory } from "history"

import Login from './Login'
import Signup from './Signup'
import Link from './Link'
import NotFound from './NotFound'

const customHistory = createBrowserHistory()
const routes = (
    <Router history={customHistory}>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/links" component={Link} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)


class App extends React.Component {
    render() {
        return (
            <div>
                {routes}
            </div>
        )
    }
}

export default App