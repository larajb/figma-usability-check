<template>
    <!-- <div v-show="content !== undefined"> -->
    <div>
        <p class="type--pos-medium-normal">Vergleich: {{ content.scenarioname }}, {{ content.evaluationRuns[0].comparison.scenarioname }}</p>
        <div id="tasks" v-if="content.evaluationRuns[0].gomsTimes !== null">
            <bar-chart class="scenario-chart" :chartData="chartData" :options="chartOptions" @clicked="handleClick($event)" />
            <table v-if="scenarioToShow === ''" class="goms-result">
                <tr>
                    <td><Icon icon="timer" /></td>
                    <td><p class="type--pos-medium-bold">Dauer der Zielerreichung</p></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <table class="table type--pos-medium-normal" style="margin-left: -11px">
                            <tr>
                                <td>{{ content.scenarioname }}:</td>
                                <td>{{ sumUpTimes(content.evaluationRuns[0].gomsTimes) }} s</td>
                            </tr>
                            <tr v-if="content.evaluationRuns[0].comparison !== null">
                                <td>{{ content.evaluationRuns[0].comparison.scenarioname }}:</td>
                                <td>{{ sumUpTimes(content.evaluationRuns[0].comparison.gomsTimes) }} s</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="stats">
            <div v-for="(scenario, index) in scenarioResults" :key="index">
                <scenario-results v-show="scenarioToShow === scenario.scenarioname" :content="scenario" />
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from './BarChart';

import { mapState } from 'vuex';
import ScenarioResults from './ScenarioResults.vue';
import { Icon, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'ScenarioResultsComparison',
    components: {
        BarChart,
        Icon,
        IconButton,
        ScenarioResults,
    },
    props: {
        content: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            showSmell: false,
            chartData: null,
            chartOptions: {
                responsive: true,
				maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    mode: 'single',
                    callbacks: {
                        title: function(tooltipItem, data) {
                            return data['labels'][tooltipItem[0]['index']];
                        },
                    },
                },
                scales: {
                    xAxes: [{
                        stacked: false,
                    }],
                    yAxes: [{
                        stacked: true,
                    }]
                },
            },
            scenarioResults: [],
            scenarioToShow: '',
        }
    },
    computed: {
        ...mapState(['tasks', 'scenarioEvaluationHistory']),
    },
    mounted() {
        if (this.content.evaluationRuns[0].gomsTimes !== null) {
            this.setChartData();
            this.setScenarioResults();
        }
    },
    watch: {
        content() {
            if (this.content.evaluationRuns[0].gomsTimes !== null) {
                this.setChartData();
                this.setScenarioResults();
            }
        },
    },
    methods: {
        setChartData() {
            this.chartData = {
                labels: [this.content.scenarioname, this.content.evaluationRuns[0].comparison.scenarioname],
                datasets: [],
            };
            var time = 0.0;
            this.content.evaluationRuns[0].gomsTimes.forEach(gomsTime => {
                var task = this.tasks.find((task) => task.taskname === gomsTime.taskname);
                this.chartData.datasets.push({
                    label: gomsTime.taskname,
                    data: [[time.toFixed(2), (time + gomsTime.time).toFixed(2)], [0, 0]],
                    backgroundColor: task.color,
                });
                time += gomsTime.time;
            })

            var time = 0.0;
            this.content.evaluationRuns[0].comparison.gomsTimes.forEach(gomsTime => {
                var task = this.tasks.find((task) => task.taskname === gomsTime.taskname);
                this.chartData.datasets.push({
                    label: gomsTime.taskname,
                    data: [[0, 0], [time.toFixed(2), (time + gomsTime.time).toFixed(2)]],
                    backgroundColor: task.color,
                });
                time += gomsTime.time;
            })
        },
        setScenarioResults() {
            const scenarioIndex = this.scenarioEvaluationHistory.findIndex((element) => element.scenarioname === this.content.scenarioname);
            this.scenarioResults.push(this.scenarioEvaluationHistory[scenarioIndex]);
            const comparisonIndex = this.scenarioEvaluationHistory.findIndex((element) => element.scenarioname === this.content.evaluationRuns[0].comparison.scenarioname);
            this.scenarioResults.push(this.scenarioEvaluationHistory[comparisonIndex]);
        },
        sumUpTimes(times) {
            var sum = 0.0;
            times.forEach(time => {
                sum += time.time;
            })
            return sum.toFixed(2);
        },
        handleClick(args) {
            this.scenarioToShow = args.dataLabel;
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .scenario-chart {
        width: 80%;
        height: 20%;
        margin: 0 auto;
    }
</style>
