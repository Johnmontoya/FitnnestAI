export const endpoints = {
    activity: {
        createActivity: '/activity-entries',
        allActivity: '/activity-entries',
        statsActivity: (date: string) => `/activity-entries/stats/${date}`,
        getActivity: (id: string) => `/activity-entries/${id}`,
        updateActivity: (id: string) => `/activity-entries/${id}`,
        deleteActivity: (id: string) => `/activity-entries/${id}`,
    }
}