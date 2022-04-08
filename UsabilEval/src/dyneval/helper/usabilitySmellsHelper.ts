import { getFrame } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to check for the 'Too Many Layers' usability smell.
 * @param task 
 */
export const tooManyLayers = (task) => {
    var result = { isFound: false, value: 0 };
    for (let i = 1; i < task.steps.length; i++) {
        if (getFrame(task.steps[i].id).id !== getFrame(task.steps[i-1].id).id) {
            result.value++;
        }
    }
    if (result.value >= 5) {
        result.isFound = true;
    }
    return result;
}

/**
 * This is a function to check for the 'High Website Element Distance' usability smell.
 * @param task 
 */
// export const highWebsiteElementDistance = (task) => {
    
// }

/**
 * This is a function to check for the 'Laborious Task' usability smell.
 * @param task 
 */
export const laboriousTask = (history, task) => {
    var result = { isFound: false, value: 0 };
    var avgTime = calculateAverageTime(history);
    var avgStepsNum = calculateAverageStepNum(history);
    return result;
}

/**
 * This is a function to check for the 'Cyclic Task' usability smell.
 * @param task 
 */
export const cyclicTask = (task) => {
    
}

/**
 * This is a function to check for the 'Distant Content' usability smell.
 * @param task 
 */
export const distantContent = (task) => {
    var result = { isFound: false, value: 0 };
    for (let i = 0; i < task.steps.length-1; i++) {
        if (getFrame(task.steps[i-1].id).id !== getFrame(task.steps[i].id).id !== getFrame(task.steps[i+1].id).id) {
            result.isFound = true
            result.value++;
        }
    }
    return result;
}

/****************************
 * Helper functions
 ****************************/
/**
 * This is a function to calculate the average time of all already evaluated tasks.
 * @param history 
 */
const calculateAverageTime = (history) => {
    var overallTime = 0;
    var numEvaluations = 0;
    history.forEach(task => {
        task.goms.forEach(goms => {
            overallTime += goms.gomsTime;
            numEvaluations++;
        });
    });
    return overallTime / numEvaluations;
}

/**
 * This is a function to calculate the average step number of all already evaluated tasks. 
 * @param history 
 */
const calculateAverageStepNum = (history) => {
    var overallNumSteps = 0;
    var numEvaluations = 0;
    history.forEach(task => {
        overallNumSteps += task.steps.length;
        task.goms.forEach(goms => {
            numEvaluations++;
        });
    });
    return overallNumSteps / numEvaluations;
}