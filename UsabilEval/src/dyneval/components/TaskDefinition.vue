<template>
    <div>
        <div class="task-definition__input">
            <input id="taskname" class="input" type="text" placeholder="Aufgabe">
            <button class="button button--primary" @click="addTask">Erstellen</button>
        </div>
        <p v-if="tasks.length === 0" class="type--pos-medium-normal">
            Wähle einen Namen für die Aufgabe und erstelle sie.
        </p>
        <div v-else-if="tasks.length > 0" class="type--pos-medium-normal">
            <p>Füge die einzelnen Bearbeitungsschritte der Aufgabe hinzu.</p>
            <button class="button button--primary" @click="addTaskStep">Hinzufügen</button>
        </div>
        <div id="tasks" class="type--pos-medium-normal">
            <task-list-entry v-for="(task, index) in tasks" :key="index" :taskname="task.taskname" :color="task.color" :steps="task.steps"
                @deletedTask="deletedTask($event)"
                @deletedStep="deletedStep($event)"
                @moveUp="moveStepUp($event)"
                @moveDown="moveStepDown($event)" />
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

import '../../figma-ui/js/selectMenu';
import '../../figma-ui/js/iconInput';
import '../../figma-ui/js/disclosure';

import TaskListEntry from './TaskListEntry.vue'

export default {
    name: 'TaskDefinition',
    data() {
        return {
            tasks: [],          // [ { taskname: ..., color: ..., steps: [] } ]
        }
    },
    components: {
        TaskListEntry,
    },
    mounted() {
		window.selectMenu.init();
    	window.iconInput.init();
    	window.disclosure.init();

        this.getTaskStorage();

		handleEvent('taskStepAdded', step => {
			this.addTaskStepToScreen(step);
		});
    },
    methods: {
        addTask() {
			let taskname = document.getElementById('taskname').value;
			// wenn taskname leer Fehler zurückgeben

            this.tasks.push({ taskname: taskname, color: this.getRandomColor(), steps: [] });
            this.setTaskStorage();
            this.$emit('updated', this.tasks);
            // save in task list file
		},
        addTaskStep() {
            let taskname = document.getElementById('taskname').value;
            var numSteps = 0;
            var color = null;
            var steps = null;
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === taskname) {
                    numSteps = this.tasks[i].steps.length;
                    color = this.tasks[i].color;
                    steps = this.tasks[i].steps;
                }
            }
            if (numSteps > 0) {
                dispatch('checkStepValidityBefore', { before: steps[steps.length-1], current: null });
                handleEvent('validityBefore', validityBefore => {
                    if (validityBefore) {
                        dispatch('addTaskStep', { taskname: taskname, numSteps: numSteps, color: color });
                        return;
                    } else {
                        alert('Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum voherigen Schritt bzw. zu der vorherigen Seite besteht.');
                    }
                });
            } else {
                dispatch('addTaskStep', { taskname: taskname, numSteps: numSteps, color: color });
                return;
            }
        },
        addTaskStepToScreen(step) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === step.taskname) {
                    this.tasks[i].steps.push(step.id);
                }
            }
            this.setTaskStorage();
        },
        deletedTask(taskname) {
            this.tasks = this.tasks.filter(function(item) {
                return item.taskname !== taskname;
            });
            this.$emit('updated', this.tasks);
            this.setTaskStorage();
        },
        deletedStep(args) {
            for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].taskname === args.taskname) {
					for (let j = 0; j < this.tasks[i].steps.length; j++) {
						if (this.tasks[i].steps[j] === args.id) {
							this.tasks[i].steps.splice(j, 1);
						}
					}
				}
			}
            this.setTaskStorage();
        },
        moveStepUp(args) {
            for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].taskname === args.taskname) {
					for (let j = 0; j < this.tasks[i].steps.length; j++) {
                        if (this.tasks[i].steps[j] === args.id) {
                            var before = this.tasks[i].steps[j-2];
                            var current = this.tasks[i].steps[j];
                            var after = this.tasks[i].steps[j-1];
                            // check if current is new first
                            if (j !== 1) {
                                // check if new before connects to current
                                dispatch('checkStepValidityBefore', { before: before, current: current });
                                handleEvent('validityBefore', validityBefore => {
                                    if (validityBefore) {
                                        // check if current connects to new after
                                        dispatch('checkStepValidityAfter', { current: current, after: after });
                                        handleEvent('validityAfter', validityAfter => {
                                            if (validityAfter) {
                                                var temp = this.tasks[i].steps.splice(j, 1)[0];
                                                this.tasks[i].steps.splice(j-1, 0, temp);
                                                dispatch('updateStepNumbers', this.tasks);
                                                this.setTaskStorage();
                                            } else {
                                                alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.');
                                            }
                                        });
                                    } else {
                                        alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.');
                                    }
                                });
                            } else {
                                dispatch('checkStepValidityAfter', { current: current, after: after });
                                handleEvent('validityAfter', validityAfter => {
                                    if (validityAfter) {
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j-1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                    } else {
                                        alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.');
                                    }
                                });
                            }
                        }
                    }
                }
            }
        },
        moveStepDown(args) {
            for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i].taskname === args.taskname) {
					for (let j = 0; j < this.tasks[i].steps.length; j++) {
                        if (this.tasks[i].steps[j] === args.id) {
                            var before = this.tasks[i].steps[j+1];
                            var current = this.tasks[i].steps[j];
                            var after = this.tasks[i].steps[j+2];
                            // check if current is new last
                            if (j !== (this.tasks[i].steps.length - 2)) {
                                // check if new before connects to current
                                dispatch('checkStepValidityBefore', { before: before, current: current });
                                handleEvent('validityBefore', validityBefore => {
                                    if (validityBefore) {
                                        // check if current connects to new after
                                        dispatch('checkStepValidityAfter', { current: current, after: after });
                                        handleEvent('validityAfter', validityAfter => {
                                            if (validityAfter) {
                                                var temp = this.tasks[i].steps.splice(j, 1)[0];
                                                this.tasks[i].steps.splice(j+1, 0, temp);
                                                dispatch('updateStepNumbers', this.tasks);
                                                this.setTaskStorage();
                                            } else {
                                                alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.');
                                            }
                                        });
                                    } else {
                                        alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.');
                                    }
                                });
                            } else {
                                // check if new before connects to current
                                dispatch('checkStepValidityBefore', { before: before, current: current });
                                handleEvent('validityBefore', validityBefore => {
                                    if (validityBefore) {
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j+1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                    } else {
                                        alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.');
                                    }
                                });
                            }
                            break;
                        }
                    }
                }
            }
        },
        getTaskStorage() {
            dispatch('getTaskStorage');
            handleEvent('currentTaskStorage', tasks => {
                if (tasks !== undefined) {
                    this.tasks = tasks;
                    this.$emit('updated', this.tasks);
                }
            });
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
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

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

	hr.style-one {
		border: 0;
		height: 1px;
		background: #666;
		background-image: -webkit-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -moz-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -ms-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -o-linear-gradient(left, #ccc, #666, #666, #ccc);
	}
</style>
