<template>
    <div>
        <p class="type--pos-medium-normal">Wähle einen Namen und die Zielplattform für die Aufgabe und erstelle sie.</p>
        <div class="task-definition__input">
            <input id="taskname" class="input" type="text" placeholder="Aufgabe">
            <Select id="platform-select" style="width: 100%" :items="[
                    { label: 'Desktop', key: 'desktop' },
                    { label: 'Mobil', key: 'mobile' },
                    { label: 'Desktop + Mobil', key: 'desktop+mobile' }
                ]" v-model="platform" />
            <button class="button button--primary" @click="addTask">Erstellen</button>
        </div>
        <div class="type--pos-medium-normal">
            <p>Wähle ein UI-Element und einen Elementtyp und füge einen Bearbeitungsschritt hinzu.</p>
            <div class="task-definition__input">
                <Select id="type-select" style="width: 100%" :items="[
                        { label: 'Button', key: 'button' },
                        { label: 'Eingabe', key: 'input' },
                        { label: 'Link', key: 'link' }
                    ]" v-model="type" />
                <button class="button button--primary" @click="addTaskStep">Hinzufügen</button>
            </div>
            <input v-show="type === 'input'" id="input-example" class="input" type="text" placeholder="Beispiel Eingabe">
        </div>
        <div id="tasks" class="scrollable-task-list type--pos-medium-normal">
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
import { Select } from 'figma-plugin-ds-vue';

import TaskListEntry from './TaskListEntry.vue'

export default {
    name: 'TaskDefinition',
    data() {
        return {
            tasks: [],          // [ { taskname: ..., platform: ..., color: ..., steps: [ { id: ..., type: ... } ] } ]
            platform: '',
            type: '',
        }
    },
    components: {
        TaskListEntry,
        Select,
    },
    mounted() {
        this.getTaskStorage();

		handleEvent('taskStepAdded', step => {
			this.addTaskStepToScreen(step);
		});
        handleEvent('buttonValidity', validity => {
            if (validity) {
                this.addValidTaskStep();
            }
        });
        handleEvent('inputValidity', validity => {
            if (validity) {
                let input = document.getElementById('input-example').value;
                this.addValidTaskStep(input);
            }
        });
        handleEvent('linkValidity', validity => {
            if (validity) {
                this.addValidTaskStep();
            }
        });
    },
    methods: {
        addTask() {
			let taskname = document.getElementById('taskname').value;
			// wenn taskname leer Fehler zurückgeben

            var isUsed = false;
            this.tasks.forEach(task => {
                if (task.taskname === taskname) {
                    isUsed = true;
                }
            })
            if (!isUsed) {
                this.tasks.push({ taskname: taskname, platform: this.platform, color: this.getRandomColor(), steps: [] });
            } else {
                alert('Es existiert bereits eine Aufgabe mit diesem Namen. Füge dieser Aufgabe weitere Bearbeitungsschritte hinzu oder wähle einen anderen Namen.')
            }
            
            this.setTaskStorage();
            this.$emit('updated', this.tasks);
            // save in task list file
		},
        addTaskStep() {
            let input = document.getElementById('input-example').value;
            switch(this.type) {
                case 'button':
                    // check if button is valid
                    dispatch('checkButtonValidity');
                    break;
                case 'input':
                    // check if input is valid
                    if (input !== '') {
                        dispatch('checkInputValidity', input);
                    } else {
                        alert('Es wurde kein Beispiel für die Eingabe angegeben. Bitte trage ein Beispiel ein.');
                    }
                    break;
                case 'link':
                    // check if link is valid
                    dispatch('checkLinkValidity');
                    break;
            }
        },
        addValidTaskStep(input) {
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
                dispatch('checkStepValidityBefore', { before: steps[steps.length-1].id, after: null });
                handleEvent('validityBefore', validityBefore => {
                    if (validityBefore) {
                        dispatch('addTaskStep', { taskname: taskname, type: this.type, numSteps: numSteps, color: color, input: input });
                        return;
                    } else {
                        alert('Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum voherigen Schritt bzw. zu der vorherigen Seite besteht.');
                    }
                });
            } else {
                dispatch('addTaskStep', { taskname: taskname, type: this.type, numSteps: numSteps, color: color, input: input });
                return;
            }
        },
        addTaskStepToScreen(step) {
            let input = document.getElementById('input-example').value;
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === step.taskname) {
                    this.tasks[i].steps.push({ id: step.id, type: this.type, input: input });
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
						if (this.tasks[i].steps[j].id === args.id) {
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
                        if (this.tasks[i].steps[j].id === args.id) {
                            var before = this.tasks[i].steps[j-2] ? this.tasks[i].steps[j-2].id : null;
                            var current = this.tasks[i].steps[j].id;
                            var after = this.tasks[i].steps[j-1] ? this.tasks[i].steps[j-1].id : null;

                            // check if current connects to new after
                            dispatch('checkStepValidityAfter', { before: current, after: after });
                            handleEvent('validityAfter', validityAfter => {
                                if (validityAfter) {
                                    // check if current does not become new first
                                    if (j !== 1) {
                                        // check if new before connects to current
                                        dispatch('checkStepValidityBefore', { before: before, after: current });
                                        handleEvent('validityBefore', validityBefore => {
                                            if (validityBefore) {
                                                var temp = this.tasks[i].steps.splice(j, 1)[0];
                                                this.tasks[i].steps.splice(j-1, 0, temp);
                                                dispatch('updateStepNumbers', this.tasks);
                                                this.setTaskStorage();
                                            } else {
                                                alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.');
                                            }
                                        });
                                    } else {
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j-1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                    }
                                } else {
                                    alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.');
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
                            var before = this.tasks[i].steps[j+1] ? this.tasks[i].steps[j+1].id : null;
                            var current = this.tasks[i].steps[j].id;
                            var after = this.tasks[i].steps[j+2] ? this.tasks[i].steps[j+2].id : null;
                            
                            // check  if new before connects to current
                            dispatch('checkStepValidityBefore', { before: before, after: current });
                            handleEvent('validityBefore', validityBefore => {
                                if (validityBefore) {
                                    // check if current does not become new last
                                    if (j !== (this.tasks[i].steps.length - 2)) {
                                        dispatch('checkStepValidityAfter', { before: current, after: after });
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
                                        var temp = this.tasks[i].steps.splice(j, 1)[0];
                                        this.tasks[i].steps.splice(j+1, 0, temp);
                                        dispatch('updateStepNumbers', this.tasks);
                                        this.setTaskStorage();
                                    }
                                } else {
                                    alert('Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.');
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

    .scrollable-task-list {
        max-height: 50%;
        overflow-y: scroll;
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
