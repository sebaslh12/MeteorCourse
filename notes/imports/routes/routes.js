import React from 'react'
import { Router, Switch, Route, Redirect } from 'react-router'
import { createBrowserHistory } from "history"

import Login from '../ui/Login'
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/dashboard']
const browserHistory = createBrowserHistory()

const onEnterPublicPage = (Component) => {
	if (Meteor.userId()) {
		return <Redirect to="/dashboard" />
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
			<Route path="/dashboard" render={() => onEnterPrivatePage(Dashboard)} />
			<Route path="*" component={NotFound} />
		</Switch>
	</Router>
)

export const onAuthChange = (isAuthenticated) => {
	const pathName = browserHistory.location.pathname
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathName)
	const isAuthenticatedPage = authenticatedPages.includes(pathName)
	if (isAuthenticated && isUnauthenticatedPage) {
		browserHistory.replace('/dashboard')
	} else if (!isAuthenticated && isAuthenticatedPage) {
		browserHistory.replace('/')
	}
}