import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Players } from '../imports/api/players'
import TitleBar from '../imports/ui/TitleBar'
import AddPlayer from '../imports/ui/AddPlayer'
import PlayerList from '../imports/ui/PlayerList';

Meteor.startup(() => {

    Tracker.autorun(() => {
        let players = Players.find().fetch()
        const title = 'Score Keep'
        const subtitle = 'Created by Sebastian'
        let jsx = (
            <div>
                <TitleBar title={title} subtitle={subtitle} />
                <PlayerList players={players} />
                <AddPlayer />
            </div>
        )
        let jsxContainer = document.querySelector('#app')
        ReactDOM.render(jsx, jsxContainer)
    })
})