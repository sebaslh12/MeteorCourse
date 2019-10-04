import React from 'react'
import { Tracker } from 'meteor/tracker'

import { routes, onAuthChange } from '../routes/routes'

Tracker.autorun(() => {
	const isAuthenticated = !!Meteor.userId()
	onAuthChange(isAuthenticated)
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