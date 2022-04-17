<template>
    <div>
        <div class="checkbox">
            <input :id="item.category" type="checkbox" class="checkbox__box" @click="handleClick(item)" :disabled="item.category !== 'Navigation'">
            <label :for="item.category" class="checkbox__label">{{ item.category }}</label>
            <img width='20px' height='20px' :src="isOpened ? chevronRight : chevronDown" @click="isOpened = !isOpened" />
        </div>
        <div v-show="isOpened">
            <div v-for="(metric, index2) in item.metrics" :key="index2" class="checkbox-level2">
                <metric :metric="metric" :item="item" :disabled="item.category !== 'Navigation'" />
            </div>
        </div>
    </div>
</template>

<script>
import Metric from './Metric.vue';

import chevronRight from '../../img/chevron-right.svg';
import chevronDown from '../../img/chevron-down.svg';

export default {
    name: 'Category',
    props: {
        item: {
            type: Object,
            default: null,
        },
    },
    components: {
        Metric,
    },
    data() {
        return {
            isOpened: false,
            chevronRight,
            chevronDown
        }
    },
    methods: {
		handleClick(item) {
			let isChecked = document.getElementById(item.category).checked;
			for (let i = 0; i < item.metrics.length; i++) {
				document.getElementById(item.metrics[i]).checked = isChecked;
			}
		},
	}
};
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .checkbox {
		display: flex;
		justify-content: space-between;
	}

	.checkbox-level2 {
		margin-left: 15px;
	}
</style>
