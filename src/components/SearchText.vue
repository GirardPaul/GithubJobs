<script setup>
import { ref } from "vue";
const searchText = ref("");
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    placeholder: {
        type: String
    }
});
const emit = defineEmits(["enter", "changeText"]);

const customEnterFunction = () => {
    emit("enter", searchText.value);
    searchText.value = "";
}
</script>
<template>
    <div class="flex full">
      <span class="material-icons">{{icon}}</span>
      <input
        v-model="searchText"
        class="search-text"
        type="text"
        :placeholder="placeholder"
        @keyup.enter="customEnterFunction"
        @input="emit('changeText', searchText)"
      />
    </div>
</template>
<style scoped>
.search-text {
  margin-left: 3rem;
  flex-grow: 1;
  border: none;
  outline: none;
  color: #b9bdcf;
  font-weight: 400;
  font-size: 1.2rem;
}
.search-text::placeholder {
  color: #b9bdcf;
  opacity: 1;
}

span {
  color: #b9bdcf;
  width: 1.5rem !important;
}
@media screen and (max-width: 576px) {
  .search-text {
    margin-left: 1rem;
  }
}
</style>