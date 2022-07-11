<template>
    <div class="documentation--scrollable">
        <p class="type--pos-medium-bold">Instructions for using the plugin</p>
        <p class="type--pos-medium-normal">
            This plugin is used for the usability evaluation of UI designs. The evaluation is based on tasks and scenarios. A task describes a of individual interactions to achieve a goal. Higher-level scenarios can be defined that combine several tasks. In this way complex sequences of interactions can be investigated.
            <br>
            <br>
            For a correct evaluation by the plugin, Figma's prototyping system should be used.
        </p>
        <div id="tasks">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Task definition</p>
                <IconButton @click="showTaskDefinition = !showTaskDefinition" :icon="showTaskDefinition ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showTaskDefinition" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    On the page under the tab <i>Tasks</i>, individual tasks can be created, edited and deleted. To create a task, a name must be entered in the first input field. A click on the <i>Create</i> button adds the task if the name is not already used. After a new task has been added, editing steps can be added to it. An editing step is the interaction with an interaction element. The plugin provides for the use of the following three interaction elements:
                    <ul>
                        <li>Input</li>
                        <li>Click element</li>
                        <li>Link</li>
                    </ul>
                    To add an editing step, an interaction element must be selected within the design and the interaction type in the plugin. Then the processing step can be added via the <i>Add</i> button. The processing step is then added to the task whose name is in the input field above it. To change the order of the editing steps or to remove an individual editing step, it is necessary to switch to editing mode by activating the slider at the corresponding task. Within the editing mode, the editing steps can also be copied into another task. To delete an entire task, click the trash can icon next to the task name in the task list.
                </p>
            </div>
        </div>
        <div id="scenarios">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Scenario definition</p>
                <IconButton @click="showScenarioDefinition = !showScenarioDefinition" :icon="showScenarioDefinition ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showScenarioDefinition" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    If one or more tasks have been defined, scenarios can be created via the <i>Scenarios</i> tab. Scenarios are used to group several tasks that contribute to achieving a common goal. To do this, a scenario must first be created by inserting a name in the first input field on the corresponding page and then creating it by clicking on the <i>Create</i> button. If there is no scenario with this name yet, the new scenario is displayed in the scenario list in the lower part of the window. Now one or more tasks can be selected (one after the other) via the selection and added to your scenario.
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
                    The evaluation can be carried out either at task or scenario level.
                    <br>
                    <br>
                    To evaluate a task, the task evaluation must be selected under the tab <i>Evaluation</i>. There, one or two tasks can be selected for evaluation. If two tasks are selected, the second one serves as a comparison task. Both tasks are evaluated completely (prediction for processing time, search for clues for usability problems). The presentation of the results, however, focuses on the evaluation of the first task with information on the comparison of the two tasks.
                    <br>
                    <br>
                    To evaluate a scenario, the scenario evaluation must be selected under the <i>Evaluation</i> tab. A scenario can then be selected for evaluation. The evaluation is done on the basis of the individual tasks. In addition, the transition areas between the tasks are examined.
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
                    After the evaluation, the results can be viewed under the <i>Results</i> tab.
                    <br>
                    <br>
                    When evaluating a task, a time overview of the different actions necessary to complete the task is shown. Below this, the time needed to complete the task is indicated. If a comparison task was specified, its duration is also shown here. If clue patterns for usability problems were found, they are listed under the representation of the processing time. If the hint pattern refers to a specific processing step, it is indicated here along with a description of the problem and a hint on how to solve it.
                    <br>
                    <br>
                    The following clue patterns can currently be found through the plugin:
                    <ul>
                        <li v-for="(smell, index) in usabilitySmells" :key="index">{{ smell.title }}</li>
                    </ul>
                    <br>
                    <br>
                    When evaluating a scenario, a bar chart is displayed showing the processing time of the entire scenario. The times of the individual tasks are differentiated by colour. Clicking on the bar of a task opens the detailed view of the evaluation below it, which corresponds to the view described above for task evaluation. If no task is selected, the total processing time and the clue patterns found in the transitions are shown below the bar chart. To return from the task view to the scenario view, click inside the graph outside the task bars.
                </p>
            </div>
        </div>
        <div id="abbreviations">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Abbreviations used</p>
                <IconButton @click="showAbbreviations = !showAbbreviations" :icon="showAbbreviations ? 'caret-down' : 'caret-right'" />
            </div>
            <table v-if="showAbbreviations" class="documentation__table" style="margin-left: 20px">
                <tr>
                    <td valign="top"><p class="type--pos-small-normal">H</p></td>
                    <td valign="top"><p class="type--pos-small-normal">Homing: "Homing" refers to switching between the mouse and keyboard when interacting with a user interface.</p></td>
                </tr>
                <tr>
                    <td valign="top"><p class="type--pos-small-normal">K</p></td>
                    <td valign="top"><p class="type--pos-small-normal">Keystroke: "Keystroke" refers to both key and mouse clicks.</p></td>
                </tr>
                <tr>
                    <td valign="top"><p class="type--pos-small-normal">M</p></td>
                    <td valign="top"><p class="type--pos-small-normal">Mentally Prepare: "Mentally Prepare" is inserted during interaction with a user interface where a user needs to mentally prepare for the following activities.</p></td>
                </tr>
                <tr>
                    <td valign="top"><p class="type--pos-small-normal">P</p></td>
                    <td valign="top"><p class="type--pos-small-normal">Pointing: "Pointing" refers to the process of targeting an interaction element. The duration depends on the size of the target element and the current distance of the mouse cursor from the target.</p></td>
                </tr>
                <tr>
                    <td valign="top"><p class="type--pos-small-normal">R</p></td>
                    <td valign="top"><p class="type--pos-small-normal">Responding: "Responding" refers to moments in which a response from the system must be waited for. Here, it is mainly used to mark page changes.</p></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { IconButton } from 'figma-plugin-ds-vue';
import { usabilitySmellsArray } from '../usabilitySmells/usabilitySmellsArray';

export default {
    name: 'Documentation',
    components: {
        IconButton,
    },
    data() {
        return {
            showTaskDefinition: false,
            showScenarioDefinition: false,
            showEvaluation: false,
            showResults: false,
            showAbbreviations: false,
            usabilitySmells: usabilitySmellsArray,
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

    .documentation__table {
		border-spacing: 10px;
	}
</style>