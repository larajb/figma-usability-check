<template>
    <div>
        <p class="type--pos-medium-normal">Wähle einen Namen für ein neues Szenario und erstelle es.</p>
        <div class="scenario-definition__input">
            <input id="scenarioname" class="input" type="text" placeholder="Szenario" v-model="scenarionameInput">
            <button class="button button--primary" @click="addScenario">Erstellen</button>
        </div>
        <div>
            <p class="type--pos-medium-normal">Wähle eine Aufgabe und füge sie dem Szenario hinzu.</p>
            <div class="scenario-definition__input">
                <Select id="task-select" style="width: 100%" :items="tasksList" v-model="task" />
                <button class="button button--primary" @click="addTask">Hinzufügen</button>
            </div>
            <button class="type--pos-small-normal button--link-look" @click="handleClick">Aufgabe definieren</button>
        </div>
        <div v-show="showError" class="element-error-note">
            <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
            <div class="icon-button" @click="closeError">
                <div class="icon icon--close"></div>
            </div>
        </div>
        <div id="scenarios" class="scrollable-scenario-list type--pos-medium-normal">
            <scenario-list-entry v-for="(scenario, index) in scenarios" :key="index" :scenarioname="scenario.scenarioname" :tasks="scenario.tasks"
                @deletedScenario="deletedScenario($event)"
                @deletedTask="deletedTask($event)"
                @edit="setEditMode($event)" />
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

import ScenarioListEntry from './ScenarioListEntry.vue';
import { Select } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex';

export default {
    name: 'ScenarioDefinition',
    components: {
        ScenarioListEntry,
        Select,
    },
    data() {
        return {
            scenarios: [],
            scenarionameInput: '',
            tasksList: [],
            task: '',
            showError: false,
            errorMessage: '',
        }
    },
    computed: {
        ...mapState(['tasks']),
    },
    watch: {
        tasks() {
            this.tasksList = [{ label: '', key: '' }];
            this.tasks.forEach(task => {
                this.tasksList.push({
                    label: task.taskname,
                    key: task.taskname,
                })
            })
        },
    },
    mounted() {
        this.getScenarioStorage();

        handleEvent('currentScenarioStorage', scenarios => {
            if (scenarios !== undefined) {
                this.scenarios = scenarios;
                this.$store.commit('scenarios', this.scenarios);
            }
        });
    },
    methods: {
        addScenario() {
            const index = this.scenarios.findIndex((scenario) => scenario.scenarioname === this.scenarionameInput);
            if (index < 0) {
                this.scenarios.push({ scenarioname: this.scenarionameInput, tasks: [] });
            } else {
                this.showError = true;
                this.errorMessage = 'Es existiert bereits ein Szenario mit diesem Namen. Füge diesem Szenario weitere Aufgaben hinzu oder wähle einen anderen Namen.'
            }
            
            this.setScenarioStorage();
            this.$store.commit('scenarios', this.scenarios);
        },
        addTask() {
            const scenarioIndex = this.scenarios.findIndex((scenario) => scenario.scenarioname === this.scenarionameInput);
            const taskIndex = this.tasks.findIndex((task) => task.taskname === this.task);
            var numTasks = this.scenarios[scenarioIndex].tasks.length;

            if (numTasks > 0) {
                const oldTaskname = this.scenarios[scenarioIndex].tasks[this.scenarios[scenarioIndex].tasks.length - 1].taskname;
                const oldTaskIndex = this.tasks.findIndex((task) => task.taskname === oldTaskname);
                const oldTaskLastStep = this.tasks[oldTaskIndex].steps[this.tasks[oldTaskIndex].steps.length - 1];
                const newTaskLastStep = this.tasks[taskIndex].steps[0];

                dispatch('checkValidityBefore', { before: oldTaskLastStep.id, after: newTaskLastStep.id });
                handleEvent('validityBefore', validityBefore => {
                    if (validityBefore) {
                        this.scenarios[scenarioIndex].tasks.push({ taskname: this.task, color: this.tasks[taskIndex].color });
                        this.setScenarioStorage();
                        this.$store.commit('scenarios', this.scenarios);
                        return;
                    } else {
                        this.showError = true;
                        this.errorMessage = 'Die beiden Aufgaben können nicht direkt nacheinander durchgeführt werden. Bitte füge eine Übergangsaufgabe hinzu.';
                    }
                });
            } else {
                this.scenarios[scenarioIndex].tasks.push({ taskname: this.task, color: this.tasks[taskIndex].color });
                this.setScenarioStorage();
                this.$store.commit('scenarios', this.scenarios);
                return;
            }
        },
        deletedScenario(scenarioname) {
            this.scenarios = this.scenarios.filter(function(item) {
                return item.scenarioname !== scenarioname;
            });
            this.setScenarioStorage();
            this.$store.commit('scenarios', this.scenarios);
        },
        deletedTask(args) {
            const scenarioIndex = this.scenarios.findIndex((scenario) => scenario.scenarioname === args.scenarioname);
            const taskIndex = this.scenarios[scenarioIndex].tasks.findIndex((task) => task.taskname === args.taskname);
            this.scenarios[scenarioIndex].tasks.splice(taskIndex, 1);

            this.setScenarioStorage();
            this.$store.commit('scenarios', this.scenarios);
        },
        getScenarioStorage() {
            dispatch('getScenarioStorage');
        },
        setScenarioStorage() {
            dispatch('setScenarioStorage', this.scenarios);
        },
        handleClick() {
            this.$store.commit('currentPage', 'TaskDefinition');
        },
        closeError() {
            this.showError = false;
            this.errorMessage = '';
        },
        setEditMode(args) {
            if (args.value === true) {
                this.scenarionameInput = args.scenarioname;
            } else {
                this.scenarionameInput = '';
            }
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
    @import "../../../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css";

    .scenario-definition__input {
		display: flex;
		justify-content: space-between;
	}

    .element-error-note {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
    }

    .scrollable-scenario-list {
        max-height: 50%;
        overflow-y: scroll;
    }

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
