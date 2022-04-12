<template>
    <div v-if="evaluation" class="scrollable-result-list">
        <div style="display: flex">
            <div class="result-colorsquare" :style="{ backgroundColor: evaluation.color }"></div>
            <p class="type--pos-medium-normal">{{ evaluation.taskname }}</p>
        </div>
        <div id="duration" class="type--pos-medium-normal goms-result">
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--timer"></div>
                <p>Dauer der Zielerreichung</p>
            </div>
            <div style="margin-left: 40px">
                <table class="type--pos-medium-normal table">
                    <tr>
                        <td>{{ evaluation.taskname }}:</td>
                        <td>{{ evaluation.evaluationRuns[0].goms.gomsTime.toFixed(2) }} s</td>
                    </tr>
                    <tr v-if="evaluation.evaluationRuns[0].comparison !== null">
                        <td>{{ evaluation.evaluationRuns[0].comparison.taskname }}:</td>
                        <td>{{ evaluation.evaluationRuns[0].comparison.gomsTime.toFixed(2) }} s</td>
                    </tr>
                </table>
                <div v-if="evaluation.evaluationRuns.length > 1" style="display: flex">
                    <div class="icon-button" @click="showHistory = !showHistory">
                        <div class="icon" :class="[ showHistory ? 'icon--chevron-down' : 'icon--chevron-right' ]"></div>
                    </div>
                    <p>Historie</p>
                </div>
                <div v-show="showHistory" style="margin-left: 20px">
                    <table class="type--pos-medium-normal table">
                        <tr v-for="(run, index) in evaluation.evaluationRuns" :key="index">
                            <td>{{ formatDate(run.timestamp) }}:</td>
                            <td>{{ run.goms.gomsTime.toFixed(2) }} s</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div id="smells" class="type--pos-medium-normal goms-result">
            <div style="display: flex">
                <div style="margin-right: 20px" class="icon icon--warning"></div>
                <p>Erweitert</p>
            </div>
            <!-- usability smells -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Results',
    props: {
        evaluationHistory: {
            type: Array,
            default: null,
        },
        comparisonTime: {
            type: Number,
            default: null,
        },
        taskname: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            evaluation: null,
            showHistory: false,
            showMore: false,
        }
    },
    watch: {
        taskname() {
            console.log(this.taskname);
        },
        evaluationHistory() {
            const index = this.evaluationHistory.findIndex((task) => task.taskname === this.taskname);
            this.evaluation = this.evaluationHistory[index];
            console.log(this.evaluationHistory, this.taskname, this.evaluation);
        },
    },
    methods: {
        formatDate(timestamp) {
            var date = new Date(timestamp);
            var minutes = date.getMinutes();
            if (minutes < 10) { minutes = '0' + minutes; }
            var formattedDate = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + minutes;
            return formattedDate;
        }
    },
}
</script>

<style lang='scss'>

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

    .scrollable-result-list {
        max-height: 80%;
        overflow-y: scroll;
    }

    .usability-smells-result {
        width: 80%;
		margin-left: 15%;
        vertical-align: middle;
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
