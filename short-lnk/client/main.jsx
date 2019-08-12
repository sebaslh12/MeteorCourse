import React from 'react'
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom'
import { Session } from 'meteor/session';

import App from '../imports/ui/App'
import '../imports/startup/simple-schema-configuration.js'


Meteor.startup(() => {
	Session.set('showVisible', true);
	render(<App />, document.getElementById('app'));
})
