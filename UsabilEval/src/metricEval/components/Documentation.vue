<template>
    <div class="documentation--scrollable">
        <p class="type--pos-medium-bold">Instructions for using the plugin</p>
        <p class="type--pos-medium-normal">
            This plugin is used for usability evaluation of UI designs based on some metrics. One or more metrics can be selected for evaluation. Then the frame(s) to be evaluated must be selected. After the evaluation, a result is displayed for each of the selected metrics. If the same frames are evaluated multiple times, previous evaluation results can be viewed.
        </p>
        <div id="metrics">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Metrics</p>
                <IconButton @click="showMetrics = !showMetrics" :icon="showMetrics ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showMetrics" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Currently, the following metrics can be used for evaluation:
                    <ul>
                        <li v-for="(metric, index) in metrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    Further explanations can be found in the metrics selection under the respective metric.
                </p>
            </div>
        </div>
        <div id="evaluationProfiles">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Evaluation profiles</p>
                <IconButton @click="showEvaluationProfiles = !showEvaluationProfiles" :icon="showEvaluationProfiles ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showEvaluationProfiles" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Evaluation profiles are designed to make your work easier. They form a grouping of several metrics. Currently, the following predefined evaluation profiles are available:
                    <ul>
                        <li v-for="(profile, index) in profiles" :key="index">
                            {{ profile.title }}
                            <ul>
                                <li v-for="(metric, index2) in profile.metrics" :key="index2">{{ metric }}</li>
                            </ul>
                        </li>
                    </ul>
                    On the metrics selection page, additional evaluation profiles can be added. Simply select the metrics you want to group and choose a name for your new evaluation profile in the input field below the metrics list. Then confirm the profile by clicking on the <i>Create</i> button. If you no longer need an evaluation profile, you can remove it at the bottom of the metrics selection page. To do so, simply select the corresponding profile from the selection and delete it by clicking on the <i>Delete</i> button.
                </p>
            </div>
        </div>
        <div id="evaluation">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Evaluation</p>
                <IconButton @click="showEvaluation = !showEvaluation" :icon="showEvaluation ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showEvaluation" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    After you have selected one or more metrics for evaluation, you need to select one or more frames to be evaluated. Some metrics require multiple frames for evaluation. If you have selected such a metric, you need to select multiple frames for evaluation.
                    <br>
                    <br>
                    The following metrics require at least one frame for evaluation:
                    <ul>
                        <li v-for="(metric, index) in singleFrameMetrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    The following metrics require at least two frames for evaluation:
                    <ul>
                        <li v-for="(metric, index) in multipleFrameMetrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    It may also happen that further input is required. If this is the case, there is a prompt for input or selection on the <i>Evaluation</i> page.
                </p>
            </div>
        </div>
        <div id="results">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Presentation of results</p>
                <IconButton @click="showResults = !showResults" :icon="showResults ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showResults" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    After the evaluation, your evaluation results are presented on the <i>Results</i> page. The results are presented in list form. Each metric selected for evaluation can be found in this list. One of the following symbols is displayed to the left of the name:</p>
                <div style="display: flex">
                    <Icon icon="resolve-filled" class="icon--green" />
                    <Icon icon="warning" class="icon--yellow" />
                    <Icon icon="warning" class="icon--red" />
                </div>
                <p class="type--pos-medium-normal">
                    The green symbol indicates that no violation of the target on which the metric is based was found. Sowohl das gelbe aus auch das rote Symbol weisen darauf hin, dass Verstöße entdeckt wurden. When selecting the error symbols, the proportion of faulty elements out of all elements of the type addressed by the metric is decisive. If, for example, the reference to the homepage is missing on a large number of pages, the red symbol is displayed next to the metric <i>Reference to homepage</i>. If, however, only a small proportion of all pages do not yet have a reference to the start page, the yellow symbol is displayed.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { metricsArray } from '../metrics/metricsArray';
import { evaluationProfilesArray } from '../metrics/evaluationProfilesArray';
import { Icon, IconButton } from 'figma-plugin-ds-vue';

export default {
    name: 'Documentation',
    components: {
        Icon,
        IconButton,
    },
    data() {
        return {
            showMetrics: false,
            showEvaluationProfiles: false,
            showEvaluation: false,
            showResults: false,
            metrics: metricsArray,
            profiles: evaluationProfilesArray,
            singleFrameMetrics: metricsArray.filter((metric) => metric.multipleFrames === false),
            multipleFrameMetrics: metricsArray.filter((metric) => metric.multipleFrames === true),
        }
    }
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .documentation--scrollable {
        max-height: 80%;
        overflow-y: scroll;
    }
</style>