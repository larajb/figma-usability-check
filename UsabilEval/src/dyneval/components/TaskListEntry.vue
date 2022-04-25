<template>
    <div :id="'annotation-' + taskname">
        <div class="task-definition__annotation-header">
            <div :id="'annotation-title-' + taskname" class="task-definition__annotation-header-title">
                <div class="task-definition__annotation-header-title-colorsquare" :style="myStyle"></div>
                <p class="type--pos-medium-normal">{{ taskname }}</p>
            </div>
            <div style="display: flex">
                <div class="tooltip">
                    <div class="icon-button" :id="'delete-' + taskname" @click="deleteTask">
                        <div class="icon icon--trash"></div>
                    </div>
                    <span class="type--pos-small-normal tooltiptext">Aufgabe löschen</span>
                </div>
                <div class="tooltip">
                    <Toggle v-model="switchValue">
                        Bearbeiten
                    </Toggle>
                    <span class="type--pos-small-normal tooltiptext">Aufgabe bearbeiten: Reihenfolge der Aufgabenschritte ändern, Schritte am Anfang oder in der Mitte hinzufügen, Schritte löschen</span>
                </div>
            </div>
        </div>
        <div id="task-list" v-show="switchValue === false">
            <div v-for="(step, index) in steps" :key="index" :id="'step-' + step" class="task-step">
                <div style="display: flex;">
                    <div class="numberCircle" :style="{ border: `3px solid ${color}`, color: color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ step.type }} ({{ step.id }})</p>
                </div>
            </div>
        </div>
        <div id="task-list" v-show="switchValue === true">
            <div v-for="(step, index) in steps" :key="index" :id="'step-' + step" class="task-step">
                <div class="icon-button" style="margin-left: 40px" @click="addTaskStep(index)">
                    <div class="icon icon--plus"></div>
                </div>
                <div class="task-step-content">
                    <div style="display: flex">
                        <div>
                            <div class="icon-button" :class="{ 'disabled-button': index === 0 }" style="height: 20px; width: 20px" @click="moveUp(taskname, step.id)">
                                <div class="icon icon--chevron-up"></div>
                            </div>
                            <div class="icon-button" :class="{ 'disabled-button': index === steps.length-1 }" style="height: 20px; width: 20px" @click="moveDown(taskname, step.id)">
                                <div class="icon icon--chevron-down"></div>
                            </div>
                        </div>
                        <div style="display: flex; margin-left: 20px">
                            <div class="numberCircle" :style="{ border: `3px solid ${color}`, color: color }">{{ index + 1 }}</div>
                            <p class="type--pos-medium-normal">{{ step.type }} ({{ step.id }})</p>
                        </div>
                    </div>
                    <div class="task-step-settings">
                        <div class="tooltip">
                            <div :id="'delete-' + step" class="icon-button" @click="deleteStep(step)">
                                <div class="icon icon--trash"></div>
                            </div>
                            <span class="type--pos-small-normal tooltiptext">Aufgabenschritt löschen</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="steps.length > 0" style="display: flex; margin-left: 40px; margin-top: 20px;">
                <p class="type--pos-small-normal">Kopieren nach</p>
                <div class="tooltip" style="width: 50%">
                    <Select id="copy-select" :items="taskList" v-model="selectedToCopy" />
                    <span class="type--pos-small-normal tooltiptext">Ziel zum Kopieren der Aufgabenschritte</span>
                </div>
                <button class="button button--primary" @click="copyTaskSteps">Kopieren</button>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

import { mapState } from 'vuex';

import { Toggle, Select } from 'figma-plugin-ds-vue';

export default {
    name: 'TaskListEntry',
    components: {
        Toggle,
        Select,
    },
    props: {
        taskname: {
            type: String,
            default: null,
        },
        color: {
            type: String,
            default: null,
        },
        steps: {
            type: Array,
            default: null,
        }
    },
    computed: {
        ...mapState(['tasks', 'scenarios']),
    },
    data() {
        return {
            myStyle:{
                backgroundColor: this.color,
            },
            switchValue: false,
            taskList: [],
            selectedToCopy: '',
        }
    },
    watch: {
        switchValue() {
            this.$emit('edit', { value: this.switchValue, taskname: this.taskname });
        },
        color() {
            this.myStyle.backgroundColor = this.color;
        },
        tasks() {
            this.taskList = [{ label: '', key: '' }];
            this.tasks.forEach(task => {
                if(task.taskname !== this.taskname) {
                    this.taskList.push({ label: task.taskname, key: task.taskname });
                }
            });
        },
    },
    mounted() {
        this.taskList = [{ label: '', key: '' }];
        this.tasks.forEach(task => {
            if(task.taskname !== this.taskname) {
                this.taskList.push({ label: task.taskname, key: task.taskname });
            }
        });

        handleEvent('taskStepsAdded', (args) => {
            var selectedIndex = this.tasks.findIndex((task) => task.taskname === args.taskname);
            this.tasks[selectedIndex].steps = args.steps;
            console.log(this.tasks[selectedIndex], args.steps);
            this.$store.commit('tasks', this.tasks);
            dispatch('setTaskStorage', this.tasks);
        });
    },
    methods: {
        deleteTask() {
            var isFound = false;
            this.scenarios.forEach(scenario => {
                for (let i = 0; i < scenario.tasks.length; i++) {
                    if (scenario.tasks[i].taskname === this.taskname) {
                        isFound = true;
                        this.$emit('warning', 'Diese Aufgabe kann nicht gelöscht werden, da sie in einem Szenario verwendet wird.');
                        return;
                    }
                }
            })
            if (!isFound) {
                dispatch('deleteSteps', { taskname: this.taskname, steps: this.steps });
                this.$emit('deletedTask', this.taskname);
            }
        },
        deleteStep(step) {
            var followingSteps = [];
            for (let i = 0; i < this.steps.length; i++) {
                if (this.steps[i].id === step.id) {
                    // check if new before and new current fit
                    var newBefore = this.steps[i-1];
                    var newCurrent = this.steps[i+1];
                    if (newBefore !== undefined && newCurrent !== undefined) {
                        dispatch('checkStepValidityBefore', { before: newBefore.id, current: newCurrent.id })
                        handleEvent('validityBefore', validityBefore => {
                            if (validityBefore) {
                                followingSteps = this.steps.slice(i+1);
                                dispatch('deleteStep', { taskname: this.taskname, step: step, followingSteps: followingSteps });
                                this.$emit('deletedStep', { taskname: this.taskname, id: step.id });
                            } else {
                                alert('Dieser Schritt kann nicht gelöscht werden, da vom vorherigen der nachfolgende nicht erreicht werden kann.');
                            }
                        });
                    } else {
                        followingSteps = this.steps.slice(i+1);
                        dispatch('deleteStep', { taskname: this.taskname, step: step, followingSteps: followingSteps });
                        this.$emit('deletedStep', { taskname: this.taskname, id: step.id });
                    }
                }
            }
        },
        addTaskStep(index) {
            this.$emit('addStepIndex', index);
        },
        moveUp(taskname, id) {
            this.$emit('moveUp', { taskname: taskname, id: id });
        },
        moveDown(taskname, id) {
            this.$emit('moveDown', { taskname: taskname, id: id });
        },
        setBoolean() {
            const element = document.getElementById('edit-switch-' + this.taskname);
            this.switchValue = element.value;
        },
        copyTaskSteps() {
            var selectedIndex = this.tasks.findIndex((task) => task.taskname === this.selectedToCopy);
            dispatch('addTaskSteps', { taskname: this.tasks[selectedIndex].taskname, color: this.tasks[selectedIndex].color, steps: this.steps })
        }
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .task-definition__annotation-header {
        margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}

    .task-definition__annotation-header-title {
		display: flex;
	}

    .task-definition__annotation-header-title-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
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

    .task-step {
        width: 70%;
		margin-left: 15%;
    }

    .task-step-content {
        display: flex;
		justify-content: space-between;
        vertical-align: middle;
    }

    .task-step-settings {
		display: flex;
        vertical-align: middle;
	}

    .icon--chevron-up {
        background-image: url('../../img/chevron-up.svg');
    }

    .icon--chevron-down {
        background-image: url('../../img/chevron-down.svg');
    }

    .disabled-button {
        pointer-events: none;
        opacity: 0.4;
    }
</style>