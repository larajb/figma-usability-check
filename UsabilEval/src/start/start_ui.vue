<template>
    <div class="start-ui">
        <p class="type--pos-large-bold">Hallo!</p>
        <p class="type--pos-medium-normal">Mit diesem Plugin kannst du automatische Usability-Evaluationen durchführen und Gestaltungsalternativen vergleichen.<p>
        <img src="../img/usability.jpg" width="300" />
        <p class="type--pos-medium-normal">Möchtest du den groben Funktionsumfang deines Entwurfes evaluieren?</p>
        <button class="button button--primary" @click="statEval">Horizontale Evaluation</button>
        <p class="type--pos-medium-normal">Möchtest du einzelne Bereiche des Entwurfs mit ausgeprägter Funktionstiefe evaluieren?</p>
        <button class="button button--primary" @click="dynEval">Vertikale Evaluation</button>
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
