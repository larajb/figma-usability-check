import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        scenarios: [],
        evaluationHistory: [],
        currentTaskname: '',
        currentPage: 'TaskDefinition',
    },
    getters: {
        currentEvaluation(state) {
            const index = state.evaluationHistory.findIndex((task) => task.taskname === state.currentTaskname);
            return state.evaluationHistory[index];
        },
    },
    mutations: {
        tasks(state, tasks) {
            state.tasks = tasks;
        },
        scenarios(state, scenarios) {
            state.scenarios = scenarios;
        },
        evaluationHistory(state, history) {
            state.evaluationHistory = history;
        },
        currentTaskname(state, taskname) {
            state.currentTaskname = taskname;
        },
        currentPage(state, page) {
            state.currentPage = page;
        },
    },
    // actions: {
    //     setTasks({ commit }, tasks) {
    //         commit('tasks', tasks);
    //     },
    // }
})