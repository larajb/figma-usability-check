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
        }
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
        startEvaluation() {
            var task = {};
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === this.firstTask) {
                    task = this.tasks[i];
                }
            }
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
