<template>
    <div>
        <div>
            <p class="type--pos-medium-normal">
                Wähle eine Aufgabe zur Evaluation.
            </p>
            <Select id="first-task-select" :items="itemsFirst" v-model="firstTask" />
            <p class="type--pos-medium-normal">
                Wähle eine weitere Aufgabe zum Vergleich. Falls erforderlich definiere sie zuerst. (optional)
            </p>
            <Select id="second-task-select" :items="itemsSecond" v-model="secondTask" />
            <button class="type--pos-small-normal button--link-look" @click="handleClick">Aufgabe definieren</button>
        </div>
        <button class="button button--primary" style="margin-top: 10px" @click="startEvaluation">Start</button>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';
import { Select } from 'figma-plugin-ds-vue';
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'Evaluation',
    props: {
        tasks: {
            type: Array,
            default: null,
        },
    },
    components: {
        Select,
    },
    data() {
        return {
            firstTask: '',
            secondTask: '',
            itemsFirst: [],
            itemsSecond: [],
            evaluationHistory: [],
        }
    },
    mounted() {
        // dispatch('setEvaluationStorage', this.evaluationHistory);
        this.getEvaluationHistory();

        handleEvent('currentEvaluationStorage', storage => {
            if (storage !== undefined) {
                this.evaluationHistory = storage;
            }
        });

        handleEvent('evaluationResult', result => {
            if (result.usabilitySmells !== undefined) {
                this.setEvaluationHistory('usabilitySmells', result.usabilitySmells);
            }

            if (this.evaluationHistory) {
                var trend = '';         // consistent || increasing || decreasing
                const index = this.evaluationHistory.findIndex((history) => history.taskname === this.firstTask);
                if (index !== undefined) {
                    var task = this.evaluationHistory[index];
                    if (task.evaluationRuns.length > 1) {
                        var lastGomsTime = task.evaluationRuns[1].goms.gomsTime;
                        if (lastGomsTime === result.goms.time) {
                            trend = 'consistent';
                        } else if (lastGomsTime < result.goms.time) {
                            trend = 'increasing';
                        } else if (lastGomsTime > result.goms.time) {
                            trend = 'decreasing';
                        }
                    }
                }
            }
            this.setEvaluationHistory('goms', { gomsTime: result.goms.time, trend: trend, avgPointingTime: result.goms.avgPointingTime, avgHomingNum: result.goms.avgHomingNum });
        })

        handleEvent('calculatedGomsComparisonTime', time => {
            this.setComparison(time);
        })
    },
    watch: {
        tasks() {
            this.setTasks();
        },
        firstTask() {
            this.setTasks();
            const result = this.itemsSecond.filter(item => item.label !== this.firstTask);
            this.itemsSecond = result;
            this.$emit('tasknameSet', this.firstTask);
        },
        // evaluationHistory() {
        //     this.$emit('historyUpdated', this.evaluationHistory);
        // },
    },
    methods: {
        handleClick() {
            this.$emit('clickedDefine')
        },
        setTasks() {
            this.itemsFirst = [];
            this.itemsSecond = [];
            this.tasks.forEach(task => {
                this.itemsFirst.push({
                    label: task.taskname,
                    key: task.taskname,
                })
                this.itemsSecond.push({
                    label: task.taskname,
                    key: task.taskname,
                })
            })
        },
        checkTasknameOnSecond(taskname) {
            var selectedTaskname = document.getElementById('first-task-select').value;
            return selectedTaskname !== taskname;
        },
        getEvaluationHistory() {
            dispatch('getEvaluationStorage');
        },
        setEvaluationHistory(type, result) {
            const index = this.evaluationHistory.findIndex((history) => history.taskname === this.firstTask);
            this.evaluationHistory[index].evaluationRuns[0][type] = result;
            dispatch('setEvaluationStorage', this.evaluationHistory);
            if (type === 'goms') {
                this.$emit('historyUpdated', this.evaluationHistory);
            }
        },
        setComparison(time) {
            const index = this.evaluationHistory.findIndex((history) => history.taskname === this.firstTask);
            this.evaluationHistory[index].evaluationRuns[0].comparison = {
                taskname: this.secondTask,
                gomsTime: time
            };
            dispatch('setEvaluationStorage', this.evaluationHistory);
        },
        startEvaluation() {
            const evaluationIndex = this.evaluationHistory.findIndex((task) => task.taskname === this.firstTask);
            const taskIndex = this.tasks.findIndex((task) => task.taskname === this.firstTask);
            if (evaluationIndex < 0) {
                this.evaluationHistory.push({
                    id: uuidv4(),
                    taskname: this.firstTask,
                    color: this.tasks[taskIndex].color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: this.tasks[taskIndex].steps,
                            goms: null,
                            usabilitySmells: null,
                            comparison: this.secondTask !== '' ? {
                                taskname: this.secondTask,
                                gomsTime: null,
                            } : null
                        }
                    ]
                });
            } else {
                this.evaluationHistory[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: this.tasks[taskIndex].steps,
                    goms: null,
                    usabilitySmells: null,
                    comparison: this.secondTask !== '' ? {
                        taskname: this.secondTask,
                        gomsTime: null,
                    } : null
                })
            }

            if (this.secondTask !== '') {
                const indexSecond = this.tasks.findIndex((task) => task.taskname === this.secondTask);
                var secondTask = this.tasks[indexSecond];
                dispatch('calculateGomsComparison', secondTask);
            }
            var task = this.tasks[taskIndex];
            dispatch('evaluateTask', task);
        },
        setPointingTime(avgPointingTime) {
            // dispatch('setPointingTimeStorage', avgPointingTime);
        },
        setHomingNum(avgHomingNum) {
            // dispatch('setHomingNumStorage', avgHomingNum);
        },
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css";

    .button--link-look {
        background: none!important;
        border: none;
        padding: 0!important;
        /*optional*/
        font-family: arial, sans-serif;
        /*input has OS specific font-family*/
        color: #069;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
