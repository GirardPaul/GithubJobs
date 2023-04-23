import { defineStore } from "pinia";
import { findJobs, filterJobs, getOneJob } from "../services/JobService.js";
export const useJobsStore = defineStore({
  id: "jobs",
  state: () => ({
    initialJobs: [],
    jobs: [],
    localisations: [],
    fullTime: false,
    isLoading: false
  }),
  actions: {
    async initJobs() {
      this.isLoading = true;
      const defaultData = await findJobs();
      this.initialJobs = defaultData.jobs;
      this.jobs = defaultData.jobs;
      this.localisations = defaultData.localisations;
      this.isLoading = false
    },
    async changeLocalisation(localisation) {
        this.isLoading = true;
        const retreiveLocalisation = this.localisations.find((l) => l.id === localisation.id);
        retreiveLocalisation.isActive = !retreiveLocalisation.isActive;
        this.jobs = filterJobs(this.initialJobs, this.localisations, this.fullTime, null);
        this.isLoading = false;
    },
    async changeFullTime() {
        this.isLoading = true; 
        this.fullTime = !this.fullTime;
        this.jobs = filterJobs(this.initialJobs, this.localisations, this.fullTime, null);
        this.isLoading = false;
    },
    async searchSpecific(search) {
      this.isLoading = true;
      this.jobs = filterJobs(this.initialJobs, this.localisations, this.fullTime, search);
      this.isLoading = false;
    },
    async addJobDescription(id) {   
      const job = this.jobs.find((j) => j.id === id);
      if (!job.description) {
        const jobDescription = await getOneJob(id);
        job.description = jobDescription.description;
      }
    },
  },
});