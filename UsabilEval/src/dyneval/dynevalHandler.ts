import { dispatch, handleEvent } from '../codeMessageHandler';
import { Goms } from './goms/Goms';
import { checkButtonValidity, checkInputExample, checkInputValidity, checkLinkValidity, checkValidity } from './helper/validityHelper';
import { checkUsabilitySmells, createExampletext, createTaskAnnotation, deleteStepAnnotation, updateStepAnnotation } from './helper/dynevalHelper';
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
        var taskAnnotation = createTaskAnnotation(args.taskname, args.numSteps, args.color);
        dispatch('taskStepAdded', { taskname: args.taskname, id: taskAnnotation.id});
    });

    handleEvent('deleteStep', (args) => {
        deleteStepAnnotation(args.step, args.followingSteps);
    });

    handleEvent('deleteSteps', (args) => {
        for (let i = 0; i < args.steps.length; i++) {
            deleteStepAnnotation(args.steps[i], args.steps.slice(i+1));
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
        var history = await figma.clientStorage.getAsync('taskEvaluation');
        var avgPointingTime = await figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = await figma.clientStorage.getAsync('homingNum');
        var smells = checkUsabilitySmells(history, task);
        var model = new Goms(0.2);
        var time = model.useGomsModel(task);
        var pointingTimeSmell = longP(model.pointingTimes, avgPointingTime);
        if (pointingTimeSmell.isFound) {
            smells.push({ title: 'Long P', value: pointingTimeSmell.value });
        }
        var homingNumSmell = manyH(model.homingNums, avgHomingNum);
        if (homingNumSmell.isFound) {
            smells.push({ title: 'Many H', value: homingNumSmell.value });
        }
        dispatch('evaluationResult', { goms: { time: time, avgPointingTime: model.avgPointingTime, avgHomingNum: model.avgHomingNum }, usabilitySmells: smells});
    })

    handleEvent('calculateGomsComparison', (task) => {
        var model = new Goms(0.2);
        var time = model.useGomsModel(task);
        dispatch('calculatedGomsComparisonTime', time);
    });

    /**
     * Get and set storage.
     */
    handleEvent('getTaskStorage', async () => {
        // var tasks = await getStorage('tasks');
        var tasks = await figma.clientStorage.getAsync('tasks');
        dispatch('currentTaskStorage', tasks);
    });

    handleEvent('setTaskStorage', async (tasks) => {
        // await setStorage('tasks', tasks);
        await figma.clientStorage.setAsync('tasks', tasks);
    })

    handleEvent('getEvaluationStorage', async () => {
        var EvaluationStorage = await figma.clientStorage.getAsync('taskEvaluation');
        dispatch('currentEvaluationStorage', EvaluationStorage);
    });

    handleEvent('setEvaluationStorage', async (storage) => {
        await figma.clientStorage.setAsync('taskEvaluation', storage);
    });

    handleEvent('getPointingTimeStorage', async () => {
        var storage = await figma.clientStorage.getAsync('pointingTime');
        dispatch('pointingTimeStorage', storage);
    });

    handleEvent('setPointingTimeStorage', async (avgPointingTime) => {
        var storage = await figma.clientStorage.getAsync('pointingTime');
        var newStorage = (storage + avgPointingTime) / 2;
        await figma.clientStorage.setAsync('pointingTime', newStorage);
    });

    handleEvent('getHomingNumStorage', async () => {
        var storage = await figma.clientStorage.getAsync('homingNum');
        dispatch('homingNumStorage', storage);
    });

    handleEvent('setHomingNumStorage', async (avgHomingNum) => {
        var storage = await figma.clientStorage.getAsync('homingNum');
        var newStorage = (storage + avgHomingNum) / 2;
        await figma.clientStorage.setAsync('homingNum', newStorage);
    });
};
