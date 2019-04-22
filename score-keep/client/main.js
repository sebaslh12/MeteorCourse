import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Players } from '../imports/api/players'

const renderPlayers = (players) => players.map(({ _id: id, name, score }) => <p key={id}>{name} has {score} point(s)</p>)

Meteor.startup(() => {
    Players.insert({
        name: 'Jen',
        score: 15
    })

    Tracker.autorun(() => {
        let players = Players.find().fetch()
        let title = 'Score Keep'
        let name = 'Sebastian'
        let jsx = (
            <div>
                <h1>{title}</h1>
                <p>Hello {name}!</p>
                <p>This is my second p</p>
                {renderPlayers(players)}
            </div>
        )
        let jsxContainer = document.querySelector('#app')
        ReactDOM.render(jsx, jsxContainer)
    })
})