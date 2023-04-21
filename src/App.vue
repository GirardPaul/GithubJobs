<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import {useJobsStore } from './stores/store'
const store = useJobsStore();
onBeforeMount(async () => {
  await store.initJobs();
});
</script>

<template>
  <section>
    <h1 class="title">Github <span>Jobs</span></h1>
  </section>
</template>

<style scoped>
section {
  padding: 3.2rem 12rem;
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
</style>
