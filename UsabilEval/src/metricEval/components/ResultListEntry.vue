<template>
    <div>
        <div style="display: flex">
            <div v-if="getColorValue(result.metric, result) === 'green'" class="tooltip--right">
                <Icon icon="resolve-filled" class="icon--green" />
                <span class="type--pos-small-normal tooltiptext--right">No violations found</span>
            </div>
            <div v-else-if="getColorValue(result.metric, result) === 'yellow'" class="tooltip--right">
                <Icon icon="warning" class="icon--yellow" />
                <span class="type--pos-small-normal tooltiptext--right">Few violations found</span>
            </div>
            <div v-else-if="getColorValue(result.metric, result) === 'red'" class="tooltip--right">
                <Icon icon="warning" class="icon--red" />
                <span class="type--pos-small-normal tooltiptext--right">Some violations found</span>
            </div>
            <p class="type--pos-medium-bold">{{ result.metric }}</p>
        </div>
        <div style="margin-left: 40px">
            <p class="type--pos-medium-normal">{{ getResultSentence() }}</p>
            <div v-if="result.type === 'colorStyle'">
                <table class="result-list-entry__table" style="margin-left: -11px">
                    <tr v-for="(element, index2) in result.nodes" :key="index2">
                        <td align="top">
                            <div v-if="element.fill.length === 1" class="result-list-entry__colorsquare" :style="{ backgroundColor: convertSingleColor(element.fill[0].color, element.fill[0].opacity) }"></div>
                            <div v-if="element.fill.length > 1" class="result-list-entry__colorsquare" :style="{ background: convertMultipleColor(element.fill) }"></div>
                        </td>
                        <td class="result-list-entry__table-cell" :class="[ isHistory ? '' : 'result-list-entry--hoverable' ]" @click="isHistory ? null : select(element.nodes)">
                            <div v-if="element.fill.length === 1"><p class="type--pos-medium-normal">{{ getSingleColorString(element.fill[0].color, element.fill[0].opacity) }}</p></div>
                            <div v-if="element.fill.length > 1"><p class="type--pos-medium-normal">{{ getMultipleColorString(element.fill) }}</p></div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-if="result.type === 'fontStyle'">
                <table class="result-list-entry__table" style="margin-left: -11px">
                    <tr v-for="(element, index2) in result.nodes" :key="index2">
                        <td class="result-list-entry__table-cell" :class="[ isHistory ? '' : 'result-list-entry--hoverable' ]" @click="isHistory ? null : select(element.nodes)">
                            <p class="type--pos-medium-normal">{{ getFontStyleString(element.fontStyle) }}</p>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else-if="result.type === 'comparison'">
                <table class="result-list-entry__table" style="margin-left: -11px">
                    <tr>
                        <td class="type--pos-medium-bold">Most common formatting</td>
                        <td class="type--pos-medium-bold">Deviations</td>
                    </tr>
                    <tr v-for="(element, index2) in result.nodes" :key="index2">
                        <td class="result-list-entry__table-cell" :class="[ isHistory ? '' : 'result-list-entry--hoverable' ]">
                            <div v-if="element.probablyCorrect.id.length > 1" @click="isHistory ? null : select(element.probablyCorrect.id)">
                                <p class="type--pos-medium-normal">{{ element.probablyCorrect.name[0] }}</p>
                            </div>
                            <div v-else-if="element.probablyCorrect.id.length === 1">
                                <p>-</p>
                            </div>
                        </td>
                        <td class="result-list-entry__table-cell" :class="[ isHistory ? '' : 'result-list-entry--hoverable' ]">
                            <div v-if="element.probablyCorrect.id.length > 1" @click="isHistory ? null : select(element.probablyNotCorrect.id)">
                                <p class="type--pos-medium-normal">{{ element.probablyNotCorrect.name.join(', ') }}</p>
                            </div>
                            <div v-else-if="element.probablyCorrect.id.length === 1" @click="isHistory ? null : select(element.probablyNotCorrect.id.concat(element.probablyCorrect.id))">
                                <p class="type--pos-medium-normal">{{ element.probablyNotCorrect.name.concat(element.probablyCorrect.name).join(', ') }}</p>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else-if="result.type === 'single'">
                <table class="result-list-entry__table" style="margin-left: -11px">
                    <tr v-for="(element, index2) in result.nodes" :key="index2">
                        <td class="result-list-entry__table-cell" :class="[ isHistory ? '' : 'result-list-entry--hoverable' ]" @click="isHistory ? null : select([element.id])">
                            <p class="type--pos-medium-normal">{{ element.name }}</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch } from '../../uiMessageHandler';
import { Icon, IconButton } from 'figma-plugin-ds-vue';
import { metricsArray } from '../metrics/metricsArray';

export default {
    name: 'ResultListEntry',
    props: {
        result: {
            type: Object,
            default: null,
        },
        isHistory: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Icon,
        IconButton,
    },
    data() {
        return {
            isClicked: false,
            metrics: metricsArray,
        }
    },
    methods: {
        select(ids) {
            dispatch('setSelection', ids);
        },
        getResultSentence() {
            var metric = this.metrics.find((metric) => metric.title === this.result.metric);
            if (this.result.nodes.length === 1) {
                return metric.resultSentenceSingle;
            } else if (this.result.nodes.length > 1) {
                return metric.resultSentenceMultiple;
            }
        },
        getFontStyleString(style) {
            var fontStyleString = style.fontName.family + ' ' + style.fontName.style + ' ' + style.fontSize;
            return fontStyleString;
        },
        getSingleColorString(color, opacity) {
            var colorString = 'rgba(' + color.r.toFixed(2) + ', ' + color.g.toFixed(2) + ', ' + color.b.toFixed(2) + ', ' + opacity.toFixed(2) + ')';
            return colorString;
        },
        getMultipleColorString(style) {
            var colorString = '';
            style.forEach(el => {
                colorString += 'rgba(' + el.color.r.toFixed(2) + ', ' + el.color.g.toFixed(2) + ', ' + el.color.b.toFixed(2) + ', ' + el.opacity.toFixed(2) + '), ';
            });
            colorString.slice(0, colorString.length - 2);
            return colorString;
        },
        convertSingleColor(color, opacity) {
            var newColor = 'rgba(' + (color.r * 255).toFixed() + ', ' + (color.g * 255).toFixed() + ', ' + (color.b * 255).toFixed() + ', ' + opacity.toFixed(2) + ')';
            return newColor;
        },
        convertMultipleColor(style) {
            var newGradient = '';
            style.sort((a, b) => {
                return a.opacity - b.opacity;
            });
            style.forEach(el => {
                const color = this.convertSingleColor(el.color, el.opacity);
                newGradient += 'linear-gradient(' + color + ', ' + color + '), ';
            });
            newGradient = newGradient.slice(0, newGradient.length - 2);
            return newGradient;
        },
        getColorValue(metricname, result) {
            var color = 'green';
            if (result.value !== null) {
                var metric = this.metrics.find((metric) => metric.title === metricname);
                if (result.value >= metric.thresholds.green.min && result.value <= metric.thresholds.green.max) {
                    color = 'green';
                } else if (result.value >= metric.thresholds.yellow.min && result.value <= metric.thresholds.yellow.max) {
                    color = 'yellow';
                } else if (result.value >= metric.thresholds.red.min && result.value <= metric.thresholds.red.max) {
                    color = 'red';
                }
            } else {
                if (result.nodes.length > 0) {
                    color = 'red';
                }
            }
            return color;
        },
    },
}
</script>

<style lang="scss">
    @import "../../figma-ui/figma-plugin-ds";

    .result-list-entry__colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
        border: 0.5px solid black;
	}

    .result-list-entry__table {
		border-spacing: 10px;
	}

    .result-list-entry__table-cell {
        height: 30px;
        padding-left: 10px;
        padding-right: 10px;
        vertical-align: center
    }
    
    .result-list-entry--hoverable:hover {
        border: 1px solid #0084f8;
    }
</style>
