'use strict';

module.exports = {
  listeners: {
    playerEnter: state => function (player) {
      if (this.hasEffectType('speaking')) {
        return;
      }

      const speak = state.EffectFactory.create('speak', {}, {
        messageList: [
           "Приветствую, %player%. Мы уже хотели записать тебя в дезертиры.",
           "В военное время нужны все, даже такие отбросы как ты.",
           "Тренировочный лагерь для новобранцев расположен на северо-западе,",
           "чтобы попасть туда введи команду '<white>северо-запад</white>' или сокращенно '<white>сз</white>'.",
        ],
        outputFn: message => {
          message = message.replace(/%player%/, player.name);
          state.ChannelManager.get('say').send(state, this, message);
        }
      });
      this.addEffect(speak);
    },

    playerLeave: state => function (player) {
      const speaking = this.effects.getByType('speaking');
      if (speaking) {
        speaking.remove();
      }
    }
  }
};
