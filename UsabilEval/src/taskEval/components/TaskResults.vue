<template>
    <div v-show="content !== undefined">
        <div style="display: flex">
            <div class="task-results__colorsquare" :style="{ backgroundColor: content.color }"></div>
            <p class="type--pos-medium-normal">{{ content.taskname }}</p>
        </div>
        <div id="goms" class="task-results__goms" v-if="content.evaluationRuns[0].goms !== null">
            <bar-chart class="task-results__chart" :chart-data="chartData" :options="chartOptions" />
            <table>
                <tr>
                    <td align="top"><Icon icon="timer" /></td>
                    <td align="top"><p class="type--pos-medium-bold">Dauer der Zielerreichung</p></td>
                </tr>
                <tr>
                    <td align="top"></td>
                    <td align="top">
                        <table class="task-results__table type--pos-medium-normal" style="margin-left: -11px">
                            <tr>
                                <td align="top">{{ content.taskname }}:</td>
                                <td align="top">{{ content.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
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
                            <table class="task-results__table type--pos-medium-normal">
                                <tr v-for="(run, index) in content.evaluationRuns" :key="index">
                                    <td align="top">{{ formatDate(run.timestamp) }}:</td>
                                    <td align="top">{{ run.goms.gomsTime.toFixed(2) }} s</td>
                                </tr>
                            </table>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div id="smells" class="task-results__found-smells" v-if="checkSmellPresence(content.evaluationRuns[0].usabilitySmells)">
            <table>
                <tr>
                    <td align="top"><Icon icon="warning" /></td>
                    <td align="top"><p class="type--pos-medium-bold">Erweitert für {{ content.taskname }}</p></td>
                </tr>
                <tr v-for="(smell, index) in content.evaluationRuns[0].usabilitySmells" :key="index">
                    <td align="top"></td>
                    <td align="top">
                        <usability-smell-result :smell="smell" :type="'task'" />
                    </td>
                </tr>
            </table>
        </div>
        <div v-else class="task-results__not-found-smells">
            <table>
                <tr>
                    <td align="top">
                        <Icon icon="smiley" />
                    </td>
                    <td align="top">
                        <p class="type--pos-medium-normal">Bei der Aufgabe wurden keine Hinweise auf Usability-Probleme gefunden.</p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Icon, IconButton } from 'figma-plugin-ds-vue';

import BarChart from './BarChart';
import UsabilitySmellResult from './UsabilitySmellResult.vue';

export default {
    name: 'TaskResults',
    components: {
        BarChart,
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
    data() {
        return {
            showHistory: false,
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
        },
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var minutes = date.getMinutes();
            if (minutes < 10) { minutes = '0' + minutes; }
            var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes;
            return formattedDate;
        },
        convertColor(color, alpha) {
            color = color.replace('rgb(', '');
            color = color.replace(')', '');
            var colorSplitted = color.split(',');
            var newColor = 'rgba(' + colorSplitted[0] + ', ' + colorSplitted[1] + ', ' + colorSplitted[2] + ', ' + alpha + ')';
            return newColor;
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

    .task-results__colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

    .task-results__goms {
        width: 80%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .task-results__found-smells {
        width: 85%;
		margin-left: 10%;
        vertical-align: middle;
    }

    .task-results__not-found-smells {
        margin-left: 10%;
        width: 80%;
    }

    .task-results__table {
		border-spacing: 10px;
	}

    .task-results__chart {
        width: 100%;
        height: 25%;
    }
</style>
