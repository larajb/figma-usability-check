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
    if (history !== undefined) {
        var avgTime = calculateAverageTime(history);
        var avgStepsNum = calculateAverageStepNum(history);
    }
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
    for (let i = 1; i < task.steps.length - 1; i++) {
        if (getFrame(task.steps[i-1].id).id !== getFrame(task.steps[i].id).id && getFrame(task.steps[i].id).id !== getFrame(task.steps[i+1].id).id) {
            result.isFound = true
            result.value++;
        }
    }
    return result;
}

/**
 * This is a function to check if a task contains pointing times much bigger (1.5 times) than the average pointing time.
 * @param pointingTimes 
 * @param avgPointingTime 
 * @returns result
 */
export const longP = (pointingTimes, avgPointingTime) => {
    var result = { isFound: false, value: [] };
    for (let i = 0; i < pointingTimes.length; i++) {
        if (pointingTimes[i] > (avgPointingTime * 1.5)) {
            result.isFound = true;
            result.value.push(i);
        }
    }
    return result;
}

/**
 * This is a function to check if a task contains steps with homing numbers much bigger (1.5 times) than the average homging number.
 * @param homingNums 
 * @param avgHomingNum 
 * @returns result
 */
export const manyH = (homingNums, avgHomingNum) => {
    var result = { isFound: false, value: [] };
    for (let i = 0; i < homingNums.length; i++) {
        if (homingNums[i] > (avgHomingNum * 1.5)) {
            result.isFound = true;
            result.value.push(i);
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
    var avgTime = 0;
    if (history.length > 1) {
        history.forEach(task => {
            task.evaluationRuns.forEach(run => {
                overallTime += run.goms.gomsTime;
                numEvaluations++;
            });
        });
        avgTime = overallTime / numEvaluations;
    }
    return avgTime;
}

/**
 * This is a function to calculate the average step number of all already evaluated tasks. 
 * @param history 
 */
const calculateAverageStepNum = (history) => {
    var overallNumSteps = 0;
    var numEvaluations = 0;
    var avgNum = 0;
    if (history.length > 1) {
        history.forEach(task => {
            task.evaluationRuns.forEach(run => {
                overallNumSteps += run.steps.length;
                numEvaluations++;
            });
        });
        avgNum = overallNumSteps / numEvaluations;
    }
    return avgNum;
}