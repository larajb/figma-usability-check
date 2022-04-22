import { v4 as uuidv4 } from 'uuid';
import { dispatch, handleEvent } from '../codeMessageHandler';
import { Goms } from './goms/Goms';
import { checkButtonValidity, checkInputExample, checkInputValidity, checkLinkValidity, checkTaskComparisonValidity, checkValidity } from './helper/validityHelper';
import { checkUsabilitySmells, createExampletext, createTaskAnnotation, deleteStepAnnotation, getElementToAnnotation, updateStepAnnotation } from './helper/dynevalHelper';
import { longP, manyH } from './helper/usabilitySmellsHelper';
// import { getStorage, setStorage } from '../figmaAccess/storage';

export const dynevalView = () => {

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
        dispatch('taskStepAdded', { taskname: args.taskname, id: taskAnnotation.id});
    });

    handleEvent('addTaskSteps', (args) => {
        var addedSteps = [];
        for (let i = 0; i < args.steps.length; i++) {
            var selection = getElementToAnnotation(args.steps[i].id);
            var taskAnnotation = createTaskAnnotation(args.taskname, i, args.color, selection);
            addedSteps.push({ id: taskAnnotation.id, type: args.steps[i].type, input: args.steps[i].input });
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

    handleEvent('checkButtonValidity', async (platform) => {
        var validity = await checkButtonValidity(platform);
        dispatch('buttonValidity', validity);
    });

    handleEvent('checkInputExample', async (platform) => {
        var result = await checkInputExample(platform);
        dispatch('inputExampleCheck', result);
    });

    handleEvent('checkInputValidity', async (args) => {
        var validity = false;
        if (args.input !== null) {
            validity = await checkInputValidity(args.input, args.platform);
        } else {
            validity = true;
        }
        dispatch('inputValidity', validity);
    });

    handleEvent('checkLinkValidity', async (platform) => {
        var validity = await checkLinkValidity(platform);
        dispatch('linkValidity', validity);
    });

    handleEvent('checkTaskComparisonValidity', async (args) => {
        var validity = await checkTaskComparisonValidity(args.firstTask, args.secondTask);
        dispatch('taskComparisonValidity', validity);
    })

    /**
     * Evaluation
     */
    handleEvent('evaluateTask', async (task) => {
        var history = await figma.clientStorage.getAsync('taskEvaluation');
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');
        var smells = checkUsabilitySmells(history, task);
        var model = new Goms(0.2);
        var convertedSteps = model.convertToOperators(task);
        var convertedStepsAndTime = model.getTimeForOperators(task.steps, convertedSteps);
        var time = model.calculateGomsTime(task, convertedSteps);
        var pointingTimeSmell = longP(model.pointingTimes, avgPointingTime);
        if (pointingTimeSmell.isFound) {
            smells.push({ title: 'Long P', values: pointingTimeSmell.values, steps: pointingTimeSmell.values });
        }
        var homingNumSmell = manyH(model.homingNums, avgHomingNum);
        if (homingNumSmell.isFound) {
            smells.push({ title: 'Many H', values: homingNumSmell.values, steps: homingNumSmell.steps });
        }
        dispatch('taskEvaluationResult', { goms: { time: time, convertedSteps: convertedStepsAndTime, avgPointingTime: model.avgPointingTime, avgHomingNum: model.avgHomingNum }, usabilitySmells: smells});
    })

    handleEvent('calculateGomsComparison', (task) => {
        var model = new Goms(0.2);
        var convertedSteps = model.convertToOperators(task);
        var time = model.calculateGomsTime(task, convertedSteps);
        dispatch('calculatedGomsComparisonTime', time);
    });

    handleEvent('evaluateScenario', async (args) => {
        var result = [];
        args.scenario.tasks.forEach(task => {
            const taskIndex = args.tasks.findIndex((element) => element.taskname === task.taskname);
            var taskElement = args.tasks[taskIndex];
            var smells = checkUsabilitySmells(args.history, taskElement);
            var model = new Goms(0.2);
            var convertedSteps = model.convertToOperators(taskElement);
            var convertedStepsAndTime = model.getTimeForOperators(taskElement.steps, convertedSteps);
            var time = model.calculateGomsTime(taskElement, convertedSteps);
            var evaluationIndex = -1;
            if (args.history.length > 0) {
                evaluationIndex = args.history.findIndex((element) => element.taskname === task.taskname);
            }
            if (evaluationIndex < 0) {
                args.history.push({
                    id: 0,
                    type: 'task',
                    taskname: task.taskname,
                    color: taskElement.color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: taskElement.steps,
                            goms: { gomsTime: time, convertedSteps: convertedStepsAndTime, avgPointingTime: model.avgPointingTime, avgHomingNum: model.avgHomingNum },
                            usabilitySmells: smells,
                            comparison:  null
                        }
                    ]
                });
            } else {
                args.history[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: taskElement.steps,
                    goms: { gomsTime: time, convertedSteps: convertedStepsAndTime, avgPointingTime: model.avgPointingTime, avgHomingNum: model.avgHomingNum },
                    usabilitySmells: smells,
                    comparison: null
                });
            }
            result.push({ taskname: task.taskname, time: time });
        })
        dispatch('scenarioEvaluationResult', { taskEvaluationHistory: args.history, result: result });
    })

    /**
     * Get and set storage.
     */
    handleEvent('getTaskStorage', async () => {
        // var tasks = await getStorage('tasks');
        var tasks = undefined;
        await figma.clientStorage.getAsync('tasks').then((value) => {
            tasks = value;
        });
        dispatch('currentTaskStorage', tasks);
    });

    handleEvent('setTaskStorage', async (tasks) => {
        // await setStorage('tasks', tasks);
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

    handleEvent('getPointingTimeStorage', async () => {
        var storage = undefined;
        await figma.clientStorage.getAsync('pointingTime').then((value) => {
            storage = value;
        });
        dispatch('pointingTimeStorage', storage);
    });

    handleEvent('setPointingTimeStorage', async (avgPointingTime) => {
        var storage = await figma.clientStorage.getAsync('pointingTime');
        var newStorage = (storage + avgPointingTime) / 2;
        await figma.clientStorage.setAsync('pointingTime', newStorage);
    });

    handleEvent('getHomingNumStorage', async () => {
        var storage = undefined;
        await figma.clientStorage.getAsync('homingNum').then((value) => {
            storage = value;
        });
        dispatch('homingNumStorage', storage);
    });

    handleEvent('setHomingNumStorage', async (avgHomingNum) => {
        var storage = await figma.clientStorage.getAsync('homingNum');
        var newStorage = (storage + avgHomingNum) / 2;
        await figma.clientStorage.setAsync('homingNum', newStorage);
    });
};
