<template>
    <div class="start-ui">
        <p class="type--pos-large-bold">Hello!</p>
        <p class="type--pos-medium-normal">With this plugin you can perform automatic usability evaluations. You can use predefined metrics or have the evaluation carried out on the basis of self-defined interaction sequences.<p>
        <img src="../img/usability.jpg" width="300" />
        <p class="type--pos-medium-normal">Do you want to do the evaluation with metrics?</p>
        <button class="button button--primary" @click="metricEval">Metrics evaluation</button>
        <p class="type--pos-medium-normal">Would you like to create and evaluate your own functional processes?</p>
        <button class="button button--primary" @click="taskEval">Task evaluation</button>
    </div>
</template>

<script>
import { dispatch } from '../uiMessageHandler';

export default {
    name: 'Start',
    methods: {
        metricEval() {
            dispatch('showMetricEval');
        },
        taskEval() {
            dispatch('showTaskEval');
        }
    }
}
</script>

<style lang='scss'>
    @import "../figma-ui/figma-plugin-ds";
    @import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .start-ui {
		padding: 10px;
        text-align: center;
	}
</style>
