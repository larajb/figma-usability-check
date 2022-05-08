<template>
    <div>
        <p class="type--pos-medium-normal">Im Folgenden werden die Ergebnisse deiner Evaluation der Frames <i>{{ getSelectedFramesAsString() }}</i> dargestellt</p>
        <div v-for="(result, index) in results" :key="index">
            <result-list-entry :result="result"></result-list-entry>
        </div>
        <div style="display: flex; margin-top: 20px" v-if="foundResults.length > 0">
            <p class="type--pos-medium-bold">Vorherige Evaluationen dieser Frames</p>
            <IconButton @click="showHistory = !showHistory" :icon="showHistory ? 'caret-down' : 'caret-right'" />
        </div>
        <div v-if="showHistory" style="margin-left: 20px">
            <div v-for="(entry, index) in foundResults" :key="index">
                <history-result-list :timestamp="entry.timestamp" :results="entry.results"></history-result-list>
            </div>
        </div>
    </div>
</template>

<script>
import ResultListEntry from './ResultListEntry.vue';
import HistoryResultList from './HistoryResultList.vue';
import { mapState } from 'vuex';
import { IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'Results',
    props: {
        results: {
            type: Array,
            default: null,
        },
    },
    components: {
        ResultListEntry,
        HistoryResultList,
        IconButton,
    },
    data() {
        return {
            foundResults: [],
            showHistory: false,
        }
    },
    computed: {
        ...mapState(['evaluationHistory', 'selectedFrames']),
    },
    watch: {
        results() {
            if (this.results.length > 0) {
                var sameFrames = this.evaluationHistory.filter(entry => JSON.stringify(entry.frames) === JSON.stringify(this.selectedFrames));
                sameFrames.splice(0,1);
                this.foundResults = sameFrames;
            }
        },
    },
    methods: {
        getSelectedFramesAsString() {
            var resultString = '';
            this.selectedFrames.forEach(frame => {
                resultString += frame.name + ', ';
            })
            resultString = resultString.slice(0, resultString.length-2);
            return resultString;
        },
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";
</style>
