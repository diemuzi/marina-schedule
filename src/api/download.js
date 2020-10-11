import session from "@/api/session";
import {SCHEDULE_DOWNLOAD} from "@/api/types";

const state = {};

const getters = {};

const actions = {
    getEmployee({commit}, id) {
        session.get(`download/${id}/employee`, {
            responseType: 'blob'
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }));

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Schedule.xlsx');

            document.body.appendChild(link);

            commit(SCHEDULE_DOWNLOAD, link.click());
        });
    },
    getEmployeeAll({commit}) {
        session.get('download/all/employee', {
            responseType: 'blob'
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }));

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Schedule.xlsx');

            document.body.appendChild(link);

            commit(SCHEDULE_DOWNLOAD, link.click());
        });
    },
    getSchedule({commit}, id) {
        session.get(`download/${id}/schedule`, {
            responseType: 'blob'
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }));

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Schedule.xlsx');

            document.body.appendChild(link);

            commit(SCHEDULE_DOWNLOAD, link.click());
        });
    },
    getScheduleAll({commit}) {
        session.get('download/all/schedule', {
            responseType: 'blob'
        }).then((response) => {
            const url = URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }));

            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'Schedule.xlsx');

            document.body.appendChild(link);

            commit(SCHEDULE_DOWNLOAD, link.click());
        });
    }
};

const mutations = {
    [SCHEDULE_DOWNLOAD](data) {
        data;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
