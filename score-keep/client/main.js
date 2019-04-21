import React from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'

Meteor.startup(() => {
    let name = 'Sebastian'
    let jsx = <p>Hello {name}!</p>
    let jsxContainer = document.querySelector('#app')
    ReactDOM.render(jsx, jsxContainer)
})