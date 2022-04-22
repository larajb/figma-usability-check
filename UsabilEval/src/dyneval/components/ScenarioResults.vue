<template>
    <div v-show="content !== undefined">
        <p class="type--pos-medium-normal">{{ content.taskname }}</p>
        <div id="tasks" v-if="content.evaluationRuns[0].gomsTimes !== null">
            <bar-chart class="scenario-chart" :chartData="chartData" :options="chartOptions" @clicked="handleClick($event)" />
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

export default {
    name: 'ScenarioResults',
    components: {
        BarChart,
        TaskResults,
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
                    data: [[time, time + gomsTime.time]],
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
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .scenario-chart {
        width: 80%;
        height: 20%;
    }
</style>
