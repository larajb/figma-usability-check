import { getNode } from "../../figmaAccess/fileContents";
import { getCenterOfNode, getCenterOfNodeOnOverlay, getFrame, getReactions, getRelativeTransform, getWidth } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to convert task steps to an array of steps containing operators.
 * @param task 
 * @returns convertedSteps
 */
export const convertToOperators = (task) => {
    var convertedSteps = replacePatterns(task.steps);
    convertedSteps = placeResponseTimeOperator(task.steps, convertedSteps);
    convertedSteps = placeMentallyPreparingOperator(convertedSteps);
    return convertedSteps;
}

/**
 * This is a function to convert an array of steps containing operators to an array containing the times per operator.
 * @param steps 
 * @param convertedSteps 
 * @returns operatorTimes
 */
 export const getTimeForOperators = (steps, convertedSteps) => {
    var operatorTimes = [];
    for (let i = 0; i < convertedSteps.length; i++) {
        operatorTimes.push([]);
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch(convertedSteps[i][j]) {
                case 'H':
                    operatorTimes[i].push({ operator: 'H', time: 0.4 });
                    break;
                case 'K':
                    operatorTimes[i].push({ operator: 'K', time: 0.2 });
                    break;
                case 'M':
                    operatorTimes[i].push({ operator: 'M', time: 1.35 });
                    break;
                case 'P':
                    var pointingTime = 0;
                    if (i === 0) {
                        pointingTime = calculateFittsLaw(null, null, steps[i].id);
                    } else if (i === 1) {
                        pointingTime = calculateFittsLaw(null, steps[i-1].id, steps[i].id);
                    } else {
                        pointingTime = calculateFittsLaw(steps[i-2].id, steps[i-1].id, steps[i].id);
                    }
                    operatorTimes[i].push({ operator: 'P', time: pointingTime });
                    break;
                case 'R':
                    operatorTimes[i].push({ operator: 'R', time: 0.2 });
                    break;
            }
        }
    }
    return operatorTimes;
}

export const getTimeForSteps = (operatorTimes) => {
    var stepsTimes = [];
    operatorTimes.forEach(step => {
        var stepTime = 0.0;
        step.forEach(operator => {
            stepTime += operator.time;
        });
        stepsTimes.push(stepTime);
    });
    return stepsTimes;
}

/**
 * This is a function to replace the task steps with goms patterns containing operators
 * @param steps 
 * @returns resultArray
 */
const replacePatterns = (steps) =>  {
    var resultArray = [];
    var homingState = '';
    for (let i = 0; i < steps.length; i++) {
        switch(steps[i].type) {
            case 'clickElement':
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    resultArray.push('HPK');
                } else if (homingState === 'm') {
                    resultArray.push('PK');
                }
                break;
            case 'selection':
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    resultArray.push('HPK');
                } else if (homingState === 'm') {
                    resultArray.push('PK');
                }
                break;
            case 'input':
                var string = '';
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    string += 'HPK';
                } else if (homingState === 'm') {
                    string += 'PK';
                }
                homingState = 'k';
                string += 'H';
                for (let j = 0; j < steps[i].input.length; j++) {
                    string += 'K';
                }
                resultArray.push(string);
                break;
            case 'link':
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    resultArray.push('HPK');
                } else if (homingState === 'm')  {
                    resultArray.push('PK');
                }
                break;
       }
    }
    return resultArray;
}

/**
 * This is a function to adapt goms patterns by placing the response time operator.
 * @param steps 
 * @param convertedSteps 
 * @returns convertedSteps
 */
const placeResponseTimeOperator = (steps, convertedSteps) => {
    for (let i = 0; i < steps.length-1; i++) {
        var current = getFrame(steps[i].id);
        var next = getFrame(steps[i+1].id);
        if (current.id !== next.id) {
            convertedSteps[i] += 'R';
        }
    }
    return convertedSteps;
}

/**
 * This is a function to adapt goms patterns by placing the mentally preparing time operator.
 * @param convertedSteps 
 * @returns convertedSteps
 */
const placeMentallyPreparingOperator = (convertedSteps) => {
    for (let i = 0; i < convertedSteps.length; i++) {
        var resultString = convertedSteps[i];
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch(resultString[j]) {
                case 'K':
                    if (resultString[j-1] !== 'K') {
                        resultString = resultString.slice(0, j) + 'M' + resultString.slice(j);
                    }
                    j++;
                    break;
                case 'P':
                    // TODO: check if and how it can be adapted
                    resultString = resultString.slice(0, j) + 'M' + resultString.slice(j);
                    j++;
                    break;
                default:
                    break;
            }
        }
        convertedSteps[i] = resultString;
    }

    // Ms entfernen, wenn geistige Vorbereitung bereits in einem vorangegangenen Schritt
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('MPMK', 'MPK');
    }
    // M löschen, wenn von R überlagert
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('RM', 'R');
        if (convertedSteps[i][-1] === 'R' && convertedSteps[i+1][0] === 'M') {
            convertedSteps[i+1] = convertedSteps[i+1].slice(1);
        }
    }

    return convertedSteps;
}

/**
 * This is a function to calculate the time for an array of steps consisting of goms operators.
 * @param steps 
 * @param convertedSteps 
 * @returns time
 */
export const calculateTime = (steps, convertedSteps, avgPointingTimeStorage, avgHomingNumStorage) => {
    var pointingTimes = [];
    var homingNums = [];
    var time = 0.0;
    for (let i = 0; i < convertedSteps.length; i++) {
        for (let j = 0; j < convertedSteps[i].length; j++) {
            var homingNum = 0;
            switch(convertedSteps[i][j]) {
                case 'H':
                    time += 0.4;
                    homingNum++;
                    break;
                case 'K':
                    time += 0.2;
                    break;
                case 'M':
                    time += 1.35;
                    break;
                case 'P':
                    var pointingTime = 0;
                    if (i === 0) {
                        pointingTime = calculateFittsLaw(null, null, steps[i].id);
                    } else if (i === 1) {
                        pointingTime = calculateFittsLaw(null, steps[i-1].id, steps[i].id);
                    } else {
                        pointingTime = calculateFittsLaw(steps[i-2].id, steps[i-1].id, steps[i].id);
                    }
                    pointingTimes.push(pointingTime);
                    time += pointingTime;
                    break;
                case 'R':
                    time += 0.2;
                    break;
            }
            homingNums.push(homingNum);
        }
    }
    var pointingTimeSum = 0;
    pointingTimes.forEach(time => {
        pointingTimeSum += time;
    });
    var avgPointingTime = pointingTimeSum / pointingTimes.length;
    var newAvgPointingTimeStorage = avgPointingTime;
    if (avgPointingTimeStorage !== undefined) {
        newAvgPointingTimeStorage = (avgPointingTimeStorage + avgPointingTime) / 2;
    }

    var homingNumSum = 0;
    homingNums.forEach(num => {
        homingNumSum += num;
    })
    var avgHomingNum = homingNumSum / steps.length;
    var newAvgHomingNumStorage = avgHomingNum;
    if (avgHomingNumStorage !== undefined) {
        newAvgHomingNumStorage = (avgHomingNumStorage + avgHomingNum) / 2;
    }

    return { time: time, pointingTimes: avgPointingTime, homingNums: homingNums, avgPointingTimeStorage: newAvgPointingTimeStorage, avgHomingNumStorage: newAvgHomingNumStorage };
}

/**
 * This is a function to calculate the pointing time between two interaction points by using the Fitt's Law.
 * @param lastStepId 
 * @param currentStepId 
 * @returns time
 */
const calculateFittsLaw = (beforeLastStepId: number, lastStepId: number, currentStepId: number) => {
    console.log(lastStepId, currentStepId);
    // two nodes > calculate fitts law between
    // a + b*log2(d/s + 1)
    var a = 0.05;
    var b = 0.05;

    // get center of first
    // if last undefined = center of page or upper left edge
    var lastCenter = null;
    if (lastStepId !== null) {
        var lastUIElement = getNode(lastStepId).parent.children[0];
        if (beforeLastStepId !== null) {
            var beforeLastUIElement = getNode(beforeLastStepId).parent.children[0];
            var reactions = getReactions(beforeLastUIElement.id);
            if (reactions.length > 0) {
                reactions.forEach(reaction => {
                    if (reaction.action.navigation === 'OVERLAY' && reaction.action.destinationId === getFrame(lastUIElement.id).id) {
                        lastCenter = getCenterOfNodeOnOverlay(getRelativeTransform(beforeLastUIElement.id), reaction.action.overlayRelativePosition, lastUIElement.id);
                    }
                });
            } else {
                lastCenter = getCenterOfNode(lastUIElement.id);
            }
        } else {
            lastCenter = getCenterOfNode(lastUIElement.id);
        }
    } else {
        lastCenter = { x: 0, y: 0 };
    }
    console.log('last center', lastCenter);

    // get center of second
    // if second is on an overlay --> use overlayRelativePosition
    var currentUIElement = getNode(currentStepId).parent.children[0];
    var currentCenter = getCenterOfNode(currentUIElement.id);
    if (lastStepId !== null) {
        var reactions = getReactions(lastUIElement.id);
        if (reactions.length > 0) {
            reactions.forEach(reaction => {
                if (reaction.action.navigation === 'OVERLAY' && reaction.action.destinationId === getFrame(currentUIElement.id).id) {
                    currentCenter = getCenterOfNodeOnOverlay(getRelativeTransform(lastUIElement.id), reaction.action.overlayRelativePosition, currentUIElement.id);
                }
            });
        }
    }
    console.log('outside', lastStepId, currentCenter);

    // calculate x and y for pythagoras
    var x = 0;
    var y = 0;
    if (lastCenter.x <= currentCenter.x) {
        x = Math.abs(currentCenter.x - lastCenter.x);
    } else {
        x = Math.abs(lastCenter.x - currentCenter.x);
    }
    if (lastCenter.y <= currentCenter.y) {
        y = Math.abs(currentCenter.y - lastCenter.y);
    } else {
        y = Math.abs(lastCenter.y - currentCenter.y);
    }

    // calculate distance
    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    // get target width
    var targetWidth = getWidth(currentStepId);

    // calculate Fitts Law
    var time = a + b * Math.log2(distance / targetWidth + 1);

    return time;
}
