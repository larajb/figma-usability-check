<template>
    <div>
        <div>
            <p class="type--pos-medium-normal">
                Wähle eine Aufgabe zur Evaluation.
            </p>
            <select id="first-task-select" class="select-menu">
                <option value="none">-</option>
                <option v-for="(task, index) in tasks" :key="index" :value="task.taskname + '-1'">{{ task.taskname }}</option>
            </select>
            <p class="type--pos-medium-normal">
                Wähle eine weitere Aufgabe zum Vergleich. Falls erforderlich definiere sie zuerst. (optional)
            </p>
            <select id="second-task-select" class="select-menu">
                <option value="none">-</option>
                <!-- compare with value in first select > value not selectable if already selected -->
                <option v-for="(task, index) in tasks" :key="index" :value="task.taskname + '-2'" :disabled="checkTasknameOnSecond(task.taskname)">{{ task.taskname }}</option>
            </select>
            <button class="type--pos-small-normal button--link-look" @click="handleClick">Aufgabe definieren</button>
        </div>
        <button class="button button--primary" style="margin-top: 10px">Start</button>
    </div>
</template>

<script>

export default {
    name: 'Evaluation',
    props: {
        tasks: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            keyFirst: 0,
            keySecond: 1,
        }
    },
    watch: {
        tasks() {
            this.keyFirst++;
            this.keySecond++;
        },
    },
    methods: {
        handleClick() {
            this.$emit('clickedDefine')
        },
        checkTasknameOnSecond(taskname) {
            var selectedTaskname = document.getElementById('first-task-select').value;
            return selectedTaskname !== taskname;
        },
    },
}
</script>

<style lang='scss'>
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
