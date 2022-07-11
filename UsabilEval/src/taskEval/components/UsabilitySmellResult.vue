<template>
    <div>
        <div style="display: flex">
            <p class="type--pos-medium-normal">{{ smell.title }}</p>
            <IconButton @click="showSmell = !showSmell" :icon="showSmell ? 'caret-down' : 'caret-right'" />
        </div>
        <table v-show="showSmell" class="usability-smells-result__table">
            <tr class="type--pos-medium-normal" v-if="smell.steps.length === 1">
                <td valign="top">Gefunden in</td>
                <td v-if="type === 'scenario'" align="top">Übergang {{ smell.steps[0] }}</td>
                <td v-else-if="type === 'task'" align="top">Schritt {{ smell.steps[0] }} ({{ getTimeFromTo(content.evaluationRuns[0].goms.stepsTimes, smell.steps[0]) }})</td>
            </tr>
            <tr class="type--pos-medium-normal" v-else-if="smell.steps.length > 1">
                <td valign="top">Gefunden in</td>
                <td v-if="type === 'scenario'" align="top">Übergang {{ getAsStringScenario(smell.steps[0]) }}</td>
                <td v-else-if="type === 'task'" align="top">Schritt {{ getAsStringTask(content.evaluationRuns[0].goms.stepsTimes, smell.steps) }}</td>
            </tr>
            <tr class="type--pos-medium-normal">
                <td valign="top">Erscheinung</td>
                <td align="top">{{ getDescription(smell.title) }}</td>
            </tr>
            <tr class="type--pos-medium-normal">
                <td valign="top">Behebung</td>
                <td align="top">{{ getRefactoring(smell.title) }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { IconButton } from 'figma-plugin-ds-vue';
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmellsArray';

export default {
    name: 'UsabilitySmellResult',
    props: {
        smell: {
            type: Object,
            default: null,
        },
        type: {
            type: String,
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
        getAsStringTask(stepsTimes, stepsArray) {
            var stepsString = '';
            for (let i = 0; i < stepsArray.length; i++) {
                var step = stepsArray[i].toString() + ' (' + this.getTimeFromTo(stepsTimes, i+1) + ')';
                stepsString += step + ', ';
            }
            stepsString = stepsString.slice(0, stepsString.length - 2);
            return stepsString;
        },
        getAsStringScenario(transitions) {
            var transitionsString = '';
            for (let i = 0; i < transitions.length; i++) {
                transitionsString += transitions[i] + ', ';
            }
            transitionsString = transitionsString.slice(0, transitionsString.length - 2);
            return transitionsString;
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
        // getTitleEnglish(title) {
        //     var titleEnglish = '';
        //     switch(title) {
        //         case 'Zu viele Schichten':
        //             titleEnglish = 'Too many layers';
        //             break;
        //         case 'Hohe Website-Element-Abstände':
        //             titleEnglish = 'High website element distance';
        //             break;
        //         case 'Entfernter Inhalt':
        //             titleEnglish = 'Distant content';
        //             break;
        //         case 'Langes Anvisieren':
        //             titleEnglish = 'Long Pointing';
        //             break;
        //         case 'Viele Maus-Tastatur-Wechsel':
        //             titleEnglish = 'Many mouse-keyboard changes';
        //             break;
        //     }
        //     return titleEnglish;
        // },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .usability-smells-result__table {
		border-spacing: 10px;
	}
</style>
