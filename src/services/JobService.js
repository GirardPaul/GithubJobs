const JOBS_URL = import.meta.env.VITE_JOBS_URL;
export const findJobs = async () => {
    const jobs = await requestJobs();
    return {
        jobs: formatJobs(jobs),
        localisations: retreiveAllLocalisations(jobs),
    }
}

export const filterJobs = (jobs, localisations, fullTime, search) => {
    let filteredJobs = filterJobsByLocalisation(jobs, localisations);
    if (search && search.trim().length > 0) {
        filteredJobs = filterJobsBySearch(filteredJobs, search);
    }

    if (fullTime) {
        return filteredJobs.filter(job => job.jobType === 'full_time');
    }

    return filteredJobs;
}

export const getOneJob = async (id) => {
    const job = await requestJob(id);
    return formatJob(job, job.description);
}

const filterJobsBySearch = (jobs, search) => {
    search = search.toLowerCase();
    return jobs.filter(job => job.title.toLowerCase().startsWith(search) || job.companyName.toLowerCase().startsWith(search));
};

const filterJobsByLocalisation = (jobs, localisations) => {
    const filteredJobs = [];

    const activeLocalisations = localisations.filter((l) => l.isActive);

    if (!activeLocalisations.length) {
        return jobs;
    }


    for (const localisation of activeLocalisations) {
        const filtered = jobs.filter(job => job.localisation === localisation.id);
        filteredJobs.push(...filtered);
    }

    console.log(filteredJobs);

    return filteredJobs;
}
const requestJobs = async () => {
    const response = await fetch(JOBS_URL);
    const data = await response.json();
    return data;
}
const requestJob = async (id) => {
    const response = await fetch(`${JOBS_URL}/${id}`);
    const data = await response.json();
    return data;
}

const formatJobs = (jobs) => {
    return jobs.map(job => formatJob(job, null));
}

const formatJob = (job, description) => {
    const jobPublicationDate = job.publication_date ? new Date(job.publication_date) : null;
    const currentDate = new Date();
    const daysNumberSince = Math.floor((currentDate - jobPublicationDate) / (1000 * 60 * 60 * 24));
    return {
        id: job._id, 
        description: description,
        url: job.url,
        companyLogo:  job.company_logo,
        companyName: job.company_name,
        title: job.title,
        jobType: job.job_type,
        jobTypeTrad: formatJobTypeTrad(job.job_type),
        localisation: job.candidate_required_location,
        datePostSince: daysNumberSince
    }
}

const formatJobTypeTrad = (type) => {
    if (!type) {
        return 'Other'
    }

    switch (type) {
        case 'full_time':
            return 'Full time';
        case 'intership':
            return 'Intership';
        case 'contract':
            return 'Contract';
        case 'part_time':
            return 'Part time';
        case 'freelance':
            return 'Freelance';
        default:
            return 'Other';
    }
}

const retreiveAllLocalisations = (jobs) => {
    let localisations = jobs.map(job => job.candidate_required_location);
    localisations = [...new Set(localisations)];

    return localisations.map((localisation) => {
        return {
            id: localisation,
            isActive: false
        }
    });
}