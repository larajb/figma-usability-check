<template>
    <div>
        <div style="display: flex">
            <p class="type--pos-medium-normal">{{ smell.title }}</p>
            <IconButton @click="showSmell = !showSmell" :icon="showSmell ? 'caret-down' : 'caret-right'" />
        </div>
        <table v-show="showSmell" class="table">
            <tr class="type--pos-medium-normal" v-if="smell.steps.length === 1">
                <td valign="top">Gefunden in</td>
                <td>Schritt {{ smell.steps[0] }} ({{ getTimeFromTo(content.evaluationRuns[0].goms.stepsTimes, smell.steps[0]) }})</td>
            </tr>
            <tr class="type--pos-medium-normal" v-else-if="smell.steps.length > 1">
                <td valign="top">Gefunden in</td>
                <td>Schritten {{ getAsString(content.evaluationRuns[0].goms.stepsTimes, smell.steps) }}</td>
            </tr>
            <tr class="type--pos-medium-normal">
                <td valign="top">Erscheinung</td>
                <td>{{ getDescription(smell.title) }}</td>
            </tr>
            <tr class="type--pos-medium-normal">
                <td valign="top">Behebung</td>
                <td>{{ getRefactoring(smell.title) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { IconButton } from 'figma-plugin-ds-vue';
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmells';

export default {
    name: 'UsabilitySmellResult',
    props: {
        smell: {
            type: Object,
            default: null,
        },
    },
    components: {
        IconButton,
    },
    data() {
        return {
            showSmell: false,
            usabilitySmells: usabilitySmellsArray,
        }
    },
    methods: {
        getDescription(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].description;
        },
        getRefactoring(title) {
            const index = this.usabilitySmells.findIndex((smell) => smell.title === title);
            return this.usabilitySmells[index].refactoring;
        },
        getAsString(stepsTimes, stepsArray) {
            var stepsString = '';
            for (let i = 0; i < stepsArray.length; i++) {
                var step = stepsArray[i].toString() + ' (' + this.getTimeFromTo(stepsTimes, i+1) + ')';
                stepsString += step + ', ';
            }
            stepsString = stepsString.slice(0, stepsString.length - 2);
            return stepsString;
        },
        getTimeFromTo(stepsTimes, stepNum) {
            var from = 0.0;
            var to = 0.0;
            for (let i = 0; i < stepNum; i++) {
                if (i === 0) {
                    to += stepsTimes[i];
                } else {
                    from += stepsTimes[i-1];
                    to += stepsTimes[i];
                }
            }
            return from.toFixed(2).toString() + ' - ' + to.toFixed(2).toString() + ' s';
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .table {
		border-spacing: 10px;
	}
</style>
