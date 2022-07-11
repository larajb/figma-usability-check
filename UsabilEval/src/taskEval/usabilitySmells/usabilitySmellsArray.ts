export const usabilitySmellsArray = [
    {
        title: 'Zu viele Schichten',
        description: 'Die Anwendung besitzt zu viele Fenster und der/die Benutzer/in muss fünf oder mehr Fenster durchlaufen.',
        refactoring: 'Es könnte helfen Verknüpfungen zu allen relevanten Fenstern (bspw. über ein Menü) zu erstellen.'
    },
    {
        title: 'Hohe Website-Element-Abstände',
        description: 'Elemente einer Webseite, die zur Erledigung einer Aufgabe notwendig sind, sollten möglichst nah aneinander positioniert werden.',
        refactoring: 'Es könnte helfen, die Elemente näher aneinander zu positionieren, bspw. auf die gleiche Seite zu bringen.',
    },
    {
        title: 'Entfernter Inhalt',
        description: 'Auf diesem Navigationsweg wird ein Fenster schnell überschritten und dient nur der Navigation.',
        refactoring: 'Ggf. könnten Verlinkungen zu entfernten Inhalten helfen.',
    },
    {
        title: 'Langes Anvisieren',
        description: 'Das Anvisieren eines Interaktionselements dauert verhältnismäßig lange.',
        refactoring: 'Es könnte helfen, aufeinander folgende Elemente in Bezug auf die x- und y-Position näher aneinander zu positionieren oder das Interaktionselement zu vergrößern.',
    },
    {
        title: 'Viele Maus-Tastatur-Wechsel',
        description: 'Bei der Interaktion mit einer Maus und einer Tastatur sind verhältnismäßig viele Wechsel notwendig.',
        refactoring: 'Ggf. könnte es helfen, die Reihenfolge der Schritte zu ändern oder mehrere Schritte zusammenzufassen. In der Implementierung könnte eine Tabulatorsteuerung helfen.',
    }
];
