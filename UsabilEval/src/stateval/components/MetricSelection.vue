<template>
    <div>
        <p class="type--pos-medium-normal">
			Wähle die zu evaluierenden Metriken und starte die Evaluation.
		</p>
		<div>
			<div v-for="(item, index1) in metrics" :key="index1">
				<category :item="item" />
			</div>
		</div>
		<button class="button button--primary" @click="handleClick">
			Start
		</button>
    </div>
</template>

<script>
import Category from './Category.vue';

export default {
    name: 'MetricSelection',
    components: {
		Category,
	},
    props: {
        metrics: {
            type: Array,
            default: null,
        },
    },
    methods: {
        handleClick() {
            this.$emit('clicked');
        },
        getSelectedMetrics() {
            var selectedMetrics = [];
            this.metrics.forEach(m => {
                m.metrics.forEach(me => {
                    if (document.getElementById(me).checked) {
                        selectedMetrics.push(me)
                    }
                })
            })
        },
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";
</style>
