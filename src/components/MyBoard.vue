<template>
  <div class="board w-86 h-86">
    <BoardItem
      :game-status="gameStatus"
      v-for="field in fields"
      :field="field"
      :key="'item-' + field.id"
      @selectField="selectField($event)"
    />
    <div class="state-el">
      <p class="win" v-if="isWin">Success👍</p>
      <p class="fail" v-if="isFail">Lose👎</p>
    </div>
    <div class="diff-el">
      <p
        class="diff-title text-blue-400 justify-self-center self-center text-center m-2"
      >
        Сложность: {{ diff }}
      </p>
      <button
        class="w-24 h-9 text-blue-400 border-4 border-blue-400 border-solid bg-black m-4"
        @click="start"
        :disabled="!canStartGame"
      >
        <p>Старт</p>
      </button>
    </div>
  </div>
</template>

<script>
import BoardItem from "./BoardItem";
import useGameInit from "./composables/useGameInit";
import useGameStart from "./composables/useGameStart";
import useGameProcess from "./composables/useGameProcess";
import { GAME_STATUS } from "../constants";
import { ref } from "vue";

export default {
  name: "MyBoard",
  props: {},
  components: {
    BoardItem,
  },
  setup() {
    const number = 25;
    const gameStatus = ref(GAME_STATUS.NONE);

    const { diff, fields, init } = useGameInit(number);

    const { start, canStartGame } = useGameStart(
      init,
      fields,
      diff,
      number,
      gameStatus
    );
    const { selectField, isWin, isFail } = useGameProcess(
      fields,
      gameStatus,
      diff,
      start
    );

    return {
      number,
      diff,
      fields,
      init,
      start,
      gameStatus,
      canStartGame,
      selectField,
      isWin,
      isFail,
    };
  },
};
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  justify-items: center;
  align-items: center;
  gap: 1rem;
  background-color: black;
  border-width: 8px;
  --tw-border-opacity: 1;
  border-color: rgba(96, 165, 250, var(--tw-border-opacity));
  border-style: solid;
  padding: 1rem;
  margin-top: 4rem;
  margin-bottom: 4rem;
}

button {
  font-size: 10px;
}

p {
  font-size: 10px;
}

button:disabled {
  border-color: #b91c1c;
}

button:disabled p {
  color: #b91c1c;
}

.state-el {
  grid-column-start: 1;
  grid-column-end: 2;
}

.diff-el {
  grid-column-start: 3;
  grid-column-end: 4;
}

.win {
  color: rgba(96, 165, 250, var(--tw-border-opacity));
}

.fail {
  color: #b91c1c;
}

@media screen and (max-width: 750px) {
  .board {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }
}

@media screen and (max-width: 600px) {
  .board {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(12, minmax(0, 1fr));
  }

  .diff-el {
  grid-column-start: 2;
  grid-column-end: 3;
}
}
</style>
