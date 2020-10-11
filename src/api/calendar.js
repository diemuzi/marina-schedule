import client from "@/api/client";

import {
    FORM_ARRAY,
    FORM_CHOICES,
    FORM_CLEAN,
    FORM_DELETE,
    FORM_ERRORS,
    FORM_OBJECT,
    FORM_SUCCESS,
    FORM_VALIDATION,
    SCHEDULE_BASE
} from "@/api/types";

const state = {
    choices: Object,
    formArr: Array,
    formErrors: Object,
    formObj: Object,
    formSuccess: false,
    scheduleBase: Array
};

const getters = {
    choices: state => state.choices,
    formArr: state => state.formArr,
    formErrors: state => state.formErrors,
    formSuccess: state => state.formSuccess,
    scheduleBase: state => state.scheduleBase
};

const actions = {
    formClean({commit}) {
        commit(FORM_CLEAN);
    },
    async getAccount({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'calendar/account'
        );

        commit(FORM_ARRAY, response);
    },
    async getAccountProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `calendar/account/profile/${data.id}`
        );

        commit(FORM_OBJECT, response);
    },
    async getChoices({commit}) {
        const response = await client.get(
            'calendar/choices'
        );

        commit(FORM_CHOICES, response);
    },
    async getSchedule({commit}) {
        commit(FORM_CLEAN);

        const response = await client.get(
            'calendar/schedule'
        );

        commit(FORM_ARRAY, response);
    },
    async getScheduleProfile({commit}, data) {
        commit(FORM_CLEAN);

        const response = await client.get(
            `calendar/schedule/${data.id}/${data.day}`
        );

        commit(FORM_OBJECT, response);

        const responseBase = await client.get(
            'calendar/schedule/accounts'
        );

        commit(SCHEDULE_BASE, responseBase);
    },
    async updateAccountProfile({commit, state}, data) {
        commit(FORM_VALIDATION);

        const response = await client.patch(
            `calendar/account/profile/${data.id}`,
            state.formObj
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    },
    async updateScheduleProfile({commit}, data) {
        commit(FORM_VALIDATION);

        const accounts = {};
        accounts[`account_${data.day}`] = data.accounts;

        const response = await client.patch(
            `calendar/schedule/${data.id}/${data.day}`,
            accounts
        );

        if (response.error) {
            commit(FORM_ERRORS, response.errors);
        } else {
            commit(FORM_SUCCESS);
        }
    }
};

const mutations = {
    [FORM_ARRAY](state, data) {
        state.formArr = data;
    },
    [FORM_CHOICES](state, data) {
        state.choices = data;
    },
    [FORM_CLEAN](state) {
        state.formArr = [];
        state.formErrors = {};
        state.formObj = {};
        state.formSuccess = false;
        state.scheduleBase = [];
    },
    [FORM_DELETE](state, data) {
        state.formArr = state.formArr.filter(item => item.id !== data.id);
    },
    [FORM_ERRORS](state, data) {
        state.formErrors = Object.assign({}, state.formErrors, data);
    },
    [FORM_OBJECT](state, data) {
        state.formObj = Object.assign({}, state.formObj, data);
    },
    [FORM_SUCCESS](state) {
        state.formErrors = {};
        state.formSuccess = true;
    },
    [FORM_VALIDATION](state) {
        state.formErrors = {};
        state.formSuccess = false;
    },
    [SCHEDULE_BASE](state, data) {
        const accounts = [];

        for (const base of data) {
            accounts.push({
                value: base.id,
                label: base.name
            })
        }

        state.scheduleBase = accounts;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
