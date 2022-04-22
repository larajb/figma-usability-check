<template>
    <div class="type--pos-medium-normal">
        <div style="display: flex; margin-bottom: 20px;">
			<div id="evaluate-aufgaben" style="margin-left: 5px; margin-right: 20px" @click="$store.commit('evaluationType', 'task')">Aufgaben-Evaluation</div>
			<div id="evaluate-szenarien" style="margin-right: 20px" @click="$store.commit('evaluationType', 'scenario')">Szenarien-Evaluation</div>
		</div>
        <div v-if="evaluationType === 'task'">
            <p class="type--pos-medium-normal">
                Wähle eine Aufgabe zur Evaluation.
            </p>
            <Select id="first-task-select" :items="firstTasks" v-model="firstTask" />
            <p class="type--pos-medium-normal">
                Wähle eine weitere Aufgabe zum Vergleich. Falls erforderlich definiere sie zuerst. (optional)
            </p>
            <Select id="second-task-select" :items="secondTasks" v-model="secondTask" />
            <button class="type--pos-small-normal button--link-look" @click="$store.commit('currentPage', 'TaskDefinition')">Aufgabe definieren</button>
        </div>
        <div v-else-if="evaluationType === 'scenario'">
            <p class="type--pos-medium-normal">
                Wähle ein Szenario zur Evaluation.
            </p>
            <Select id="first-scenario-select" :items="firstScenarios" v-model="firstScenario" />
        </div>
        <button class="button button--primary" style="margin-top: 10px" @click="startEvaluation">Start</button>
        <div v-show="showError" class="element-error-note">
            <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
            <div class="icon-button" @click="closeError">
                <div class="icon icon--close"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';
import { v4 as uuidv4 } from 'uuid';
import { Select } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex';

export default {
    name: 'Evaluation',
    components: {
        Select,
    },
    data() {
        return {
            firstTask: '',
            firstScenario: '',
            secondTask: '',
            // secondScenario: '',
            firstTasks: [],
            firstScenarios: [],
            secondTasks: [],
            // secondScenarios: [],
            taskEvaluationHistory: [],
            scenarioEvaluationHistory: [],
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
        },
        secondTask() {
            if (this.secondTask !== '') {
                const firstTaskIndex = this.tasks.findIndex((task) => task.taskname === this.firstTask);
                const secondTaskIndex = this.tasks.findIndex((task) => task.taskname === this.secondTask);
                dispatch('checkTaskComparisonValidity', { firstTask: this.tasks[firstTaskIndex], secondTask: this.tasks[secondTaskIndex] });
            }
        },
        firstScenario() {
            this.$store.commit('currentScenarioname', this.firstScenario);
        },
        evaluationType() {
			var taskEvaluationValue ='';
			var scenarioEvaluationValue = '';
			switch(this.evaluationType) {
				case 'task':
					taskEvaluationValue ='2px solid black';
					break;
				case 'scenario':
					scenarioEvaluationValue ='2px solid black';
					break;
			}
			document.getElementById('evaluate-aufgaben').style.borderBottom = taskEvaluationValue;
			document.getElementById('evaluate-szenarien').style.borderBottom = scenarioEvaluationValue;
		},
    },
    mounted() {
        this.getTaskEvaluationHistory();
        this.getScenarioEvaluationHistory();

        document.getElementById('evaluate-aufgaben').style.borderBottom = '2px solid black';

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
            this.setTaskEvaluationHistory({ 
                gomsTime: result.goms.time,
                convertedSteps: result.goms.convertedSteps,
                avgPointingTime: result.goms.avgPointingTime,
                avgHomingNum: result.goms.avgHomingNum
            },
            result.usabilitySmells);
        })

        handleEvent('scenarioEvaluationResult', result => {
            dispatch('setTaskEvaluationStorage', result.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', result.taskEvaluationHistory);
            this.setScenarioEvaluationHistory(result.result);
        })

        handleEvent('taskComparisonValidity', validity => {
            if (!validity) {
                this.secondTask = '';
                this.showError = true;
                this.errorMessage = 'Die ausgewählten Aufgaben können nicht miteinander verglichen werden, da sie nicht auf der gleichen Seite beginnen und/oder nicht mit demselben Interaktionselement enden.';
            }
        })

        handleEvent('calculatedGomsComparisonTime', time => {
            this.setComparison(time);
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
        setTaskEvaluationHistory(gomsResult, usabilitySmellsResult) {
            const index = this.taskEvaluationHistory.findIndex((history) => history.taskname === this.firstTask);
            this.taskEvaluationHistory[index].evaluationRuns[0].goms = gomsResult;
            this.taskEvaluationHistory[index].evaluationRuns[0].usabilitySmells = usabilitySmellsResult;
            dispatch('setTaskEvaluationStorage', this.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', this.taskEvaluationHistory);
        },
        setScenarioEvaluationHistory(result) {
            const index = this.scenarioEvaluationHistory.findIndex((history) => history.scenarioname === this.firstScenario);
            this.scenarioEvaluationHistory[index].evaluationRuns[0].gomsTimes = result;
            dispatch('setScenarioEvaluationStorage', this.scenarioEvaluationHistory);
            this.$store.commit('scenarioEvaluationHistory', this.scenarioEvaluationHistory);
        },
        setComparison(time) {
            const index = this.taskEvaluationHistory.findIndex((history) => history.taskname === this.firstTask);
            this.taskEvaluationHistory[index].evaluationRuns[0].comparison = {
                taskname: this.secondTask,
                gomsTime: time
            };
            dispatch('setTaskEvaluationStorage', this.taskEvaluationHistory);
            this.$store.commit('taskEvaluationHistory', this.taskEvaluationHistory);
        },
        startEvaluation() {
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
                                    gomsTime: null,
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
                            }
                        ]
                    })
                } else {
                    this.scenarioEvaluationHistory[evaluationIndex].evaluationRuns.unshift({
                        timestamp: Date.now(),
                        tasks: this.scenarios[scenarioIndex].tasks,
                        gomsTimes: null,
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
