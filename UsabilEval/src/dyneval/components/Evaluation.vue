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
        this.getEvaluationHistory();

        handleEvent('currentEvaluationStorage', storage => {
            if (storage !== undefined) {
                this.evaluationHistory = storage;
            }
        });

        handleEvent('usabilitySmellsResult', result => {
            if (result !== undefined) {
                const index = this.evaluationHistory.findIndex((history) => history.taskname === firstTask);
                this.evaluationHistory[index].usabilitySmells.push(result);     // result = { foundSmells: [ { title: ..., value: ... }, ...], timestamp: Date.now() }
            }
        });

        handleEvent('calculatedGomsTime', time => {
            if (this.evaluationHistory)
                var trend = '';         // consistent || increasing || decreasing
                const index = this.evaluationHistory.findIndex((history) => history.taskname === firstTask);
                if (index !== undefined) {
                    var task = this.evaluationHistory[index];
                    var lastGomsTime = task.goms[-1].gomsTime;
                    if (lastGomsTime === time) {
                        trend = 'consistent';
                    } else if (lastGomsTime < time) {
                        trend = 'increasing';
                    } else if (lastGomsTime > time) {
                        trend = 'decreasing';
                    }
                }
            this.setEvaluationHistory('goms', { gomsTime: time, trend: trend, timestamp: Date.now() });
        });
    },
    watch: {
        tasks() {
            this.itemsFirst = [];
            this.itemsSecond = [];
            this.tasks.forEach(task => {
                this.itemsFirst.push({
                    label: task.taskname,
                    key: task.taskname,
                })
            })
            this.itemsSecond = this.itemsFirst;
        },
        // firstTask() {
        //     console.log('first task changed', this.firstTask);
        //     for(let i = 0; i < this.itemsSecond.length; i++) {
        //         if (this.itemsSecond[i].key === this.firstTask) {
        //             this.itemsSecond[i].disabled = true;
        //         } else {
        //             this.itemsSecond[i].disabled = false;
        //         }
        //     }
        // },
        // secondTask() {
        //     console.log('second task changed', this.secondTask);
        //     for(let i = 0; i < this.itemsFirst.length; i++) {
        //         if (this.itemsFirst[i].key === this.secondTask) {
        //             this.itemsFirst[i].disabled = true;
        //         } else {
        //             this.itemsFirst[i].disabled = false;
        //         }
        //     }
        // },
    },
    methods: {
        handleClick() {
            this.$emit('clickedDefine')
        },
        checkTasknameOnSecond(taskname) {
            var selectedTaskname = document.getElementById('first-task-select').value;
            return selectedTaskname !== taskname;
        },
        getEvaluationHistory() {
            dispatch('getEvaluationStorage');
        },
        setEvaluationHistory(type, result) {            // type = 'goms', 'usabilitySmells'
            if (this.evaluationHistory.length === 0) {
                this.evaluationHistory.push({
                    id: uuidv4(),
                    taskname: firstTask,
                    goms: type === 'goms' ? [ result ] : [],            // { gomsTime: ..., trend: ..., timestamp: Date.now()  }
                    usabilitySmells: type === 'usabilitySmells' ? [ result ] : []           // [ { title: ..., value: ...}, ..., timestamp: Date.now() ]
                });
            } else {
                for (let i = 0; i < this.evaluationHistory.length; i++) {
                    if (this.evaluationHistory.taskname === taskname) {
                        this.evaluationHistory[type].push(result);
                    }
                }
            }
            dispatch('setEvaluationStorage', this.evaluationHistory);
        },
        startEvaluation() {
            const index = this.evaluationHistory.findIndex((history) => history.taskname === firstTask);
            var task = this.evaluationHistory[index];
            dispatch('checkUsabilitySmells', task);
            dispatch('calculateGoms', task);
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
