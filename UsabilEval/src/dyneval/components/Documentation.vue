<template>
    <div class="scrollable-docs">
        <p class="type--pos-medium-bold">Anleitung zur Nutzung des Plugins</p>
        <p class="type--pos-medium-normal">
            Dieses Plugin dient zur Usability-Evaluation von UI-Entwürfen. Die Evaluation erfolgt dabei auf Basis von Aufgaben und Szenarien. Eine Aufgabe beschreibt eine 
            Zusammenstellung einzelner Interaktionen zur Erreichung eines Ziels. Übergeordnet können Szenarien definiert werden, die mehrere Aufgaben kombinieren. Damit können 
            komplexere Interaktionsfolgen untersucht werden.
            <br>
            <br>
            Für eine korrekte Evaluation durch das Plugin sollte das Prototyping-System von Figma genutzt werden.
        </p>
        <div id="tasks">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Aufgabendefinition</p>
                <IconButton @click="showTaskDefinition = !showTaskDefinition" :icon="showTaskDefinition ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showTaskDefinition" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Auf der Seite unter dem Reiter <i>Aufgaben</i> können einzelne Aufgaben erzeugt, bearbeitet und gelöscht werden. Zur Erzeugung einer Aufgabe muss in dem ersten 
                    Eingabefeld eine Name eingegeben werden. Ein Klick auf den Button <i>Erstellen</i> fügt die Aufgabe hinzu, sofern der Name noch nicht verwendet wird. Nachdem eine 
                    neue Aufgabe hinzugefügt wurde, können ihr Bearbeitungsschritte hinzugefügt werden. Ein Bearbeitungsschritt ist die Interaktion mit einem Interaktionselement. Das 
                    Plugin sieht die Verwendung der folgenden drei Interaktionselemente vor:
                    <ul>
                        <li>Button</li>
                        <li>Eingabe</li>
                        <li>Link</li>
                    </ul>
                    Um einen Bearbeitungsschritt hinzuzufügen, muss innerhalb des Entwurfes ein Interaktionselements und im Plugin der Interaktionstyp ausgewählt werden. 
                    Anschließend kann der Bearbeitungsschritt über den Button <i>Hinzufügen</i> hinzugefügt werden. Der Bearbeitungsschritt wird dann der Aufgabe hinzugefügt, 
                    dessen Name im Eingabefeld darüber steht. Um die Reihenfolge der Bearbeitungsschritte zu ändern oder einen einzelnen Bearbeitungsschritt zu entfernen, muss in den 
                    Bearbeitungsmodus gewechselt werden, indem der Schieberegler an der entsprechenden Aufgabe aktiviert wird. Innerhalb des Bearbeitungsmodus können außerdem die 
                    Bearbeitungsschritte in eine andere Aufgabe kopiert werden. Um eine ganze Aufgabe zu löschen, muss das Papierkorb-Icon neben dem Aufgabennnamen in der 
                    Aufgabenliste geklickt werden.
                    <br>
                    <br>
                    Hinweis: Eine Aufgabe sollte nicht in einem Overlay starten.
                </p>
            </div>
        </div>
        <div id="scenarios">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Szenariendefinition</p>
                <IconButton @click="showScenarioDefinition = !showScenarioDefinition" :icon="showScenarioDefinition ? 'caret-down' : 'caret-right'" />
            </div>
            <div v-if="showScenarioDefinition" style="margin-left: 20px">
                <p class="type--pos-medium-normal">
                    Wenn eine oder mehrere Aufgaben definiert wurden, können über den Reiter <i>Szenarien</i> Szenarien erstellt werden. Szenarien dienen dazu mehrere Aufgaben, die 
                    zur Erreichung eines gemeinsamen Ziels beitragen, zu gruppieren. Dazu muss zuerst ein Szenario erstellt werden, indem im ersten Eingabefeld auf der entsprechenden 
                    Seite ein Name eingefügt wird und anschließend mit Klick auf den Button <i>Erstellen</i> erzeugt wird. Wenn es noch kein Szenario mit diesem Namen gibt, wird 
                    das neue Szenario in der Szenarienliste im unteren Bereich des Fensters dargestellt. Nun kann bzw. können über die Auswahl eine oder mehrere Aufgaben (nacheinander) 
                    ausgewählt und zu deinem Szenario hinzugefügt werden.
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
                    Die Evaluation kann entweder auf Aufgaben- oder Szenarienebene durchgeführt werden.
                    <br>
                    <br>
                    Zur Evaluation einer Aufgabe muss unter dem Reiter <i>Evaluation</i> die <i>Aufgaben-Evaluation</i> ausgewählt werden. Dort können eine oder zwei Aufgaben zur 
                    Evaluation ausgewählt werden. Werden zwei Aufgaben gewählt, dient die zweite als Vergleichsaufgabe. Beide Aufgaben werden vollständig evaluiert (Vorhersage für 
                    die Bearbeitungsdauer, Suche nach Hinweismustern für Usability-Probleme). Die Darstellung der Ergebnisse konzentriert sich aber auf die Evaluation der ersten 
                    Aufgabe mit Informationen zum Vergleich der beiden Aufgaben.
                    <br>
                    <br>
                    Zur Evaluation eines Szenarios muss unter dem Reiter <i>Evaluation</i> die <i>Szenarien-Evaluation</i> ausgewählt werden. Dort kann anschließend ein Szenario zur 
                    Evaluation ausgesucht werden. Die Evaluation erfolgt auf Basis der einzelnen Aufgaben. Ergänzend dazu werden die Übergangsbereiche zwischen den Aufgaben 
                    untersucht.
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
                    Nach der Evaluation können die Ergebnisse unter dem Reiter <i>Ergebnisse</i> eingesehen werden.
                    <br>
                    <br>
                    Bei der Evaluation einer Aufgabe wird eine zeitliche Übersicht über die verschiedenen zur Bearbeitung der Aufgabe notwendigen Aktionen dargestellt. Darunter wird 
                    die Zeit zur Bearbeitung der Aufgabe angegeben. Falls eine Vergleichsaufgabe angegeben wurde, wird auch ihre Dauer hier angezeigt. Falls Hinweismuster auf 
                    Usability-Probleme gefunden wurden, werden sie unter der Darstellung der Bearbeitungsdauer aufgelistet. Falls sich das Hinweismuster auf einen bestimmten 
                    Bearbeitungsschritt bezieht, wird dieser neben einer Beschreibung des Problems und einem Hin-weis zur Behebung hier angegeben.
                    <br>
                    <br>
                    Bei der Evaluation eines Szenarios wird ein Balkendiagramm dargestellt, in dem die Bearbeitungsdauer des gesamten Szenarios dargestellt wird. Dabei werden die 
                    Zeiten der einzelnen Aufgaben farblich unterschieden. Der Klick auf den Balken einer Aufgabe öffnet darunter die Detailansicht der Evaluation, die der zuvor 
                    beschrieben Ansicht bei der Aufgabenevaluation entspricht. Wenn keine Aufgabe ausgewählt ist, wird unter dem Balkendiagramm die Gesamtbearbeitungsdauer und 
                    die in den Übergängen gefundenen Hinweismuster dargestellt. Um aus der Aufgabenansicht wieder auf die Szenarienansicht zurück zu kommen, muss innerhalb den 
                    Graphen außerhalb der Aufgabenbalken geklickt werden.
                </p>
            </div>
        </div>
        <div id="abbreviations">
            <div style="display: flex;">
                <p class="type--pos-medium-bold">Verwendete Abkürzungen</p>
                <IconButton @click="showAbbreviations = !showAbbreviations" :icon="showAbbreviations ? 'caret-down' : 'caret-right'" />
            </div>
            <table v-if="showAbbreviations" class="table" style="margin-left: 20px">
                <tr>
                    <td><p class="type--pos-small-normal">H</p></td>
                    <td><p class="type--pos-small-normal">Homing: "Homing" bezeichnet bei der Interaktion mit einer Benutzungsoberfläche den Wechsel zwischen der Maus und der Tastatur.</p></td>
                </tr>
                <tr>
                    <td><p class="type--pos-small-normal">K</p></td>
                    <td><p class="type--pos-small-normal">Keystroke: "Keystroke" bezeichnet sowohl Tasten- als auch Mausklicks.</p></td>
                </tr>
                <tr>
                    <td><p class="type--pos-small-normal">M</p></td>
                    <td><p class="type--pos-small-normal">Mentally Prepare: "Mentally Prepare" wird bei der Interaktion mit einer Benutzungsoberfläche dort eingefügt, wo ein/e Nutzer*in sich mental auf die folgenden Tätigkeiten vorbereiten muss.</p></td>
                </tr>
                <tr>
                    <td><p class="type--pos-small-normal">P</p></td>
                    <td><p class="type--pos-small-normal">Pointing: "Pointing" bezeichnet den Prozess des Anvisierens eines Interaktionselement. Die Dauer ist dabei abhängig von der Größe des Zielelements und der aktuellen Entfernung des Mauscursors vom Ziel.</p></td>
                </tr>
                <tr>
                    <td><p class="type--pos-small-normal">R</p></td>
                    <td><p class="type--pos-small-normal">Responding: "Responding" bezeichnet Momente, in denen auf eine Rückmeldung des Systems gewartet werden muss. Hier werden damit vor allem Seitenwechsel markiert.</p></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { IconButton } from 'figma-plugin-ds-vue';

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
        }
    }
}
</script>

<style lang="scss">
    @import "../../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

    .table {
		border-spacing: 10px;
	}

    .scrollable-docs {
        max-height: 80%;
        overflow-y: scroll;
    }
</style>