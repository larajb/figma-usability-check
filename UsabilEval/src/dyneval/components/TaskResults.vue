<template>
    <div v-show="content !== undefined">
        <div style="display: flex">
            <div class="result-colorsquare" :style="{ backgroundColor: content.color }"></div>
            <p class="type--pos-medium-normal">{{ content.taskname }}</p>
        </div>
        <div id="goms" class="goms-result" v-if="content.evaluationRuns[0].goms !== null">
            <bar-chart class="task-chart" :chart-data="chartData" :options="chartOptions" />
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
                                <td>{{ content.taskname }}:</td>
                                <td>{{ content.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
                            </tr>
                            <tr v-if="content.evaluationRuns[0].comparison !== null">
                                <td>{{ content.evaluationRuns[0].comparison.taskname }}:</td>
                                <td>{{ content.evaluationRuns[0].comparison.goms.gomsTime.toFixed(2) }} s</td>
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
                                    <td>{{ run.goms.gomsTime.toFixed(2) }} s</td>
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
                    <td><p class="type--pos-medium-bold">Erweitert für {{ content.taskname }}</p></td>
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
                                <td>Schritt {{ smell.steps[0] }} ({{ getTimeFromTo(content.evaluationRuns[0].goms.stepsTimes, smell.steps[0]) }})</td>
                            </tr>
                            <tr class="type--pos-medium-normal" v-else-if="smell.steps.length > 1">
                                <td valign="top">Gefunden in</td>
                                <td>Schritten {{ getAsString(content.evaluationRuns[0].goms.stepsTimes, smell.steps) }}</td>
                            </tr>
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
                        <p class="type--pos-medium-normal">In der Aufgabe wurden keine Hinweismuster auf Usability-Probleme gefunden.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmells';
import { mapState } from 'vuex';
import { Icon, IconButton } from 'figma-plugin-ds-vue';

import BarChart from './BarChart';

export default {
    name: 'TaskResults',
    components: {
        BarChart,
        Icon,
        IconButton,
    },
    props: {
        content: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            showHistory: false,
            showSmell: false,
            usabilitySmells: usabilitySmellsArray,
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
        ...mapState(['tasks']),
    },
    mounted() {
        if (this.content.evaluationRuns[0].goms !== null) {
            this.setChartData();
        }
    },
    watch: {
        content() {
            if (this.content.evaluationRuns[0].goms !== null) {
                this.setChartData();
            }
        },
    },
    methods: {
        setChartData() {
            if (this.content.evaluationRuns[0].comparison === null) {
                var task = this.tasks.find((task) => task.taskname === this.content.taskname);
                this.chartData = {
                    labels: ['H', 'K', 'M', 'P', 'R'],
                    datasets: [],
                };
                var time = 0.0;
                this.content.evaluationRuns[0].goms.operatorTimes.forEach(step => {
                    step.forEach(operator => {
                        switch(operator.operator) {
                            case 'H':
                                this.chartData.datasets.push({
                                    data: [[time.toFixed(2), (time + operator.time).toFixed(2)], [0, 0], [0, 0], [0, 0], [0, 0]],
                                    backgroundColor: this.convertColor(task.color, 0.9),
                                });
                                break;
                            case 'K':
                                this.chartData.datasets.push({
                                    data: [[0, 0], [time.toFixed(2), (time + operator.time).toFixed(2)], [0, 0], [0, 0], [0, 0]],
                                    backgroundColor: this.convertColor(task.color, 0.8),
                                });
                                break;
                            case 'M':
                                this.chartData.datasets.push({
                                    data: [[0, 0], [0, 0], [time.toFixed(2), (time + operator.time).toFixed(2)], [0, 0], [0, 0]],
                                    backgroundColor: this.convertColor(task.color, 0.7),
                                });
                                break;
                            case 'P':
                                this.chartData.datasets.push({
                                    data: [[0, 0], [0, 0], [0, 0], [time.toFixed(2), (time + operator.time).toFixed(2)], [0, 0]],
                                    backgroundColor: this.convertColor(task.color, 0.6),
                                });
                                break;
                            case 'R':
                                this.chartData.datasets.push({
                                    data: [[0, 0], [0, 0], [0, 0], [0, 0], [time.toFixed(2), (time + operator.time).toFixed(2)]],
                                    backgroundColor: this.convertColor(task.color, 0.5),
                                });
                                break;
                        }
                        time += operator.time;
                    })
                })
            } else {
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
            }
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
        convertColor(color, alpha) {
            color = color.replace('rgb(', '');
            color = color.replace(')', '');
            var colorSplitted = color.split(',');
            var newColor = 'rgba(' + colorSplitted[0] + ', ' + colorSplitted[1] + ', ' + colorSplitted[2] + ', ' + alpha + ')';
            return newColor;
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
        findInComparison(title) {
            var isAlsoFound = false;
            this.content.evaluationRuns[0].comparison.usabilitySmells.forEach(smell => {
                if (smell.title === title && smell.isFound) {
                    isAlsoFound = true;
                }
            })
            return isAlsoFound;
        },
    },
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

    .smells-result-found {
        width: 85%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .smells-result-not-found {
        margin-left: 10%;
        width: 80%;
    }

    .table {
		border-spacing: 10px;
	}

    .task-chart {
        width: 100%;
        height: 25%;
    }
</style>
