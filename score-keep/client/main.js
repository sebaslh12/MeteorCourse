import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

const players = [{
    _id: '1',
    name: 'Andrew',
    score: 99
},
{
    _id: '2',
    name: 'Sebastian',
    score: -1
},
{
    _id: '3',
    name: 'Corey',
    score: -12
}]

const renderPlayers = (players) => players.map(({ _id: id, name, score }) => <p key={id}>{name} has {score} point(s)</p>)


Meteor.startup(() => {
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