<template>
  	<div class="base">
		<div style="display: flex; margin-bottom: 20px;">
			<div id="select-aufgaben" style="margin-left: 5px; margin-right: 20px" class="type--pos-medium-normal" @click="handleClickSetTasks">Aufgaben</div>
			<div id="select-evaluation" style="margin-right: 20px" class="type--pos-medium-normal" @click="handleClickSetEvaluation">Evaluation</div>
			<div id="select-ergebnisse" style="margin-right: 20px" class="type--pos-medium-normal" @click="handleClickSetResults">Ergebnisse</div>
		</div>
		<p class="type--pos-large-bold">
			DynEval
		</p>
		<task-definition v-show="showTasks" @clicked="handleClickSetTasks" />
		<evaluation v-show="showEvaluation" @clickedDefine="handleClickSetTasks" />
		<results v-show="showResults" @clicked="handleClickSetResults" />
	</div>
</template>

<script>
import { dispatch, handleEvent } from '../uiMessageHandler';

import '../figma-ui/js/selectMenu';
import '../figma-ui/js/iconInput';
import '../figma-ui/js/disclosure';

import TaskDefinition from './components/TaskDefinition.vue';
import Evaluation from './components/Evaluation.vue';
import Results from './components/Results.vue';

export default {
	components: {
		TaskDefinition,
		Evaluation,
		Results
	},
	data() {
		return {
			showTasks: false,
			showEvaluation: false,
			showResults: false,
		};
	},
	watch: {
		showTasks(newValue, oldValue) {
			if (newValue) {
				document.getElementById('select-aufgaben').style.borderBottom = '2px solid black';
			} else {
				document.getElementById('select-aufgaben').style.borderBottom = '';
			}
		},
		showEvaluation(newValue, oldValue) {
			if (newValue) {
				document.getElementById('select-evaluation').style.borderBottom = '2px solid black';
			} else {
				document.getElementById('select-evaluation').style.borderBottom = '';
			}
		},
		showResults(newValue, oldValue) {
			if (newValue) {
				document.getElementById('select-ergebnisse').style.borderBottom = '2px solid black';
			} else {
				document.getElementById('select-ergebnisse').style.borderBottom = '';
			}
		},
	},
	mounted() {
		window.selectMenu.init();
    	window.iconInput.init();
    	window.disclosure.init();
		this.showTasks = true;
	},
	destroyed() {
		window.selectMenu.destroy();
		window.iconInput.destroy();
		window.disclosure.destroy();
	},
	methods: {
		handleClickSetTasks() {
			this.showTasks = true;
			this.showEvaluation = false;
			this.showResults = false;
		},
		handleClickSetEvaluation() {
			this.showTasks = false;
			this.showEvaluation = true;
			this.showResults = false;
		},
		handleClickSetResults() {
			this.showTasks = false;
			this.showEvaluation = false;
			this.showResults = true;
		},
	},
};
</script>

<style lang='scss'>
	@import "../figma-ui/figma-plugin-ds";
</style>