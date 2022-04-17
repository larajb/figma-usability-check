<template>
    <div>
        <div class="scenario-definition__annotation-header">
            <div :id="'annotation-title-' + scenarioname">
                <p class="type--pos-medium-normal">{{ scenarioname }}</p>
            </div>
            <div style="display: flex;">
                <div class="icon-button" :id="'delete-' + scenarioname" @click="deleteScenario">
                    <div class="icon icon--trash"></div>
                </div>
                <Toggle v-model="switchValue">
                    Bearbeiten
                </Toggle>
            </div>
        </div>
        <div id="scenario-list" v-show="switchValue === false">
            <div v-for="(task, index) in tasks" :key="index" :id="'task-' + task.taskname" class="scenario-step">
                <div style="display: flex;">
                    <div class="numberCircle" :style="{ border: `3px solid ${task.color}`, color: task.color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ task.taskname }}</p>
                </div>
            </div>
        </div>
        <div id="scenario-list" v-show="switchValue === true">
            <div v-for="(task, index) in tasks" :key="index" :id="'task-' + task.taskname" class="scenario-step">
                <div style="display: flex;">
                    <div class="numberCircle" :style="{ border: `3px solid ${task.color}`, color: task.color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ task.taskname }}</p>
                </div>
                <div>
                    <div :id="'delete-' + task.taskname" class="icon-button" @click="deleteTask(task.taskname)">
                        <div class="icon icon--trash"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toggle } from 'figma-plugin-ds-vue';

export default {
    name: 'ScenarioListEntry',
    components: {
        Toggle,
    },
    props: {
        scenarioname: {
            type: String,
            default: null,
        },
        tasks: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            switchValue: false,
        }
    },
    watch: {
        switchValue() {
            this.$emit('edit', { value: this.switchValue, scenarioname: this.scenarioname });
        },
    },
    methods: {
        deleteScenario() {
            this.$emit('deletedScenario', this.scenarioname);
        },
        deleteTask(taskname) {
            this.$emit('deletedTask', { scenarioname: this.scenarioname, taskname: taskname });
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .scenario-definition__annotation-header {
		width: 80%;
        margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}

    .scenario-step {
        width: 80%;
		margin-left: 15%;
        display: flex;
		justify-content: space-between;
        vertical-align: middle;
    }

    .numberCircle {
        border-radius: 50%;
        width: 36px;
        height: 36px;
        padding: 8px;
        margin-right: 10px;
        background: #fff;
        text-align: center;
    }
</style>
