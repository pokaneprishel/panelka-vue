import { setTimeout } from "core-js";
import { FIELD, GAME_SPEED, GAME_STATUS } from "@/constants";
import { computed } from "@vue/runtime-core";

export default function useGameStart(init, fields, diff, number, gameStatus) {
  const start = () => {
    init();
    prepareGame();
  };

  const prepareGame = () => {
    gameStatus.value = GAME_STATUS.PREVIEW;

    for (let i = 0; i < diff.value; i++) {
      const index = random(0, number - 1);
      if (fields.value[index].value !== FIELD.FILLED) {
        fields.value[index].value = FIELD.FILLED;
      } else {
        i--;
      }
    }

    setTimeout(() => {
      gameStatus.value = GAME_STATUS.STARTED;
    }, GAME_SPEED);
  };

  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const canStartGame = computed(() => {
    return gameStatus.value !== GAME_STATUS.PREVIEW && gameStatus.value !== GAME_STATUS.WIN;
  });

  return {
    start,
    canStartGame,
  };
}
