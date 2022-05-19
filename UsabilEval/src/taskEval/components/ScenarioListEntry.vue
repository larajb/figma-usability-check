<template>
    <div>
        <div class="scenario-definition__annotation-header">
            <div :id="'annotation-title-' + scenarioname">
                <p class="type--pos-medium-normal">{{ scenarioname }}</p>
            </div>
            <div style="display: flex;">
                <div class="tooltip--bottom">
                    <IconButton @click="deleteScenario" :icon="'trash'" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Szenario löschen</span>
                </div>
                <!-- <div class="tooltip--bottom">
                    <Toggle v-model="switchValue">
                        Bearbeiten
                    </Toggle>
                    <span class="type--pos-small-normal tooltiptext--bottom">Szenario bearbeiten: Aufgaben löschen</span>
                </div> -->
            </div>
        </div>
        <div id="scenario-list">
            <div v-for="(task, index) in tasks" :key="index" :id="'task-' + task.taskname" class="scenario-step">
                <div style="display: flex;">
                    <div class="numberCircle" :style="{ border: `3px solid ${task.color}`, color: task.color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ task.taskname }}</p>
                </div>
            </div>
        </div>
        <!-- <div id="scenario-list" v-show="switchValue === true">
            <div v-for="(task, index) in tasks" :key="index" :id="'task-' + task.taskname" class="scenario-step">
                <div style="display: flex;">
                    <div class="numberCircle" :style="{ border: `3px solid ${task.color}`, color: task.color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ task.taskname }}</p>
                </div>
                <div>
                    <div class="tooltip--bottom">
                        <IconButton @click="deleteTask(task.taskname)" :icon="'trash'" />
                        <span class="type--pos-small-normal tooltiptext--bottom">Aufgabe aus Szenario löschen</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { Toggle, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'ScenarioListEntry',
    components: {
        Toggle,
        IconButton,
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
        width: 70%;
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
