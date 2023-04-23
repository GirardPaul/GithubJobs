<script setup>
import SearchText from './SearchText.vue'
import { useJobsStore } from "../stores/store";
import { computed, onBeforeMount, onMounted, ref } from "vue";
const store = useJobsStore();
const searchText = ref("");
const filterSearchText = (value) => {
  store.searchSpecific(value);
  searchText.value = "";
};
</script>
<template>
  <div class="flex justify-between align-center search-row full">
    <div class="flex full">
      <SearchText 
        @enter="filterSearchText"
        @changeText="searchText = $event"
        icon="work"
        placeholder="Title, companies, expertise or benefits"
      />
    </div>

    <button class="btn-search pointer" @click="filterSearchText(searchText)">Search</button>
  </div>
</template>

<style scoped>
.search-row {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.4rem 0.4rem 0.4rem 1.7rem;
}

.btn-search {
  color: #fff;
  background: #1e86ff;
  border-radius: 4px;
  padding: 1.4rem 4.8rem;
  border: none;
  font-size: 1.6rem
}

@media screen and (max-width: 700px) {
    .btn-search {
        padding: 1.4rem 4.8rem;

    }
}
</style>
