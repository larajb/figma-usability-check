import { getNode } from "../../figmaAccess/fileContents";
import { getFrame, getPage, getParent } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to check some usability smells saved in a js file.
 * @param task 
 * @returns result
 */
 export const checkUsabilitySmells = (steps, avgPointingTime, avgHomingNum, pointingTimes, homingNum) => {
    var results = [];            // smells = [ { title: ..., value: ... }, ... ]

    // Too Many Layers
    var tooManyLayersResult = tooManyLayers(steps);
    if (tooManyLayersResult.isFound) {
        results.push({ title: 'Too Many Layers', isFound: tooManyLayersResult.isFound, values: tooManyLayersResult.values, steps: tooManyLayersResult.steps });
    }
    // High Website Element Distance
    var highWebsiteElementDistanceResult = highWebsiteElementDistance(steps);
    if (highWebsiteElementDistanceResult.isFound) {
        results.push({ title: 'High Website Element Distance', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps })
    }
    // Distant Content
    var distantContentResult = distantContent(steps);
    if (distantContentResult.isFound) {
        results.push({ title: 'Distant Content', isFound: distantContentResult.isFound, values: distantContentResult.values, steps: distantContentResult.steps });
    }
    // Long P
    var pointingTimeSmell = longP(pointingTimes, avgPointingTime);
    if (pointingTimeSmell.isFound) {
        results.push({ title: 'Long P', isFound: pointingTimeSmell.isFound, values: pointingTimeSmell.values, steps: pointingTimeSmell.steps });
    }

    // Many H
    var homingNumSmell = manyH(homingNum, avgHomingNum);
    if (homingNumSmell.isFound) {
        results.push({ title: 'Many H', isFound: homingNumSmell.isFound, values: homingNumSmell.values, steps: homingNumSmell.steps });
    }

    return results;
}

/**
 * This is a function to check for the 'Too Many Layers' usability smell. It counts frame changes and returns true if five or more frame changes are found.
 * @param task 
 * @returns result
 */
export const tooManyLayers = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length; i++) {
        if ((getFrame(steps[i].id).id !== getFrame(steps[i-1].id).id)) {
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
export const highWebsiteElementDistance = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var distanceSum = 0.0;
    // calculate sum of distances
    for (let i = 1; i < steps.length; i++) {
        var currentNode = getNode(steps[i].id);
        var beforeNode = getNode(steps[i-1].id);
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
    var severity = distanceSum / steps.length;
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
export const distantContent = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length - 1; i++) {
        if (getFrame(steps[i-1].id).id !== getFrame(steps[i].id).id && getFrame(steps[i].id).id !== getFrame(steps[i+1].id).id) {
            result.isFound = true
            count++;
            result.steps.push(i+1);
        }
    }
    result.values.push(count);
    return result;
}

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
        if (pointingTimes[i] > (avgPointingTime * 2)) {
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
export const manyH = (homingNum, avgHomingNum) => {
    var result = { isFound: false, values: [], steps: [] };
    if (homingNum > avgHomingNum) {
        result.isFound = true;
        result.values.push(homingNum);
    }
    return result;
}
