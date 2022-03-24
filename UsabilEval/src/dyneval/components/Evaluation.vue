<template>
    <div>
        <div>
            <p class="type--pos-medium-normal">
                Wähle eine Aufgabe zur Evaluation.
            </p>
            <select id="first-task-select" class="select-menu">
                <option value="val1">value1</option>
                <option value="val2">value2</option>
            </select>
            <p class="type--pos-medium-normal">
                Wähle eine weitere Aufgabe zum Vergleich. Falls erforderlich definiere sie zuerst. (optional)
            </p>
            <select id="second-task-select" class="select-menu">
                <option value="none">-</option>
                <option value="val3">value3</option>
                <option value="val4">value4</option>
            </select>
            <button class="type--pos-small-normal button--link-look" @click="handleClick">Aufgabe definieren</button>
        </div>
        <button class="button button--primary" style="margin-top: 10px">Start</button>
    </div>
</template>

<script>

export default {
    name: 'Evaluation',
    methods: {
        handleClick() {
            this.$emit('clickedDefine')
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
