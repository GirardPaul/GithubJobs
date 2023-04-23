<script setup>
import Loader from "../components/Loader.vue";
import SearchBar from "../components/SearchBar.vue";
import SearchText from "../components/SearchText.vue";
import Pagination from "../components/Pagination.vue";
import { computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useJobsStore } from "../stores/store";
const router = useRouter();
const filteredLocalisations = ref([]);
const searchText = ref("");
const jobsPerPage = 5;
const currentPage = ref(1);
const store = useJobsStore();
const isLoading = computed(() => {
  return store.isLoading;
});
const localisations = computed(() => {
  return store.localisations;
});
const jobs = computed(() => {
  return store.jobs;
});

const totalPages = computed(() => {
  return Math.ceil(jobs.value.length / jobsPerPage);
});

const jobsPaginated = computed(() => {
  const start = (currentPage.value - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  return jobs.value.slice(start, end);
});

const changePage = (page) => {
  currentPage.value = page;
};

onBeforeMount(async () => {
  if (!store.jobs.length) {
    await store.initJobs();
  }
  filteredLocalisations.value = store.localisations
    .sort((a, b) => {
      return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
    })
    .slice(0, 4);
});

const selectLocalisation = (localisation) => {
  store.changeLocalisation(localisation);
};

const filterLocalisation = (value) => {
  let filtered = localisations.value
    .filter((localisation) => {
      return localisation.id.toLowerCase().startsWith(value.toLowerCase());
    })
    .sort((a, b) => {
      return a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1;
    });

  const elementsActive = filtered.filter((localisation) => {
    return localisation.isActive;
  });
  if (elementsActive.length > 4) {
    filteredLocalisations.value = filtered.slice(0, elementsActive.length);
  } else {
    filteredLocalisations.value = filtered.slice(0, 4);
  }
};

const visitJob = async (id) => {
  await store.addJobDescription(id);
  router.push({ name: "JobPage", params: { id } });
};
</script>

<template>
  <Loader v-if="isLoading" />
  <section v-else>
    <h1 class="title">Github <span>Jobs</span></h1>
    <div class="header flex align-center justify-center">
      <SearchBar />
    </div>
    <div class="container">
      <div class="filters flex column">
        <div class="flex align-center">
          <input
            @click="store.changeFullTime()"
            :checked="store.fullTime"
            type="checkbox"
            class="ml-12 checkbox pointer"
          />
          <p class="full-time">Full Time</p>
        </div>
        <h3>Location</h3>
        <SearchText
          @changeText="filterLocalisation"
          icon="public"
          placeholder="City, state, zip code or country"
          class="search-localisation"
        />
        <div class="localisations">
          <ul>
            <li
              class="flex align-center localisation"
              v-for="localisation in filteredLocalisations"
              :key="localisation.id"
            >
              <input
                type="checkbox"
                :checked="localisation.isActive"
                class="ml-12 checkbox pointer checkbox-circle"
                @click="selectLocalisation(localisation)"
              />
              <p class="localisation-text">{{ localisation.id }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="jobs-list grid">
        <div
          class="job-card flex align-center pointer"
          @click="visitJob(job.id)"
          v-for="job in jobsPaginated"
          :key="job.id"
        >
          <img :src="job.companyLogo" alt="company logo" />
          <div class="flex column flex-grow ml-16">
            <p class="company-name">{{ job.companyName }}</p>
            <p class="job-title">{{ job.title }}</p>
            <div class="flex align-center justify-center job-type">
              <p>{{ job.jobTypeTrad }}</p>
            </div>
          </div>
          <div class="flex align-center align-self-end">
            <div class="flex align-center">
              <span class="material-icons color-grey">public</span>
              <p class="job-description">{{ job.localisation }}</p>
            </div>
            <div class="flex align-center ml-28">
              <span class="material-icons color-grey">schedule</span>
              <p class="job-description">{{ job.datePostSince }} days ago</p>
            </div>
          </div>
        </div>
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @change-page="changePage"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
img {
  width: 12.8rem;
  border-radius: 4px;
}
.job-card:hover {
  box-shadow: 0px 2px 4px rgba(0.1, 0.1, 0.1, 0.1);
}
.ml-28 {
  margin-left: 2.85rem;
}
.ml-16 {
  margin-left: 1.6rem;
}
.company-name {
  font-weight: 700;
  font-size: 1.2rem;
  color: #334680;
}
.job-title {
  font-weight: 400;
  font-size: 1.8rem;
  color: #334680;
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;
}
.job-card {
  padding: 1.2rem;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.jobs-list {
  flex-grow: 1;
  margin-left: 3.2rem;
  gap: 3.2rem;
  grid-template-columns: repeat(1, 1fr);
}

.localisations {
  margin-top: 2.45rem;
}
.localisation {
  margin-bottom: 1.6rem;
}
.localisation-text {
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 21px;
  margin-left: 1.2rem;
  color: #334680;
}
.search-localisation {
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 1.7rem 1.4rem;
}

.filters {
  width: 38rem;
}
/* INPUT CHECKBOX */
.checkbox-circle {
  border-radius: 50% !important;
}
.full-time {
  color: #334680;
  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  margin-left: 1.2rem;
}
.checkbox {
  border: 1px solid #b9bdcf;
  border-radius: 2px;
  appearance: none;
  width: 1.8rem;
  height: 1.8rem;
}
.checkbox:checked {
  background-color: #334680;
  border: 1px solid #334680;
}

/* END INPUT CHECKBOX */

.header {
  padding: 4.2rem 20rem;

  margin: 3.2rem 0 4.2rem 0;
  background-image: url("../assets/backgroundImg.png");
  border-radius: 8px;
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
}

@media screen and (max-width: 1200px) {
  .container {
    flex-direction: column;
  }
  .jobs-list {
    margin-left: 0;
  }
}
</style>
