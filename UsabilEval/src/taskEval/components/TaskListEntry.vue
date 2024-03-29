<template>
    <div :id="'annotation-' + taskname">
        <div class="task-list-entry__annotation-header">
            <div :id="'annotation-title-' + taskname" class="task-list-entry__annotation-header-title">
                <div class="task-list-entry__annotation-header-title-colorsquare" :style="myStyle"></div>
                <p class="type--pos-medium-normal">{{ taskname }}</p>
            </div>
            <div style="display: flex">
                <div class="tooltip--bottom">
                    <IconButton @click="deleteTask" :icon="'trash'" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Aufgabe löschen</span>
                </div>
                <div class="tooltip--bottom">
                    <Toggle v-model="switchValue">
                        Bearbeiten
                    </Toggle>
                    <span class="type--pos-small-normal tooltiptext--bottom">Schritte in Aufgabe bearbeiten</span>
                </div>
            </div>
        </div>
        <div id="task-list" v-show="switchValue === false">
            <div v-for="(step, index) in steps" :key="index" :id="'step-' + step" class="task-list-entry__step">
                <div style="display: flex;">
                    <div class="task-list-entry__number-circle" :style="{ border: `3px solid ${color}`, color: color }">{{ index + 1 }}</div>
                    <p class="type--pos-medium-normal">{{ getStepType(step.type) }} - {{ step.name.length > 15 ? step.name.substr(0, 15) + '..' : step.name }}</p>
                </div>
            </div>
        </div>
        <div id="task-list" v-show="switchValue === true">
            <div v-for="(step, index) in steps" :key="index" :id="'step-' + step" class="task-list-entry__step">
                <IconButton @click="addTaskStep(index)" style="margin-left: 55px" :icon="'plus'" />
                <div class="task-list-entry__step-content">
                    <div style="display: flex">
                        <div>
                            <div class="icon-button" :class="{ 'task-list-entry__disabled-button': index === 0 }" style="height: 20px" @click="moveUp(taskname, step.id)">
                                <div class="icon icon--caret-up"></div>
                            </div>
                            <div class="icon-button" :class="{ 'task-list-entry__disabled-button': index === steps.length-1 }" style="height: 20px" @click="moveDown(taskname, step.id)">
                                <div class="icon icon--caret-down"></div>
                            </div>
                        </div>
                        <div style="display: flex; margin-left: 20px">
                            <div class="task-list-entry__number-circle" :style="{ border: `3px solid ${color}`, color: color }">{{ index + 1 }}</div>
                            <p class="type--pos-medium-normal">{{ getStepType(step.type) }} - {{ step.name.length > 6 ? step.name.substr(0, 6) + '..' : step.name }}</p>
                        </div>
                    </div>
                    <div class="task-list-entry__step-settings">
                        <div class="tooltip--bottom">
                            <IconButton @click="deleteStep(step)" :icon="'trash'" />
                            <span class="type--pos-small-normal tooltiptext--bottom">Aufgabenschritt löschen</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="steps.length > 0" style="display: flex; margin-left: 40px; margin-top: 20px;">
                <p class="type--pos-small-normal">Kopieren nach</p>
                <div class="tooltip--bottom" style="width: 50%">
                    <Select id="copy-select" :items="taskList" v-model="selectedToCopy" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Ziel zum Kopieren der Aufgabenschritte</span>
                </div>
                <button class="button button--secondary" @click="copyTaskSteps">Kopieren</button>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

import { mapState } from 'vuex';

import { Toggle, Select, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'TaskListEntry',
    components: {
        Toggle,
        Select,
        IconButton,
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
        ...mapState(['tasks', 'scenarios', 'taskToEdit']),
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
            if (this.switchValue === true && this.taskToEdit !== this.taskname) {
                this.$store.commit('taskToEdit', this.taskname);
            } else if (this.switchValue === false && this.taskToEdit === this.taskname) {
                this.$store.commit('taskToEdit', '');
            }
        },
        taskToEdit() {
            if (this.taskToEdit !== this.taskname) {
                this.switchValue = false;
            }
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
                    var newBefore = this.steps[i-1];
                    var newCurrent = this.steps[i+1];
                    if (newBefore !== undefined && newCurrent !== undefined) {
                        dispatch('checkStepValidityBefore', { before: newBefore, after: newCurrent })
                        handleEvent('validityBefore', validityBefore => {
                            if (validityBefore) {
                                followingSteps = this.steps.slice(i+1);
                                dispatch('deleteStep', { taskname: this.taskname, step: step, followingSteps: followingSteps });
                                this.$emit('deletedStep', { taskname: this.taskname, id: step.id });
                            } else {
                                this.$emit('warning', 'Dieser Schritt kann nicht gelöscht werden, da vom vorherigen der nachfolgende nicht erreicht werden kann.');
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
        },
        getStepType(type) {
            switch(type) {
                case 'link':
                    return 'Link';
                case 'clickElement':
                    return 'Klickelement';
                case 'input':
                    return 'Eingabe';
            }
        }
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .task-list-entry__annotation-header {
        margin-top: 20px;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
	}

    .task-list-entry__annotation-header-title {
		display: flex;
	}

    .task-list-entry__annotation-header-title-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

    .task-list-entry__number-circle {
        border-radius: 50%;
        width: 36px;
        height: 36px;
        padding: 8px;
        margin-right: 10px;
        background: #fff;
        text-align: center;
    }

    .task-list-entry__step {
        width: 70%;
		margin-left: 15%;
    }

    .task-list-entry__step-content {
        display: flex;
		justify-content: space-between;
        vertical-align: middle;
    }

    .task-list-entry__step-settings {
		display: flex;
        vertical-align: middle;
	}

    .task-list-entry__disabled-button {
        pointer-events: none;
        opacity: 0.4;
    }
</style>