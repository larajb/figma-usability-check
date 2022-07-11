<template>
    <div>
        <div>
            <p class="type--pos-medium-normal">Select the page on which the frames you want to evaluate are located.</p>
            <div class="tooltip--bottom" style="width: 100%">
                <Select id="page-select" style="width: 100%" :items="pagesItems" v-model="pageSelection" />
                <span class="type--pos-small-normal tooltiptext--bottom">Selection Frames</span>
            </div>
            <div v-show="frames.length > 0">
                <p class="type--pos-medium-normal">Select the frame(s) to be evaluated.</p>
                <Checkbox v-model="selectAllFrames">Select/deselect all</Checkbox>
                <div class="evaluation__frames-list">
                    <div v-for="(frame, index) in frames" :key="index">
                        <frame :frame="frame" @selected="setSelected($event)" />
                    </div>
                </div>
            </div>
            <div v-show="homepageMetricSelected">
                <p class="type--pos-medium-normal">You have selected the metric <i>Reference to homepage</i>. To evaluate this metric, select a frame as the homepage.</p>
                <div class="tooltip--bottom" style="width: 100%">
                    <Select id="homepage-select" style="width 100%" :items="framesItems" v-model="homepageSelection" />
                    <span class="type--pos-small-normal tooltiptext--bottom">Select homepage</span>
                </div>
            </div>
        </div>
        <div v-show="showError" class="evaluation__error-note">
            <p class="type--pos-medium-normal" style="color: #ffffff; margin-left: 5px">{{ errorMessage }}</p>
            <IconButton @click="closeError" :icon="'close'" />
        </div>
        <div>
            <button class="button button--primary" @click="startEvaluation">Start</button>
        </div>
    </div>
</template>

<script>
import { dispatch, handleEvent } from '../../uiMessageHandler';
import { mapState } from 'vuex';
import { metricsArray } from '../metrics/metricsArray.js';
import Frame from './Frame.vue';
import { Select, Checkbox, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'Evaluation',
    components: {
        Frame,
        Select,
        Checkbox,
        IconButton,
    },
    data() {
        return {
            selectedFrames: [],
            pagesItems: [],
            pageSelection: '',
            frames: [],
            framesItems: [],
            homepageSelection: '',
            selectAllFrames: false,
            showError: false,
            errorMessage: '',
            homepageMetricSelected: false,
            metrics: metricsArray,
            evaluationHistory: [],
        }
    },
    computed: {
        ...mapState(['selectedMetrics']),
    },
    mounted() {
        dispatch('getPages');
        dispatch('getEvaluationStorage');

        handleEvent('allPages', pages => {
            if (pages !== undefined) {
                this.pagesItems.push({ label: '', key: '' });
                pages.forEach(page => {
                    this.pagesItems.push({ label: page.name, key: page.id });
                });
            }
        });

        handleEvent('frames', frames => {
            if (frames !== undefined) {
                this.frames = frames;
                this.framesItems = [{ label: '', key: '' }];
                frames.forEach(frame => {
                    this.framesItems.push({ label: frame.name, key: frame.id });
                })
            }
        });

        handleEvent('currentEvaluationStorage', storage => {
            if (storage !== undefined) {
                this.evaluationHistory = storage;
                this.$store.commit('evaluationHistory', this.evaluationHistory);
            }
        });

        handleEvent('evaluationResults', results => {
            this.evaluationHistory.unshift({ timestamp: Date.now(), frames: this.selectedFrames, results: results });
            this.$store.commit('evaluationHistory', this.evaluationHistory);
            dispatch('setEvaluationStorage', this.evaluationHistory);
            this.$store.commit('evaluationResult', results);
            this.$emit('results', results);
            this.$store.commit('evaluationReady', true);
        });
    },
    watch: {
        pageSelection() {
            if (this.pageSelection === '') {
                this.frames = [];
            } else {
                dispatch('getFrames', this.pageSelection);
            }
        },
        selectAllFrames() {
            if (this.selectAllFrames === true) {
                this.frames.forEach(frame => {
                    const index = this.selectedFrames.findIndex((selectedFrame) => selectedFrame.name === frame.name);
                    if (index < 0) {
                        this.selectedFrames.push({ name: frame.name, id: frame.id });
                    }
                });
            } else {
                this.selectedFrames = [];
            }
            this.$store.commit('selectedFrames', this.selectedFrames);
        },
        selectedMetrics() {
            const index = this.selectedMetrics.findIndex((metric) => metric === 'Reference to homepage');
            if (index >= 0) {
                this.homepageMetricSelected = true;
            } else {
                this.homepageMetricSelected = false;
            }
        },
    },
    methods: {
        setSelected(args) {
            if (args.isSelected === true) {
                this.selectedFrames.push({ name: args.name, id: args.id });
            } else {
                this.selectedFrames = this.selectedFrames.filter(frame => frame.name !== args.name);
            }
            this.$store.commit('selectedFrames', this.selectedFrames);
        },
        setHomepage() {
            dispatch('setHomepage');
        },
        startEvaluation() {
            this.$store.commit('evaluationReady', false);
            if (this.homepageMetricSelected && this.homepageSelection === '') {
                this.showError = true;
                this.errorMessage = 'Please select a homepage.';
            } else {
                var containsMultipleFrameMetrics = this.checkForMultipleFrameMetrics();
                if (containsMultipleFrameMetrics === true && this.selectedFrames.length <= 1) {
                    this.showError = true;
                    this.errorMessage = 'You have selected metrics that require more than one frame for evaluation. Please select more than one frame.';
                } else {
                    dispatch('evaluate', { selectedMetrics: this.selectedMetrics, selectedFrames: this.selectedFrames, homepage: this.homepageSelection });
                }
            }
        },
        checkForMultipleFrameMetrics() {
            var multipleFrames = false;
            this.selectedMetrics.forEach(metric => {
                var foundMetric = this.metrics.find((el) => el.title === metric);
                if (foundMetric !== undefined) {
                    if (foundMetric.multipleFrames) {
                        multipleFrames = true;
                    }
                }
            });
            return multipleFrames;
        },
        closeError() {
            this.showError = false;
            this.errorMessage = '';
        },
    },
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .evaluation__error-note {
        display: flex;
        justify-content: space-between;
        background-color: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
    }

    .evaluation__frames-list {
        width: 80%;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
</style>
