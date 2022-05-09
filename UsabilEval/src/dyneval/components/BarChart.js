import { HorizontalBar, mixins } from 'vue-chartjs';

export default {
    extends: HorizontalBar,
    mixins: [ mixins.reactiveProp ],
    props: [ 'chartData', 'options'],
    mounted() {
        this.options['onClick'] = this.handle;
        this.renderChart(this.chartData, this.options);
    },
    methods: {
        handle(event) {
            var dataLabel = '';
            var datasetLabel = '';
            var activePoint = this.$data._chart.getElementAtEvent(event)[0];
            if (activePoint !== undefined) {
                var data = activePoint._chart.data;
                var dataIndex = activePoint._index;
                var datasetIndex = activePoint._datasetIndex;
                dataLabel = data.labels[dataIndex];
                datasetLabel = data.datasets[datasetIndex].label;
            }
            this.$emit('clicked', { dataLabel: dataLabel, datasetLabel: datasetLabel });
        }
    },
}
