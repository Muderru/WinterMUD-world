'use strict';

const { Broadcast } = require('ranvier');
const EnhanceItem = require('../../../../../lib/lib/EnhanceItem');

module.exports = {
  listeners: {
    spawn: state => function () {
      EnhanceItem.enhance(this, 'uncommon');
    }
  }
};
