import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Players } from '../imports/api/players'
import TitleBar from '../imports/ui/TitleBar'
import AddPlayer from '../imports/ui/AddPlayer'

const renderPlayers = (players) => {
    return players.map(({ _id: id, name, score }) => {
        return (
            <p key={id}>
                {name} has {score} point(s)
                <button onClick={() => {
                    Players.update(id,
                        {
                            $inc: {
                                score: 1
                            }
                        })
                }}>+1</button>
                <button onClick={() => {
                    Players.update(id,
                        {
                            $inc: {
                                score: -1
                            }
                        })
                }}>-1</button>
                <button onClick={() => Players.remove(id)}>X</button>
            </p >
        )
    })
}

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
        const title = 'Score Keep'
        const subtitle = 'Created by Sebastian'
        let jsx = (
            <div>
                <TitleBar title={title} subtitle={subtitle}/>
                {renderPlayers(players)}
                <AddPlayer/>
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