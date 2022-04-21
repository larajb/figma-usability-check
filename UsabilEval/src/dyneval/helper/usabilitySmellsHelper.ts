import { getNode } from "../../figmaAccess/fileContents";
import { getFrame, getPage, getParent } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to check for the 'Too Many Layers' usability smell. It counts frame changes and returns true if five or more frame changes are found.
 * @param task 
 * @returns result
 */
export const tooManyLayers = (task) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < task.steps.length; i++) {
        if (getFrame(task.steps[i].id).id !== getFrame(task.steps[i-1].id).id) {
            count++;
        }
    }
    if (count >= 5) {
        result.isFound = true;
        result.values.push(count);
    }
    return result;
}

/**
 * This is a function to check for the 'High Website Element Distance' usability smell.
 * @param task 
 * @returns result
 */
export const highWebsiteElementDistance = (task) => {
    var result = { isFound: false, values: [], steps: [] };
    var distanceSum = 0.0;
    // calculate sum of distances
    for (let i = 1; i < task.steps.length; i++) {
        var currentNode = getNode(task.steps[i].id);
        var beforeNode = getNode(task.steps[i-1].id);
        var containSame = currentNode.reactions.some(r=> beforeNode.reactions.includes(r));
        if (currentNode.id === beforeNode.id || containSame) {
            distanceSum += 0.0;
        } else if (getParent(currentNode.id) === getParent(beforeNode.id)) {
            distanceSum += 0.2;
        } else if (getFrame(currentNode.id) === getFrame(beforeNode.id)) {
            distanceSum += 0.5;
        } else if (getPage(currentNode.id) === getPage(beforeNode.id)) {
            distanceSum += 0.75;
        } else if (getPage(currentNode.id) !== getPage(beforeNode.id)) {
            distanceSum += 1.0;
        }
    }
    var severity = distanceSum / task.steps.length;
    if (severity > 0.5) {
        result.isFound = true;
    }
    return result;
}

/**
 * This is a function to check for the 'Distant Content' usability smell. It checks if steps contain two frame changes (frame before, current frame and frame after are different)
 * and counts them. Optimal number of findings: 0.
 * @param task 
 * @returns result
 */
export const distantContent = (task) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < task.steps.length - 1; i++) {
        if (getFrame(task.steps[i-1].id).id !== getFrame(task.steps[i].id).id && getFrame(task.steps[i].id).id !== getFrame(task.steps[i+1].id).id) {
            result.isFound = true
            count++;
            result.steps.push(i+1);
        }
    }
    result.values.push(count);
    return result;
}

// /**
//  * This is a function to check for the 'Laborious Task' usability smell.
//  * @param task 
//  */
// export const laboriousTask = (history, task) => {
//     var result = { isFound: false, values: [], steps: [] };
//     if (history !== undefined) {
//         var avgTime = calculateAverageTime(history);
//         var avgStepsNum = calculateAverageStepNum(history);
//     }
//     return result;
// }

// /**
//  * This is a function to check for the 'Cyclic Task' usability smell.
//  * @param task 
//  */
// export const cyclicTask = (task) => {
    
// }

/**
 * This is a function to check if a task contains pointing times much bigger (1.5 times) than the average pointing time. The average pointing time is calculated from past evaluations.
 * @param pointingTimes 
 * @param avgPointingTime 
 * @returns result
 */
export const longP = (pointingTimes, avgPointingTime) => {
    var result = { isFound: false, values: [], steps: [] };
    for (let i = 0; i < pointingTimes.length; i++) {
        if (pointingTimes[i] > (avgPointingTime * 1.5)) {
            result.isFound = true;
            result.values.push(pointingTimes[i]);
            result.steps.push(i+1);
        }
    }
    return result;
}

/**
 * This is a function to check if a task contains steps with homing numbers much bigger (1.5 times) than the average homging number. The average homing number is calculated from
 * past evaluations.
 * @param homingNums 
 * @param avgHomingNum 
 * @returns result
 */
export const manyH = (homingNums, avgHomingNum) => {
    var result = { isFound: false, values: [], steps: [] };
    for (let i = 0; i < homingNums.length; i++) {
        if (homingNums[i] > (avgHomingNum * 1.5)) {
            result.isFound = true;
            result.values.push(homingNums[i]);
            result.steps.push(i+1);
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