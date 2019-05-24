import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router'
import { createBrowserHistory } from "history"
import { Tracker } from 'meteor/tracker'

import Login from './Login'
import Signup from './Signup'
import Link from './Link'
import NotFound from './NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']
const browserHistory = createBrowserHistory()

const onEnterPublicPage = (Component) => {
    if (Meteor.userId()) {
        return <Redirect to="/links" />
    } else {
        return <Component />
    }
}

const onEnterPrivatePage = (Component) => {
    if (!Meteor.userId()) {
        return <Redirect to="/" />
    } else {
        return <Component />
    }
}

const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(Login)} />
            <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
            <Route path="/links" render={()=> onEnterPrivatePage(Link)} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)


Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId()
    const pathName = browserHistory.location.pathname
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
    const isAuthenticatedPage = authenticatedPages.includes(pathName)
    if (isAuthenticated && isUnauthenticatedPage) {
        browserHistory.push('/links')
    } else if (!isAuthenticated && isAuthenticatedPage) {
        browserHistory.push('/')
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