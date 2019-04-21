import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
    let title = 'Score Keep'
    let name = 'Sebastian'
    let jsx = (
        <div>
            <h1>{title}</h1>
            <p>Hello {name}!</p>
            <p>This is my second p</p>
        </div>
    )
    let jsxContainer = document.querySelector('#app')
    ReactDOM.render(jsx, jsxContainer)
})