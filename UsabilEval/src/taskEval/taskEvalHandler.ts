import { dispatch, handleEvent } from '../codeMessageHandler';
import { checkButtonValidity, checkForAnnotationGroup, checkInputExample, checkInputValidity, checkLinkValidity, checkValidity } from './helper/validityHelper';
import { createExampletext, createTaskAnnotation, deleteStepAnnotation, getElementToAnnotation, updateStepAnnotation } from './helper/taskEvalHelper';
import { checkUsabilitySmells, distantContent, highWebsiteElementDistance } from './helper/usabilitySmellsHelper';
import { startView } from '../start/startHandler';
import { getCurrentSelection } from '../figmaAccess/fileContents';
import { calculateTime, convertToOperators, getTimeForOperators, getTimeForSteps } from './helper/gomsHelper';

export const taskEvalView = () => {

    handleEvent('backToStart', () => {
        figma.showUI(__uiFiles__.start);
        startView();
        figma.ui.resize(450, 550);
    });

    /**
     * Create, update and delete annotations
     */
    handleEvent('addTaskStep', (args) => {
        if (args.type === 'input') {
            var isAdded = createExampletext(args.input, args.taskname);
        }
        if (args.index !== undefined) {
            var taskAnnotation = createTaskAnnotation(args.taskname, args.numSteps, args.color, null, args.index);
        } else {
            var taskAnnotation = createTaskAnnotation(args.taskname, args.numSteps, args.color);
        }
        var selection = getCurrentSelection();
        if (selection !== null) {
            dispatch('taskStepAdded', { taskname: args.taskname, id: taskAnnotation.id, name: selection.name });
        }
    });

    handleEvent('addTaskSteps', (args) => {
        var addedSteps = [];
        for (let i = 0; i < args.steps.length; i++) {
            var selection = getElementToAnnotation(args.steps[i].id);
            var taskAnnotation = createTaskAnnotation(args.taskname, i, args.color, selection);
            addedSteps.push({ id: taskAnnotation.id, name: selection.name, type: args.steps[i].type, input: args.steps[i].input });
        }
        dispatch('taskStepsAdded', { taskname: args.taskname, steps: addedSteps });
    })

    handleEvent('deleteStep', (args) => {
        deleteStepAnnotation(args.step, args.followingSteps);
    });

    handleEvent('deleteSteps', (args) => {
        for (let i = 0; i < args.steps.length; i++) {
            deleteStepAnnotation(args.steps[i], undefined);
        }
    });

    handleEvent('updateStepNumbers', (tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < tasks[i].steps.length; j++) {
                updateStepAnnotation(tasks[i].steps[j].id, j+1);
            }
        }
    })
    
    /**
     * Check the validity of connections between task steps and the validity of ui element charactertistics.
     */

    handleEvent('checkSelection', async () => {
        var selected = checkForAnnotationGroup();
        dispatch('selectionChecked', selected);
    });

    handleEvent('checkStepValidityBefore', async (args) => {
        var validity = await checkValidity(args);
        dispatch('validityBefore', validity);
    });

    handleEvent('checkValidityBefore', async (args) => {
        var validity = await checkValidity(args);
        dispatch('validityBefore', validity);
    });

    handleEvent('checkStepValidityAfter', async (args) => {
        var validity = await checkValidity(args);
        dispatch('validityAfter', validity);
    });

    handleEvent('checkButtonValidity', async () => {
        var validity = await checkButtonValidity();
        dispatch('buttonValidity', validity);
    });

    handleEvent('checkInputExample', async () => {
        var result = await checkInputExample();
        dispatch('inputExampleCheck', result);
    });

    handleEvent('checkInputValidity', async (input) => {
        var validity = false;
        if (input !== null) {
            validity = await checkInputValidity(input);
        } else {
            validity = true;
        }
        dispatch('inputValidity', validity);
    });

    handleEvent('checkLinkValidity', async () => {
        var validity = await checkLinkValidity();
        dispatch('linkValidity', validity);
    });

    /**
     * Evaluation
     */
    handleEvent('evaluateTask', async (task) => {
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');

        var convertedSteps = convertToOperators(task);
        var operatorTimes = getTimeForOperators(task.steps, convertedSteps);
        var stepsTimes = getTimeForSteps(operatorTimes);
        var gomsResult = calculateTime(task.steps, convertedSteps);
        
        var smells = checkUsabilitySmells(task.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
        var longPSmell = smells.find(smell => smell.title === 'Long P');
        if (longPSmell === undefined) {
            await figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
        }
        var manyHSmell = smells.find(smell => smell.title === 'Many H');
        if (manyHSmell === undefined) {
            await figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
        }

        dispatch('taskEvaluationResult', { goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes }, usabilitySmells: smells});
    })

    handleEvent('evaluateTaskComparison', async (task) => {
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');

        var convertedSteps = convertToOperators(task);
        var operatorTimes = getTimeForOperators(task.steps, convertedSteps);
        var stepsTimes = getTimeForSteps(operatorTimes);
        var gomsResult = calculateTime(task.steps, convertedSteps);

        var smells = checkUsabilitySmells(task.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
        var longPSmell = smells.find(smell => smell.title === 'Long P');
        if (longPSmell === undefined) {
            await figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
        }
        var manyHSmell = smells.find(smell => smell.title === 'Many H');
        if (manyHSmell === undefined) {
            await figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
        }
        
        dispatch('comparisonTaskEvaluationResult', { goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes }, usabilitySmells: smells});
    });

    handleEvent('evaluateScenario', async (args) => {
        var result = [];
        var scenarioSteps = [];
        var transitionSteps = [];
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');
        for (let i = 0; i < args.scenario.tasks.length; i++) {
            const taskIndex = args.tasks.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            var taskElement = args.tasks[taskIndex];
            for (let j = 0; j < taskElement.steps.length; j++) {
                if (i !== args.scenario.tasks.length-1 && j === taskElement.steps.length-2) {
                    transitionSteps.push({ transitionNum: i + 1, steps: [ taskElement.steps[j] ]});
                } else if (i !== args.scenario.tasks.length-1 && j === taskElement.steps.length-1) {
                    transitionSteps[i].steps.push(taskElement.steps[j]);
                } else if (i >= 1 && (j === 0 || j == 1)) {
                    transitionSteps[i - 1].steps.push(taskElement.steps[j]);
                }
            }
            taskElement.steps.forEach(step => {
                scenarioSteps.push(step);
            })
            var convertedSteps = convertToOperators(taskElement);
            var operatorTimes = getTimeForOperators(taskElement.steps, convertedSteps);
            var stepsTimes = getTimeForSteps(operatorTimes);
            var gomsResult = calculateTime(taskElement.steps, convertedSteps);
            var taskSmells = checkUsabilitySmells(taskElement.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
            var longPSmell = taskSmells.find(smell => smell.title === 'Long P');
            if (longPSmell === undefined) {
                await figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
            }
            var manyHSmell = taskSmells.find(smell => smell.title === 'Many H');
            if (manyHSmell === undefined) {
                await figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
            }

            var evaluationIndex = -1;
            if (args.history.length > 0) {
                evaluationIndex = args.history.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            }
            if (evaluationIndex < 0) {
                args.history.push({
                    id: 0,
                    type: 'task',
                    taskname: args.scenario.tasks[i].taskname,
                    color: taskElement.color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: taskElement.steps,
                            goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                            usabilitySmells: taskSmells,
                            comparison:  null
                        }
                    ]
                });
            } else {
                args.history[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: taskElement.steps,
                    goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                    usabilitySmells: taskSmells,
                    comparison: null
                });
            }
            result.push({ taskname: args.scenario.tasks[i].taskname, time: gomsResult.time });
        }
        var scenarioSmells = [];
        var highWebsiteElementDistanceResult = highWebsiteElementDistance(scenarioSteps);
        if (highWebsiteElementDistanceResult.isFound) {
            scenarioSmells.push({ title: 'High Website Element Distance', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps })
        }
        var distantContentFound = false;
        var distantContentValues = [];
        var distantContentSteps = [];
        transitionSteps.forEach(transition => {
            var distantContentResult = distantContent(transition.steps);
            if (distantContentResult.isFound) {
                distantContentFound = true;
                distantContentValues.push(distantContentResult.values);
                distantContentSteps.push(transition.transitionNum);
            }
        })
        scenarioSmells.push({ title: 'Distant Content', isFound: distantContentFound, values: distantContentValues, steps: distantContentSteps });
        dispatch('scenarioEvaluationResult', { taskEvaluationHistory: args.history, gomsTimes: result, usabilitySmells: scenarioSmells });
    })

    handleEvent('evaluateScenarioComparison', async (args) => {
        var result = [];
        var scenarioSteps = [];
        var transitionSteps = [];
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');
        for (let i = 0; i < args.scenario.tasks.length; i++) {
            const taskIndex = args.tasks.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            var taskElement = args.tasks[taskIndex];
            for (let j = 0; j < taskElement.steps.length; j++) {
                if (i !== args.scenario.tasks.length-1 && j === taskElement.steps.length-2) {
                    transitionSteps.push({ transitionNum: i + 1, steps: [ taskElement.steps[j] ]});
                } else if (i !== args.scenario.tasks.length-1 && j === taskElement.steps.length-1) {
                    transitionSteps[i].steps.push(taskElement.steps[j]);
                } else if (i >= 1 && (j === 0 || j == 1)) {
                    transitionSteps[i - 1].steps.push(taskElement.steps[j]);
                }
            }
            taskElement.steps.forEach(step => {
                scenarioSteps.push(step);
            })
            var convertedSteps = convertToOperators(taskElement);
            var operatorTimes = getTimeForOperators(taskElement.steps, convertedSteps);
            var stepsTimes = getTimeForSteps(operatorTimes);
            var gomsResult = calculateTime(taskElement.steps, convertedSteps);
            var taskSmells = checkUsabilitySmells(taskElement.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
            var longPSmell = taskSmells.find(smell => smell.title === 'Long P');
            if (longPSmell === undefined) {
                await figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
            }
            var manyHSmell = taskSmells.find(smell => smell.title === 'Many H');
            if (manyHSmell === undefined) {
                await figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
            }

            var evaluationIndex = -1;
            if (args.history.length > 0) {
                evaluationIndex = args.history.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            }
            if (evaluationIndex < 0) {
                args.history.push({
                    id: 0,
                    type: 'task',
                    taskname: args.scenario.tasks[i].taskname,
                    color: taskElement.color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: taskElement.steps,
                            goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                            usabilitySmells: taskSmells,
                            comparison:  null
                        }
                    ]
                });
            } else {
                args.history[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: taskElement.steps,
                    goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                    usabilitySmells: taskSmells,
                    comparison: null
                });
            }
            result.push({ taskname: args.scenario.tasks[i].taskname, time: gomsResult.time });
        }
        var scenarioSmells = [];
        var highWebsiteElementDistanceResult = highWebsiteElementDistance(scenarioSteps);
        if (highWebsiteElementDistanceResult.isFound) {
            scenarioSmells.push({ title: 'High Website Element Distance', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps })
        }
        var distantContentFound = false;
        var distantContentValues = [];
        var distantContentSteps = [];
        transitionSteps.forEach(transition => {
            var distantContentResult = distantContent(transition.steps);
            if (distantContentResult.isFound) {
                distantContentFound = true;
                distantContentValues.push(distantContentResult.values);
                distantContentSteps.push(transition.transitionNum);
            }
        })
        if (distantContentFound) {
            scenarioSmells.push({ title: 'Distant Content', isFound: distantContentFound, values: distantContentValues, steps: distantContentSteps });
        }
        dispatch('comparisonScenarioEvaluationResult', { taskEvaluationHistory: args.history, gomsTimes: result, usabilitySmells: scenarioSmells });
    })

    /**
     * Get and set storage.
     */
    handleEvent('getTaskStorage', async () => {
        var tasks = undefined;
        await figma.clientStorage.getAsync('tasks').then((value) => {
            tasks = value;
        });
        dispatch('currentTaskStorage', tasks);
    });

    handleEvent('setTaskStorage', async (tasks) => {
        await figma.clientStorage.setAsync('tasks', tasks);
    })

    handleEvent('getScenarioStorage', async () => {
        var scenarios = undefined;
        await figma.clientStorage.getAsync('scenarios').then((value) => {
            scenarios = value;
        });
        dispatch('currentScenarioStorage', scenarios);
    });

    handleEvent('setScenarioStorage', async (scenarios) => {
        await figma.clientStorage.setAsync('scenarios', scenarios);
    })

    handleEvent('getTaskEvaluationStorage', async () => {
        var evaluationStorage = undefined;
        await figma.clientStorage.getAsync('taskEvaluation').then((value) => {
            evaluationStorage = value;
        });
        dispatch('currentTaskEvaluationStorage', evaluationStorage);
    });

    handleEvent('getScenarioEvaluationStorage', async () => {
        var evaluationStorage = undefined;
        await figma.clientStorage.getAsync('scenarioEvaluation').then((value) => {
            evaluationStorage = value;
        });
        dispatch('currentScenarioEvaluationStorage', evaluationStorage);
    });

    handleEvent('setTaskEvaluationStorage', async (storage) => {
        await figma.clientStorage.setAsync('taskEvaluation', storage);
    });

    handleEvent('setScenarioEvaluationStorage', async (storage) => {
        await figma.clientStorage.setAsync('scenarioEvaluation', storage);
    });
};
