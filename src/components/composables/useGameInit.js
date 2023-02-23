import { onBeforeMount, ref, watch } from "vue";
import { FIELD, DEFAULT_DIFF, MAX_DIFF } from "@/constants";

export default function useGameInit(number) {
  let diff = ref(DEFAULT_DIFF);
  let fields = ref([]);

  const init = () => {
    fields.value = [];

    for (let i = 0; i < number; i++) {
      fields.value.push({
        id: 1,
        clicked: false,
        value: FIELD.EMPTY,
      });
    }
  };

  watch(diff, (newDiff) => {
    if (newDiff > MAX_DIFF) {
      diff.value = MAX_DIFF;
    }
  });

  onBeforeMount(init);

  return {
    diff,
    fields,
    init
  };
}
