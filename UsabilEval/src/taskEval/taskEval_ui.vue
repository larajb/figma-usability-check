<template>
  	<div class="taskEval-ui">
		<div style="display: flex; margin-bottom: 20px;">
			<div class="tooltip--bottom">
				<IconButton @click="backToStart" :icon="'back'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Zurück zum Start</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-aufgaben" class="type--pos-medium-normal menu menu-first" @click="setCurrentPage('TaskDefinition')">Aufgaben</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Aufgabendefinition</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-szenarien" class="type--pos-medium-normal menu" @click="setCurrentPage('ScenarioDefinition')">Szenarien</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Szenariendefinition</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-evaluation" class="type--pos-medium-normal menu" :class="{'disabled': (tasks.length === 0) && (scenarios.length === 0)}" @click="setCurrentPage('Evaluation')">Evaluation</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Auswahl der Aufgaben/Szenarien zur Evaluation</span>
			</div>
			<div class="tooltip--bottom">
				<div id="select-ergebnisse" class="type--pos-medium-normal menu" :class="{'disabled': evaluationReady === false }" @click="setResultsPage">
					Ergebnisse
					<div :class="{ 'notification': showNotification }"></div>
				</div>
				<span class="type--pos-small-normal tooltiptext--bottom">Darstellung der Evaluationsergebnisse</span>
			</div>
			<div class="tooltip--bottom">
				<IconButton id="select-dokumentation" @click="setCurrentPage('Documentation')" :icon="'library'" style="margin-top: -8px; margin-bottom: 0px;" />
				<span class="type--pos-small-normal tooltiptext--bottom">Dokumentation/Hilfe zur Nutzung des Plugins</span>
			</div>
		</div>
		<p class="type--pos-large-bold">
			Aufgaben-Evaluation
		</p>
		<task-definition v-show="currentPage === 'TaskDefinition'" />
		<scenario-definition v-show="currentPage === 'ScenarioDefinition'" />
		<evaluation v-show="currentPage === 'Evaluation'" />
		<results v-show="currentPage === 'Results'" />
		<documentation v-show="currentPage === 'Documentation'" />
	</div>
</template>

<script>
import { dispatch } from '../uiMessageHandler';
import { IconButton } from 'figma-plugin-ds-vue';
import { mapState } from 'vuex'

import TaskDefinition from './components/TaskDefinition.vue';
import ScenarioDefinition from './components/ScenarioDefinition.vue';
import Evaluation from './components/Evaluation.vue';
import Results from './components/Results.vue';
import Documentation from './components/Documentation.vue';

export default {
	components: {
		IconButton,
		TaskDefinition,
		ScenarioDefinition,
		Evaluation,
		Results,
		Documentation
	},
	data() {
		return {
			storage: '',
			showNotification: false,
		};
	},
	computed: {
		...mapState(['tasks', 'scenarios', 'currentPage', 'currentTaskname', 'evaluationReady']),
	},
	watch: {
		currentPage() {
			var taskDefinitionValue ='';
			var scenarioDefinitionValue = '';
			var evaluationValue ='';
			var resultsValue = '';
			var documentationValue = '';
			switch(this.currentPage) {
				case 'TaskDefinition':
					taskDefinitionValue ='2px solid black';
					break;
				case 'ScenarioDefinition':
					scenarioDefinitionValue ='2px solid black';
					break;
				case 'Evaluation':
					evaluationValue ='2px solid black';
					break;
				case 'Results':
					resultsValue ='2px solid black';
					break;
				case 'Documentation':
					documentationValue = '2px solid black';
			}
			document.getElementById('select-aufgaben').style.borderBottom = taskDefinitionValue;
			document.getElementById('select-szenarien').style.borderBottom = scenarioDefinitionValue;
			document.getElementById('select-evaluation').style.borderBottom = evaluationValue;
			document.getElementById('select-ergebnisse').style.borderBottom = resultsValue;
			document.getElementById('select-dokumentation').style.borderBottom = documentationValue;
		},
		evaluationReady() {
			if (this.evaluationReady === true) {
				this.showNotification = true;
			}
		},
	},
	mounted() {
		this.showTasks = true;
		document.getElementById('select-aufgaben').style.borderBottom = '2px solid black';
	},
	methods: {
		setCurrentPage(page) {
			this.$store.commit('currentPage', page);
		},
		backToStart() {
			dispatch('backToStart');
		},
		setResultsPage() {
			this.setCurrentPage('Results');
			this.showNotification = false;
		},
	},
};
</script>

<style lang='scss'>
	@import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";
	@import "../tooltips.scss";

	.taskEval-ui {
		padding: 10px;
	}

	.disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	.menu {
		margin-right: 20px
	}

	.menu-first {
		margin-left: 5px;
	}

	.notification {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #0084f8;
		position: absolute;
		top: -5px;
		right: 10px;
	}
</style>