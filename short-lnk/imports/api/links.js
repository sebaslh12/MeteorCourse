import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
    Meteor.publish('links', function () {
        return Links.find({ userId: this.userId });
    })
}


Meteor.methods({
    'links.insert'(url) {
        if (!this.userId)
            throw new Meteor.Error('401')

        Links.insert({
            userId: this.userId,
            url
        })
    }
})