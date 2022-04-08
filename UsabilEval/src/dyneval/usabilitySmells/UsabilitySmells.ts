export const usabilitySmellsArray = [
    {
        id: 0,
        title: 'Too Many Layers',
        description: 'Die Anwendung besitzt zu viele Fenster und der/die Benutzer/in muss fünf oder mehr Fenster durchlaufen.',
        evaluationRule: {
            evaluationType: 'quantity',
            span: 'task',
            content: 'node',
            nodeType: 'FRAME',
            max: 5,
        },
        refactoring: 'Dieses Problem könnte gelöst werden, indem Verknüpfungen zu allen relevanten Fenstern erstellt werden. Dazu kann bspw. ein Menü erstellt werden.'
    },
    {
        id: 1,
        title: 'High Website Element Distance',
        description: 'Elemente einer Webseite, die zur Erledigung einer Aufgabe notwendig sind, sollten möglichst nah aneinander positioniert werden.',
        evaluationRule: {
            evaluationType: 'equation',
            span: 'task',
            content: 'placement',
            nodeType: 'RECTANGLE || ELLIPSE || POLYGON || TEXT || GROUP',
            max: 0.5,
        },
        refactoring: '',
    },
    {
        id: 2,
        title: 'Laborious Task',
        description: 'Zur Bearbeitung einer Aufgabe ist eine große Anzahl an Aktionen notwendig.',
        evaluationRule: {
            evaluationType: 'quantity',
            span: 'task',
            content: ['step number', 'task time'],
            nodeType: '',
            max: 'history',
        },
        refactoring: 'Dieses Problem könnte gelöst werden, indem die Ausführung der Aufgabe vereinfacht wird, einige Schritte zusammengefasst werden oder mehrere Teitlaufgaben erstellt werden.',
    },
    {
        id: 3,
        title: 'Cyclic Task',
        description: 'Zur Bearbeitung einer Aufgabe müssen viele sich wiederholende Aktionen durchgeführt werden.',
        evaluationRule: {
            evaluationType: 'equation',
            span: 'task',
            content: 'step repetition',
            nodeType: '',
            max: 0.7,
        },
        refactoring: 'Dieses Problem könnte gelöst werden, indem eine dynamischere Ausführung der Aufgabe ermöglicht wird oder, falls möglich, sich wiederholende Handlungen automatisiert werden.',
    },
    {
        id: 4,
        title: 'Distant Content',
        description: 'Nutzer/innen durchlaufen einen Pfad mit vielen Navigationsschritten zu schnell, so dass sie nicht in der Mitte der Kontrollpunkte stehen bleiben und deren Inhalt sehen bzw. damit interagieren.',
        evaluationRule: {
            evaluationType: 'quantity',
            span: 'step',
            content: 'node change',
            nodeType: 'FRAME',
            max: 1,
        },
        refactoring: 'Dieses Problem könnte gelöst werden, indem Verlinkungen zu entfernten Inhalten erstellt werden.',
    }
];
