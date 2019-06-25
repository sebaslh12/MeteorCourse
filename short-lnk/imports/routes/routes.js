import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router'
import { createBrowserHistory } from "history"

import Login from '../ui/Login'
import Signup from '../ui/Signup'
import Link from '../ui/Link'
import NotFound from '../ui/NotFound'

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

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(Login)} />
            <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
            <Route path="/links" render={() => onEnterPrivatePage(Link)} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
)

export const onAuthChange = (isAuthenticated) => {
    const pathName = browserHistory.location.pathname
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
    const isAuthenticatedPage = authenticatedPages.includes(pathName)
    if (isAuthenticated && isUnauthenticatedPage) {
        browserHistory.replace('/links')
    } else if (!isAuthenticated && isAuthenticatedPage) {
        browserHistory.replace('/')
    }
}