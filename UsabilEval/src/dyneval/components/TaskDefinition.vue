<template>
    <div>
        <p class="type--pos-medium-normal">Wähle einen Namen und die Zielplattform für die Aufgabe und erstelle sie.</p>
        <div class="task-definition__input">
            <input id="taskname" class="input" type="text" placeholder="Aufgabe" v-model="tasknameInput">
            <Select id="platform-select" style="width: 100%" :items="[
                    { label: 'Desktop', key: 'desktop' },
                    { label: 'Mobil', key: 'mobile' },
                    { label: 'Desktop + Mobil', key: 'desktop+mobile' }
                ]" v-model="platformSelection" />
            <button class="button button--primary" @click="addTask">Erstellen</button>
        </div>
        <div class="type--pos-medium-normal">
            <p>Wähle ein UI-Element und einen Elementtyp und füge einen Bearbeitungsschritt hinzu.</p>
            <div class="task-definition__input">
                <Select id="type-select" style="width: 100%" :items="[
                        { label: 'Button', key: 'button' },
                        { label: 'Eingabe', key: 'input' },
                        { label: 'Link', key: 'link' }
                    ]" v-model="typeSelection" />
                <button class="button button--primary" @click="addTaskStep">Hinzufügen</button>
            </div>
            <input v-show="typeSelection === 'input'" id="input-example" class="input" type="text" placeholder="Beispiel Eingabe" v-model="exampleInput">
            <div v-show="showError" class="element-error-note">
                <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
                <div class="icon-button" @click="closeError">
                    <div class="icon icon--close"></div>
                </div>
            </div>
        </div>
        <div id="tasks" class="scrollable-task-list type--pos-medium-normal">
            <task-list-entry v-for="(task, index) in tasks" :key="index" :taskname="task.taskname" :color="task.color" :steps="task.steps"
                @addStepIndex="addTaskStepAtIndex($event)"
                @deletedTask="deletedTask($event)"
                @deletedStep="deletedStep($event)"
                @moveUp="moveStepUp($event)"
                @moveDown="moveStepDown($event)"
                @edit="setEditMode($event)" />
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

import TaskListEntry from './TaskListEntry.vue';
import { Select } from 'figma-plugin-ds-vue';

export default {
    name: 'TaskDefinition',
    components: {
        TaskListEntry,
        Select,
    },
    data() {
        return {
            tasks: [],
            tasknameInput: '',
            exampleInput: '',
            platformSelection: '',
            typeSelection: '',
            showError: false,
            errorMessage: '',
            alreadySet: false,
            editMode: false,
            index: null,
        }
    },
    watch: {
        typeSelection() {
            if (this.typeSelection === 'input') {
                // check if selection already has an example
                dispatch('checkInputExample', this.tasks[index].platform);
            }
        },
    },
    mounted() {
        this.getTaskStorage();

        handleEvent('currentTaskStorage', tasks => {
            if (tasks !== undefined) {
                this.tasks = tasks;
                // this.$store.commit('tasks', this.tasks);
                this.$store.commit('tasks', this.tasks);
            }
        });

		handleEvent('taskStepAdded', step => {
			this.addTaskStepToScreen(step);
		});
        handleEvent('buttonValidity', validity => {
            if (!validity) {
                this.showError = true;
                this.errorMessage = 'Die Größe des Buttons sollte angepasst werden. Buttons sollten mindestens 44px x 44px groß sein.'
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
                this.errorMessage = 'Die Größe des Eingabefeldes sollte angepasst werden, da der angegebenen Beispielinhalt nicht hinein passt.'
            }
            this.addValidTaskStep();
        });
        handleEvent('linkValidity', validity => {
            if (!validity) {
                this.showError = true;
                // add note that link is ...
            }
            this.addValidTaskStep();
        });
    },
    methods: {
        addTask() {
			// wenn taskname leer Fehler zurückgeben
            var platform = this.platformSelection;

            const index = this.tasks.findIndex((task) => task.taskname === this.tasknameInput);
            if (index < 0) {
                this.tasks.push({ taskname: this.tasknameInput, platform: platform, color: this.getRandomColor(), steps: [] });
            } else {
                this.showError = true;
                this.errorMessage = 'Es existiert bereits eine Aufgabe mit diesem Namen. Füge dieser Aufgabe weitere Bearbeitungsschritte hinzu oder wähle einen anderen Namen.'
            }
            this.setTaskStorage();
            // this.$store.commit('tasks', this.tasks);
            this.$store.commit('tasks', this.tasks);
		},
        addTaskStep() {
            const index = this.tasks.findIndex((task) => task.taskname === this.tasknameInput);
            switch(this.typeSelection) {
                case 'button':
                    dispatch('checkButtonValidity', this.tasks[index].platform);
                    break;
                case 'input':
                    if (this.exampleInput !== '') {
                        dispatch('checkInputValidity', { input: this.exampleInput, platform: this.tasks[index].platform });
                    } else {
                        this.showError = true;
                        this.errorMessage = 'Es wurde kein Beispiel für die Eingabe angegeben. Bitte trage ein Beispiel ein.';
                    }
                    break;
                case 'link':
                    dispatch('checkLinkValidity', this.tasks[index].platform);
                    break;
            }
        },
        addTaskStepAtIndex(index) {
            if (index !== null) {
                this.index = index;
            }
            this.addTaskStep();
        },
        addValidTaskStep() {
            const taskIndex = this.tasks.findIndex((task) => task.taskname === this.tasknameInput);
            var numSteps = this.tasks[taskIndex].steps.length;
            var color = this.tasks[taskIndex].color;
            var steps = this.tasks[taskIndex].steps;
            if (this.index === null) {
                if (numSteps > 0) {
                    dispatch('checkStepValidityBefore', { before: steps[steps.length-1].id, after: null });
                    handleEvent('validityBefore', validityBefore => {
                        if (validityBefore) {
                            dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, color: color, input: this.exampleInput });
                            return;
                        } else {
                            this.showError = true;
                            this.errorMessage = 'Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum voherigen Schritt bzw. zu der vorherigen Seite besteht.';
                        }
                    });
                } else {
                    dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, color: color, input: this.exampleInput });
                    return;
                }
            } else {
                if (this.index === 0) {
                    dispatch('checkStepValidityAfter', { before: null, after: steps[0].id });
                    handleEvent('validityAfter', validityAfter => {
                        if (validityAfter) {
                            dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, index: this.index, color: color, input: this.exampleInput });
                            return;
                        } else {
                            this.showError = true;
                            this.errorMessage = 'Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum nachfolgenden Schritt bzw. zu der nachfolgenden Seite besteht.';
                        }
                    });
                } else if (this.index > 0) {
                    dispatch('checkStepValidityBefore', { before: steps[this.index-1].id, after: null });
                    handleEvent('validityBefore', validityBefore => {
                        if (validityBefore) {
                            dispatch('checkStepValidityAfter', { before: null, after: steps[this.index].id });
                            handleEvent('validityAfter', validityAfter => {
                                if (validityAfter) {
                                    dispatch('addTaskStep', { taskname: this.tasknameInput, type: this.typeSelection, numSteps: numSteps, index: this.index, color: color, input: this.exampleInput });
                                    return;
                                } else {
                                    this.showError = true;
                                    this.errorMessage = 'Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum nachfolgenden Schritt bzw. zu der nachfolgenden Seite besteht.';
                                }
                            });
                        } else {
                            this.showError = true;
                            this.errorMessage = 'Der Schritt konnte nicht hinzugefügt werden, da keine Verbindung zum vorherigen Schritt bzw. zu der vorherigen Seite besteht.';
                        }
                    });
                }
            }
        },
        addTaskStepToScreen(step) {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].taskname === step.taskname) {
                    if (this.index !== null) {
                        this.tasks[i].steps.splice(this.index, 0, { id: step.id, type: this.typeSelection, input: this.exampleInput });
                    } else {
                        this.tasks[i].steps.push({ id: step.id, type: this.typeSelection, input: this.exampleInput });
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
                                                this.$store.commit('tasks', this.tasks);
                                            } else {
                                                this.showError = true;
                                                this.errorMessage = 'Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.';
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
                                    this.errorMessage = 'Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.';
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
                                                this.$store.commit('tasks', this.tasks);
                                            } else {
                                                this.showError = true;
                                                this.errorMessage = 'Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem vorangehenden (nach Verschieben) Schritt.';
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
                                    this.errorMessage = 'Die Bearbeitungsschritte konnten nicht getauscht werden. Es liegt keine Verbindung zwischen dem verschobenen und dem darauffolgenden (nach Verschieben) Schritt.';
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
        setEditMode(args) {
            this.editMode = args.value;
            if (args.value === true) {
                this.tasknameInput = args.taskname;
            } else {
                this.tasknameInput = '';
            }
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

    .scrollable-task-list {
        max-height: 50%;
        overflow-y: scroll;
    }

    .element-error-note {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
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
