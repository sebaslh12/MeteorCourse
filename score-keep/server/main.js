import { Meteor } from 'meteor/meteor'
import { Players } from '../imports/api/players'

Meteor.startup(() => {
    Players.insert({
        name: 'Corey',
        score: 99
    })
    console.log(Players.find().fetch())
})