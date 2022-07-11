<template>
    <div>
        <p class="type--pos-medium-normal">Select one or more metrics for evaluation and then switch to the "Evaluation" tab.</p>
        <p class="type--pos-small-normal">Use an evaluation profile to select a predefined grouping of metrics for evaluation.</p>
        <div style="display: flex">
            <p class="type--pos-medium-normal">Evaluation profile:</p>
            <div class="tooltip--bottom" style="width: 100%">
                <Select id="evaluation-profile-select" style="width: 100%" :items="evaluationProfilesItems" v-model="evaluationProfileSelection" />
                <span class="type--pos-small-normal tooltiptext--bottom">Selection evaluation profile</span>
            </div>
        </div>
        <Checkbox v-model="selectAllMetrics">Select/deselect all</Checkbox>
		<div class="metric-selection__metrics-list">
			<div v-for="(metric, index1) in metrics" :key="index1">
				<metric :metric="metric" @selected="setSelected($event)" />
			</div>
		</div>
        <div>
            <p class="type--pos-small-normal">Create your own evaluation profile from your current metrics selection.</p>
            <div style="display: flex">
                <div class="tooltip--bottom" style="width: 100%">
                    <input id="evaluationProfile" class="input" type="text" placeholder="Evaluation profile" v-model="profilename">
                    <span class="type--pos-small-normal tooltiptext--bottom">Enter evaluation profile name</span>
                </div>
                <button class="button button--secondary" @click="createProfile">Create</button>
            </div>
            <div v-show="customEvaluationProfiles.length > 0">
                <p class="type--pos-small-normal">Select an evaluation profile and delete it to remove it from the list of evaluation profiles.</p>
                <div style="display: flex">
                    <div class="tooltip--bottom" style="width: 100%">
                        <Select id="evaluation-profile-delete-select" style="width: 100%" :items="customEvaluationProfilesItems" v-model="evaluationProfileDeleteSelection" />
                        <span class="type--pos-small-normal tooltiptext--bottom">Select evaluation profile to delete</span>
                    </div>
                    <button class="button button--secondary" @click="deleteProfile">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Metric from './Metric.vue';
import { evaluationProfilesArray } from '../metrics/evaluationProfilesArray';

import { Select, Checkbox } from 'figma-plugin-ds-vue';
import { dispatch, handleEvent } from '../../uiMessageHandler';

export default {
    name: 'MetricSelection',
    components: {
		Metric,
        Select,
        Checkbox,
	},
    props: {
        metrics: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            selectedMetrics: [],
            evaluationProfiles: evaluationProfilesArray,
            customEvaluationProfiles: [],
            evaluationProfilesItems: [],
            customEvaluationProfilesItems: [],
            evaluationProfileSelection: '',
            evaluationProfileDeleteSelection: '',
            profilename: '',
            selectAllMetrics: false,
        }
    },
    mounted() {
        this.evaluationProfilesItems = [{ label: '', key: '' }];
        this.evaluationProfiles.forEach(profile => {
            this.evaluationProfilesItems.push({ label: profile.title, key: profile.title });
        })

        dispatch('getEvaluationProfileStorage');

        handleEvent('currentEvaluationProfileStorage', storage => {
            if (storage !== undefined) {
                this.evaluationProfilesItems.push({ divider: true });
                this.customEvaluationProfiles = storage;
                storage.forEach(profile => {
                    this.evaluationProfilesItems.push({ label: profile.title, key: profile.title });
                })
            }
        });
    },
    watch: {
        evaluationProfileSelection() {
            if (this.evaluationProfileSelection === '') {
                this.$store.commit('currentEvaluationProfile', null);
            } else {
                var profile = this.evaluationProfiles.find((profile) => profile.title === this.evaluationProfileSelection);
                if (profile === undefined) {
                    profile = this.customEvaluationProfiles.find((profile) => profile.title === this.evaluationProfileSelection);
                }
                this.$store.commit('currentEvaluationProfile', profile);
            }
        },
        evaluationProfiles() {
            this.evaluationProfilesItems = [{ label: '', key: '' }];
            this.evaluationProfiles.forEach(profile => {
                this.evaluationProfilesItems.push({ label: profile.title, key: profile.title });
            })
        },
        customEvaluationProfiles() {
            this.customEvaluationProfilesItems = [{ label: '', key: '' }];
            this.customEvaluationProfiles.forEach(profile => {
                this.customEvaluationProfilesItems.push({ label: profile.title, key: profile.title });
            })
        },
        selectAllMetrics() {
            if (this.selectAllMetrics === true) {
                this.metrics.forEach(metric => {
                    const index = this.selectedMetrics.findIndex((selectedMetric) => selectedMetric === metric.title);
                    if (index < 0) {
                        this.selectedMetrics.push(metric.title);
                    }
                });
            } else {
                this.selectedMetrics = [];
            }
            this.$store.commit('selectedMetrics', this.selectedMetrics);
        },
    },
    methods: {
        setSelected(args) {
            if (args.isSelected === true) {
                this.selectedMetrics.push(args.title);
            } else if (args.isSelected === false) {
                this.selectedMetrics = this.selectedMetrics.filter(metric => metric !== args.title);
            }
            this.$store.commit('selectedMetrics', this.selectedMetrics);
        },
        createProfile() {
            if (this.evaluationProfilesItems.length === this.evaluationProfiles.length+1) {
                this.evaluationProfilesItems.push({ divider: true });
            }
            this.customEvaluationProfiles.push({ title: this.profilename, metrics: this.selectedMetrics });
            dispatch('setEvaluationProfileStorage', this.customEvaluationProfiles);
            this.evaluationProfilesItems.push({ label: this.profilename, key: this.profilename });
            this.profilename = '';
        },
        deleteProfile() {
            const index = this.customEvaluationProfiles.findIndex((profile) => profile.title === this.evaluationProfileDeleteSelection);
            this.customEvaluationProfiles.splice(index, 1);
            dispatch('setEvaluationProfileStorage', this.customEvaluationProfiles);
            const itemsIndex = this.evaluationProfilesItems.findIndex((item) => item.label === this.evaluationProfileDeleteSelection);
            this.evaluationProfilesItems.splice(itemsIndex, 1);
            this.evaluationProfileDeleteSelection = '';
        },
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";
    @import "../../../node_modules/figma-plugin-ds-vue/dist/figma-plugin-ds-vue.css";

    .metric-selection__metrics-list {
        width: 80%;
        margin-left: 20px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
</style>
