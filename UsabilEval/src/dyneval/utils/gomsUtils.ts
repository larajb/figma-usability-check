
export const calculateTimeForTask = (task) => {
    // evaluate smells
    // replace patterns
    var resultArray = replacePatterns(task.steps);
    // place R
    var resultArrayWithR = placeR(task.steps, resultArray);
    console.log('with R', resultArrayWithR);
    // place M
    var resultArrayWithM = placeM(resultArrayWithR);
    console.log('with M', resultArrayWithM);
    // remove M
    var resultArrayWithNecessaryM = removeM(task.steps, resultArrayWithM);
    console.log('with necessary M', resultArrayWithNecessaryM);
    // calculate time
    var resultTime = calculateTime(task.steps, resultArrayWithNecessaryM);
    console.log('result time', resultTime);
}

const evaluateSmells = (args) => {
    // load smells (Too Many Layers, High Website Element Distance, Laborious Task, Cyclic Task, Distant Content)
    // check every smell
}

const replacePatterns = (steps) => {
    var resultArray = [];
    var homingState = ''; // Homing state to use when replacing patterns ('' = none, 'k' = keyboard, 'm' = mouse)
    steps.forEach(step => {
        switch(step.type) {
            case 'button':
                if (homingState === '' || homingState === 'k') {
                    resultArray.push('HPK');
                } else if (homingState === 'm')  {
                    resultArray.push('PK');
                }
                break;
            case 'input':
                var string = '';
                if (homingState === '' || homingState === 'k') {
                    string += 'HPK';
                } else if (homingState === 'm') {
                    string += 'PK';
                }
                string += 'H';
                for (let i = 0; i < step.input.length; i++) {
                    string += 'K';
                }
                // string += step.input.length + 'K';
                resultArray.push(string);
                break;
            case 'link':
                if (homingState === '' || homingState === 'k') {
                    resultArray.push('HPK');
                } else if (homingState === 'm')  {
                    resultArray.push('PK');
                }
                break;
        }
    })
    
    return resultArray;
}

const placeR = (steps, convertedSteps) => {
    for (let i = 0; i < steps.length-1; i++) {
        var current = figma.getNodeById(steps[i].id);
        while (current.type !== 'FRAME') {
            current = current.parent;
        }
        var next = figma.getNodeById(steps[i+1].id);
        while (next.type !== 'FRAME') {
            next = next.parent;
        }
        if (current.id !== next.id) {
            convertedSteps[i] += 'R';
        }
    }
    return convertedSteps;
}

const placeM = (convertedSteps) => {
    // Ms vor alle Ks; Ms vor alle Ps, die Befehle (nicht Argumente)
    for (let i = 0; i < convertedSteps.length; i++) {
        var resultString = convertedSteps[i];
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch(resultString[j]) {
                case 'K':
                    // insert M in front of every K (that doesn't belong to a string)
                    if (resultString[j-1] !== 'K') {
                        resultString = resultString.slice(0, j) + 'M' + resultString.slice(j);
                    }
                    j++;
                    break;
                case 'P':
                    // insert M in front of every P
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
    return convertedSteps;
}

const removeM = (steps, convertedSteps) => {
    // Ms entfernen, wenn geistige Vorbereitung bereits in einem vorangegangenen Schritt
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('PMK', 'PK');
    }
    // alle Ms außer den ersten löschen, wenn Kette von Ms zu einer kognitiven Einheit gehören
        // bereits oben??
    // M vor K löschen, wenn K Begrenzer
        // not neccessary because i use buttons?? > KLM GOMS originally invented for text based interfaces?
    // M vor K löschen, wenn K Begrenzer, der nach einer Weile automatisch eingegeben wird
        // s.o.?? > KLM GOMS originally invented for text based interfaces?
    // M löschen, wenn von R überlagert
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('RM', 'R');
        if (convertedSteps[i][-1] === 'R' && convertedSteps[i+1][0] === 'M') {
            convertedSteps[i+1] = convertedSteps[i+1].slice(1);
        }
    }
    return convertedSteps;
}

const calculateTime = (steps, convertedSteps) => {
    var completeTime = 0.0;
    for (let i = 0; i < convertedSteps.length; i++) {
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch(convertedSteps[i][j]) {
                case 'H':
                    completeTime += 0.4;
                    break;
                case 'K':
                    completeTime += 0.2;
                    break;
                case 'M':
                    completeTime += 1.35;
                    break;
                case 'P':
                    if (i === 0) {
                        completeTime += calculateFittsLaw(null, steps[i].id);
                    } else {
                        completeTime += calculateFittsLaw(steps[i-1].id, steps[i].id);
                    }
                    break;
                case 'R':
                    // TODO: set realistic value
                    break;
            }
        }
    }
    return completeTime;
}

const calculateFittsLaw = (lastNodeId, currentNodeId) => {
    // two nodes > calculate fitts law between
    // a + b*log2(d/s + 1)
    var a = 0.05;
    var b = 0.05;

    // get center of first
    // if last undefined = center of page or upper left edge
    var lastCenter = null;
    if (lastNodeId !== null) {
        lastCenter = getCenterOfNode(lastNodeId);
    } else {
        lastCenter = { x: 0, y: 0 };
    }
    // get center of second
    var currentCenter = getCenterOfNode(currentNodeId);

    // calculate x and y for pythagoras
    var x = 0;
    var y = 0;
    if (lastCenter.x <= currentCenter.x) {
        x = currentCenter.x - lastCenter.x;
    } else {
        x = lastCenter.x - currentCenter.x;
    }
    if (lastCenter.y <= currentCenter.y) {
        y = currentCenter.y - lastCenter.y;
    } else {
        y = lastCenter.y - currentCenter.y;
    }

    // calculate distance
    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    // get target width
    var targetWidth = getWidth(currentNodeId);

    // calculate Fitts Law
    var result = a + b * Math.log2(distance / targetWidth + 1);

    return result;
}

const getCenterOfNode = (nodeId) => {
    var centerX = 0;
    var centerY = 0;
    var node = figma.getNodeById(nodeId);
    if ('relativeTransform' in node) {
        var relativeTransform = node.relativeTransform;
    }
    if ('width' in node) {
        var width = node.width;
    }
    if ('height' in node) {
        var height = node.height;
    }
    centerX = relativeTransform[0][2] + (1/2 * width);
    centerY = relativeTransform[1][2] + (1/2 * height);
    return { x: centerX, y: centerY };
}

const getWidth = (nodeId) => {
    var node = figma.getNodeById(nodeId);
    if ('width' in node) {
        var width = node.width;
    }
    return width;
}