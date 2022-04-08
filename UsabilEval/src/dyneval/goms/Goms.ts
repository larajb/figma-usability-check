import { getWidth, getCenterOfNode, getFrame } from '../../figmaAccess/nodeProperties';

export class Goms {

    homingTime: any = 0.4;
    keystrokeTime: any = 0.2;
    mentallyPreparingTime: any = 1.35;
    pointingTime: any;
    responseTime: any;

    constructor (responseTime) {
        this.responseTime = responseTime;
    }

    /**
     * This is a function that contains all steps of the goms model to calculate the time for executing a task.
     * @returns time
     */
    public useGomsModel (steps) {
        var convertedSteps = this.replacePatterns(steps);
        convertedSteps = this.placeResponseTimeOperator(steps, convertedSteps);
        convertedSteps = this.placeMentallyPreparingOperator(convertedSteps);
        var time = this.calculateTime(steps, convertedSteps);
        return time;
    }

    /**
     * This is a function to replace the task steps with goms patterns containing operators
     * @param steps 
     * @returns resultArray
     */
    private replacePatterns (steps) {
        var resultArray = [];
        var homingState = '';
        steps.forEach(step => {
            switch(step.type) {
                case 'button':
                    if (homingState === '' || homingState === 'K') {
                        resultArray.push('HPK');
                    } else if (homingState === 'm') {
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

    /**
     * This is a function to adapt goms patterns by placing the response time operator.
     * @param steps 
     * @param convertedSteps 
     * @returns convertedSteps
     */
    private placeResponseTimeOperator (steps, convertedSteps) {
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
    private placeMentallyPreparingOperator (convertedSteps) {
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

    /**
     * This is a function to calculate the time for an array of steps consisting of goms operators.
     * @param steps 
     * @param convertedSteps 
     * @returns time
     */
    private calculateTime (steps, convertedSteps) {
        var time = 0.0;
        for (let i = 0; i < convertedSteps.length; i++) {
            for (let j = 0; j < convertedSteps[i].length; j++) {
                switch(convertedSteps[i][j]) {
                    case 'H':
                        time += this.homingTime;
                        break;
                    case 'K':
                        time += this.keystrokeTime;
                        break;
                    case 'M':
                        time += this.mentallyPreparingTime;
                        break;
                    case 'P':
                        if (i === 0) {
                            time += this.calculateFittsLaw(null, steps[i].id);
                        } else {
                            time += this.calculateFittsLaw(steps[i-1].id, steps[i].id);
                        }
                        break;
                    case 'R':
                        // TODO: set realistic value
                        break;
                }
            }
        }
        return time;
    }

    /**
     * This is a function to calculate the pointing time between two interaction points by using the Fitt's Law.
     * @param lastStepId 
     * @param currentStepId 
     * @returns time
     */
    private calculateFittsLaw (lastStepId, currentStepId) {
        // two nodes > calculate fitts law between
        // a + b*log2(d/s + 1)
        var a = 0.05;
        var b = 0.05;

        // get center of first
        // if last undefined = center of page or upper left edge
        var lastCenter = null;
        if (lastStepId !== null) {
            lastCenter = getCenterOfNode(lastStepId);
        } else {
            lastCenter = { x: 0, y: 0 };
        }
        // get center of second
        var currentCenter = getCenterOfNode(lastStepId);

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
        var targetWidth = getWidth(currentStepId);

        // calculate Fitts Law
        var time = a + b * Math.log2(distance / targetWidth + 1);

        return time;
    }
}
