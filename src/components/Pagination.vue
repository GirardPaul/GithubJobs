<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(["change-page"]);

const visiblePages = computed(() => {
  const visiblePages = [];
  if (props.currentPage <= 3) {
    for (let i = 1; i <= Math.min(3, props.totalPages - 1); i++) {
      visiblePages.push(i);
    }
  } else if (props.currentPage >= props.totalPages - 2) {
    for (
      let i = props.totalPages - 1;
      i >= Math.max(props.totalPages - 2, 2);
      i--
    ) {
      visiblePages.unshift(i);
    }
  } else {
    visiblePages.push(props.currentPage - 1);
    visiblePages.push(props.currentPage);
    visiblePages.push(props.currentPage + 1);
  }
  return visiblePages;
});

const showFirstDots = computed(() => {
  return visiblePages.value[0] > 2;
});
const showLastDots = computed(() => {
  return (
    visiblePages.value[visiblePages.value.length - 1] < props.totalPages - 1
  );
});

const changePage = (page) => {
  emit("change-page", page);
};
const previousPage = () => {
  if (props.currentPage > 1) {
    emit("change-page", props.currentPage - 1);
  }
};
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("change-page", props.currentPage + 1);
  }
};
</script>
<template>
  <div class="pagination">
    <button :class="{noactive: currentPage !== 1}" @click="previousPage" :disabled="currentPage === 1">&larr;</button>
    <button v-if="showFirstDots" disabled>...</button>
    <button
      v-for="page in visiblePages"
      :key="page"
      :class="{ active: currentPage === page, noactive: currentPage !== page }"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
    <button v-if="showLastDots" disabled>...</button>
    <button
      :class="{ active: currentPage === totalPages, noactive: currentPage !== totalPages }"
      @click="changePage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button class="mr-none" :class="{noactive: currentPage !== totalPages}" @click="nextPage" :disabled="currentPage === totalPages">
      &rarr;
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-self: flex-end;
}
.mr-none {
    margin-right: 0;
}

button {
  padding: 1.2rem 1.4rem;
  margin: 0 0.5rem;
  width: 5.6rem;
  cursor: pointer;
  border: 1px solid #b7bcce;
  border-radius: 4px;
  background: transparent;
  font-style: normal;
  font-weight: 400;
  font-size: 1.2rem;
  color: #b9bdcf;
  text-align: center;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
button.noactive:hover {
  border: 1px solid #1e86ff;
  color: #1e86ff;
}

button.active {
  background: #1e86ff;
  border: 1px solid #1e86ff;
  border-radius: 4px;
  color: #fff;
}

@media screen and (max-width: 576px) {
  button {
    width: 5rem;
  }
}
</style>
