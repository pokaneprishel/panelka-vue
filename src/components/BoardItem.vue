<template>
  <span :class="getBoardItemClasses" v-on:click="select(field.id)"></span>
</template>

<script>
import { GAME_STATUS, FIELD } from "@/constants";
import { computed } from "@vue/runtime-core";
export default {
  name: "BoardItem",
  emits: [ 'select-field', 'selectField' ],
  props: {
    field: {
      type: Object,
      required: true,
    },
    gameStatus: {
      type: Number,
      required: false,
      default: GAME_STATUS.NONE,
    },
  },
  setup(props) {
    const getBoardItemClasses = computed(() => {
      let classes = 'item ';
      
      if (props.field.value === FIELD.FILLED && props.gameStatus === GAME_STATUS.PREVIEW
        || props.field.clicked && props.field.value === FIELD.FILLED) {
        classes += ' active';
      }
      
      if (props.field.clicked && props.field.value === FIELD.EMPTY) {
        classes += ' error';
      }
      
      return classes;
    });
    
    return {
      getBoardItemClasses
    }
  },
  methods: {
    select(id) {
      if (this.gameStatus === GAME_STATUS.STARTED) {
        this.$emit('selectField', id);
      }
    }
  }
}
</script>

<style scoped>
.item {
  width: 6rem;
  height: 6rem;

  background: black;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgba(96, 165, 250, var(--tw-border-opacity));
  border-width: 6px;

  transition: 0.4s;
  transform-style: preserve-3d;
}

.item.active {
  background-color: rgba(96, 165, 250, var(--tw-border-opacity));

  border-style: solid;
  border-color: rgba(96, 165, 250, var(--tw-border-opacity));
  border-width: 6px;

  transform: rotateX(180deg);
}

.item.error {
    background-color: #b91c1c;
    border-color: #b91c1c;
    transform: rotateX(180deg);
  }
</style>
