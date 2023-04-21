<script setup>
import Loader from "./components/Loader.vue";
import SearchBar from "./components/SearchBar.vue"
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useJobsStore } from "./stores/store";
const searchText = ref("");
const store = useJobsStore();
const isLoading = computed(() => {
  return store.isLoading;
});

onBeforeMount(async () => {
  await store.initJobs();
});
</script>

<template>
  <Loader v-if="isLoading" />
  <section v-else>
    <h1 class="title">Github <span>Jobs</span></h1>
    <div class="header flex align-center justify-center">
      <SearchBar />
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 3.2rem 12rem;
}

.header {
  padding: 4.2rem 20rem;

  margin: 3.2rem 0 4.2rem 0;
  background-image: url("./assets/backgroundImg.png");
  border-radius: 8px;
}
.title {
  font-size: 2.4rem;
  font-weight: 700;
  color: #282538;
}
.title span {
  font-size: 2.4rem;
  font-weight: 300;
  color: #282538;
}
@media screen and (max-width: 1200px) {
  .header {
    padding: 4.2rem 10rem;
  }
}
@media screen and (max-width: 950px) {
  .header {
    padding: 4.2rem 5rem;
  }
}
@media screen and (max-width: 800px) {
  .header {
    padding: 2rem;
  }
  section {
  padding: 3.2rem;
}
}
</style>
