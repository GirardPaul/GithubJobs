<script setup>
import Loader from "../components/Loader.vue";
import { onBeforeMount, ref } from "vue";
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
  <Loader v-if="!job" />
  <section v-else>
    <h1 class="title">Github <span>Jobs</span></h1>
    <div class="container">
      <div class="sidebar flex column">
        <router-link to="/" class="back-link"
          >&larr; Back to search</router-link
        >
        <h3>How to apply</h3>
        <p>
          Please visit this website to resume the offer and send your
          application :
          <a class="job-url" :href="job.url" target="_blank">{{ job.url }}</a>
        </p>
      </div>
      <div class="job-resume flex column">
        <div class="flex align-center job-title">
          <h2>{{ job.title }}</h2>
          <div class="flex align-center justify-center job-type ml-17">
            <p>{{ job.jobTypeTrad }}</p>
          </div>
        </div>
        <div class="flex align-center days-since">
          <span class="material-icons color-grey">schedule</span>
          <p class="job-description">{{ job.datePostSince }} days ago</p>
        </div>
        <div class="flex align-center mb-32">
          <img :src="job.companyLogo" alt="company logo" />
          <div class="flex column ml-12">
            <p class="company-name mb-10">{{ job.companyName }}</p>
            <div class="flex align-center">
              <span class="material-icons color-grey">public</span>
              <p class="job-description">{{ job.localisation }}</p>
            </div>
          </div>
        </div>
        <div class="job-content-description" v-html="job.description"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.job-content-description {
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 150%;
  color: #334680;
}

.job-content-description p {
  color: red !important;
}
.mb-32 {
  margin-bottom: 3.2rem;
}
.mb-10 {
  margin-bottom: 1rem;
}
.company-name {
  font-weight: 700;
  font-size: 1.8rem;
  color: #334680;
}
img {
  width: 5rem;
  border-radius: 4px;
}
.days-since {
  margin-top: 1rem;
  margin-bottom: 3.2rem;
}
.job-resume {
  flex-grow: 1;
  margin-left: 7.7rem;
}
h2 {
  font-weight: 700;
  font-size: 2.4rem;
  color: #334680;
}
.ml-17 {
  margin-left: 1.7rem;
}
.sidebar {
  width: 19.7rem;
}
.sidebar p {
  color: #334680;
  font-weight: 500;
  font-size: 1.4rem;
}

.job-url {
  color: #1e86ff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
}

.back-link {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.4rem;
  color: #1e86ff;
}


@media screen and (max-width: 576px) {
  .container {
    flex-direction: column;
  }
  .job-resume {
    margin-left: 0;
  }
  .job-title {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 3.6rem;
  }
  .job-type {
    margin-left: 0;
  }
}
</style>
