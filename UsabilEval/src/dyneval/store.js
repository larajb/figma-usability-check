import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [],
        scenarios: [],
        taskEvaluationHistory: [],
        scenarioEvaluationHistory: [],
        evaluationType: 'task',
        currentTaskname: '',
        currentScenarioname: '',
        currentPage: 'TaskDefinition',
    },
    getters: {
        currentTaskEvaluation(state) {
            const index = state.taskEvaluationHistory.findIndex((task) => task.taskname === state.currentTaskname);
            return state.taskEvaluationHistory[index];
        },
        currentScenarioEvaluation(state) {
            const index = state.scenarioEvaluationHistory.findIndex((scenario) => scenario.scenarioname === state.currentScenarioname);
            return state.scenarioEvaluationHistory[index];
        },
    },
    mutations: {
        tasks(state, tasks) {
            state.tasks = tasks;
        },
        scenarios(state, scenarios) {
            state.scenarios = scenarios;
        },
        taskEvaluationHistory(state, history) {
            state.taskEvaluationHistory = history;
        },
        scenarioEvaluationHistory(state, history) {
            state.scenarioEvaluationHistory = history;
        },
        evaluationType(state, type) {
            state.evaluationType = type;
        },
        currentTaskname(state, taskname) {
            state.currentTaskname = taskname;
        },
        currentScenarioname(state, scenarioname) {
            state.currentScenarioname = scenarioname;
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