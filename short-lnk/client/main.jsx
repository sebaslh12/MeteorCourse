import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import Signup from '../imports/ui/Signup'
import Link from '../imports/ui/Link'

Meteor.startup(() => {
  render(<Link />, document.getElementById('app'));
});
