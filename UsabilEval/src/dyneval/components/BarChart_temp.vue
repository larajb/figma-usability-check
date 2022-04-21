<template>
    <div>
        <canvas :id="chartId" />
    </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
    name: 'BarChart',
    props: {
        chartId: {
            type: String,
            default: 'bar-chart',
        },
        chartData: {
            type: Object,
            default: null,
        },
        chartOptions: {
            type: Object,
            default: null,
        },
    },
    data() {
		return {
			myChart: null,
		}
	},
    watch: {
        chartData() {
            if (this.myChart !== null) {
                this.myChart.destroy()
            }
            this.createChart(this.chartId)
        },
    },
    mounted() {
        if (this.myChart !== null) {
			this.myChart.destroy()
		}
        this.createChart(this.chartId)
    },
    updated() {
        if (this.myChart !== null) {
			this.myChart.destroy()
		}
        this.createChart(this.chartId)
    },
    methods: {
        createChart(chartId) {
            const ctx = document.getElementById(chartId).getContext('2d')
            this.myChart = new Chart(ctx, {
                type: 'bar',
                data: this.chartData,
                options: this.chartOptions,
            })
        }
    }
}
</script>

<style lang="scss">

</style>
