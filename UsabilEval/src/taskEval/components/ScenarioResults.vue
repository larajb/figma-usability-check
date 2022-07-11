<template>
    <div v-show="content !== undefined">
        <p class="type--pos-medium-bold">{{ content.scenarioname }}</p>
        <p class="type--pos-small-normal">A click on a task opens a detailed view. A click on the background of the diagram closes the detailed view.</p>
        <div id="tasks" v-if="content.evaluationRuns[0].gomsTimes !== null">
            <bar-chart class="scenario-result__chart" :chartData="chartData" :options="chartOptions" @clicked="handleClick($event)" />
        </div>
        <div v-if="taskToShow === ''">
            <div id="goms" class="scenario-result__goms" v-if="content.evaluationRuns[0].gomsTimes !== null">
                <table>
                    <tr>
                        <td align="top"><Icon icon="timer" /></td>
                        <td align="top"><p class="type--pos-medium-bold">Duration of goal achievement</p></td>
                    </tr>
                    <tr>
                        <td align="top"></td>
                        <td align="top">
                            <table class="scenario-result__table type--pos-medium-normal" style="margin-left: -11px">
                                <tr>
                                    <td align="top">{{ content.scenarioname }}:</td>
                                    <td align="top">{{ sumUpTimes(content.evaluationRuns[0].gomsTimes) }} s</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="top"></td>
                        <td align="top">
                            <div v-if="content.evaluationRuns.length > 1" style="display: flex">
                                <p class="type--pos-medium-normal">Historie</p>
                                <IconButton @click="showHistory = !showHistory" :icon="showHistory ? 'caret-down' : 'caret-right'" />
                            </div>
                            <div v-show="showHistory">
                                <table class="scenario-result__table type--pos-medium-normal">
                                    <tr v-for="(run, index) in content.evaluationRuns" :key="index">
                                        <td align="top">{{ formatDate(run.timestamp) }}:</td>
                                        <td align="top">{{ sumUpTimes(run.gomsTimes) }} s</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="smells" class="scenario-result__found-smells" v-if="checkSmellPresence(content.evaluationRuns[0].usabilitySmells)">
                <table>
                    <tr>
                        <td align="top"><Icon icon="warning" /></td>
                        <td align="top"><p class="type--pos-medium-bold">Extended for {{ content.scenarioname }}</p></td>
                    </tr>
                    <tr v-for="(smell, index) in content.evaluationRuns[0].usabilitySmells" :key="index">
                        <td align="top"></td>
                        <td align="top">
                            <usability-smell-result :smell="smell" :type="'scenario'" />
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else class="scenario-result__not-found-smells">
                <table>
                    <tr>
                        <td align="top">
                            <Icon icon="smiley" />
                        </td>
                        <td align="top">
                            <p class="type--pos-medium-normal">No indications of usability problems were found in the scenario.</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div id="stats">
            <div v-for="(task, index) in taskResults" :key="index">
                <task-results v-show="taskToShow === task.taskname" :content="task" />
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from './BarChart';

import { mapState } from 'vuex';
import TaskResults from './TaskResults.vue';
import { Icon, IconButton } from 'figma-plugin-ds-vue';
import UsabilitySmellResult from './UsabilitySmellResult.vue';

export default {
    name: 'ScenarioResults',
    components: {
        BarChart,
        TaskResults,
        Icon,
        IconButton,
        UsabilitySmellResult,
    },
    props: {
        content: {
            type: Object,
            default: null,
        },
    },
    computed: {
        ...mapState(['tasks', 'taskEvaluationHistory']),
    },
    data() {
        return {
            showHistory: false,
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
            taskResults: [],
            taskToShow: '',
        }
    },
    mounted() {
        if (this.content !== null) {
            this.setChartData();
            this.setTaskResults();
        }
    },
    methods: {
        setChartData() {
            this.chartData = {
                labels: [''],
                datasets: [],
            };
            var time = 0.0;
            this.content.evaluationRuns[0].gomsTimes.forEach(gomsTime => {
                var index = this.tasks.findIndex((task) => task.taskname === gomsTime.taskname);
                var task = this.tasks[index];
                this.chartData.datasets.push({
                    label: gomsTime.taskname,
                    data: [[time.toFixed(2), (time + gomsTime.time).toFixed(2)]],
                    backgroundColor: task.color,
                });
                time += gomsTime.time;
            })
        },
        setTaskResults() {
            this.content.evaluationRuns[0].tasks.forEach(task => {
                const index = this.taskEvaluationHistory.findIndex((element) => element.taskname === task.taskname);
                this.taskResults.push(this.taskEvaluationHistory[index]);
            });
        },
        handleClick(args) {
            this.taskToShow = args.datasetLabel;
        },
        sumUpTimes(times) {
            var sum = 0.0;
            times.forEach(time => {
                sum += time.time;
            })
            return sum.toFixed(2);
        },
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var minutes = date.getMinutes();
            if (minutes < 10) { minutes = '0' + minutes; }
            var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes;
            return formattedDate;
        },
        checkSmellPresence(smells) {
            var hasSmells = false;
            smells.forEach(smell => {
                if (smell.isFound) {
                    hasSmells = true;
                }
            })
            return hasSmells;
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .scenario-result__chart {
        width: 80%;
        height: 20%;
        margin: 0 auto;
    }

    .scenario-result__goms {
        width: 80%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .scenario-result__found-smells {
        width: 85%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .scenario-result__not-found-smells {
        margin-left: 10%;
        width: 80%;
    }

    .scenario-result__table {
		border-spacing: 10px;
	}
</style>
