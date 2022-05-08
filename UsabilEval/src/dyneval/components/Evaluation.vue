<template>
    <div class="type--pos-medium-normal">
        <div style="margin-bottom: 20px;">
            <p class="type--pos-medium-normal">Wähle die Art der Evaluation.</p>
            <div class="tooltip--bottom">
                <Radio :items="[{ label: 'Aufgabenevaluation', value: 'task' }, { label: 'Szenarienevaluation', value: 'scenario' }]" v-model="evaluationTypeValue" />
                <span class="type--pos-small-normal tooltiptext--bottom">Auswahl der Evaluationsart</span>
            </div>
		</div>
        <div v-if="evaluationType === 'task'">
            <p class="type--pos-medium-normal">
                Wähle eine Aufgabe zur Evaluation.
            </p>
            <div class="tooltip--bottom" style="width: 100%">
                <Select id="first-task-select" :items="firstTasks" v-model="firstTask" />
                <span class="type--pos-small-normal tooltiptext--bottom">Auswahl Aufgabe</span>
            </div>
            <p class="type--pos-medium-normal">
                Wähle eine weitere Aufgabe zum Vergleich mit der zuvor ausgewählten Aufgabe. Falls erforderlich definiere sie zuerst. (optional)
            </p>
            <div class="tooltip--bottom" style="width: 100%">
                <Select id="second-task-select" :items="secondTasks" v-model="secondTask" />
                <span class="type--pos-small-normal tooltiptext--bottom">Auswahl Vergleichsaufgabe</span>
            </div>
            <div class="tooltip--bottom">
                <button class="type--pos-small-normal button--link-look" @click="$store.commit('currentPage', 'TaskDefinition')">Aufgabe definieren</button>
                <span class="type--pos-small-normal tooltiptext--bottom">Zurück zur Aufgabendefinition</span>
            </div>
        </div>
        <div v-else-if="evaluationType === 'scenario'">
            <p class="type--pos-medium-normal">
                Wähle ein Szenario zur Evaluation.
            </p>
            <div class="tooltip--bottom" style="width: 100%">
                <Select id="first-scenario-select" :items="firstScenarios" v-model="firstScenario" />
                <span class="type--pos-small-normal tooltiptext--bottom">Auswahl Szenario</span>
            </div>
        </div>
        <button class="button button--primary" style="margin-top: 10px" @click="startEvaluation">Start</button>
        <div v-show="showError" class="element-error-note">
            <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
            <IconButton @click="closeError" :icon="'close'" />
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';
import { v4 as uuidv4 } from 'uuid';
import { Select, Radio, IconButton } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex';

export default {
    name: 'Evaluation',
    components: {
        Select,
        Radio,
        IconButton,
    },
    data() {
        return {
            firstTask: '',
            firstScenario: '',
            secondTask: '',
            firstTasks: [],
            firstScenarios: [],
            secondTasks: [],
            taskEvaluationHistory: [],
            scenarioEvaluationHistory: [],
            evaluationTypeValue: 'task',
            showError: false,
            errorMessage: '',
        }
    },
    computed: {
        ...mapState(['tasks', 'scenarios', 'evaluationType']),
    },
    watch: {
        tasks() {
            this.setTasks();
        },
        scenarios() {
            this.firstScenarios = [{ label: '', key: '' }];
            this.scenarios.forEach(scenario => {
                this.firstScenarios.push({
                    label: scenario.scenarioname,
                    key: scenario.scenarioname,
                })
            })
        },
        firstTask() {
            this.setTasks();
            const result = this.secondTasks.filter(item => item.label !== this.firstTask);
            this.secondTasks = result;
            this.$store.commit('currentTaskname', this.firstTask);
            this.$store.commit('evaluationReady', false);
        },
        secondTask() {
            this.$store.commit('evaluationReady', false);
        },
        firstScenario() {
            this.$store.commit('currentScenarioname', this.firstScenario);
            this.$store.commit('evaluationReady', false);
        },
        evaluationTypeValue() {
            this.$store.commit('evaluationType', this.evaluationTypeValue);
        },
    },
    mounted() {
        this.getTaskEvaluationHistory();
        this.getScenarioEvaluationHistory();

        handleEvent('currentTaskEvaluationStorage', storage => {
            if (storage !== undefined) {
                this.taskEvaluationHistory = storage;
                this.$store.commit('taskEvaluationHistory', this.taskEvaluationHistory);
            }
        });

        handleEvent('currentScenarioEvaluationStorage', storage => {
            if (storage !== undefined) {
                this.scenarioEvaluationHistory = storage;
                this.$store.commit('scenarioEvaluationHistory', this.scenarioEvaluationHistory);
            }
        });

        handleEvent('taskEvaluationResult', result => {
            this.setTaskEvaluationHistory(this.firstTask, result.goms, result.usabilitySmells);
            this.$store.commit('evaluationReady', true);
        })

        handleEvent('scenarioEvaluationResult', result => {
            dispatch('setTaskEvaluationStorage', result.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', result.taskEvaluationHistory);
            this.setScenarioEvaluationHistory(result.gomsTimes, result.usabilitySmells);
            this.$store.commit('evaluationReady', true);
        })

        // handleEvent('taskComparisonValidity', validity => {
        //     if (!validity) {
        //         this.secondTask = '';
        //         this.showError = true;
        //         this.errorMessage = 'Die ausgewählten Aufgaben können nicht miteinander verglichen werden, da sie nicht auf der gleichen Seite beginnen und/oder nicht mit demselben Interaktionselement enden.';
        //     }
        // })

        handleEvent('comparisonEvaluationResult', result => {
            // this.setTaskEvaluationHistory(this.secondTask, {
            //     gomsTime: result.goms.time,
            //     convertedSteps: result.goms.convertedSteps
            // },
            // result.usabilitySmells);
            this.setComparison(this.firstTask, result.goms, result.usabilitySmells);
        })
    },
    methods: {
        setTasks() {
            this.firstTasks = [{ label: '', key: '' }];
            this.secondTasks = [{ label: '', key: '' }];
            this.tasks.forEach(task => {
                this.firstTasks.push({
                    label: task.taskname,
                    key: task.taskname,
                })
                this.secondTasks.push({
                    label: task.taskname,
                    key: task.taskname,
                })
            })
        },
        checkTasknameOnSecond(taskname) {
            var selectedTaskname = document.getElementById('first-task-select').value;
            return selectedTaskname !== taskname;
        },
        getTaskEvaluationHistory() {
            dispatch('getTaskEvaluationStorage');
        },
        getScenarioEvaluationHistory() {
            dispatch('getScenarioEvaluationStorage');
        },
        setTaskEvaluationHistory(taskname, gomsResult, usabilitySmellsResult) {
            const index = this.taskEvaluationHistory.findIndex((history) => history.taskname === taskname);
            this.taskEvaluationHistory[index].evaluationRuns[0].goms = gomsResult;
            this.taskEvaluationHistory[index].evaluationRuns[0].usabilitySmells = usabilitySmellsResult;
            dispatch('setTaskEvaluationStorage', this.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', this.taskEvaluationHistory);
        },
        setScenarioEvaluationHistory(gomsTimes, usabilitySmells) {
            const index = this.scenarioEvaluationHistory.findIndex((history) => history.scenarioname === this.firstScenario);
            this.scenarioEvaluationHistory[index].evaluationRuns[0].gomsTimes = gomsTimes;
            this.scenarioEvaluationHistory[index].evaluationRuns[0].usabilitySmells = usabilitySmells;
            dispatch('setScenarioEvaluationStorage', this.scenarioEvaluationHistory);
            this.$store.commit('scenarioEvaluationHistory', this.scenarioEvaluationHistory);
        },
        setComparison(taskname, gomsResult, usabilitySmellsResult) {
            const index = this.taskEvaluationHistory.findIndex((history) => history.taskname === taskname);
            this.taskEvaluationHistory[index].evaluationRuns[0].comparison.goms = gomsResult;
            this.taskEvaluationHistory[index].evaluationRuns[0].comparison.usabilitySmells = usabilitySmellsResult;
            dispatch('setTaskEvaluationStorage', this.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', this.taskEvaluationHistory);
        },
        startEvaluation() {
            this.$store.commit('evaluationReady', false);
            this.$store.commit('taskEvaluationHistory', []);
            this.$store.commit('scenarioEvaluationHistory', []);
            if (this.evaluationType === 'task') {
                const evaluationIndex = this.taskEvaluationHistory.findIndex((task) => task.taskname === this.firstTask);
                const taskIndex = this.tasks.findIndex((task) => task.taskname === this.firstTask);
                if (evaluationIndex < 0) {
                    this.taskEvaluationHistory.push({
                        id: uuidv4(),
                        type: 'task',
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
                                    goms: null,
                                    usabilitySmells: null,
                                } : null
                            }
                        ]
                    });
                } else {
                    this.taskEvaluationHistory[evaluationIndex].evaluationRuns.unshift({
                        timestamp: Date.now(),
                        steps: this.tasks[taskIndex].steps,
                        goms: null,
                        usabilitySmells: null,
                        comparison: this.secondTask !== '' ? {
                            taskname: this.secondTask,
                            goms: null,
                            usabilitySmells: null,
                        } : null
                    })
                }

                if (this.secondTask !== '') {
                    const indexSecond = this.tasks.findIndex((task) => task.taskname === this.secondTask);
                    var secondTask = this.tasks[indexSecond];
                    dispatch('evaluateComparison', secondTask);
                }
                var task = this.tasks[taskIndex];
                dispatch('evaluateTask', task);
            } else {
                const evaluationIndex = this.scenarioEvaluationHistory.findIndex((scenario) => scenario.scenarioname === this.firstScenario);
                const scenarioIndex = this.scenarios.findIndex((scenario) => scenario.scenarioname === this.firstScenario);
                if (evaluationIndex < 0) {
                    this.scenarioEvaluationHistory.push({
                        id: uuidv4(),
                        type: 'scenario',
                        scenarioname: this.firstScenario,
                        evaluationRuns: [
                            {
                                timestamp: Date.now(),
                                tasks: this.scenarios[scenarioIndex].tasks,
                                gomsTimes: null,
                                usabilitySmells: null,
                            }
                        ]
                    })
                } else {
                    this.scenarioEvaluationHistory[evaluationIndex].evaluationRuns.unshift({
                        timestamp: Date.now(),
                        tasks: this.scenarios[scenarioIndex].tasks,
                        gomsTimes: null,
                        usabilitySmells: null,
                    })
                }
                var scenario = this.scenarios[scenarioIndex];
                dispatch('evaluateScenario', { scenario: scenario, tasks: this.tasks, history: this.taskEvaluationHistory });
            }
        },
        closeError() {
            this.showError = false;
            this.errorMessage = '';
        },
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
    @import "../../../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css";

    .button--link-look {
        background: none!important;
        border: none;
        padding: 0!important;
        font-family: arial, sans-serif;
        color: #069;
        text-decoration: underline;
        cursor: pointer;
    }
</style>
