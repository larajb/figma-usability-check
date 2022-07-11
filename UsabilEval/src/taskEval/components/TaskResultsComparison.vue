<template>
    <div v-show="content !== undefined">
        <p class="type--pos-medium-bold">Vergleich: {{ content.taskname }}, {{ content.evaluationRuns[0].comparison.taskname }}</p>
        <p class="type--pos-small-normal">Ein Klick auf eine Aufgabe öffnet eine Detailansicht. Ein Klick auf den Hintergrund des Diagramms schließt die Detailansicht.</p>
        <div id="goms" class="goms-result" v-if="content.evaluationRuns[0].goms !== null">
            <bar-chart class="task-chart" :chart-data="chartData" :options="chartOptions" @clicked="handleClick($event)" />
            <table v-if="taskToShow === ''">
                <tr>
                    <td align="top"><Icon icon="timer" /></td>
                    <td align="top"><p class="type--pos-medium-bold">Dauer der Zielerreichung</p></td>
                </tr>
                <tr>
                    <td align="top"></td>
                    <td align="top">
                        <table class="table type--pos-medium-normal" style="margin-left: -11px">
                            <tr>
                                <td align="top">{{ content.taskname }}:</td>
                                <td align="top">{{ content.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
                            </tr>
                            <tr v-if="content.evaluationRuns[0].comparison !== null">
                                <td align="top">{{ content.evaluationRuns[0].comparison.taskname }}:</td>
                                <td align="top">{{ content.evaluationRuns[0].comparison.goms.gomsTime.toFixed(2) }} s</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div id="stats">
            <div v-for="(task, index) in taskResults" :key="index">
                <task-results v-show="taskToShow === task.taskname" :content="task" />
            </div>
        </div>
    </div>
</template>

<script>
import { Icon, IconButton } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex';
import TaskResults from './TaskResults.vue';
import BarChart from './BarChart';

export default {
    name: 'TaskResultsComparison',
    components: {
        BarChart,
        Icon,
        IconButton,
        TaskResults,
    },
    props: {
        content: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            taskResults: [],
            taskToShow: '',
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
                }
            },
        }
    },
    computed: {
        ...mapState(['tasks', 'taskEvaluationHistory']),
    },
    mounted() {
        if (this.content.evaluationRuns[0].goms !== null) {
            this.setChartData();
            this.setTaskResults();
        }
    },
    watch: {
        content() {
            if (this.content.evaluationRuns[0].goms !== null) {
                this.setChartData();
                this.setTaskResults();
            }
        },
    },
    methods: {
        setChartData() {
            var firstTask = this.tasks.find((task) => task.taskname === this.content.taskname);
            var secondTask = this.tasks.find((task) => task.taskname === this.content.evaluationRuns[0].comparison.taskname);
            this.chartData = {
                labels: [this.content.taskname, this.content.evaluationRuns[0].comparison.taskname],
                datasets: [],
            };
            var index = 0;
            var time = 0.0;
            this.content.evaluationRuns[0].goms.stepsTimes.forEach(stepTime => {
                index ++;
                this.chartData.datasets.push({
                    label: 'Schritt' + index.toString(),
                    data: [[time.toFixed(2), (time + stepTime).toFixed(2)], [0, 0]],
                    backgroundColor: firstTask.color,
                });
                time += stepTime;
            })

            index = 0;
            time = 0.0;
            this.content.evaluationRuns[0].comparison.goms.stepsTimes.forEach(stepTime => {
                index ++;
                this.chartData.datasets.push({
                    label: 'Schritt' + index.toString(),
                    data: [[0, 0], [time.toFixed(2), (time + stepTime).toFixed(2)]],
                    backgroundColor: secondTask.color,
                });
                time += stepTime;
            })
        },
        setTaskResults() {
            const taskIndex = this.taskEvaluationHistory.findIndex((element) => element.taskname === this.content.taskname);
            this.taskResults.push(this.taskEvaluationHistory[taskIndex]);
            const comparisonIndex = this.taskEvaluationHistory.findIndex((element) => element.taskname === this.content.evaluationRuns[0].comparison.taskname);
            this.taskResults.push(this.taskEvaluationHistory[comparisonIndex]);
        },
        findInComparison(title) {
            var isAlsoFound = false;
            this.content.evaluationRuns[0].comparison.usabilitySmells.forEach(smell => {
                if (smell.title === title && smell.isFound) {
                    isAlsoFound = true;
                }
            })
            return isAlsoFound;
        },
        handleClick(args) {
            this.taskToShow = args.dataLabel;
        },
    }
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .result-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

    .goms-result {
        width: 80%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .table {
		border-spacing: 10px;
	}

    .task-chart {
        width: 100%;
        height: 25%;
    }
</style>
