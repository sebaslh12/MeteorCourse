import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { Players } from '../imports/api/players'

const renderPlayers = (players) => players.map(({ _id: id, name, score }) => <p key={id}>{name} has {score} point(s)</p>)
const handleSubmit = (e) => {
    const playerName = e.target.playerName.value
    if (playerName.trim()) {
        Players.insert({
            name: playerName,
            score: 0
        })
        e.target.playerName.value = ''
    }
    e.preventDefault()
}
Meteor.startup(() => {

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
                <form onSubmit={handleSubmit}>
                    <input type="text" name="playerName" placeholder="Player Name" />
                    <button>Add Player</button>
                </form>
            </div>
        )
        let jsxContainer = document.querySelector('#app')
        ReactDOM.render(jsx, jsxContainer)
    })
})