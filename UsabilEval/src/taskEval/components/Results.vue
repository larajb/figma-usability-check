<template>
    <div class="scrollable-result-list">
        <div v-if="evaluationType === 'scenario' && $store.getters.currentScenarioEvaluation !== undefined">
            <scenario-results-comparison 
                v-if="$store.getters.currentScenarioEvaluation.evaluationRuns[0].gomsTimes !== null && $store.getters.currentScenarioEvaluation.evaluationRuns[0].comparison !== null"
                :content="$store.getters.currentScenarioEvaluation" />
            <scenario-results v-else-if="$store.getters.currentScenarioEvaluation.evaluationRuns[0].gomsTimes !== null" :content="$store.getters.currentScenarioEvaluation" />
        </div>
        <div v-else-if="evaluationType === 'task' && $store.getters.currentTaskEvaluation !== undefined">
            <task-results-comparison
                v-if="$store.getters.currentTaskEvaluation.evaluationRuns[0].goms !== null && $store.getters.currentTaskEvaluation.evaluationRuns[0].comparison !== null"
                :content="$store.getters.currentTaskEvaluation" />
            <task-results
                v-else-if="$store.getters.currentTaskEvaluation.evaluationRuns[0].goms !== null" :content="$store.getters.currentTaskEvaluation" />
        </div>
    </div>
</template>

<script>
import ScenarioResults from './ScenarioResults.vue';
import TaskResults from './TaskResults.vue';
import TaskResultsComparison from './TaskResultsComparison.vue';
import { mapState } from 'vuex';
import ScenarioResultsComparison from './ScenarioResultsComparison.vue';

export default {
    name: 'Results',
    components: {
        ScenarioResults,
        TaskResults,
        TaskResultsComparison,
        ScenarioResultsComparison,
    },
    computed: {
        ...mapState(['evaluationType']),
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .scrollable-result-list {
        max-height: 80%;
        overflow-y: scroll;
    }
</style>
