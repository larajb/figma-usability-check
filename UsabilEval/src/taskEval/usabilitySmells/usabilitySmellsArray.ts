export const usabilitySmellsArray = [
    {
        title: 'Too many layers',
        description: 'The application has too many windows and the user has to go through five or more windows.',
        refactoring: 'It could help to create links to all relevant windows (e.g. via a menu).'
    },
    {
        title: 'High website element distance',
        description: 'Elements of a web page that are necessary to complete a task should be positioned as close to each other as possible.',
        refactoring: 'It might help to position the elements closer together, e.g. on the same side.',
    },
    {
        title: 'Distant content',
        description: 'On this navigation path, a window is quickly exceeded and only used for navigation.',
        refactoring: 'Links to distant content can help.',
    },
    {
        title: 'Long pointing',
        description: 'Targeting an interaction element takes a relatively long time.',
        refactoring: 'It might help to position successive elements closer to each other in terms of x and y position or to enlarge the interaction element.',
    },
    {
        title: 'Many mouse-keyboard changes',
        description: 'When interacting with a mouse and a keyboard, a relatively large number of changes are necessary.',
        refactoring: 'If necessary, it could help to change the order of the steps or to combine several steps. In the implementation, a tab control could help.',
    }
];
