import { getFrame, getPage } from "../../figmaAccess/fileContentGetters";
/**
 * This is a function to check some usability smells saved in a js file.
 * @param steps
 * @param avgPointingTime
 * @param avgHomingNum
 * @param pointingTimes
 * @param homingNum
 * @returns result
 */
export const checkUsabilitySmells = (steps, avgPointingTime, avgHomingNum, pointingTimes, homingNum) => {
    var results = [];
    var tooManyLayersResult = tooManyLayers(steps);
    if (tooManyLayersResult.isFound) {
        results.push({ title: 'Zu viele Schichten', isFound: tooManyLayersResult.isFound, values: tooManyLayersResult.values, steps: tooManyLayersResult.steps });
    }
    var highWebsiteElementDistanceResult = highWebsiteElementDistance(steps);
    if (highWebsiteElementDistanceResult.isFound) {
        results.push({ title: 'Hohe Website-Element-Abstände', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps });
    }
    var distantContentResult = distantContent(steps);
    if (distantContentResult.isFound) {
        results.push({ title: 'Entfernter Inhalt', isFound: distantContentResult.isFound, values: distantContentResult.values, steps: distantContentResult.steps });
    }
    var pointingTimeSmell = longP(pointingTimes, avgPointingTime);
    if (pointingTimeSmell.isFound) {
        results.push({ title: 'Langes Anvisieren', isFound: pointingTimeSmell.isFound, values: pointingTimeSmell.values, steps: pointingTimeSmell.steps });
    }
    var homingNumSmell = manyH(homingNum, avgHomingNum);
    if (homingNumSmell.isFound) {
        results.push({ title: 'Viele Maus-Tastatur-Wechsel', isFound: homingNumSmell.isFound, values: homingNumSmell.values, steps: homingNumSmell.steps });
    }
    return results;
};
/**
 * This is a function to check for the 'Too Many Layers' usability smell. It counts frame changes and returns true if five or more frame changes are found.
 * @param steps
 * @returns result
 */
export const tooManyLayers = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length; i++) {
        if ((getFrame(steps[i].id).id !== getFrame(steps[i - 1].id).id)) {
            count++;
        }
    }
    if (count >= 5) {
        result.isFound = true;
        result.values.push(count);
    }
    return result;
};
/**
 * This is a function to check for the 'High Website Element Distance' usability smell.
 * @param steps
 * @returns result
 */
export const highWebsiteElementDistance = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var distanceSum = 0.0;
    for (let i = 1; i < steps.length; i++) {
        var currentNode = figma.getNodeById(steps[i].id);
        var beforeNode = figma.getNodeById(steps[i - 1].id);
        var containSame = currentNode.reactions.some(r => beforeNode.reactions.includes(r));
        if (currentNode.id === beforeNode.id || containSame) {
            distanceSum += 0.0;
        }
        else if (currentNode.parent === beforeNode.parent) {
            distanceSum += 0.2;
        }
        else if (getFrame(currentNode.id) === getFrame(beforeNode.id)) {
            distanceSum += 0.5;
        }
        else if (getPage(currentNode.id) === getPage(beforeNode.id)) {
            distanceSum += 0.75;
        }
        else if (getPage(currentNode.id) !== getPage(beforeNode.id)) {
            distanceSum += 1.0;
        }
    }
    var severity = distanceSum / steps.length;
    if (severity > 0.5) {
        result.isFound = true;
    }
    return result;
};
/**
 * This is a function to check for the 'Distant Content' usability smell. It checks if steps contain two frame changes (frame before, current frame and frame after are different)
 * and counts them. Optimal number of findings: 0.
 * @param steps
 * @returns result
 */
export const distantContent = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length - 1; i++) {
        if (getFrame(steps[i - 1].id).id !== getFrame(steps[i].id).id && getFrame(steps[i].id).id !== getFrame(steps[i + 1].id).id) {
            result.isFound = true;
            count++;
            result.steps.push(i + 1);
        }
    }
    result.values.push(count);
    return result;
};
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
            result.steps.push(i + 1);
        }
    }
    return result;
};
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
};
