<template>
    <div class="documentation--scrollable">
        <p class="type--pos-medium-bold">Anleitung zur Nutzung des Plugins</p>
        <p class="type--pos-medium-normal">
            Dieses Plugin dient zur Usability-Evaluation von UI-Entwürfen anhand von einigen Metriken. Zur Evaluation können eine oder mehrere Metriken ausgewählt werden. 
            Anschließend muss/müssen der/die Frames ausgewählt werden, der/die evaluiert werden soll(en). Nach der Evaluation wird ein Ergebnis zu jeder der ausgewählten Metriken 
            angezeigt. Werden die gleichen Frames mehrfach evaluiert, können vorherige Evaluationsergebnisse angeschaut werden.
        </p>
        <div id="metrics">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Metriken</p>
                <IconButton @click="showMetrics = !showMetrics" :icon="showMetrics ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showMetrics" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Zur Zeit können die folgenden Metriken zu Evaluation genutzt werden:
                    <ul>
                        <li v-for="(metric, index) in metrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    Weitere Erläuterungen befinden sich in der Metrikenauswahl unter der jeweiligen Metrik.
                </p>
            </div>
        </div>
        <div id="evaluationProfiles">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Evaluationsprofile</p>
                <IconButton @click="showEvaluationProfiles = !showEvaluationProfiles" :icon="showEvaluationProfiles ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showEvaluationProfiles" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Evaluationsprofile sollen dir die Arbeit erleichtern. Sie bilden eine Gruppierung mehrerer Metriken. Zur Zeit gibt es bereits die folgenden vodefinierten 
                    Evauationsprofile:
                    <ul>
                        <li v-for="(profile, index) in profiles" :key="index">
                            {{ profile.title }}
                            <ul>
                                <li v-for="(metric, index2) in profile.metrics" :key="index2">{{ metric }}</li>
                            </ul>
                        </li>
                    </ul>
                    Auf der Seite der Metrikenauswahl können weitere Evaluationsprofile hinzugefügt werden. Wähle dazu einfach die Metriken aus, die du gruppieren möchtest und 
                    wähle in dem Eingabefeld unter der Metrikenliste einen Namen für dein neues Evaluationsprofil. Bestätige das Profil anschließend mit einem Klick auf den Button 
                    <i>Erstellen</i>. Falls du ein Evaluationsprofil doch nicht mehr benötigst, kannst du es ganz unten auf der Seite der Metrikenauswahl wieder entfernen. Wähle dazu 
                    einfach unter aus der Auswahl das entprechende Profil aus und lösche es durch einen Klick auf den Button <i>Löschen</i>.
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
                    Nachdem du eine oder mehrere Metriken zur Evaluation gewählt hast, musst du noch einen oder mehrere Frames auswählen, die evaluiert werden sollen. Einige Metriken 
                    benötigen mehrere Frames zur Evaluation. Falls du eine solche Metrik ausgewählt hast, musst du mehrere Frames zur Evaluation auswählen.
                    <br>
                    <br>
                    Die folgenden Metriken benötigen mindestens einen Frame zur Evaluation:
                    <ul>
                        <li v-for="(metric, index) in singleFrameMetrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    Die folgenden Metriken benötigen mindestens zwei Frames zur Evaluation:
                    <ul>
                        <li v-for="(metric, index) in multipleFrameMetrics" :key="index">{{ metric.title }}</li>
                    </ul>
                    Es kann außerdem vorkommen, dass eine weitere Eingabe benötigt wird. Falls dies der Fall ist, befindet sich auf der Seite <i>Evaluation</i> eine Aufforderung zur 
                    Eingabe oder Auswahl.
                </p>
            </div>
        </div>
        <div id="results">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Ergebnisdarstellung</p>
                <IconButton @click="showResults = !showResults" :icon="showResults ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showResults" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Nach der Evaluation werden deine Evaluationsergebnisse auf der Seite <i>Ergebnisse</i> dargestellt. Die Darstellung der Ergebnisse erfolgt in Listenform. Jede 
                    Metrik, die zur Evaluation ausgewählt wurde, ist in dieser Liste zu finden. Links von dem Namen wird eins der folgenden Symbole abgebildet:</p>
                <div style="display: flex">
                    <Icon icon="resolve-filled" class="icon--green" />
                    <Icon icon="warning" class="icon--yellow" />
                    <Icon icon="warning" class="icon--red" />
                </div>
                <p class="type--pos-medium-normal">
                    Das grüne Symbol weist darauf hin, dass kein Verstoß der Vorgabe gefunden wurde, die der Metrik zugrunde liegt. Sowohl das gelbe aus auch das rote Symbol weisen 
                    darauf hin, dass Verstöße entdeckt wurden. Bei der Auswahl der Fehler-Symbole entscheidet der Anteil der fehlerhaften Elemente von allen Elementen des Typs, den 
                    die Metrik adressiert. Fehlt bspw. auf sehr vielen Seiten der Verweis auf die Startseite, so wird das rote Symbol neben der Metrik <i>Verweis auf Startseite</i> 
                    dargestellt. Wenn allerdings nur ein kleiner Teil aller Seiten noch keinen Verweis auf die Startseite hat, wird das gelbe Symbol angezeigt.
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