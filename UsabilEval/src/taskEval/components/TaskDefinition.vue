<template>
    <div>
        <p class="type--pos-medium-normal">Choose the name and platform for a new task and create it.</p>
        <div class="task-definition__input">
            <div style="display: flex; width: 100%">
                <div class="tooltip--bottom" style="width: 100%">
                    <input id="taskname" class="input" type="text" placeholder="Task" v-model="tasknameInput">
                    <span class="type--pos-small-normal tooltiptext--bottom">Enter task name</span>
                </div>
            </div>
            <button class="button button--secondary" @click="addTask">Create</button>
        </div>
        <div class="type--pos-medium-normal">
            <p>Select a UI element and interaction type and add a new editing step to the task specified above.</p>
            <div class="task-definition__input">
                <div class="tooltip--bottom" style="width: 100%">
                    <Select id="type-select" :items="[
                            { label: 'Input', key: 'input' },
                            { label: 'Click element', key: 'clickElement' },
                            { label: 'Link', key: 'link' }
                        ]" v-model="typeSelection" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Selecting the type of interaction element</span>
                </div>
                <button class="button button--secondary" @click="addTaskStep(null)">Add</button>
            </div>
            <div class="tooltip--bottom" style="width: 100%">
                <input v-show="typeSelection === 'input'" id="input-example" class="input" type="text" placeholder="Beispiel Eingabe" v-model="exampleInput">
                <span class="type--pos-small-normal tooltiptext--bottom">Input example of an interaction element of the 'Input' type</span>
            </div>
            <div v-show="showError" class="task-definition__error-note">
                <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
                <IconButton @click="closeError" :icon="'close'" />
            </div>
        </div>
        <div id="tasks" class="task-definition__scrollable-list type--pos-medium-normal">
            <task-list-entry v-for="(task, index) in tasks" :key="index" :taskname="task.taskname" :color="task.color" :steps="task.steps"
                @addStepIndex="addTaskStepAtIndex($event)"
                @deletedTask="deletedTask($event)"
                @deletedStep="deletedStep($event)"
                @moveUp="moveStepUp($event)"
                @moveDown="moveStepDown($event)"
                @warning="showWarning($event)" />
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';
import { mapState } from 'vuex';

import TaskListEntry from './TaskListEntry.vue';
import { Select, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'TaskDefinition',
    components: {
        TaskListEntry,
        Select,
        IconButton,
    },
    data() {
        return {
            tasks: [],
            tasknameInput: '',
            exampleInput: '',
            typeSelection: '',
            showError: false,
            errorMessage: '',
            alreadySet: false,
            index: null,
        }
    },
    computed: {
        ...mapState(['taskToEdit']),
    },
    watch: {
        typeSelection() {
            if (this.typeSelection === 'input') {
                dispatch('checkInputExample');
            }
        },
        taskToEdit() {
            this.tasknameInput = this.taskToEdit;
        },
    },
    mounted() {
        this.getTaskStorage();

        handleEvent('currentTaskStorage', tasks => {
            if (tasks !== undefined) {
                this.tasks = tasks;
                this.$store.commit('tasks', this.tasks);
            }
        });
        // this.setTaskStorage();

		handleEvent('taskStepAdded', step => {
            this.addTaskStepToScreen(step);
		});

        handleEvent('selectionChecked', selected => {
            if (selected === 'element') {
                if (this.typeSelection === '') {
                    this.showError = true;
                    this.errorMessage = 'Please select an interaction type.'
                } else {
                    switch(this.typeSelection) {
                        case 'clickElement':
                            dispatch('checkButtonValidity');
                            break;
                        case 'input':
                            if (this.exampleInput !== '') {
                                dispatch('checkInputValidity', this.exampleInput);
                            } else {
                                this.showError = true;
                                this.errorMessage = 'Please enter an example of the input.';
                            }
                            break;
                        case 'link':
                            dispatch('checkLinkValidity');
                            break;
                    }
                }
            } else if (selected === 'annotation') {
                this.showError = true;
                this.errorMessage = 'You seem to have selected the grouping of element and annotation. Please select only the interaction element.'
            } else if (selected === null) {
                this.showError = true;
                this.errorMessage = 'Please select an interaction element.'
            }
        });

        handleEvent('buttonValidity', validity => {
            if (!validity) {
                this.showError = true;
                this.errorMessage = 'A click element should ideally be at least 44x44 px.'
            }
            this.addValidTaskStep();
        });
        handleEvent('inputExampleCheck', result => {
            if (result !== null) {
                this.alreadySet = true;
                this.exampleInput = result;
            }
        });
        handleEvent('inputValidity', validity => {
            if (!validity) {
                this.showError = true;
                this.errorMessage = 'The size of the input field should be adjusted because the given example content does not fit into it.'
            }
            this.addValidTaskStep();
        });
        handleEvent('linkValidity', validity => {
            if (!validity) {
                this.showError = true;
                this.errorMessage = 'A text link should not extend over several lines. A graphic link should ideally be at least 44x44 px.'
            }
            this.addValidTaskStep();
        });
    },
    methods: {
        addTask() {
			if (this.tasknameInput !== '') {
                const index = this.tasks.findIndex((task) => task.taskname === this.tasknameInput);
                if (index < 0) {
                    this.tasks.push({ taskname: this.tasknameInput, color: this.getRandomColor(), steps: [] });
                } else {
                    this.showError = true;
                    this.errorMessage = 'A task with this name already exists. Add further processing steps to this task or choose a different name.'
                }
                this.setTaskStorage();
                this.$store.commit('tasks', this.tasks);
            } else {
                this.showError = true;
                this.errorMessage = 'Please choose a name for the task.';
            }
		},
        addTaskStep(index) {
            this.index = index;
            if (this.tasknameInput !== '') {
                dispatch('checkSelection');
            } else {
                this.showError = true;
                this.errorMessage = 'Please select a task to add a step.';
            }
        },
        addTaskStepAtIndex(index) {
            if (index !== null) {
                this.addTaskStep(index);
            }
        },
        addValidTaskStep() {
            const taskIndex = this.tasks.findIndex((task) => task.taskname === this.tasknameInput);
            var numSteps = this.tasks[taskIndex].steps.length;
            var color = this.tasks[taskIndex].color;
            var steps = this.tasks[taskIndex].steps;
            if (this.index === null) {
                if (numSteps > 0) {
                    dispatch('checkStepValidityBefore', { before: steps[steps.length-1], after: null });
                    handleEvent('validityBefore', validityBefore => {
                        if (validityBefore) {
                            dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, color: color, input: this.exampleInput });
                            return;
                        } else {
                            this.showError = true;
                            this.errorMessage = 'The step could not be added because there is no connection to the previous step or page.';
                        }
                    });
                } else {
                    dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, color: color, input: this.exampleInput });
                    return;
                }
            } else {
                if (this.index === 0) {
                    dispatch('checkStepValidityAfter', { before: null, after: steps[0] });
                    handleEvent('validityAfter', validityAfter => {
                        if (validityAfter) {
                            dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, index: this.index, color: color, input: this.exampleInput });
                            return;
                        } else {
                            this.showError = true;
                            this.errorMessage = 'The step could not be added because there is no connection to the following step or page.';
                        }
                    });
                } else if (this.index > 0) {
                    dispatch('checkStepValidityBefore', { before: steps[this.index-1], after: null });
                    handleEvent('validityBefore', validityBefore => {
                        if (validityBefore) {
                            dispatch('checkStepValidityAfter', { before: null, after: steps[this.index] });
                            handleEvent('validityAfter', validityAfter => {
                                if (validityAfter) {
                                    dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, index: this.index, color: color, input: this.exampleInput });
                                    return;
                                } else {
                                    this.showError = true;
                                    this.errorMessage = 'The step could not be added because there is no connection to the following step or page.';
                                }
                            });
                        } else {
                            this.showError = true;
                            this.errorMessage = 'The step could not be added because there is no connection to the previous step or page.';
                        }
                    });
                }
            }
        },
        addTaskStepToScreen(step) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === step.taskname) {
                    if (this.index !== null) {
                        this.tasks[i].steps.splice(this.index, 0, { id: step.id, name: step.name, type: this.typeSelection, input: this.exampleInput });
                    } else {
                        this.tasks[i].steps.push({ id: step.id, name: step.name, type: this.typeSelection, input: this.exampleInput });
                    }
                }
            }
            if (this.index !== null) {
                dispatch('updateStepNumbers', this.tasks);
            }
            this.setTaskStorage();
            this.$store.commit('tasks', this.tasks);
            this.exampleInput = '';
            this.typeSelection = '';
            this.index = null;
        },
        deletedTask(taskname) {
            this.tasks = this.tasks.filter(function(item) {
                return item.taskname !== taskname;
            });
            this.setTaskStorage();
            this.$store.commit('tasks', this.tasks);
        },
        deletedStep(args) {
            const taskIndex = this.tasks.findIndex((task) => task.taskname === args.taskname);
            const stepIndex = this.tasks[taskIndex].steps.findIndex((step) => step.id === args.id);
            this.tasks[taskIndex].steps.splice(stepIndex, 1);

            this.setTaskStorage();
            this.$store.commit('tasks', this.tasks);
        },
        moveStepUp(args) {
            for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].taskname === args.taskname) {
					for (let j = 0; j < this.tasks[i].steps.length; j++) {
                        if (this.tasks[i].steps[j].id === args.id) {
                            var before = this.tasks[i].steps[j-2] ? this.tasks[i].steps[j-2] : null;
                            var current = this.tasks[i].steps[j];
                            var after = this.tasks[i].steps[j-1] ? this.tasks[i].steps[j-1] : null;
                            dispatch('checkStepValidityAfter', { before: current, after: after });
                            handleEvent('validityAfter', validityAfter => {
                                if (validityAfter) {
                                    if (j !== 1) {
                                        dispatch('checkStepValidityBefore', { before: before, after: current });
                                        handleEvent('validityBefore', validityBefore => {
                                            if (validityBefore) {
                                                var temp = this.tasks[i].steps.splice(j, 1)[0];
                                                this.tasks[i].steps.splice(j-1, 0, temp);
                                                dispatch('updateStepNumbers', this.tasks);
                                                this.setTaskStorage();
                                                this.$store.commit('tasks', this.tasks);
                                            } else {
                                                this.showError = true;
                                                this.errorMessage = 'The machining steps could not be swapped. There is no connection between the moved and the previous (after moving) step.';
                                            }
                                        });
                                    } else {
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j-1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                        this.$store.commit('tasks', this.tasks);
                                    }
                                } else {
                                    this.showError = true;
                                    this.errorMessage = 'The machining steps could not be swapped. There is no connection between the moved and the following (after moving) step.';
                                }
                            });
                        }
                    }
                }
            }
        },
        moveStepDown(args) {
            for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].taskname === args.taskname) {
					for (let j = 0; j < this.tasks[i].steps.length; j++) {
                        if (this.tasks[i].steps[j].id === args.id) {
                            var before = this.tasks[i].steps[j+1] ? this.tasks[i].steps[j+1] : null;
                            var current = this.tasks[i].steps[j];
                            var after = this.tasks[i].steps[j+2] ? this.tasks[i].steps[j+2] : null;
                            
                            dispatch('checkStepValidityBefore', { before: before, after: current });
                            handleEvent('validityBefore', validityBefore => {
                                if (validityBefore) {
                                    if (j !== (this.tasks[i].steps.length - 2)) {
                                        dispatch('checkStepValidityAfter', { before: current, after: after });
                                        handleEvent('validityAfter', validityAfter => {
                                            if (validityAfter) {
                                                var temp = this.tasks[i].steps.splice(j, 1)[0];
                                                this.tasks[i].steps.splice(j+1, 0, temp);
                                                dispatch('updateStepNumbers', this.tasks);
                                                this.setTaskStorage();
                                                this.$store.commit('tasks', this.tasks);
                                            } else {
                                                this.showError = true;
                                                this.errorMessage = 'The machining steps could not be swapped. There is no connection between the moved and the previous (after moving) step.';
                                            }
                                        });
                                    } else {
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j+1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                        this.$store.commit('tasks', this.tasks);
                                    }
                                } else {
                                    this.showError = true;
                                    this.errorMessage = 'The machining steps could not be swapped. There is no connection between the moved and the following (after moving) step.';
                                }
                            });
                            break;
                        }
                    }
                }
            }
        },
        getTaskStorage() {
            dispatch('getTaskStorage');
        },
        setTaskStorage() {
            dispatch('setTaskStorage', this.tasks);
        },
        getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return 'rgb(' + r + ', ' + g + ', ' + b +')';
        },
        closeError() {
            this.showError = false;
            this.errorMessage = '';
        },
        showWarning(warning) {
            this.showError = true;
            this.errorMessage = warning;
        },
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
    @import "../../../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css";

    html, body {
        overflow-y: hidden;
    }

    .task-definition__input {
		display: flex;
		justify-content: space-between;
	}

    .task-definition__annotation-header {
		width: 80%;
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

    .task-definition__scrollable-list {
        max-width: 100%;
        overflow-x: hidden;
        max-height: 55%;
        overflow-y: scroll;
    }

    .task-definition__error-note {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
    }
</style>
