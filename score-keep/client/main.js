import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Players } from '../imports/api/players'
import App from '../imports/ui/App'

Meteor.startup(() => {

    Tracker.autorun(() => {
        let players = Players.find().fetch()
        const title = 'Score Keep'
        let jsxContainer = document.querySelector('#app')
        ReactDOM.render(<App title={title} players={players} />, jsxContainer)
    })
})