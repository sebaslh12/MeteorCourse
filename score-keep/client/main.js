import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Players } from '../imports/api/players'
import TitleBar from '../imports/ui/TitleBar'
import AddPlayer from '../imports/ui/AddPlayer'
import Player from '../imports/ui/Player'

const renderPlayers = (players) => {
    return players.map((player) => <Player key={player._id} player={player} />)
}

Meteor.startup(() => {

    Tracker.autorun(() => {
        let players = Players.find().fetch()
        const title = 'Score Keep'
        const subtitle = 'Created by Sebastian'
        let jsx = (
            <div>
                <TitleBar title={title} subtitle={subtitle} />
                {renderPlayers(players)}
                <AddPlayer />
            </div>
        )
        let jsxContainer = document.querySelector('#app')
        ReactDOM.render(jsx, jsxContainer)
    })
})