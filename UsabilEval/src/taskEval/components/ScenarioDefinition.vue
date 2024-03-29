<template>
    <div>
        <p class="type--pos-medium-normal">Wähle einen Namen für ein neues Szenario und erstelle es.</p>
        <div class="scenario-definition__input">
            <div class="tooltip--bottom" style="width: 100%">
                <input id="scenarioname" class="input" type="text" placeholder="Szenario" v-model="scenarionameInput">
                <span class="type--pos-small-normal tooltiptext--bottom">Eingabe Szenarioname</span>
            </div>
            <button class="button button--secondary" @click="addScenario">Erstellen</button>
        </div>
        <div>
            <p class="type--pos-medium-normal">Wähle eine Aufgabe und füge sie dem oben angegebenen Szenario hinzu.</p>
            <div class="scenario-definition__input">
                <div class="tooltip--bottom" style="width: 100%">
                    <Select id="task-select" :items="tasksList" v-model="task" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Auswahl Aufgabe</span>
                </div>
                <button class="button button--secondary" @click="addTask">Hinzufügen</button>
            </div>
            <div class="tooltip--bottom">
                <button class="type--pos-small-normal scenario-definition__button--link-look" @click="handleClick">Aufgabe definieren</button>
                <span class="type--pos-small-normal tooltiptext--bottom">Zurück zur Aufgabendefinition</span>
            </div>
        </div>
        <div v-show="showError" class="scenario-definition__error-note">
            <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
            <IconButton @click="closeError" :icon="'close'" />
        </div>
        <div id="scenarios" class="scenario-definition__scrollable-list type--pos-medium-normal">
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
import { Select, IconButton } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex';

export default {
    name: 'ScenarioDefinition',
    components: {
        ScenarioListEntry,
        Select,
        IconButton,
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
        // this.setScenarioStorage();
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

                dispatch('checkValidityBefore', { before: oldTaskLastStep, after: newTaskLastStep });
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

    .scenario-definition__error-note {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
    }

    .scenario-definition__scrollable-list {
        max-height: 55%;
        overflow-y: scroll;
    }

    .scenario-definition__button--link-look {
        background: none!important;
        border: none;
        padding: 0!important;
        font-family: arial, sans-serif;
        color: #069;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
