import React from 'react'
import { Router, Switch, Route } from 'react-router'
import { createBrowserHistory } from "history"
import { Tracker } from 'meteor/tracker'

import Login from './Login'
import Signup from './Signup'
import Link from './Link'
import NotFound from './NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

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


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId()
    const pathName = customHistory.location.pathname
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
    const isAuthenticatedPage = authenticatedPages.includes(pathName)
    if (isAuthenticated && isUnauthenticatedPage) {
        customHistory.push('/links')
    } else if (!isAuthenticated && isAuthenticatedPage) {
        customHistory.push('/')
    }
})

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