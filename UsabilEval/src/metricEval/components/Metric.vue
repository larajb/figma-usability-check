<template>
    <div>
        <div class="metric">
            <Checkbox v-model="selected" @input="handleClick">{{ metric.title }}</Checkbox>
            <IconButton @click="isClicked = !isClicked" :icon="isClicked ? 'caret-down' : 'caret-right'" />
        </div>
        <div v-if="isClicked" class="metric-info type--pos-small-normal">
            <p>{{ metric.description }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import { Checkbox, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'Metric',
    props: {
        metric: {
            type: Object,
            default: null,
        },
        insideProfile: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        Checkbox,
        IconButton,
    },
    computed: {
        ...mapState(['currentEvaluationProfile', 'selectedMetrics']),
    },
    data() {
        return {
            isClicked: false,
            selected: false,
        }
    },
    watch: {
        insideProfile() {
            if (this.insideProfile === true) {
                this.selected = true;
            } else {
                this.selected = false;
            }
        },
        currentEvaluationProfile() {
            if (this.currentEvaluationProfile === null) {
                this.selected = false;
            } else {
                const index = this.currentEvaluationProfile.metrics.findIndex((metric) => metric === this.metric.title);
                if (index >= 0 ) {
                    this.selected = true;
                } else {
                    this.selected = false;
                }
            }
            this.$emit('selected', { title: this.metric.title, isSelected: this.selected });
        },
        selectedMetrics() {
            const index = this.selectedMetrics.findIndex((selectedMetric) => selectedMetric === this.metric.title);
            if (index >= 0 ) {
                this.selected = true;
            } else {
                this.selected = false;
            }
        },
    },
    methods: {
        handleClick() {
            this.$emit('selected', { title: this.metric.title, isSelected: this.selected });
        },
    }
};
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .metric {
		display: flex;
		justify-content: space-between;
	}

	.metric-info {
		margin-left: 20px;
	}
</style>
