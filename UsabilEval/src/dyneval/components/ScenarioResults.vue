<template>
    <div v-show="content !== undefined">
        <p class="type--pos-medium-normal">{{ content.scenarioname }}</p>
        <p class="type--pos-small-normal">Mit einem Klick auf einen Aufgabenbalken innerhalb des Graphen wird eine Detailansicht zu der entsprechenden Aufgabe angezeigt. Um in die ursprüngliche Ansicht des Szenarios zurückzukommen, muss außerhalb der Balken in den Graphen geklickt werden.</p>
        <div id="tasks" v-if="content.evaluationRuns[0].gomsTimes !== null">
            <bar-chart class="scenario-chart" :chartData="chartData" :options="chartOptions" @clicked="handleClick($event)" />
        </div>
        <div v-if="taskToShow === ''">
            <div id="goms" class="goms-result" v-if="content.evaluationRuns[0].gomsTimes !== null">
                <table>
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
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <div v-if="content.evaluationRuns.length > 1" style="display: flex">
                                <p class="type--pos-medium-normal">Historie</p>
                                <IconButton @click="showHistory = !showHistory" :icon="showHistory ? 'caret-down' : 'caret-right'" />
                            </div>
                            <div v-show="showHistory">
                                <table class="table type--pos-medium-normal">
                                    <tr v-for="(run, index) in content.evaluationRuns" :key="index">
                                        <td>{{ formatDate(run.timestamp) }}:</td>
                                        <td>{{ sumUpTimes(run.gomsTimes) }} s</td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div id="smells" class="smells-result-found" v-if="checkSmellPresence(content.evaluationRuns[0].usabilitySmells)">
                <table>
                    <tr>
                        <td><Icon icon="warning" /></td>
                        <td><p class="type--pos-medium-bold">Erweitert für {{ content.scenarioname }}</p></td>
                    </tr>
                    <tr v-for="(smell, index) in content.evaluationRuns[0].usabilitySmells" :key="index">
                        <td></td>
                        <td>
                            <div style="display: flex">
                                <p class="type--pos-medium-normal">{{ smell.title }}</p>
                                <IconButton @click="showSmell = !showSmell" :icon="showSmell ? 'caret-down' : 'caret-right'" />
                            </div>
                            <table v-show="showSmell" class="table">
                                <tr class="type--pos-medium-normal" v-if="smell.steps.length === 1">
                                    <td valign="top">Gefunden in</td>
                                    <td>Übergang {{ smell.steps[0] }}</td>
                                </tr>
                                <!-- <tr class="type--pos-medium-normal" v-else-if="smell.steps.length > 1">
                                    <td valign="top">Gefunden in</td>
                                    <td>Schritten {{ getAsString(content.evaluationRuns[0].goms.stepsTimes, smell.steps) }}</td>
                                </tr> -->
                                <tr class="type--pos-medium-normal">
                                    <td valign="top">Erscheinung</td>
                                    <td>{{ getDescription(smell.title) }}</td>
                                </tr>
                                <tr class="type--pos-medium-normal">
                                    <td valign="top">Behebung</td>
                                    <td>{{ getRefactoring(smell.title) }}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else class="smells-result-not-found">
                <table>
                    <tr>
                        <td>
                            <Icon icon="smiley" />
                        </td>
                        <td>
                            <p class="type--pos-medium-normal">Im Szenario wurden keine Hinweismuster auf Usability-Probleme gefunden.</p>
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
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmells';

export default {
    name: 'ScenarioResults',
    components: {
        BarChart,
        TaskResults,
        Icon,
        IconButton,
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
            usabilitySmells: usabilitySmellsArray,
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
            })
        },
        handleClick(label) {
            this.taskToShow = label;
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
        getDescription(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].description;
        },
        getRefactoring(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].refactoring;
        },
        getAsString(stepsTimes, stepsArray) {
            const stepsString = '';
            for (let i = 0; i < stepsArray.length; i++) {
                var step = stepsArray[i].toString() + ' (' + getTimeFromTo(stepsTimes, i+1) + ')';
                stepsString += step + ', ';
            }
            stepsString = stepsString.slice(0, stepsString.length - 2);
            return stepsString;
        },
        getTimeFromTo(stepsTimes, stepNum) {
            var from = 0.0;
            var to = 0.0;
            for (let i = 0; i < stepNum; i++) {
                if (i === 0) {
                    to += stepsTimes[i];
                } else {
                    from += stepsTimes[i-1];
                    to += stepsTimes[i];
                }
            }
            return from.toFixed(2).toString() + ' - ' + to.toFixed(2).toString() + ' s';
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

    .scenario-chart {
        width: 80%;
        height: 20%;
        margin: 0 auto;
    }
</style>
