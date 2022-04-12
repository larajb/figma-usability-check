export const usabilitySmellsArray = [
    {
        id: 0,
        title: 'Too Many Layers',
        description: 'Die Anwendung besitzt zu viele Fenster und der/die Benutzer/in muss fünf oder mehr Fenster durchlaufen.',
        refactoring: 'Dieses Problem könnte gelöst werden, indem Verknüpfungen zu allen relevanten Fenstern erstellt werden. Dazu kann bspw. ein Menü erstellt werden.'
    },
    {
        id: 1,
        title: 'High Website Element Distance',
        description: 'Elemente einer Webseite, die zur Erledigung einer Aufgabe notwendig sind, sollten möglichst nah aneinander positioniert werden.',
        refactoring: '',
    },
    {
        id: 2,
        title: 'Laborious Task',
        description: 'Zur Bearbeitung einer Aufgabe ist eine große Anzahl an Aktionen notwendig.',
        refactoring: 'Dieses Problem könnte gelöst werden, indem die Ausführung der Aufgabe vereinfacht wird, einige Schritte zusammengefasst werden oder mehrere Teitlaufgaben erstellt werden.',
    },
    {
        id: 3,
        title: 'Cyclic Task',
        description: 'Zur Bearbeitung einer Aufgabe müssen viele sich wiederholende Aktionen durchgeführt werden.',
        refactoring: 'Dieses Problem könnte gelöst werden, indem eine dynamischere Ausführung der Aufgabe ermöglicht wird oder, falls möglich, sich wiederholende Handlungen automatisiert werden.',
    },
    {
        id: 4,
        title: 'Distant Content',
        description: 'Nutzer/innen durchlaufen einen Pfad mit vielen Navigationsschritten zu schnell, so dass sie nicht in der Mitte der Kontrollpunkte stehen bleiben und deren Inhalt sehen bzw. damit interagieren.',
        refactoring: 'Dieses Problem könnte gelöst werden, indem Verlinkungen zu entfernten Inhalten erstellt werden.',
    },
    {
        id: 5,
        title: 'Long P',
        description: 'Das Zurücklegen eines Weges zwischen zwei Interaktionselementen dauert länger als der allgemeine Durchschnitt.',
        refactoring: 'Aufeinanderfolgende Interaktionselemente sollten näher aneinander positioniert werden.',
    },
    {
        id: 6,
        title: 'Many H',
        description: 'Bei der Interaktion mit einer Maus und einer Tastatur sind viele Wechsel notwendig.',
        refactoring: '',
    }
];
