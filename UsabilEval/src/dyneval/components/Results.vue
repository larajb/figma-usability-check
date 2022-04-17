<template>
    <div v-if="$store.getters.currentEvaluation !== undefined" class="scrollable-result-list">
        <div style="display: flex">
            <div class="result-colorsquare" :style="{ backgroundColor: $store.getters.currentEvaluation.color }"></div>
            <p class="type--pos-medium-normal">{{ $store.getters.currentEvaluation.taskname }}</p>
        </div>
        <div id="duration" class="type--pos-medium-normal goms-result">
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--timer"></div>
                <p>Dauer der Zielerreichung</p>
            </div>
            <div style="margin-left: 40px">
                <table class="type--pos-medium-normal table">
                    <tr>
                        <td>{{ $store.getters.currentEvaluation.taskname }}:</td>
                        <td>{{ $store.getters.currentEvaluation.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
                    </tr>
                    <tr v-if="$store.getters.currentEvaluation.evaluationRuns[0].comparison !== null">
                        <td>{{ $store.getters.currentEvaluation.evaluationRuns[0].comparison.taskname }}:</td>
                        <td>{{ $store.getters.currentEvaluation.evaluationRuns[0].comparison.gomsTime.toFixed(2) }} s</td>
                    </tr>
                </table>
                <div v-if="$store.getters.currentEvaluation.evaluationRuns.length > 1" style="display: flex">
                    <div class="icon-button" @click="showHistory = !showHistory">
                        <div class="icon" :class="[ showHistory ? 'icon--chevron-down' : 'icon--chevron-right' ]"></div>
                    </div>
                    <p>Historie</p>
                </div>
                <div v-show="showHistory" style="margin-left: 20px">
                    <table class="type--pos-medium-normal table">
                        <tr v-for="(run, index) in $store.getters.currentEvaluation.evaluationRuns" :key="index">
                            <td>{{ formatDate(run.timestamp) }}:</td>
                            <td>{{ run.goms.gomsTime.toFixed(2) }} s</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="smells" class="type--pos-medium-normal smells-result">
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--warning"></div>
                <p>Erweitert</p>
            </div>
            <div style="margin-left: 40px" v-for="(smell, index) in $store.getters.currentEvaluation.evaluationRuns[0].usabilitySmells" :key="index">
                <div style="display: flex;">
                    <div class="icon-button" @click="showSmell = !showSmell">
                        <div class="icon" :class="[ showSmell ? 'icon--chevron-down' : 'icon--chevron-right' ]"></div>
                    </div>
                    <p>{{ smell.title }}</p>
                </div>
                <div v-show="showSmell" style="margin-left: 10px">
                    <p>{{ getDescription(smell.title) }}</p>
                    <p>Hinweis auf das Usability-Problem wurde in dem/den Schritt/en {{ smell.steps }} der Aufgabe {{ $store.getters.currentEvaluation.taskname }} gefunden.</p>
                    <p>{{ getRefactoring(smell.title) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { usabilitySmellsArray } from '../usabilitySmells/UsabilitySmells';

export default {
    name: 'Results',
    data() {
        return {
            evaluation: null,
            showHistory: false,
            showMore: false,
            showSmell: false,
            usabilitySmells: usabilitySmellsArray,
        }
    },
    methods: {
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var minutes = date.getMinutes();
            if (minutes < 10) { minutes = '0' + minutes; }
            var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes;
            return formattedDate;
        },
        getDescription(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].description;
        },
        getRefactoring(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].refactoring;
        },
    },
}
</script>

<style lang='scss'>
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .result-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

    .goms-result {
        width: 80%;
		margin-left: 15%;
        vertical-align: middle;
    }
    .smells-result {
        width: 80%;
		margin-left: 15%;
        vertical-align: middle;
    }

    .scrollable-result-list {
        max-height: 80%;
        overflow-y: scroll;
    }

    .icon--chevron-right {
        background-image: url('../../img/chevron-right.svg');
    }

    .icon--arrow-right-thin {
        background-image: url('../../img/arrow-right-thin.svg');
    }

    .icon--arrow-bottom-right-thin {
        background-image: url('../../img/arrow-bottom-right-thin.svg');
    }

    .icon--arrow-top-right-thin {
        background-image: url('../../img/arrow-top-right-thin.svg');
    }

    .icon--information-outline {
        background-image: url('../../img/information-outline.svg');
    }

    .table {
		border-spacing: 10px;
	}
</style>
