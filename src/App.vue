<script setup>
import Loader from "./components/Loader.vue";
import SearchBar from "./components/SearchBar.vue";
import SearchText from "./components/SearchText.vue";
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

const selectLocalisation = (localisation) => {
  store.changeLocalisation(localisation);
};

const localisations = computed(() => {
  return [
    store.localisations[0],
    store.localisations[1],
    store.localisations[2],
    store.localisations[3],
  ];
});

const filterLocalisation = (value) => {
  // TODO : filter localisation
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
          <input type="checkbox" class="ml-12 checkbox pointer" />
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
              v-for="localisation in localisations"
              :key="localisation.id"
            >
              <input
                type="checkbox"
                :checked="localisation.isActive"
                class="ml-12 checkbox pointer"
                @click="selectLocalisation(localisation)"
              />
              <p class="localisation-text">{{ localisation.id }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ml-12 {
  margin-left: 1.2rem;
}
h3 {
  font-weight: 700;
  font-size: 1.4rem;
  text-transform: uppercase;
  color: #b9bdcf;
  margin: 3rem 0 1.4rem 0;
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

section {
  padding: 3.2rem 12rem;
}

.container {
  display: flex;
  margin: 4.2rem 0 19.5rem 0;
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
