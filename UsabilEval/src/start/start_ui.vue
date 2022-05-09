<template>
    <div class="start-ui">
        <p class="type--pos-large-bold">Hallo!</p>
        <p class="type--pos-medium-normal">Mit diesem Plugin kannst du automatische Usability-Evaluationen durchführen. Du kannst vordefinierte Metriken nutzen oder die Evaluation anhand von selbst definierten Interaktionsfolgen durchführen lassen.<p>
        <img src="../img/usability.jpg" width="300" />
        <p class="type--pos-medium-normal">Möchtest du die Evaluation mit Metriken durchführen?</p>
        <button class="button button--primary" @click="statEval">Metriken-Evaluation</button>
        <p class="type--pos-medium-normal">Möchtest du eigene Funktionsabläufe erstellen und evaluieren?</p>
        <button class="button button--primary" @click="dynEval">Aufgaben-Evaluation</button>
    </div>
</template>

<script>
import { dispatch } from '../uiMessageHandler';

export default {
    name: 'Start',
    methods: {
        statEval() {
            dispatch('showStatEval');
        },
        dynEval() {
            dispatch('showDynEval');
        }
    }
}
</script>

<style lang='scss'>
    @import "../figma-ui/figma-plugin-ds";
    @import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .start-ui {
		padding: 10px;
        text-align: center;
	}
</style>
