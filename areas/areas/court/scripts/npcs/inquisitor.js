const { Broadcast } = require('ranvier');

module.exports = {
  listeners: {
    playerEnter: (state) => function (player) {
      if (!this.isInCombat()) {
        return;
      }

      state.ChannelManager.get('say').send(state, this, 'Как смеешь ты прерывать мои молитвы, умри еретик!');

      this.initiateCombat(player);
    },
  },
};
