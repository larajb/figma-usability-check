<template>
    <div>
        <div :id="'annotation-' + taskname">
            <div class="task-definition__annotation-header">
                <div :id="'annotation-title-' + taskname" class="task-definition__annotation-header-title">
                    <div class="task-definition__annotation-header-title-colorsquare" :style="myStyle"></div>
                    <p class="type--pos-medium-normal">{{ taskname }}</p>
                </div>
                <div :id="'delete-' + taskname" class="icon icon--trash" @click="deleteTask">
                </div>
            </div>
            <div id="temp">
                <div v-for="(step, index) in steps" :key="index" :id="'step-' + step" class="task-step">
                    <div style="display: flex;">
                        <div class="numberCircle" :style="{ border: `3px solid ${color}`, color: color }">{{ index + 1 }}</div>
                        <p class="type--pos-medium-normal">{{ step.type }} ({{ step.id }})</p>
                    </div>
                     <div class="task-step-settings">
                        <div :id="'delete-' + step" class="icon icon--trash" @click="deleteStep(step)"></div>
                        <div class="icon icon--chevron-up" :class="{ 'disabled-button': index === 0 }" style="margin-top: 5px" @click="moveUp(taskname, step.id)"></div>
                        <div class="icon icon--chevron-down" :class="{ 'disabled-button': index === steps.length-1 }" style="margin-top: 5px" @click="moveDown(taskname, step.id)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';

export default {
    name: 'TaskListEntry',
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
    data() {
        return {
            myStyle:{
                backgroundColor: this.color,
            }
        }
    },
    methods: {
        deleteTask() {
            dispatch('deleteSteps', { taskname: this.taskname, steps: this.steps });
            this.$emit('deletedTask', this.taskname);
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
        moveUp(taskname, id) {
            this.$emit('moveUp', { taskname: taskname, id: id });
        },
        moveDown(taskname, id) {
            this.$emit('moveDown', { taskname: taskname, id: id });
        },
    },
}
</script>

<style lang='scss'>
    @import "../../figma-ui/figma-plugin-ds";

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
        width: 80%;
		margin-left: 15%;
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