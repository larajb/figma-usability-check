import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentPage: 'MetricsSelection',
        selectedMetrics: [],
        currentEvaluationProfile: null,
        selectedFrames: [],
        evaluationResult: null,
        evaluationReady: false,
        evaluationHistory: [],
    },
    mutations: {
        currentPage(state, page) {
            state.currentPage = page;
        },
        selectedMetrics(state, metrics) {
            state.selectedMetrics = metrics;
        },
        currentEvaluationProfile(state, profile) {
            state.currentEvaluationProfile = profile;
        },
        selectedFrames(state, frames) {
            state.selectedFrames = frames;
        },
        evaluationResult(state, result) {
            state.evaluationResult = result;
        },
        evaluationReady(state, isReady) {
            state.evaluationReady = isReady;
        },
        evaluationHistory(state, history) {
            state.evaluationHistory = history;
        },
    },
})