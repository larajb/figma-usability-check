<template>
    <div v-show="content !== undefined">
        <div style="display: flex">
            <div class="result-colorsquare" :style="{ backgroundColor: content.color }"></div>
            <p class="type--pos-medium-normal">{{ content.taskname }}</p>
        </div>
        <div id="goms" class="goms-result" v-if="content.evaluationRuns[0].goms !== null">
            <bar-chart class="task-chart" :chart-data="chartData" :options="chartOptions" />
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--timer"></div>
                <p class="type--pos-medium-normal">Dauer der Zielerreichung</p>
            </div>
            <div style="margin-left: 40px">
                <table class="table type--pos-medium-normal">
                    <tr>
                        <td>{{ content.taskname }}:</td>
                        <td>{{ content.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
                    </tr>
                    <tr v-if="content.evaluationRuns[0].comparison !== null">
                        <td>{{ content.evaluationRuns[0].comparison.taskname }}:</td>
                        <td>{{ content.evaluationRuns[0].comparison.gomsTime.toFixed(2) }} s</td>
                    </tr>
                </table>
                <div v-if="content.evaluationRuns.length > 1" style="display: flex">
                    <div class="icon-button" @click="showHistory = !showHistory">
                        <div class="icon" :class="[ showHistory ? 'icon--chevron-down' : 'icon--chevron-right' ]"></div>
                    </div>
                    <p class="type--pos-medium-normal">Historie</p>
                </div>
                <div v-show="showHistory" style="margin-left: 20px">
                    <table class="table type--pos-medium-normal">
                        <tr v-for="(run, index) in content.evaluationRuns" :key="index">
                            <td>{{ formatDate(run.timestamp) }}:</td>
                            <td>{{ run.goms.gomsTime.toFixed(2) }} s</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="smells" class="smells-result" v-if="content.evaluationRuns[0].usabilitySmells !== null">
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--warning"></div>
                <p class="type--pos-medium-normal">Erweitert</p>
            </div>
            <div style="margin-left: 40px" v-for="(smell, index) in content.evaluationRuns[0].usabilitySmells" :key="index">
                <div style="display: flex;">
                    <div class="icon-button" @click="showSmell = !showSmell">
                        <div class="icon" :class="[ showSmell ? 'icon--chevron-down' : 'icon--chevron-right' ]"></div>
                    </div>
                    <p class="type--pos-medium-normal">{{ smell.title }}</p>
                </div>
                <div v-show="showSmell" style="margin-left: 10px">
                    <p class="type--pos-medium-normal">{{ getDescription(smell.title) }}</p>
                    <p class="type--pos-medium-normal">Hinweis auf das Usability-Problem wurde in dem/den Schritt/en {{ smell.steps }} der Aufgabe {{ content.taskname }} gefunden.</p>
                    <p class="type--pos-medium-normal">{{ getRefactoring(smell.title) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmells';

import BarChart from './BarChart';

export default {
    name: 'TaskResults',
    components: {
        BarChart,
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
    mounted() {
        console.log('mounted', this.content);
        if (this.content !== null) {
            this.setChartData();
        }
    },
    methods: {
        setChartData() {
            this.chartData = {
                labels: ['H', 'P', 'K', 'M', 'R'],
                datasets: [],
            };
            var time = 0.0;
            this.content.evaluationRuns[0].goms.convertedSteps.forEach(step => {
                step.forEach(operator => {
                    switch(operator.operator) {
                        case 'H':
                            this.chartData.datasets.push({
                                data: [[time, time + operator.time], [0, 0], [0, 0], [0, 0], [0, 0]],
                                backgroundColor: 'rgba(0, 76, 153, 1)',
                            });
                            break;
                        case 'P':
                            this.chartData.datasets.push({
                                data: [[0, 0], [time, time + operator.time], [0, 0], [0, 0], [0, 0]],
                                backgroundColor: 'rgba(0, 102, 204, 1)',
                            });
                            break;
                        case 'K':
                            this.chartData.datasets.push({
                                data: [[0, 0], [0, 0], [time, time + operator.time], [0, 0], [0, 0]],
                                backgroundColor: 'rgba(0, 128, 255, 1)',
                            });
                            break;
                        case 'M':
                            this.chartData.datasets.push({
                                data: [[0, 0], [0, 0], [0, 0], [time, time + operator.time], [0, 0]],
                                backgroundColor: 'rgba(51, 153, 255, 1)',
                            });
                            break;
                        case 'R':
                            this.chartData.datasets.push({
                                data: [[0, 0], [0, 0], [0, 0], [0, 0], [time, time + operator.time]],
                                backgroundColor: 'rgba(102, 178, 255, 1)',
                            });
                            break;
                    }
                    time += operator.time;
                })
            })
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

    .smells-result {
        width: 80%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .table {
		border-spacing: 10px;
	}

    .icon--chevron-down {
        background-image: url('../../img/chevron-down.svg');
    }

    .icon--chevron-right {
        background-image: url('../../img/chevron-right.svg');
    }

    .task-chart {
        width: 100%;
        height: 25%;
    }
</style>
