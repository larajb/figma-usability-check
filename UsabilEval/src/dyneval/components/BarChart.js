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
        handle (point, event) {
            const item = event[0];
            console.log('bar', event, point);
            // this.$emit('onReceive', item._model.datasetLabel)
        }
    },
}
