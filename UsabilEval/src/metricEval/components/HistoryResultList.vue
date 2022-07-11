<template>
    <div>
        <div style="display: flex">
            <p class="type--pos-medium-normal">{{ formatDate(timestamp) }}</p>
            <IconButton @click="showResults = !showResults" :icon="showResults ? 'caret-down' : 'caret-right'" />
        </div>
        <div v-if="showResults" style="margin-left: 20px">
            <div v-for="(result, index2) in results" :key="index2">
                <result-list-entry :result="result" :is-history="true"></result-list-entry>
            </div>
        </div>
    </div>
</template>

<script>
import ResultListEntry from './ResultListEntry.vue';
import { metricsArray } from '../metrics/metricsArray';
import { IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'HistoryResultList',
    props: {
        timestamp: {
            type: Number,
            default: null,
        },
        results: {
            type: Array,
            default: null,
        },
    },
    components: {
        ResultListEntry,
        IconButton,
    },
    data() {
        return {
            showResults: false,
            metrics: metricsArray,
        }
    },
    methods: {
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var minutes = date.getMinutes();
            if (minutes < 10) { minutes = '0' + minutes; }
            var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes;
            return formattedDate;
        },
        getColorValue(metricname, result) {
            var color = 'green';
            if (result.value !== null) {
                var metric = this.metrics.find((metric) => metric.title === metricname);
                if (result.value >= metric.thresholds.green.min && result.value < metric.thresholds.green.max) {
                    color = 'green';
                } else if (result.value >= metric.thresholds.yellow.min && result.value < metric.thresholds.yellow.max) {
                    color = 'yellow';
                } else if (result.value >= metric.thresholds.red.min && result.value < metric.thresholds.red.max) {
                    color = 'red';
                }
            } else {
                if (result.nodes.length > 0) {
                    color = 'red';
                }
            }
            return color;
        },
    },
}
</script>

<style lang='scss'>
    @import "../../figma-ui/figma-plugin-ds";
</style>
