<script setup>
import { useJobsStore } from "../stores/store";
import { computed, onBeforeMount, onMounted, ref } from "vue";
const store = useJobsStore();
const searchText = ref("");
const filterSearchText = () => {
  store.searchSpecific(searchText.value);
  searchText.value = "";
};
</script>
<template>
  <div class="flex justify-between align-center search-row full">
    <div class="flex full">
      <span class="material-icons icon-bag">work</span>
      <input
        @keyup.enter="filterSearchText"
        v-model="searchText"
        class="search-text"
        type="text"
        placeholder="Title, companies, expertise or benefits"
      />
    </div>

    <button class="btn-search pointer" @click="filterSearchText">Search</button>
  </div>
</template>

<style scoped>
.search-row {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.4rem 0.4rem 0.4rem 1.7rem;
}
.icon-bag {
  color: #b9bdcf;
  width: 1.5rem !important;
}
.btn-search {
  color: #fff;
  background: #1e86ff;
  border-radius: 4px;
  padding: 1.4rem 4.8rem;
  border: none;
  font-size: 1.6rem
}
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

@media screen and (max-width: 700px) {
    .btn-search {
        padding: 1.4rem 4.8rem;

    }
}
</style>
