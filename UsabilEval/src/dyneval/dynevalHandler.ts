import { dispatch, handleEvent } from '../codeMessageHandler';
import { Goms } from './goms/Goms';
import { checkButtonValidity, checkInputValidity, checkLinkValidity, checkValidity } from './helper/validityHelper';
import { checkUsabilitySmells, createExampletext, createTaskAnnotation, deleteStepAnnotation, updateStepAnnotation } from './helper/dynevalHelper';
// import { getStorage, setStorage } from '../figmaAccess/storage';

export const dynevalView = () => {

    /**
     * Create, update and delete annotations
     */
    handleEvent('addTaskStep', (args) => {
        if (args.type === 'input') {
            var text = createExampletext(args.input, args.taskname);
        }
        var taskAnnotation = createTaskAnnotation(args.taskname, args.numSteps, args.color);
        dispatch('taskStepAdded', { taskname: args.taskname, id: taskAnnotation.id});
    });

    handleEvent('deleteStep', (args) => {
        deleteStepAnnotation(args.step, args.followingSteps);
    });

    handleEvent('deleteSteps', (args) => {
        for (let i = 0; i < args.steps.length; i++) {
            console.log(args.steps[i], args.steps.slice(i+1));
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

    handleEvent('checkInputValidity', async (input) => {
        var validity = await checkInputValidity(input);
        dispatch('inputValidity', validity);
    });

    handleEvent('checkLinkValidity', async () => {
        console.log('check link validity');
        var validity = await checkLinkValidity();
        dispatch('linkValidity', validity);
    });

    /**
     * Check usability smells
     */
    handleEvent('checkUsabilitySmells', (task) => {
        var smells = checkUsabilitySmells(task);            // smells = [ { title: ..., value: ... }, ... ]
        var result = { foundSmells: smells, timestamp: Date.now() };
        dispatch('usabilitySmellsResult', result);
    })

    /**
     * Calculate GOMS.
     */
    handleEvent('calculateGoms', (task) => {
        var model = new Goms(0.2);
        var time = model.useGomsModel(task);
        dispatch('calculatedGomsTime', time);
    })

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
};
