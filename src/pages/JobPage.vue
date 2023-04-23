<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useJobsStore } from "../stores/store";
import { getOneJob } from "../services/JobService";
const job = ref(null);
const route = useRoute();
const store = useJobsStore();
onBeforeMount(async () => {
  const retreiveJob = store.jobs.find((job) => job.id === route.params.id);
  if (!retreiveJob) {
    job.value = await getOneJob(route.params.id);
  } else {
    job.value = retreiveJob;
  }
});
</script>

<template>
  <div v-if="job">{{ job.companyName }}</div>
</template>

<style scoped></style>
