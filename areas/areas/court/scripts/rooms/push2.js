const { Broadcast } = require('ranvier');

module.exports = {
  listeners: {
    command: (state) => function (player, commandName, args) {
      if (commandName !== 'нажать') {
        return;
      }

      if (args !== 'рычаг') {
        return Broadcast.sayAt(player, 'Что вы хотите нажать?');
      }

      let ending = '';
      if (player.gender === 'male') {
        ending = '';
      } else if (player.gender === 'female') {
        ending = 'а';
      } else if (player.gender === 'plural') {
        ending = 'и';
      } else {
        ending = 'о';
      }

      const leverUp = Array.from(player.room.items).find((item) => item.entityReference === 'court:40238');
      if (leverUp) {
        Broadcast.sayAt(player, 'Вы переключили рычаг в среднее положение.');
        Broadcast.sayAtExcept(player.room, `${actor.Name} переключил${ending} рычаг в среднее положение.`, player);
        player.room.spawnItem(state, 'court:40239');
        return player.room.removeItem(leverUp);
      }

      const leverMiddle = Array.from(player.room.items).find((item) => item.entityReference === 'court:40239');
      if (leverMiddle) {
        Broadcast.sayAt(player, 'Вы переключили рычаг в нижнее положение.');
        Broadcast.sayAtExcept(player.room, `${actor.Name} переключил${ending} рычаг в нижнее положение.`, player);
        player.room.spawnItem(state, 'court:40240');
        return player.room.removeItem(leverMiddle);
      }

      const leverDown = Array.from(player.room.items).find((item) => item.entityReference === 'court:40240');
      if (leverDown) {
        Broadcast.sayAt(player, 'Вы переключили рычаг в верхнее положение.');
        Broadcast.sayAtExcept(player.room, `${actor.Name} переключил${ending} рычаг в верхнее положение.`, player);
        player.room.spawnItem(state, 'court:40238');
        return player.room.removeItem(leverDown);
      }
    },

    respawnTick: (state) => function () {
      for (const item of this.items) {
        this.removeItem(item);
      }

      this.spawnItem(state, 'court:40238');
    },
  },
};
