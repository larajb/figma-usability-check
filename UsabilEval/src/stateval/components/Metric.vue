<template>
    <div>
        <div class="checkbox">
            <input :id="metric" type="checkbox" class="checkbox__box" @click="handleClick(metric, item)" :disabled="disabled">
            <label :for="metric" class="checkbox__label">{{ metric }}</label>
            <img width='20px' height='20px' :src="isClicked ? chevronRight : chevronDown" @click="isClicked = !isClicked" />
        </div>
        <div v-if="isClicked" class="metric-info type--pos-small-normal">
            <p>zusätzliche Informationen</p>
        </div>
    </div>
</template>

<script>
import chevronRight from '../../img/chevron-right.svg';
import chevronDown from '../../img/chevron-down.svg';

export default {
    name: 'Metric',
    props: {
        metric: {
            type: String,
            default: null,
        },
        item: {
            type: Object,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isClicked: false,
            chevronRight,
            chevronDown
        }
    },
    methods: {
        handleClick(metric, item) {
			if (document.getElementById(metric).checked === false) {
				document.getElementById(item.category).checked = false;
			} else {
				let allChecked = true;
				for (let i = 0; i < item.metrics.length; i++) {
					if (allChecked === true) {
						allChecked = document.getElementById(item.metrics[i]).checked;
					}
				}
				document.getElementById(item.category).checked = allChecked;
			}
		}
    }
};
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .checkbox {
		display: flex;
		justify-content: space-between;
	}

	.metric-info {
		margin-left: 35px;
	}
</style>
