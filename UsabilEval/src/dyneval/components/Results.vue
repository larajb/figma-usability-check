<template>
    <div class="scrollable-result-list">
        <div v-if="evaluationType === 'scenario' && $store.getters.currentScenarioEvaluation !== undefined">
            <scenario-results :content="$store.getters.currentScenarioEvaluation" />
        </div>
        <div v-else-if="evaluationType === 'task' && $store.getters.currentTaskEvaluation !== undefined">
            <task-results :content="$store.getters.currentTaskEvaluation" />
        </div>
    </div>
</template>

<script>
import ScenarioResults from './ScenarioResults.vue';
import TaskResults from './TaskResults.vue';
import { mapState } from 'vuex';

export default {
    name: 'Results',
    components: {
        ScenarioResults,
        TaskResults,
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
