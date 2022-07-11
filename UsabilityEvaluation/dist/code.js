/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.ts":
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _start_startHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./start/startHandler */ "./src/start/startHandler.ts");
/* harmony import */ var _metricEval_metricEvalHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metricEval/metricEvalHandler */ "./src/metricEval/metricEvalHandler.ts");
/* harmony import */ var _taskEval_taskEvalHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskEval/taskEvalHandler */ "./src/taskEval/taskEvalHandler.ts");



switch (figma.command) {
    case 'start':
        figma.showUI(__uiFiles__.start);
        Object(_start_startHandler__WEBPACK_IMPORTED_MODULE_0__["startView"])();
        break;
    case 'metricEval':
        figma.showUI(__uiFiles__.metricEval);
        Object(_metricEval_metricEvalHandler__WEBPACK_IMPORTED_MODULE_1__["metricEvalView"])();
        break;
    case 'taskEval':
        figma.showUI(__uiFiles__.taskEval);
        Object(_taskEval_taskEvalHandler__WEBPACK_IMPORTED_MODULE_2__["taskEvalView"])();
        break;
}
figma.ui.resize(450, 550);


/***/ }),

/***/ "./src/codeMessageHandler.ts":
/*!***********************************!*\
  !*** ./src/codeMessageHandler.ts ***!
  \***********************************/
/*! exports provided: dispatch, handleEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleEvent", function() { return handleEvent; });
const eventListeners = [];
const dispatch = (action, data) => {
    figma.ui.postMessage({ action, data });
};
const handleEvent = (type, callback) => {
    eventListeners.push({ type, callback });
};
figma.ui.onmessage = message => {
    for (let eventListener of eventListeners) {
        if (message.action === eventListener.type)
            eventListener.callback(message.data);
    }
};


/***/ }),

/***/ "./src/figmaAccess/fileContentGetters.ts":
/*!***********************************************!*\
  !*** ./src/figmaAccess/fileContentGetters.ts ***!
  \***********************************************/
/*! exports provided: getFrame, getPage, getCurrentSelection, getCenterOfNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFrame", function() { return getFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPage", function() { return getPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentSelection", function() { return getCurrentSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCenterOfNode", function() { return getCenterOfNode; });
/**
 * This is a function to get the underlying frame that contains a given node.
 * @param nodeId
 * @returns frame
 */
const getFrame = (nodeId) => {
    var frame = null;
    var node = figma.getNodeById(nodeId);
    if (node.type !== 'FRAME') {
        var nodeParent = node.parent;
        while (nodeParent.type !== 'FRAME') {
            nodeParent = nodeParent.parent;
        }
        frame = nodeParent;
    }
    else {
        frame = node;
    }
    return frame;
};
/**
 * This is a function to get the underlying page that contains a given node.
 * @param nodeId
 * @returns page
 */
const getPage = (nodeId) => {
    var page = null;
    var node = figma.getNodeById(nodeId);
    if (node.type !== 'PAGE') {
        var nodeParent = node.parent;
        while (nodeParent.type !== 'PAGE') {
            nodeParent = nodeParent.parent;
        }
        page = nodeParent;
    }
    else {
        page = node;
    }
    return page;
};
/**
 * This is a function to get the current selection.
 * @returns selection
 */
const getCurrentSelection = () => {
    var selection = null;
    if (figma.currentPage.selection.length === 1) {
        for (const node of figma.currentPage.selection) {
            selection = node;
        }
    }
    return selection;
};
/**
 * This is a function to get the center (point (x,y)) of a node.
 * @param nodeId
 * @returns object with x and y position
 */
const getCenterOfNode = (nodeId) => {
    var centerX = 0;
    var centerY = 0;
    var node = figma.getNodeById(nodeId);
    var relativeTransform = node.relativeTransform;
    var width = node.width;
    var height = node.height;
    centerX = relativeTransform[0][2] + (1 / 2 * width);
    centerY = relativeTransform[1][2] + (1 / 2 * height);
    return { x: centerX, y: centerY };
};


/***/ }),

/***/ "./src/figmaAccess/fileContentSetters.ts":
/*!***********************************************!*\
  !*** ./src/figmaAccess/fileContentSetters.ts ***!
  \***********************************************/
/*! exports provided: createTextNode, createEllipseNode, createGroupNode, addAnnotationToFile, setText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextNode", function() { return createTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEllipseNode", function() { return createEllipseNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGroupNode", function() { return createGroupNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAnnotationToFile", function() { return addAnnotationToFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setText", function() { return setText; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * This is a function to create a text node.
 * @param name
 * @param fillsColor
 * @param strokeColor
 * @param textContent
 * @returns text
 */
const createTextNode = (name, fillsColor, strokeColor, textContent) => {
    var text = figma.createText();
    text.name = name;
    setText(text, fillsColor, strokeColor, textContent);
    return text;
};
/**
 * This is a function to create an ellipse node.
 * @param name
 * @param width
 * @param height
 * @param fillsColor
 * @returns ellipse
 */
const createEllipseNode = (name, width, height, fillsColor) => {
    let ellipse = figma.createEllipse();
    ellipse.name = name;
    ellipse.resize(width, height);
    ellipse.fills = [{ type: 'SOLID', color: fillsColor }];
    return ellipse;
};
/**
 * This is a function to create a group node.
 * @param name
 * @param children
 * @returns group
 */
const createGroupNode = (name, children) => {
    const groupNode = [];
    children.forEach(child => {
        groupNode.push(child);
    });
    var group = figma.group(groupNode, figma.currentPage);
    group.name = name + group.id;
    return group;
};
/**
 * This is a function to add an annotation to a file
 * @param annotation
 */
const addAnnotationToFile = (currentSelection, annotation) => {
    var selectionParent = currentSelection.parent;
    var index = selectionParent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(currentSelection));
    if (selectionParent.name.endsWith('Annotation')) {
        selectionParent.insertChild(selectionParent.children.length, annotation);
        index = selectionParent.parent.children.findIndex(child => JSON.stringify(child) === JSON.stringify(selectionParent));
    }
    else {
        const elementAndAnnotationGroupNode = [];
        elementAndAnnotationGroupNode.push(annotation);
        var elementAndAnnotationGroup = figma.group(elementAndAnnotationGroupNode, figma.currentPage);
        for (const node of figma.currentPage.selection) {
            var parent = node.parent;
            elementAndAnnotationGroup.name = node.name + ' + Annotation';
            elementAndAnnotationGroup.insertChild(0, node);
            parent.insertChild(index, elementAndAnnotationGroup);
        }
    }
};
/**
 * This is a function to set the content of a text node.
 * @param node
 */
const setText = (text, fillsColor, strokeColor, textContent) => {
    loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: fillsColor }];
        if (strokeColor !== null) {
            const stroke = { type: "SOLID", color: strokeColor };
            text.strokes = [stroke];
        }
        text.characters = textContent;
    }).catch((err) => {
        console.log(err);
    });
};
/**
 * This is a function to load a font.
 */
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});


/***/ }),

/***/ "./src/metricEval/helper/metricEvalHelper.ts":
/*!***************************************************!*\
  !*** ./src/metricEval/helper/metricEvalHelper.ts ***!
  \***************************************************/
/*! exports provided: localColorConsistency, localFontConsistency, fontSize, homepageReference, orphanPages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localColorConsistency", function() { return localColorConsistency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localFontConsistency", function() { return localFontConsistency; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fontSize", function() { return fontSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "homepageReference", function() { return homepageReference; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orphanPages", function() { return orphanPages; });
/**
 * This is a function to evaluate the color consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @param frames
 * @returns Object
 */
const localColorConsistency = (frames) => {
    var colorStyles = figma.getLocalPaintStyles();
    var predefinedColorStyles = [];
    colorStyles.forEach(style => {
        const index = predefinedColorStyles.findIndex((colorStyle) => JSON.stringify(colorStyle) === JSON.stringify(style.paints));
        if (index < 0 && containsBlackOrWhite(style.paints) === false && style.paints.length > 0) {
            predefinedColorStyles.push(style.paints);
        }
    });
    var nodeFills = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const nodes = frameNode.findAll();
            nodes.forEach(node => {
                if (!node.name.startsWith('Annotation')) {
                    if ('fills' in node) {
                        const index = nodeFills.findIndex((nodeFill) => JSON.stringify(nodeFill.fill) === JSON.stringify(node.fills));
                        if (containsBlackOrWhite(node.fills) === false && containsImage(node.fills) === false && node.fills.length > 0) {
                            if (index < 0) {
                                nodeFills.push({ nodes: [node.id], fill: node.fills });
                            }
                            else if (index >= 0) {
                                nodeFills[index].nodes.push(node.id);
                            }
                        }
                    }
                }
            });
        }
    });
    var notPredefined = [];
    nodeFills.forEach(nodeFill => {
        const index = predefinedColorStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(nodeFill.fill));
        if (index < 0) {
            notPredefined.push(nodeFill);
        }
    });
    var colorConsistencyValue = (colorStyles.length / nodeFills.length) * 100;
    return { value: colorConsistencyValue, nodes: notPredefined };
};
/**
 * This is a function to evaluate the font consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @param frames
 * @returns Object
 */
const localFontConsistency = (frames) => {
    var textStyles = figma.getLocalTextStyles();
    var predefinedTextStyles = [];
    textStyles.forEach(style => {
        var fontNameAndSize = { fontName: style.fontName, fontSize: style.fontSize };
        var index = predefinedTextStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(fontNameAndSize));
        if (index < 0) {
            predefinedTextStyles.push(fontNameAndSize);
        }
    });
    var nodeTextStyles = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const nodes = frameNode.findAll();
            nodes.forEach(node => {
                if (!node.name.startsWith('Annotation')) {
                    if (node.type === 'TEXT') {
                        var fontNameAndSize = { fontName: node.fontName, fontSize: node.fontSize };
                        var index = nodeTextStyles.findIndex((style) => JSON.stringify(style.fontStyle) === JSON.stringify(fontNameAndSize));
                        if (index < 0) {
                            nodeTextStyles.push({ nodes: [node.id], fontStyle: fontNameAndSize });
                        }
                        else if (index >= 0) {
                            nodeTextStyles[index].nodes.push(node.id);
                        }
                    }
                }
            });
        }
    });
    var notPredefined = [];
    nodeTextStyles.forEach(textStyle => {
        const index = predefinedTextStyles.findIndex((style) => JSON.stringify(style) === JSON.stringify(textStyle.fontStyle));
        if (index < 0) {
            notPredefined.push(textStyle);
        }
    });
    var fontConsistencyValue = (textStyles.length / nodeTextStyles.length) * 100;
    return { value: fontConsistencyValue, nodes: notPredefined };
};
/**
 * This is a function to check that the font size of a text is equal to or bigger than 12pt.
 * This function is appliex to one text element.
 * @param frames
 * @returns Object
 */
const fontSize = (frames) => {
    var textsWithSmallerFontSize = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        if (frameNode.type === 'FRAME') {
            const textNodes = frameNode.findAll(node => node.type === 'TEXT');
            textNodes.forEach(text => {
                if (text.fontSize < 12) {
                    var name = text.name;
                    if (name.length > 30) {
                        name = (name.slice(0, 30)) + '...';
                    }
                    textsWithSmallerFontSize.push({ id: text.id, name: name });
                }
            });
        }
    });
    return { value: null, nodes: textsWithSmallerFontSize };
};
/**
 * This is a function to check if any frame is missing a homepage reference.
 * The function is applied to all frames together.
 * @param selectedFrames
 * @param homepageId
 * @returns Object
 */
const homepageReference = (selectedFrames, homepageId) => {
    var missingReferences = [];
    selectedFrames.forEach(frame => {
        var isFound = false;
        if (frame.id !== homepageId) {
            var frameNode = figma.getNodeById(frame.id);
            if (frameNode.type === 'FRAME') {
                const nodes = frameNode.findAll();
                nodes.forEach(node => {
                    var reactions = node.reactions;
                    if (reactions.length > 0) {
                        reactions.forEach(reaction => {
                            if (reaction.action !== null && reaction.action.destinationId === homepageId) {
                                isFound = true;
                            }
                        });
                    }
                });
            }
        }
        else {
            var isFound = true;
        }
        if (isFound === false) {
            missingReferences.push({ id: frame.id, name: frame.name });
        }
    });
    var homepageReferenceValue = (selectedFrames.length - missingReferences.length) / selectedFrames.length;
    return { value: homepageReferenceValue, nodes: missingReferences };
};
/**
 * This is a function to check if the current page contains any orphan frames.
 * The function is applied to all frames together.
 * @param selectedFrames
 * @returns Object
 */
const orphanPages = (selectedFrames) => {
    var orphanPages = [];
    selectedFrames.forEach(frame1 => {
        var targetId = frame1.id;
        var isFound = false;
        selectedFrames.forEach(frame2 => {
            const frameNode2 = figma.getNodeById(frame2.id);
            if (frameNode2.type === 'FRAME') {
                const nodes = frameNode2.findAll();
                nodes.forEach(node => {
                    var reactions = node.reactions;
                    if (reactions.length > 0) {
                        reactions.forEach(reaction => {
                            if (reaction.action !== null && reaction.action.destinationId === targetId) {
                                isFound = true;
                            }
                        });
                    }
                });
            }
        });
        if (isFound === false) {
            orphanPages.push({ id: frame1.id, name: frame1.name });
        }
    });
    var orphanPagesValue = orphanPages.length / selectedFrames.length;
    return { value: orphanPagesValue, nodes: orphanPages };
};
/**
 * This is a function to check if a fills object only contains the colors black or white.
 * @param fills
 * @returns containsBlackOrWhite
 */
const containsBlackOrWhite = (fills) => {
    var containsBlackOrWhite = false;
    if (fills.length === 1) {
        fills.forEach(fill => {
            if (JSON.stringify(fill.color) === JSON.stringify({ r: 0, g: 0, b: 0 }) || JSON.stringify(fill.color) === JSON.stringify({ r: 1, g: 1, b: 1 })) {
                containsBlackOrWhite = true;
            }
        });
    }
    else {
        var containsArray = [];
        fills.forEach(fill => {
            if (JSON.stringify(fill.color) === JSON.stringify({ r: 0, g: 0, b: 0 }) || JSON.stringify(fill.color) === JSON.stringify({ r: 1, g: 1, b: 1 })) {
                containsArray.push(true);
            }
        });
        const foundings = containsArray.find(contains => contains === false);
        if (foundings === undefined) {
            containsBlackOrWhite = true;
        }
    }
    return containsBlackOrWhite;
};
/**
 * This is a function to check if a fills object contains an image.
 * @param fills
 * @returns containsImage
 */
const containsImage = (fills) => {
    var containsImage = false;
    fills.forEach(fill => {
        if (fill.type === 'IMAGE') {
            containsImage = true;
        }
    });
    return containsImage;
};


/***/ }),

/***/ "./src/metricEval/metricEvalHandler.ts":
/*!*********************************************!*\
  !*** ./src/metricEval/metricEvalHandler.ts ***!
  \*********************************************/
/*! exports provided: metricEvalView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "metricEvalView", function() { return metricEvalView; });
/* harmony import */ var _codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../codeMessageHandler */ "./src/codeMessageHandler.ts");
/* harmony import */ var _start_startHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../start/startHandler */ "./src/start/startHandler.ts");
/* harmony import */ var _helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper/metricEvalHelper */ "./src/metricEval/helper/metricEvalHelper.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const metricEvalView = () => {
    // to navigate back to the start page
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('backToStart', () => {
        figma.showUI(__uiFiles__.start);
        Object(_start_startHandler__WEBPACK_IMPORTED_MODULE_1__["startView"])();
        figma.ui.resize(450, 550);
    });
    // to get all pages of a figma document
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getPages', () => {
        var pages = figma.root.children;
        var pagesObjects = [];
        pages.forEach(page => {
            pagesObjects.push({ name: page.name, id: page.id });
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('allPages', pagesObjects);
    });
    // to get all frames of a page
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getFrames', (pageId) => {
        const page = figma.getNodeById(pageId);
        var frameObjects = [];
        if (page.type === 'PAGE') {
            const frames = page.findAll(node => node.type === 'FRAME');
            frames.forEach(frame => {
                frameObjects.push({ name: frame.name, id: frame.id });
            });
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('frames', frameObjects);
    });
    // to select all given elements by id
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setSelection', (ids) => {
        var nodes = [];
        ids.forEach(id => {
            var node = figma.getNodeById(id);
            nodes.push(node);
        });
        figma.currentPage.selection = nodes;
    });
    // to evaluate the ui with the selected metrics
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('evaluate', (args) => {
        var results = [];
        args.selectedMetrics.forEach(metric => {
            switch (metric) {
                case 'Farbkonsistenz':
                    var localColorConsistencyResult = Object(_helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__["localColorConsistency"])(args.selectedFrames);
                    results.push({ metric: 'Farbkonsistenz', value: localColorConsistencyResult.value, nodes: localColorConsistencyResult.nodes, type: 'colorStyle' });
                    break;
                case 'Schriftkonsistenz':
                    var localFontConsistencyResult = Object(_helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__["localFontConsistency"])(args.selectedFrames);
                    results.push({ metric: 'Schriftkonsistenz', value: localFontConsistencyResult.value, nodes: localFontConsistencyResult.nodes, type: 'fontStyle' });
                    break;
                case 'Verweis auf Startseite':
                    var homepageReferenceResult = Object(_helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__["homepageReference"])(args.selectedFrames, args.homepage);
                    results.push({ metric: 'Verweis auf Startseite', value: homepageReferenceResult.value, nodes: homepageReferenceResult.nodes, type: 'single' });
                    break;
                case 'Verwaiste Seiten':
                    var orphanPagesResult = Object(_helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__["orphanPages"])(args.selectedFrames);
                    results.push({ metric: 'Verwaiste Seiten', value: orphanPagesResult.value, nodes: orphanPagesResult.nodes, type: 'single' });
                    break;
                case 'Schriftgröße':
                    var fontSizeResult = Object(_helper_metricEvalHelper__WEBPACK_IMPORTED_MODULE_2__["fontSize"])(args.selectedFrames);
                    results.push({ metric: 'Schriftgröße', value: fontSizeResult.value, nodes: fontSizeResult.nodes, type: 'single' });
                    break;
            }
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('evaluationResults', results);
    });
    // to get the stored custom evaluation profiles
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getEvaluationProfileStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var storage = undefined;
        yield figma.clientStorage.getAsync('evaluationProfiles').then((value) => {
            storage = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentEvaluationProfileStorage', storage);
    }));
    // to store the custom evaluation profiles
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setEvaluationProfileStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('evaluationProfiles', storage);
    }));
    // to get the stored evaluations
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getEvaluationStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var storage = undefined;
        yield figma.clientStorage.getAsync('evaluation').then((value) => {
            storage = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentEvaluationStorage', storage);
    }));
    // to store the evaluation results
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setEvaluationStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('evaluation', storage);
    }));
};


/***/ }),

/***/ "./src/start/startHandler.ts":
/*!***********************************!*\
  !*** ./src/start/startHandler.ts ***!
  \***********************************/
/*! exports provided: startView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startView", function() { return startView; });
/* harmony import */ var _codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../codeMessageHandler */ "./src/codeMessageHandler.ts");
/* harmony import */ var _metricEval_metricEvalHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../metricEval/metricEvalHandler */ "./src/metricEval/metricEvalHandler.ts");
/* harmony import */ var _taskEval_taskEvalHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../taskEval/taskEvalHandler */ "./src/taskEval/taskEvalHandler.ts");



const startView = () => {
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('showMetricEval', () => {
        figma.showUI(__uiFiles__.metricEval);
        Object(_metricEval_metricEvalHandler__WEBPACK_IMPORTED_MODULE_1__["metricEvalView"])();
        figma.ui.resize(450, 550);
    });
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('showTaskEval', () => {
        figma.showUI(__uiFiles__.taskEval);
        Object(_taskEval_taskEvalHandler__WEBPACK_IMPORTED_MODULE_2__["taskEvalView"])();
        figma.ui.resize(450, 550);
    });
};


/***/ }),

/***/ "./src/taskEval/helper/gomsHelper.ts":
/*!*******************************************!*\
  !*** ./src/taskEval/helper/gomsHelper.ts ***!
  \*******************************************/
/*! exports provided: convertToOperators, getTimeForOperators, getTimeForSteps, calculateTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToOperators", function() { return convertToOperators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeForOperators", function() { return getTimeForOperators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeForSteps", function() { return getTimeForSteps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateTime", function() { return calculateTime; });
/* harmony import */ var _figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../figmaAccess/fileContentGetters */ "./src/figmaAccess/fileContentGetters.ts");

/**
 * This is a function to convert task steps to an array of steps containing operators.
 * @param task
 * @returns convertedSteps
 */
const convertToOperators = (task) => {
    var convertedSteps = replacePatterns(task.steps);
    convertedSteps = placeResponseTimeOperator(task.steps, convertedSteps);
    convertedSteps = placeMentallyPreparingOperator(convertedSteps);
    return convertedSteps;
};
/**
 * This is a function to convert an array of steps containing operators to an array containing the times per operator.
 * @param steps
 * @param convertedSteps
 * @returns operatorTimes
 */
const getTimeForOperators = (steps, convertedSteps) => {
    var operatorTimes = [];
    for (let i = 0; i < convertedSteps.length; i++) {
        operatorTimes.push([]);
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch (convertedSteps[i][j]) {
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
                        pointingTime = calculateFittsLaw(null, steps[i].id);
                    }
                    else {
                        pointingTime = calculateFittsLaw(steps[i - 1].id, steps[i].id);
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
};
/**
 * This is a function to get the time for each step of a task.
 * @param operatorTimes
 * @returns stepsTimes
 */
const getTimeForSteps = (operatorTimes) => {
    var stepsTimes = [];
    operatorTimes.forEach(step => {
        var stepTime = 0.0;
        step.forEach(operator => {
            stepTime += operator.time;
        });
        stepsTimes.push(stepTime);
    });
    return stepsTimes;
};
/**
 * This is a function to replace the task steps with goms patterns containing operators
 * @param steps
 * @returns resultArray
 */
const replacePatterns = (steps) => {
    var resultArray = [];
    var homingState = '';
    for (let i = 0; i < steps.length; i++) {
        switch (steps[i].type) {
            case 'clickElement':
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    resultArray.push('HPK');
                }
                else if (homingState === 'm') {
                    resultArray.push('PK');
                }
                break;
            case 'selection':
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    resultArray.push('HPK');
                }
                else if (homingState === 'm') {
                    resultArray.push('PK');
                }
                break;
            case 'input':
                var string = '';
                if (homingState === '' || homingState === 'k') {
                    homingState = 'm';
                    string += 'HPK';
                }
                else if (homingState === 'm') {
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
                }
                else if (homingState === 'm') {
                    resultArray.push('PK');
                }
                break;
        }
    }
    return resultArray;
};
/**
 * This is a function to adapt goms patterns by placing the response time operator.
 * @param steps
 * @param convertedSteps
 * @returns convertedSteps
 */
const placeResponseTimeOperator = (steps, convertedSteps) => {
    for (let i = 0; i < steps.length - 1; i++) {
        var current = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i].id);
        var next = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i + 1].id);
        if (current.id !== next.id) {
            convertedSteps[i] += 'R';
        }
    }
    return convertedSteps;
};
/**
 * This is a function to adapt goms patterns by placing the mentally preparing time operator.
 * @param convertedSteps
 * @returns convertedSteps
 */
const placeMentallyPreparingOperator = (convertedSteps) => {
    for (let i = 0; i < convertedSteps.length; i++) {
        var resultString = convertedSteps[i];
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch (resultString[j]) {
                case 'K':
                    if (resultString[j - 1] !== 'K') {
                        resultString = resultString.slice(0, j) + 'M' + resultString.slice(j);
                    }
                    j++;
                    break;
                case 'P':
                    resultString = resultString.slice(0, j) + 'M' + resultString.slice(j);
                    j++;
                    break;
                default:
                    break;
            }
        }
        convertedSteps[i] = resultString;
    }
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('MPMK', 'MPK');
    }
    for (let i = 0; i < convertedSteps.length; i++) {
        convertedSteps[i] = convertedSteps[i].replace('RM', 'R');
        if (convertedSteps[i][-1] === 'R' && convertedSteps[i + 1][0] === 'M') {
            convertedSteps[i + 1] = convertedSteps[i + 1].slice(1);
        }
    }
    return convertedSteps;
};
/**
 * This is a function to calculate the time for an array of steps consisting of goms operators.
 * @param steps
 * @param convertedSteps
 * @returns Object
 */
const calculateTime = (steps, convertedSteps) => {
    var pointingTimes = [];
    var homingNum = 0;
    var time = 0.0;
    for (let i = 0; i < convertedSteps.length; i++) {
        for (let j = 0; j < convertedSteps[i].length; j++) {
            switch (convertedSteps[i][j]) {
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
                        pointingTime = calculateFittsLaw(null, steps[i].id);
                    }
                    else {
                        pointingTime = calculateFittsLaw(steps[i - 1].id, steps[i].id);
                    }
                    pointingTimes.push(pointingTime);
                    time += pointingTime;
                    break;
                case 'R':
                    time += 0.2;
                    break;
            }
        }
    }
    var pointingTimeSum = 0;
    pointingTimes.forEach(time => {
        pointingTimeSum += time;
    });
    var avgPointingTime = pointingTimeSum / pointingTimes.length;
    return { time: time, pointingTimes: pointingTimes, avgPointingTime: avgPointingTime, homingNum: homingNum };
};
/**
 * This is a function to calculate the pointing time between two interaction points by using the Fitt's Law.
 * @param lastStepId
 * @param currentStepId
 * @returns time
 */
const calculateFittsLaw = (lastStepId, currentStepId) => {
    var a = 0.05;
    var b = 0.05;
    var lastCenter = null;
    if (lastStepId !== null) {
        var lastUIElement = figma.getNodeById(lastStepId).parent.children[0];
        lastCenter = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCenterOfNode"])(lastUIElement.id);
    }
    else {
        lastCenter = { x: 0, y: 0 };
    }
    var currentUIElement = figma.getNodeById(currentStepId).parent.children[0];
    var currentCenter = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCenterOfNode"])(currentUIElement.id);
    var x = 0;
    var y = 0;
    if (lastCenter.x <= currentCenter.x) {
        x = Math.abs(currentCenter.x - lastCenter.x);
    }
    else {
        x = Math.abs(lastCenter.x - currentCenter.x);
    }
    if (lastCenter.y <= currentCenter.y) {
        y = Math.abs(currentCenter.y - lastCenter.y);
    }
    else {
        y = Math.abs(lastCenter.y - currentCenter.y);
    }
    var distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    var targetWidth = currentUIElement.width;
    var time = a + b * Math.log2(distance / targetWidth + 1);
    return time;
};


/***/ }),

/***/ "./src/taskEval/helper/taskEvalHelper.ts":
/*!***********************************************!*\
  !*** ./src/taskEval/helper/taskEvalHelper.ts ***!
  \***********************************************/
/*! exports provided: createExampletext, createTaskAnnotation, deleteStepAnnotation, updateStepAnnotation, getElementToAnnotation, setRelativeTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createExampletext", function() { return createExampletext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTaskAnnotation", function() { return createTaskAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteStepAnnotation", function() { return deleteStepAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStepAnnotation", function() { return updateStepAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementToAnnotation", function() { return getElementToAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRelativeTransform", function() { return setRelativeTransform; });
/* harmony import */ var _figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../figmaAccess/fileContentGetters */ "./src/figmaAccess/fileContentGetters.ts");
/* harmony import */ var _figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../figmaAccess/fileContentSetters */ "./src/figmaAccess/fileContentSetters.ts");
/* harmony import */ var _validityHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validityHelper */ "./src/taskEval/helper/validityHelper.ts");



/**
 * This is a function to create an example text for an input field.
 * @param input
 * @param taskname
 * @returns Boolean
 */
const createExampletext = (input, taskname) => {
    var result = Object(_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkInputExample"])();
    if (result === null) {
        var selection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
        if (selection !== null) {
            var selectionRelTransform = selection.relativeTransform;
            var selectionHeight = selection.height;
            var text = Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["createTextNode"])('Annotation - ' + taskname + ' - Eingabebeispiel', { r: 0, g: 0, b: 1 }, null, input);
            setRelativeTransform(text, selectionRelTransform[0][2] + 10, selectionRelTransform[1][2] + selectionHeight / 2 - text.height / 2);
            Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["addAnnotationToFile"])(selection, text);
        }
    }
    return true;
};
/**
 * This is a function to create a task annotation to the current selection.
 * @param taskname
 * @param numSteps
 * @param color
 * @param selection
 * @param index
 * @returns annotation
 */
const createTaskAnnotation = (taskname, numSteps, color, selection = null, index = null) => {
    var stepNumber = String(numSteps + 1);
    if (index !== null) {
        stepNumber = String(index++);
    }
    var convertedColor = convertColor(color);
    var currentSelection = null;
    if (selection !== null) {
        currentSelection = selection;
    }
    else {
        currentSelection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    }
    if (currentSelection !== null) {
        var selectionRelTransform = currentSelection.relativeTransform;
        var selectionParent = currentSelection.parent;
        var ellipse = Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["createEllipseNode"])('Annotation - ' + taskname, 24, 24, convertedColor);
        var text = Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["createTextNode"])('Annotation - ' + taskname + ' - Text', { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, stepNumber);
        var containsExample = false;
        var containsJustExample = false;
        for (let i = 0; i < selectionParent.children.length; i++) {
            if (selectionParent.children[i].name.endsWith('Eingabebeispiel')) {
                containsExample = true;
                if (selectionParent.children.length === 2) {
                    containsJustExample = true;
                }
            }
        }
        if (selectionParent.name.endsWith('Annotation') === false) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] - 12, selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsJustExample === true) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] - 12, selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsExample === true) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] + ((selectionParent.children.length - 3) * 12) + ((selectionParent.children.length - 2) * 4), selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 16) - 4, selectionRelTransform[1][2] - 9);
        }
        else if (containsExample === false) {
            setRelativeTransform(ellipse, selectionRelTransform[0][2] + ((selectionParent.children.length - 2) * 12) + ((selectionParent.children.length - 1) * 4), selectionRelTransform[1][2] - 12);
            setRelativeTransform(text, selectionRelTransform[0][2] + ((selectionParent.children.length - 1) * 16) - 4, selectionRelTransform[1][2] - 9);
        }
        var annotation = Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["createGroupNode"])('Annotation - ' + taskname + ' - ', [ellipse, text]);
        Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["addAnnotationToFile"])(currentSelection, annotation);
        return annotation;
    }
};
/**
 * This is a function to delete a step annotation and adapt the following step annotation numbers.
 * @param step
 * @param followingSteps
 */
const deleteStepAnnotation = (step, followingSteps) => {
    var stepAnnotation = figma.getNodeById(step.id);
    var annotationInput = step.input;
    var parent = stepAnnotation.parent;
    stepAnnotation.remove();
    if (annotationInput !== '' && parent.children.length === 2) {
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].type === 'TEXT' && parent.children[i].characters === annotationInput) {
                parent.children[i].remove();
            }
        }
    }
    if (parent.children.length === 1) {
        var node = parent.children[0];
        var parentsParent = parent.parent;
        var index = null;
        for (let i = 0; i < parentsParent.children.length; i++) {
            if (parentsParent.children[i].id === parent.id) {
                index = i;
            }
        }
        parentsParent.insertChild(index, node);
    }
    if (followingSteps !== undefined) {
        followingSteps.forEach(step => {
            var stepNode = figma.getNodeById(step.id);
            if (stepNode.type === 'GROUP') {
                for (let i = 0; i < stepNode.children.length; i++) {
                    if (stepNode.children[i].type === 'TEXT') {
                        var current = parseInt(stepNode.children[i].characters);
                        Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["setText"])(stepNode.children[i], { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, String(current - 1));
                    }
                }
            }
        });
    }
};
/**
 * This is a function to update a step annotation number.
 * @param annotationId
 * @param number
 */
const updateStepAnnotation = (annotationId, number) => {
    var annotation = figma.getNodeById(annotationId);
    if (annotation.type === 'GROUP') {
        for (let i = 0; i < annotation.children.length; i++) {
            if (annotation.children[i].type === 'TEXT') {
                Object(_figmaAccess_fileContentSetters__WEBPACK_IMPORTED_MODULE_1__["setText"])(annotation.children[i], { r: 1, g: 1, b: 1 }, { r: 0, g: 0, b: 0 }, String(number));
            }
        }
    }
};
/**
 * This function is used to get the node of an annotated element by annotation id.
 * @param id
 * @returns selection
 */
const getElementToAnnotation = (id) => {
    var annotation = figma.getNodeById(id);
    var parent = annotation.parent;
    var selection = parent.children[0];
    return selection;
};
/**
 * This is a function to convert a css formatted rgb color to a figma formatted rgb color.
 * @param color
 * @returns Object
 */
const convertColor = (color) => {
    color = color.replace('rgb(', '');
    color = color.replace(')', '');
    var colorSplitted = color.split(',');
    return {
        r: parseInt(colorSplitted[0]) / 255,
        g: parseInt(colorSplitted[1]) / 255,
        b: parseInt(colorSplitted[2]) / 255,
    };
};
/**
 * This is a function to set the relative Transformation of a given node.
 * @param nodeId
 * @param xTransformation
 * @param yTransformation
 */
const setRelativeTransform = (node, xTransformation, yTransformation) => {
    node.x = xTransformation;
    node.y = yTransformation;
};


/***/ }),

/***/ "./src/taskEval/helper/usabilitySmellsHelper.ts":
/*!******************************************************!*\
  !*** ./src/taskEval/helper/usabilitySmellsHelper.ts ***!
  \******************************************************/
/*! exports provided: checkUsabilitySmells, tooManyLayers, highWebsiteElementDistance, distantContent, longP, manyH */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkUsabilitySmells", function() { return checkUsabilitySmells; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooManyLayers", function() { return tooManyLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highWebsiteElementDistance", function() { return highWebsiteElementDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distantContent", function() { return distantContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "longP", function() { return longP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "manyH", function() { return manyH; });
/* harmony import */ var _figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../figmaAccess/fileContentGetters */ "./src/figmaAccess/fileContentGetters.ts");

/**
 * This is a function to check some usability smells saved in a js file.
 * @param steps
 * @param avgPointingTime
 * @param avgHomingNum
 * @param pointingTimes
 * @param homingNum
 * @returns result
 */
const checkUsabilitySmells = (steps, avgPointingTime, avgHomingNum, pointingTimes, homingNum) => {
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
const tooManyLayers = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length; i++) {
        if ((Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i].id).id !== Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i - 1].id).id)) {
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
const highWebsiteElementDistance = (steps) => {
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
        else if (Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(currentNode.id) === Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(beforeNode.id)) {
            distanceSum += 0.5;
        }
        else if (Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getPage"])(currentNode.id) === Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getPage"])(beforeNode.id)) {
            distanceSum += 0.75;
        }
        else if (Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getPage"])(currentNode.id) !== Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getPage"])(beforeNode.id)) {
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
const distantContent = (steps) => {
    var result = { isFound: false, values: [], steps: [] };
    var count = 0;
    for (let i = 1; i < steps.length - 1; i++) {
        if (Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i - 1].id).id !== Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i].id).id && Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i].id).id !== Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(steps[i + 1].id).id) {
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
const longP = (pointingTimes, avgPointingTime) => {
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
const manyH = (homingNum, avgHomingNum) => {
    var result = { isFound: false, values: [], steps: [] };
    if (homingNum > avgHomingNum) {
        result.isFound = true;
        result.values.push(homingNum);
    }
    return result;
};


/***/ }),

/***/ "./src/taskEval/helper/validityHelper.ts":
/*!***********************************************!*\
  !*** ./src/taskEval/helper/validityHelper.ts ***!
  \***********************************************/
/*! exports provided: checkForAnnotationGroup, checkValidity, checkButtonValidity, checkInputExample, checkInputValidity, checkLinkValidity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkForAnnotationGroup", function() { return checkForAnnotationGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkValidity", function() { return checkValidity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkButtonValidity", function() { return checkButtonValidity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInputExample", function() { return checkInputExample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkInputValidity", function() { return checkInputValidity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkLinkValidity", function() { return checkLinkValidity; });
/* harmony import */ var _figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../figmaAccess/fileContentGetters */ "./src/figmaAccess/fileContentGetters.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * This is a function to check if the selected element is an annotation group.
 * @returns Boolean
 */
const checkForAnnotationGroup = () => {
    const selection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    var selected = null;
    if (selection !== null && selection.name.endsWith('Annotation') === false) {
        selected = 'element';
    }
    else if (selection !== null && selection.name.endsWith('Annotation') === true) {
        selected = 'annotation';
    }
    return selected;
};
/**
 * This is a function to check the validity of a connection between two nodes.
 * @param args
 * @returns Boolean
 */
const checkValidity = (args) => {
    var beforeNode = null;
    var beforeFrame = null;
    if (args.before === null) {
        var beforeNode = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
        beforeFrame = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(beforeNode.id);
    }
    else {
        beforeNode = figma.getNodeById(args.before.id);
        beforeFrame = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(args.before.id);
    }
    var afterNode = null;
    var afterFrame = null;
    if (args.after === null) {
        var afterNode = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
        afterFrame = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(afterNode.id);
    }
    else {
        afterNode = figma.getNodeById(args.after.id);
        afterFrame = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getFrame"])(args.after.id);
    }
    if (beforeFrame.id !== afterFrame.id) {
        var beforeNodeParent = beforeNode.parent;
        if (beforeNodeParent.name.endsWith('Annotation')) {
            var element = beforeNodeParent.children[0];
            for (let i = 0; i < element.reactions.length; i++) {
                if (element.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        }
        else {
            for (let i = 0; i < beforeNode.reactions.length; i++) {
                if (beforeNode.reactions[i].action.destinationId === afterFrame.id) {
                    return true;
                }
            }
        }
    }
    else {
        return true;
    }
    return false;
};
/**
 * This is a function to check the validity of a button that is currently selected. The target size of 44 x 44 pixels is taken from the WCAG 2.1 standard (2.5.5) where it is
 * recommended for both desktop and touch devices.
 * @returns validity
 */
const checkButtonValidity = () => {
    var currentSelection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    var width = currentSelection.width;
    var height = currentSelection.height;
    if ((width >= 44) && (height >= 44)) {
        return true;
    }
    return false;
};
/**
 * This is a function to check if the selected element already contains an example.
 * @returns Boolean
 */
const checkInputExample = () => {
    var currentSelection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    var selectionParent = currentSelection.parent;
    if (selectionParent.name.endsWith('Annotation')) {
        for (let i = 0; i < selectionParent.children.length; i++) {
            if (selectionParent.children[i].name.endsWith('Eingabebeispiel')) {
                return selectionParent.children[i].characters;
            }
        }
    }
    return null;
};
/**
 * This is a function to check the validity of an input field. The text width of the input example should be smaller than the width of the input field.
 * @param input
 * @returns Boolean
 */
const checkInputValidity = (input) => __awaiter(void 0, void 0, void 0, function* () {
    var selection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    var selectionWidth = selection.width;
    var text = figma.createText();
    var textWidth = null;
    yield loadingFont().then(() => {
        text.fontName = { family: 'Roboto', style: 'Regular' };
        text.fontSize = 16;
        text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];
        text.characters = input;
    });
    textWidth = text.width;
    text.remove();
    if (textWidth < selectionWidth) {
        return true;
    }
    return false;
});
/**
 * This is a function to check the validity of a link that is currently selected.
 * A text link should not wrap to a second line (Research-Based Web Design and Usability Guidelines 10.11).
 * @returns Boolean
 */
const checkLinkValidity = () => __awaiter(void 0, void 0, void 0, function* () {
    var isText = false;
    var isImageOrShape = false;
    var selection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_0__["getCurrentSelection"])();
    if (selection.type === 'TEXT') {
        isText = true;
    }
    else {
        isImageOrShape = true;
    }
    if (isText) {
        var selectionHeight = selection.height;
        var fontSize = 16;
        if (selection.type === 'TEXT') {
            fontSize = selection.fontSize;
        }
        var text = figma.createText();
        var textHeight = null;
        yield loadingFont().then(() => {
            text.fontName = { family: 'Roboto', style: 'Regular' };
            text.fontSize = fontSize;
            text.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 1 } }];
            text.characters = 'Test';
        });
        textHeight = text.height;
        if (selectionHeight <= textHeight) {
            return true;
        }
    }
    if (isImageOrShape) {
        var width = selection.width;
        var height = selection.height;
        if ((width >= 44) && (height >= 44)) {
            return true;
        }
    }
    return false;
});
/**
 * This is a function to load a font
 */
const loadingFont = () => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: 'Roboto', style: 'Regular' });
});


/***/ }),

/***/ "./src/taskEval/taskEvalHandler.ts":
/*!*****************************************!*\
  !*** ./src/taskEval/taskEvalHandler.ts ***!
  \*****************************************/
/*! exports provided: taskEvalView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskEvalView", function() { return taskEvalView; });
/* harmony import */ var _codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../codeMessageHandler */ "./src/codeMessageHandler.ts");
/* harmony import */ var _helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper/taskEvalHelper */ "./src/taskEval/helper/taskEvalHelper.ts");
/* harmony import */ var _helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper/validityHelper */ "./src/taskEval/helper/validityHelper.ts");
/* harmony import */ var _helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helper/gomsHelper */ "./src/taskEval/helper/gomsHelper.ts");
/* harmony import */ var _helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helper/usabilitySmellsHelper */ "./src/taskEval/helper/usabilitySmellsHelper.ts");
/* harmony import */ var _start_startHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../start/startHandler */ "./src/start/startHandler.ts");
/* harmony import */ var _figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../figmaAccess/fileContentGetters */ "./src/figmaAccess/fileContentGetters.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







const taskEvalView = () => {
    // to navigate back to the start page
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('backToStart', () => {
        figma.showUI(__uiFiles__.start);
        Object(_start_startHandler__WEBPACK_IMPORTED_MODULE_5__["startView"])();
        figma.ui.resize(450, 550);
    });
    // to add a task step
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('addTaskStep', (args) => {
        if (args.type === 'input') {
            var isAdded = Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["createExampletext"])(args.input, args.taskname);
        }
        if (args.index !== undefined) {
            var taskAnnotation = Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["createTaskAnnotation"])(args.taskname, args.numSteps, args.color, null, args.index);
        }
        else {
            var taskAnnotation = Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["createTaskAnnotation"])(args.taskname, args.numSteps, args.color);
        }
        var selection = Object(_figmaAccess_fileContentGetters__WEBPACK_IMPORTED_MODULE_6__["getCurrentSelection"])();
        if (selection !== null) {
            Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('taskStepAdded', { taskname: args.taskname, id: taskAnnotation.id, name: selection.name });
        }
    });
    // to add multiple task steps
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('addTaskSteps', (args) => {
        var addedSteps = [];
        for (let i = 0; i < args.steps.length; i++) {
            var selection = Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["getElementToAnnotation"])(args.steps[i].id);
            var taskAnnotation = Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["createTaskAnnotation"])(args.taskname, i, args.color, selection);
            addedSteps.push({ id: taskAnnotation.id, name: selection.name, type: args.steps[i].type, input: args.steps[i].input });
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('taskStepsAdded', { taskname: args.taskname, steps: addedSteps });
    });
    // to delete a task step
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('deleteStep', (args) => {
        Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["deleteStepAnnotation"])(args.step, args.followingSteps);
    });
    // to delete multiple task steps
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('deleteSteps', (args) => {
        for (let i = 0; i < args.steps.length; i++) {
            Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["deleteStepAnnotation"])(args.steps[i], undefined);
        }
    });
    // to update task step number after changing the order or deleting a step
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('updateStepNumbers', (tasks) => {
        for (let i = 0; i < tasks.length; i++) {
            for (let j = 0; j < tasks[i].steps.length; j++) {
                Object(_helper_taskEvalHelper__WEBPACK_IMPORTED_MODULE_1__["updateStepAnnotation"])(tasks[i].steps[j].id, j + 1);
            }
        }
    });
    // to check if a selection is an annotation
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkSelection', () => __awaiter(void 0, void 0, void 0, function* () {
        var selected = Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkForAnnotationGroup"])();
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('selectionChecked', selected);
    }));
    // to check if a connection between a new step and the last existing step of a task is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkStepValidityBefore', (args) => __awaiter(void 0, void 0, void 0, function* () {
        var validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkValidity"])(args);
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('validityBefore', validity);
    }));
    // to check if a connection between a new task and the last existing task of a scenario is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkValidityBefore', (args) => __awaiter(void 0, void 0, void 0, function* () {
        var validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkValidity"])(args);
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('validityBefore', validity);
    }));
    // to check if a connection between a new step and the following step of a task is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkStepValidityAfter', (args) => __awaiter(void 0, void 0, void 0, function* () {
        var validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkValidity"])(args);
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('validityAfter', validity);
    }));
    // to check if a button is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkButtonValidity', () => __awaiter(void 0, void 0, void 0, function* () {
        var validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkButtonValidity"])();
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('buttonValidity', validity);
    }));
    // to check if an input field already contains an example
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkInputExample', () => __awaiter(void 0, void 0, void 0, function* () {
        var result = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkInputExample"])();
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('inputExampleCheck', result);
    }));
    // to check if an input field is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkInputValidity', (input) => __awaiter(void 0, void 0, void 0, function* () {
        var validity = false;
        if (input !== null) {
            validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkInputValidity"])(input);
        }
        else {
            validity = true;
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('inputValidity', validity);
    }));
    // to check if a link is valid
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('checkLinkValidity', () => __awaiter(void 0, void 0, void 0, function* () {
        var validity = yield Object(_helper_validityHelper__WEBPACK_IMPORTED_MODULE_2__["checkLinkValidity"])();
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('linkValidity', validity);
    }));
    // to evaluate a task
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('evaluateTask', (task) => __awaiter(void 0, void 0, void 0, function* () {
        var avgPointingTime = yield figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = yield figma.clientStorage.getAsync('homingNum');
        var convertedSteps = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["convertToOperators"])(task);
        var operatorTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForOperators"])(task.steps, convertedSteps);
        var stepsTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForSteps"])(operatorTimes);
        var gomsResult = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["calculateTime"])(task.steps, convertedSteps);
        var smells = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["checkUsabilitySmells"])(task.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
        var longPSmell = smells.find(smell => smell.title === 'Long P');
        if (longPSmell === undefined) {
            yield figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
        }
        var manyHSmell = smells.find(smell => smell.title === 'Many H');
        if (manyHSmell === undefined) {
            yield figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('taskEvaluationResult', { goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes }, usabilitySmells: smells });
    }));
    // to evaluate a comparison task
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('evaluateTaskComparison', (task) => __awaiter(void 0, void 0, void 0, function* () {
        var avgPointingTime = yield figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = yield figma.clientStorage.getAsync('homingNum');
        var convertedSteps = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["convertToOperators"])(task);
        var operatorTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForOperators"])(task.steps, convertedSteps);
        var stepsTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForSteps"])(operatorTimes);
        var gomsResult = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["calculateTime"])(task.steps, convertedSteps);
        var smells = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["checkUsabilitySmells"])(task.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
        var longPSmell = smells.find(smell => smell.title === 'Long P');
        if (longPSmell === undefined) {
            yield figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
        }
        var manyHSmell = smells.find(smell => smell.title === 'Many H');
        if (manyHSmell === undefined) {
            yield figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('comparisonTaskEvaluationResult', { goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes }, usabilitySmells: smells });
    }));
    // to evaluate a scenario
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('evaluateScenario', (args) => __awaiter(void 0, void 0, void 0, function* () {
        var result = [];
        var scenarioSteps = [];
        var transitionSteps = [];
        var avgPointingTime = yield figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = yield figma.clientStorage.getAsync('homingNum');
        for (let i = 0; i < args.scenario.tasks.length; i++) {
            const taskIndex = args.tasks.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            var taskElement = args.tasks[taskIndex];
            for (let j = 0; j < taskElement.steps.length; j++) {
                if (i !== args.scenario.tasks.length - 1 && j === taskElement.steps.length - 2) {
                    transitionSteps.push({ transitionNum: i + 1, steps: [taskElement.steps[j]] });
                }
                else if (i !== args.scenario.tasks.length - 1 && j === taskElement.steps.length - 1) {
                    transitionSteps[i].steps.push(taskElement.steps[j]);
                }
                else if (i >= 1 && (j === 0 || j == 1)) {
                    transitionSteps[i - 1].steps.push(taskElement.steps[j]);
                }
            }
            taskElement.steps.forEach(step => {
                scenarioSteps.push(step);
            });
            var convertedSteps = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["convertToOperators"])(taskElement);
            var operatorTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForOperators"])(taskElement.steps, convertedSteps);
            var stepsTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForSteps"])(operatorTimes);
            var gomsResult = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["calculateTime"])(taskElement.steps, convertedSteps);
            var taskSmells = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["checkUsabilitySmells"])(taskElement.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
            var longPSmell = taskSmells.find(smell => smell.title === 'Long P');
            if (longPSmell === undefined) {
                yield figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
            }
            var manyHSmell = taskSmells.find(smell => smell.title === 'Many H');
            if (manyHSmell === undefined) {
                yield figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
            }
            var evaluationIndex = -1;
            if (args.history.length > 0) {
                evaluationIndex = args.history.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            }
            if (evaluationIndex < 0) {
                args.history.push({
                    id: 0,
                    type: 'task',
                    taskname: args.scenario.tasks[i].taskname,
                    color: taskElement.color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: taskElement.steps,
                            goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                            usabilitySmells: taskSmells,
                            comparison: null
                        }
                    ]
                });
            }
            else {
                args.history[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: taskElement.steps,
                    goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                    usabilitySmells: taskSmells,
                    comparison: null
                });
            }
            result.push({ taskname: args.scenario.tasks[i].taskname, time: gomsResult.time });
        }
        var scenarioSmells = [];
        var highWebsiteElementDistanceResult = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["highWebsiteElementDistance"])(scenarioSteps);
        if (highWebsiteElementDistanceResult.isFound) {
            scenarioSmells.push({ title: 'Hohe Website-Element-Abstände', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps });
        }
        var distantContentFound = false;
        var distantContentValues = [];
        var distantContentSteps = [];
        transitionSteps.forEach(transition => {
            var distantContentResult = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["distantContent"])(transition.steps);
            if (distantContentResult.isFound) {
                distantContentFound = true;
                distantContentValues.push(distantContentResult.values);
                distantContentSteps.push(transition.transitionNum);
            }
        });
        scenarioSmells.push({ title: 'Entfernter Inhalt', isFound: distantContentFound, values: distantContentValues, steps: distantContentSteps });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('scenarioEvaluationResult', { taskEvaluationHistory: args.history, gomsTimes: result, usabilitySmells: scenarioSmells });
    }));
    // to evaluate a comparison scenario
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('evaluateScenarioComparison', (args) => __awaiter(void 0, void 0, void 0, function* () {
        var result = [];
        var scenarioSteps = [];
        var transitionSteps = [];
        var avgPointingTime = yield figma.clientStorage.getAsync('pointingTime');
        var avgHomingNum = yield figma.clientStorage.getAsync('homingNum');
        for (let i = 0; i < args.scenario.tasks.length; i++) {
            const taskIndex = args.tasks.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            var taskElement = args.tasks[taskIndex];
            for (let j = 0; j < taskElement.steps.length; j++) {
                if (i !== args.scenario.tasks.length - 1 && j === taskElement.steps.length - 2) {
                    transitionSteps.push({ transitionNum: i + 1, steps: [taskElement.steps[j]] });
                }
                else if (i !== args.scenario.tasks.length - 1 && j === taskElement.steps.length - 1) {
                    transitionSteps[i].steps.push(taskElement.steps[j]);
                }
                else if (i >= 1 && (j === 0 || j == 1)) {
                    transitionSteps[i - 1].steps.push(taskElement.steps[j]);
                }
            }
            taskElement.steps.forEach(step => {
                scenarioSteps.push(step);
            });
            var convertedSteps = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["convertToOperators"])(taskElement);
            var operatorTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForOperators"])(taskElement.steps, convertedSteps);
            var stepsTimes = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["getTimeForSteps"])(operatorTimes);
            var gomsResult = Object(_helper_gomsHelper__WEBPACK_IMPORTED_MODULE_3__["calculateTime"])(taskElement.steps, convertedSteps);
            var taskSmells = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["checkUsabilitySmells"])(taskElement.steps, avgPointingTime, avgHomingNum, gomsResult.pointingTimes, gomsResult.homingNum);
            var longPSmell = taskSmells.find(smell => smell.title === 'Long P');
            if (longPSmell === undefined) {
                yield figma.clientStorage.setAsync('pointingTime', (avgPointingTime + gomsResult.avgPointingTime) / 2);
            }
            var manyHSmell = taskSmells.find(smell => smell.title === 'Many H');
            if (manyHSmell === undefined) {
                yield figma.clientStorage.setAsync('homingNum', (avgHomingNum + gomsResult.homingNum) / 2);
            }
            var evaluationIndex = -1;
            if (args.history.length > 0) {
                evaluationIndex = args.history.findIndex((element) => element.taskname === args.scenario.tasks[i].taskname);
            }
            if (evaluationIndex < 0) {
                args.history.push({
                    id: 0,
                    type: 'task',
                    taskname: args.scenario.tasks[i].taskname,
                    color: taskElement.color,
                    evaluationRuns: [
                        {
                            timestamp: Date.now(),
                            steps: taskElement.steps,
                            goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                            usabilitySmells: taskSmells,
                            comparison: null
                        }
                    ]
                });
            }
            else {
                args.history[evaluationIndex].evaluationRuns.unshift({
                    timestamp: Date.now(),
                    steps: taskElement.steps,
                    goms: { gomsTime: gomsResult.time, operatorTimes: operatorTimes, stepsTimes: stepsTimes },
                    usabilitySmells: taskSmells,
                    comparison: null
                });
            }
            result.push({ taskname: args.scenario.tasks[i].taskname, time: gomsResult.time });
        }
        var scenarioSmells = [];
        var highWebsiteElementDistanceResult = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["highWebsiteElementDistance"])(scenarioSteps);
        if (highWebsiteElementDistanceResult.isFound) {
            scenarioSmells.push({ title: 'Hohe Website-Element-Abstände', isFound: highWebsiteElementDistanceResult.isFound, values: highWebsiteElementDistanceResult.values, steps: highWebsiteElementDistanceResult.steps });
        }
        var distantContentFound = false;
        var distantContentValues = [];
        var distantContentSteps = [];
        transitionSteps.forEach(transition => {
            var distantContentResult = Object(_helper_usabilitySmellsHelper__WEBPACK_IMPORTED_MODULE_4__["distantContent"])(transition.steps);
            if (distantContentResult.isFound) {
                distantContentFound = true;
                distantContentValues.push(distantContentResult.values);
                distantContentSteps.push(transition.transitionNum);
            }
        });
        if (distantContentFound) {
            scenarioSmells.push({ title: 'Entfernter Inhalt', isFound: distantContentFound, values: distantContentValues, steps: distantContentSteps });
        }
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('comparisonScenarioEvaluationResult', { taskEvaluationHistory: args.history, gomsTimes: result, usabilitySmells: scenarioSmells });
    }));
    // to get the storage containing all defined tasks
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getTaskStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var tasks = undefined;
        yield figma.clientStorage.getAsync('tasks').then((value) => {
            tasks = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentTaskStorage', tasks);
    }));
    // to set the task storage
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setTaskStorage', (tasks) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('tasks', tasks);
    }));
    // to get the storage containing all defined scenarios
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getScenarioStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var scenarios = undefined;
        yield figma.clientStorage.getAsync('scenarios').then((value) => {
            scenarios = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentScenarioStorage', scenarios);
    }));
    // to set the scenario storage
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setScenarioStorage', (scenarios) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('scenarios', scenarios);
    }));
    // to get the storage containing all task evaluations
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getTaskEvaluationStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var evaluationStorage = undefined;
        yield figma.clientStorage.getAsync('taskEvaluation').then((value) => {
            evaluationStorage = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentTaskEvaluationStorage', evaluationStorage);
    }));
    // to set the task evaluation storage
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setTaskEvaluationStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('taskEvaluation', storage);
    }));
    // to get the storage containing all scenario evaluations
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('getScenarioEvaluationStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var evaluationStorage = undefined;
        yield figma.clientStorage.getAsync('scenarioEvaluation').then((value) => {
            evaluationStorage = value;
        });
        Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["dispatch"])('currentScenarioEvaluationStorage', evaluationStorage);
    }));
    // to set the scenario evaluation storage
    Object(_codeMessageHandler__WEBPACK_IMPORTED_MODULE_0__["handleEvent"])('setScenarioEvaluationStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('scenarioEvaluation', storage);
    }));
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGVNZXNzYWdlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZmlnbWFBY2Nlc3MvZmlsZUNvbnRlbnRHZXR0ZXJzLnRzIiwid2VicGFjazovLy8uL3NyYy9maWdtYUFjY2Vzcy9maWxlQ29udGVudFNldHRlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ldHJpY0V2YWwvaGVscGVyL21ldHJpY0V2YWxIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21ldHJpY0V2YWwvbWV0cmljRXZhbEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YXJ0L3N0YXJ0SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFza0V2YWwvaGVscGVyL2dvbXNIZWxwZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rhc2tFdmFsL2hlbHBlci90YXNrRXZhbEhlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFza0V2YWwvaGVscGVyL3VzYWJpbGl0eVNtZWxsc0hlbHBlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdGFza0V2YWwvaGVscGVyL3ZhbGlkaXR5SGVscGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90YXNrRXZhbC90YXNrRXZhbEhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FB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QUs7QUFDTDtBQUNBLElBQUksdUVBQVc7QUFDZjtBQUNBLEtBQUs7QUFDTDtBQUNBLElBQUksdUVBQVc7QUFDZjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsUUFBUSxvRUFBUTtBQUNoQixLQUFLO0FBQ0w7QUFDQSxJQUFJLHVFQUFXO0FBQ2Y7QUFDQSxLQUFLO0FBQ0w7QUFDQSxJQUFJLHVFQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULFFBQVEsb0VBQVE7QUFDaEIsS0FBSztBQUNMO0FBQ0EsSUFBSSx1RUFBVztBQUNmO0FBQ0EsS0FBSztBQUNMIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLnRzXCIpO1xuIiwiaW1wb3J0IHsgc3RhcnRWaWV3IH0gZnJvbSAnLi9zdGFydC9zdGFydEhhbmRsZXInO1xyXG5pbXBvcnQgeyBtZXRyaWNFdmFsVmlldyB9IGZyb20gJy4vbWV0cmljRXZhbC9tZXRyaWNFdmFsSGFuZGxlcic7XHJcbmltcG9ydCB7IHRhc2tFdmFsVmlldyB9IGZyb20gJy4vdGFza0V2YWwvdGFza0V2YWxIYW5kbGVyJztcclxuc3dpdGNoIChmaWdtYS5jb21tYW5kKSB7XHJcbiAgICBjYXNlICdzdGFydCc6XHJcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnN0YXJ0KTtcclxuICAgICAgICBzdGFydFZpZXcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIGNhc2UgJ21ldHJpY0V2YWwnOlxyXG4gICAgICAgIGZpZ21hLnNob3dVSShfX3VpRmlsZXNfXy5tZXRyaWNFdmFsKTtcclxuICAgICAgICBtZXRyaWNFdmFsVmlldygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAndGFza0V2YWwnOlxyXG4gICAgICAgIGZpZ21hLnNob3dVSShfX3VpRmlsZXNfXy50YXNrRXZhbCk7XHJcbiAgICAgICAgdGFza0V2YWxWaWV3KCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbn1cclxuZmlnbWEudWkucmVzaXplKDQ1MCwgNTUwKTtcclxuIiwiY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSBbXTtcclxuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbiwgZGF0YSkgPT4ge1xyXG4gICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyBhY3Rpb24sIGRhdGEgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBoYW5kbGVFdmVudCA9ICh0eXBlLCBjYWxsYmFjaykgPT4ge1xyXG4gICAgZXZlbnRMaXN0ZW5lcnMucHVzaCh7IHR5cGUsIGNhbGxiYWNrIH0pO1xyXG59O1xyXG5maWdtYS51aS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcclxuICAgIGZvciAobGV0IGV2ZW50TGlzdGVuZXIgb2YgZXZlbnRMaXN0ZW5lcnMpIHtcclxuICAgICAgICBpZiAobWVzc2FnZS5hY3Rpb24gPT09IGV2ZW50TGlzdGVuZXIudHlwZSlcclxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lci5jYWxsYmFjayhtZXNzYWdlLmRhdGEpO1xyXG4gICAgfVxyXG59O1xyXG4iLCIvKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGdldCB0aGUgdW5kZXJseWluZyBmcmFtZSB0aGF0IGNvbnRhaW5zIGEgZ2l2ZW4gbm9kZS5cclxuICogQHBhcmFtIG5vZGVJZFxyXG4gKiBAcmV0dXJucyBmcmFtZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldEZyYW1lID0gKG5vZGVJZCkgPT4ge1xyXG4gICAgdmFyIGZyYW1lID0gbnVsbDtcclxuICAgIHZhciBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQobm9kZUlkKTtcclxuICAgIGlmIChub2RlLnR5cGUgIT09ICdGUkFNRScpIHtcclxuICAgICAgICB2YXIgbm9kZVBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgIHdoaWxlIChub2RlUGFyZW50LnR5cGUgIT09ICdGUkFNRScpIHtcclxuICAgICAgICAgICAgbm9kZVBhcmVudCA9IG5vZGVQYXJlbnQucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcmFtZSA9IG5vZGVQYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmcmFtZSA9IG5vZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZnJhbWU7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gZ2V0IHRoZSB1bmRlcmx5aW5nIHBhZ2UgdGhhdCBjb250YWlucyBhIGdpdmVuIG5vZGUuXHJcbiAqIEBwYXJhbSBub2RlSWRcclxuICogQHJldHVybnMgcGFnZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGdldFBhZ2UgPSAobm9kZUlkKSA9PiB7XHJcbiAgICB2YXIgcGFnZSA9IG51bGw7XHJcbiAgICB2YXIgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJZCk7XHJcbiAgICBpZiAobm9kZS50eXBlICE9PSAnUEFHRScpIHtcclxuICAgICAgICB2YXIgbm9kZVBhcmVudCA9IG5vZGUucGFyZW50O1xyXG4gICAgICAgIHdoaWxlIChub2RlUGFyZW50LnR5cGUgIT09ICdQQUdFJykge1xyXG4gICAgICAgICAgICBub2RlUGFyZW50ID0gbm9kZVBhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhZ2UgPSBub2RlUGFyZW50O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcGFnZSA9IG5vZGU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFnZTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBnZXQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gKiBAcmV0dXJucyBzZWxlY3Rpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50U2VsZWN0aW9uID0gKCkgPT4ge1xyXG4gICAgdmFyIHNlbGVjdGlvbiA9IG51bGw7XHJcbiAgICBpZiAoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGZvciAoY29uc3Qgbm9kZSBvZiBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgc2VsZWN0aW9uID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGdldCB0aGUgY2VudGVyIChwb2ludCAoeCx5KSkgb2YgYSBub2RlLlxyXG4gKiBAcGFyYW0gbm9kZUlkXHJcbiAqIEByZXR1cm5zIG9iamVjdCB3aXRoIHggYW5kIHkgcG9zaXRpb25cclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRDZW50ZXJPZk5vZGUgPSAobm9kZUlkKSA9PiB7XHJcbiAgICB2YXIgY2VudGVyWCA9IDA7XHJcbiAgICB2YXIgY2VudGVyWSA9IDA7XHJcbiAgICB2YXIgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG5vZGVJZCk7XHJcbiAgICB2YXIgcmVsYXRpdmVUcmFuc2Zvcm0gPSBub2RlLnJlbGF0aXZlVHJhbnNmb3JtO1xyXG4gICAgdmFyIHdpZHRoID0gbm9kZS53aWR0aDtcclxuICAgIHZhciBoZWlnaHQgPSBub2RlLmhlaWdodDtcclxuICAgIGNlbnRlclggPSByZWxhdGl2ZVRyYW5zZm9ybVswXVsyXSArICgxIC8gMiAqIHdpZHRoKTtcclxuICAgIGNlbnRlclkgPSByZWxhdGl2ZVRyYW5zZm9ybVsxXVsyXSArICgxIC8gMiAqIGhlaWdodCk7XHJcbiAgICByZXR1cm4geyB4OiBjZW50ZXJYLCB5OiBjZW50ZXJZIH07XHJcbn07XHJcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjcmVhdGUgYSB0ZXh0IG5vZGUuXHJcbiAqIEBwYXJhbSBuYW1lXHJcbiAqIEBwYXJhbSBmaWxsc0NvbG9yXHJcbiAqIEBwYXJhbSBzdHJva2VDb2xvclxyXG4gKiBAcGFyYW0gdGV4dENvbnRlbnRcclxuICogQHJldHVybnMgdGV4dFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHROb2RlID0gKG5hbWUsIGZpbGxzQ29sb3IsIHN0cm9rZUNvbG9yLCB0ZXh0Q29udGVudCkgPT4ge1xyXG4gICAgdmFyIHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XHJcbiAgICB0ZXh0Lm5hbWUgPSBuYW1lO1xyXG4gICAgc2V0VGV4dCh0ZXh0LCBmaWxsc0NvbG9yLCBzdHJva2VDb2xvciwgdGV4dENvbnRlbnQpO1xyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGFuIGVsbGlwc2Ugbm9kZS5cclxuICogQHBhcmFtIG5hbWVcclxuICogQHBhcmFtIHdpZHRoXHJcbiAqIEBwYXJhbSBoZWlnaHRcclxuICogQHBhcmFtIGZpbGxzQ29sb3JcclxuICogQHJldHVybnMgZWxsaXBzZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsbGlwc2VOb2RlID0gKG5hbWUsIHdpZHRoLCBoZWlnaHQsIGZpbGxzQ29sb3IpID0+IHtcclxuICAgIGxldCBlbGxpcHNlID0gZmlnbWEuY3JlYXRlRWxsaXBzZSgpO1xyXG4gICAgZWxsaXBzZS5uYW1lID0gbmFtZTtcclxuICAgIGVsbGlwc2UucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgZWxsaXBzZS5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiBmaWxsc0NvbG9yIH1dO1xyXG4gICAgcmV0dXJuIGVsbGlwc2U7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGEgZ3JvdXAgbm9kZS5cclxuICogQHBhcmFtIG5hbWVcclxuICogQHBhcmFtIGNoaWxkcmVuXHJcbiAqIEByZXR1cm5zIGdyb3VwXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlR3JvdXBOb2RlID0gKG5hbWUsIGNoaWxkcmVuKSA9PiB7XHJcbiAgICBjb25zdCBncm91cE5vZGUgPSBbXTtcclxuICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgIGdyb3VwTm9kZS5wdXNoKGNoaWxkKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGdyb3VwID0gZmlnbWEuZ3JvdXAoZ3JvdXBOb2RlLCBmaWdtYS5jdXJyZW50UGFnZSk7XHJcbiAgICBncm91cC5uYW1lID0gbmFtZSArIGdyb3VwLmlkO1xyXG4gICAgcmV0dXJuIGdyb3VwO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGFkZCBhbiBhbm5vdGF0aW9uIHRvIGEgZmlsZVxyXG4gKiBAcGFyYW0gYW5ub3RhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGFkZEFubm90YXRpb25Ub0ZpbGUgPSAoY3VycmVudFNlbGVjdGlvbiwgYW5ub3RhdGlvbikgPT4ge1xyXG4gICAgdmFyIHNlbGVjdGlvblBhcmVudCA9IGN1cnJlbnRTZWxlY3Rpb24ucGFyZW50O1xyXG4gICAgdmFyIGluZGV4ID0gc2VsZWN0aW9uUGFyZW50LmNoaWxkcmVuLmZpbmRJbmRleChjaGlsZCA9PiBKU09OLnN0cmluZ2lmeShjaGlsZCkgPT09IEpTT04uc3RyaW5naWZ5KGN1cnJlbnRTZWxlY3Rpb24pKTtcclxuICAgIGlmIChzZWxlY3Rpb25QYXJlbnQubmFtZS5lbmRzV2l0aCgnQW5ub3RhdGlvbicpKSB7XHJcbiAgICAgICAgc2VsZWN0aW9uUGFyZW50Lmluc2VydENoaWxkKHNlbGVjdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGgsIGFubm90YXRpb24pO1xyXG4gICAgICAgIGluZGV4ID0gc2VsZWN0aW9uUGFyZW50LnBhcmVudC5jaGlsZHJlbi5maW5kSW5kZXgoY2hpbGQgPT4gSlNPTi5zdHJpbmdpZnkoY2hpbGQpID09PSBKU09OLnN0cmluZ2lmeShzZWxlY3Rpb25QYXJlbnQpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnRBbmRBbm5vdGF0aW9uR3JvdXBOb2RlID0gW107XHJcbiAgICAgICAgZWxlbWVudEFuZEFubm90YXRpb25Hcm91cE5vZGUucHVzaChhbm5vdGF0aW9uKTtcclxuICAgICAgICB2YXIgZWxlbWVudEFuZEFubm90YXRpb25Hcm91cCA9IGZpZ21hLmdyb3VwKGVsZW1lbnRBbmRBbm5vdGF0aW9uR3JvdXBOb2RlLCBmaWdtYS5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gbm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsZW1lbnRBbmRBbm5vdGF0aW9uR3JvdXAubmFtZSA9IG5vZGUubmFtZSArICcgKyBBbm5vdGF0aW9uJztcclxuICAgICAgICAgICAgZWxlbWVudEFuZEFubm90YXRpb25Hcm91cC5pbnNlcnRDaGlsZCgwLCBub2RlKTtcclxuICAgICAgICAgICAgcGFyZW50Lmluc2VydENoaWxkKGluZGV4LCBlbGVtZW50QW5kQW5ub3RhdGlvbkdyb3VwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gc2V0IHRoZSBjb250ZW50IG9mIGEgdGV4dCBub2RlLlxyXG4gKiBAcGFyYW0gbm9kZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldFRleHQgPSAodGV4dCwgZmlsbHNDb2xvciwgc3Ryb2tlQ29sb3IsIHRleHRDb250ZW50KSA9PiB7XHJcbiAgICBsb2FkaW5nRm9udCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRleHQuZm9udE5hbWUgPSB7IGZhbWlseTogJ1JvYm90bycsIHN0eWxlOiAnUmVndWxhcicgfTtcclxuICAgICAgICB0ZXh0LmZvbnRTaXplID0gMTY7XHJcbiAgICAgICAgdGV4dC5maWxscyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yOiBmaWxsc0NvbG9yIH1dO1xyXG4gICAgICAgIGlmIChzdHJva2VDb2xvciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJva2UgPSB7IHR5cGU6IFwiU09MSURcIiwgY29sb3I6IHN0cm9rZUNvbG9yIH07XHJcbiAgICAgICAgICAgIHRleHQuc3Ryb2tlcyA9IFtzdHJva2VdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0ZXh0LmNoYXJhY3RlcnMgPSB0ZXh0Q29udGVudDtcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gbG9hZCBhIGZvbnQuXHJcbiAqL1xyXG5jb25zdCBsb2FkaW5nRm9udCA9ICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgeWllbGQgZmlnbWEubG9hZEZvbnRBc3luYyh7IGZhbWlseTogJ1JvYm90bycsIHN0eWxlOiAnUmVndWxhcicgfSk7XHJcbn0pO1xyXG4iLCIvKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGV2YWx1YXRlIHRoZSBjb2xvciBjb25zaXN0ZW5jeSBhYm92ZSBtdWx0aXBsZSBmcmFtZXMgaW4gYSBkb2N1bWVudC5cclxuICogVGhpcyBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIGFsbCBmcmFtZXMgdG9nZXRoZXIuXHJcbiAqIEBwYXJhbSBmcmFtZXNcclxuICogQHJldHVybnMgT2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9jYWxDb2xvckNvbnNpc3RlbmN5ID0gKGZyYW1lcykgPT4ge1xyXG4gICAgdmFyIGNvbG9yU3R5bGVzID0gZmlnbWEuZ2V0TG9jYWxQYWludFN0eWxlcygpO1xyXG4gICAgdmFyIHByZWRlZmluZWRDb2xvclN0eWxlcyA9IFtdO1xyXG4gICAgY29sb3JTdHlsZXMuZm9yRWFjaChzdHlsZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcmVkZWZpbmVkQ29sb3JTdHlsZXMuZmluZEluZGV4KChjb2xvclN0eWxlKSA9PiBKU09OLnN0cmluZ2lmeShjb2xvclN0eWxlKSA9PT0gSlNPTi5zdHJpbmdpZnkoc3R5bGUucGFpbnRzKSk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCAmJiBjb250YWluc0JsYWNrT3JXaGl0ZShzdHlsZS5wYWludHMpID09PSBmYWxzZSAmJiBzdHlsZS5wYWludHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBwcmVkZWZpbmVkQ29sb3JTdHlsZXMucHVzaChzdHlsZS5wYWludHMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIG5vZGVGaWxscyA9IFtdO1xyXG4gICAgZnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZyYW1lTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGZyYW1lLmlkKTtcclxuICAgICAgICBpZiAoZnJhbWVOb2RlLnR5cGUgPT09ICdGUkFNRScpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBmcmFtZU5vZGUuZmluZEFsbCgpO1xyXG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLm5hbWUuc3RhcnRzV2l0aCgnQW5ub3RhdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCdmaWxscycgaW4gbm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IG5vZGVGaWxscy5maW5kSW5kZXgoKG5vZGVGaWxsKSA9PiBKU09OLnN0cmluZ2lmeShub2RlRmlsbC5maWxsKSA9PT0gSlNPTi5zdHJpbmdpZnkobm9kZS5maWxscykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udGFpbnNCbGFja09yV2hpdGUobm9kZS5maWxscykgPT09IGZhbHNlICYmIGNvbnRhaW5zSW1hZ2Uobm9kZS5maWxscykgPT09IGZhbHNlICYmIG5vZGUuZmlsbHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVGaWxscy5wdXNoKHsgbm9kZXM6IFtub2RlLmlkXSwgZmlsbDogbm9kZS5maWxscyB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlRmlsbHNbaW5kZXhdLm5vZGVzLnB1c2gobm9kZS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIG5vdFByZWRlZmluZWQgPSBbXTtcclxuICAgIG5vZGVGaWxscy5mb3JFYWNoKG5vZGVGaWxsID0+IHtcclxuICAgICAgICBjb25zdCBpbmRleCA9IHByZWRlZmluZWRDb2xvclN0eWxlcy5maW5kSW5kZXgoKHN0eWxlKSA9PiBKU09OLnN0cmluZ2lmeShzdHlsZSkgPT09IEpTT04uc3RyaW5naWZ5KG5vZGVGaWxsLmZpbGwpKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIG5vdFByZWRlZmluZWQucHVzaChub2RlRmlsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgY29sb3JDb25zaXN0ZW5jeVZhbHVlID0gKGNvbG9yU3R5bGVzLmxlbmd0aCAvIG5vZGVGaWxscy5sZW5ndGgpICogMTAwO1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IGNvbG9yQ29uc2lzdGVuY3lWYWx1ZSwgbm9kZXM6IG5vdFByZWRlZmluZWQgfTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBldmFsdWF0ZSB0aGUgZm9udCBjb25zaXN0ZW5jeSBhYm92ZSBtdWx0aXBsZSBmcmFtZXMgaW4gYSBkb2N1bWVudC5cclxuICogVGhpcyBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIGFsbCBmcmFtZXMgdG9nZXRoZXIuXHJcbiAqIEBwYXJhbSBmcmFtZXNcclxuICogQHJldHVybnMgT2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbG9jYWxGb250Q29uc2lzdGVuY3kgPSAoZnJhbWVzKSA9PiB7XHJcbiAgICB2YXIgdGV4dFN0eWxlcyA9IGZpZ21hLmdldExvY2FsVGV4dFN0eWxlcygpO1xyXG4gICAgdmFyIHByZWRlZmluZWRUZXh0U3R5bGVzID0gW107XHJcbiAgICB0ZXh0U3R5bGVzLmZvckVhY2goc3R5bGUgPT4ge1xyXG4gICAgICAgIHZhciBmb250TmFtZUFuZFNpemUgPSB7IGZvbnROYW1lOiBzdHlsZS5mb250TmFtZSwgZm9udFNpemU6IHN0eWxlLmZvbnRTaXplIH07XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcHJlZGVmaW5lZFRleHRTdHlsZXMuZmluZEluZGV4KChzdHlsZSkgPT4gSlNPTi5zdHJpbmdpZnkoc3R5bGUpID09PSBKU09OLnN0cmluZ2lmeShmb250TmFtZUFuZFNpemUpKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIHByZWRlZmluZWRUZXh0U3R5bGVzLnB1c2goZm9udE5hbWVBbmRTaXplKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBub2RlVGV4dFN0eWxlcyA9IFtdO1xyXG4gICAgZnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZyYW1lTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGZyYW1lLmlkKTtcclxuICAgICAgICBpZiAoZnJhbWVOb2RlLnR5cGUgPT09ICdGUkFNRScpIHtcclxuICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBmcmFtZU5vZGUuZmluZEFsbCgpO1xyXG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFub2RlLm5hbWUuc3RhcnRzV2l0aCgnQW5ub3RhdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmb250TmFtZUFuZFNpemUgPSB7IGZvbnROYW1lOiBub2RlLmZvbnROYW1lLCBmb250U2l6ZTogbm9kZS5mb250U2l6ZSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBub2RlVGV4dFN0eWxlcy5maW5kSW5kZXgoKHN0eWxlKSA9PiBKU09OLnN0cmluZ2lmeShzdHlsZS5mb250U3R5bGUpID09PSBKU09OLnN0cmluZ2lmeShmb250TmFtZUFuZFNpemUpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZVRleHRTdHlsZXMucHVzaCh7IG5vZGVzOiBbbm9kZS5pZF0sIGZvbnRTdHlsZTogZm9udE5hbWVBbmRTaXplIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVUZXh0U3R5bGVzW2luZGV4XS5ub2Rlcy5wdXNoKG5vZGUuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciBub3RQcmVkZWZpbmVkID0gW107XHJcbiAgICBub2RlVGV4dFN0eWxlcy5mb3JFYWNoKHRleHRTdHlsZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBwcmVkZWZpbmVkVGV4dFN0eWxlcy5maW5kSW5kZXgoKHN0eWxlKSA9PiBKU09OLnN0cmluZ2lmeShzdHlsZSkgPT09IEpTT04uc3RyaW5naWZ5KHRleHRTdHlsZS5mb250U3R5bGUpKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIG5vdFByZWRlZmluZWQucHVzaCh0ZXh0U3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIGZvbnRDb25zaXN0ZW5jeVZhbHVlID0gKHRleHRTdHlsZXMubGVuZ3RoIC8gbm9kZVRleHRTdHlsZXMubGVuZ3RoKSAqIDEwMDtcclxuICAgIHJldHVybiB7IHZhbHVlOiBmb250Q29uc2lzdGVuY3lWYWx1ZSwgbm9kZXM6IG5vdFByZWRlZmluZWQgfTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayB0aGF0IHRoZSBmb250IHNpemUgb2YgYSB0ZXh0IGlzIGVxdWFsIHRvIG9yIGJpZ2dlciB0aGFuIDEycHQuXHJcbiAqIFRoaXMgZnVuY3Rpb24gaXMgYXBwbGlleCB0byBvbmUgdGV4dCBlbGVtZW50LlxyXG4gKiBAcGFyYW0gZnJhbWVzXHJcbiAqIEByZXR1cm5zIE9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGZvbnRTaXplID0gKGZyYW1lcykgPT4ge1xyXG4gICAgdmFyIHRleHRzV2l0aFNtYWxsZXJGb250U2l6ZSA9IFtdO1xyXG4gICAgZnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGZyYW1lTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGZyYW1lLmlkKTtcclxuICAgICAgICBpZiAoZnJhbWVOb2RlLnR5cGUgPT09ICdGUkFNRScpIHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dE5vZGVzID0gZnJhbWVOb2RlLmZpbmRBbGwobm9kZSA9PiBub2RlLnR5cGUgPT09ICdURVhUJyk7XHJcbiAgICAgICAgICAgIHRleHROb2Rlcy5mb3JFYWNoKHRleHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRleHQuZm9udFNpemUgPCAxMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gdGV4dC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmxlbmd0aCA+IDMwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUgPSAobmFtZS5zbGljZSgwLCAzMCkpICsgJy4uLic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRzV2l0aFNtYWxsZXJGb250U2l6ZS5wdXNoKHsgaWQ6IHRleHQuaWQsIG5hbWU6IG5hbWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IG51bGwsIG5vZGVzOiB0ZXh0c1dpdGhTbWFsbGVyRm9udFNpemUgfTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhbnkgZnJhbWUgaXMgbWlzc2luZyBhIGhvbWVwYWdlIHJlZmVyZW5jZS5cclxuICogVGhlIGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gYWxsIGZyYW1lcyB0b2dldGhlci5cclxuICogQHBhcmFtIHNlbGVjdGVkRnJhbWVzXHJcbiAqIEBwYXJhbSBob21lcGFnZUlkXHJcbiAqIEByZXR1cm5zIE9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhvbWVwYWdlUmVmZXJlbmNlID0gKHNlbGVjdGVkRnJhbWVzLCBob21lcGFnZUlkKSA9PiB7XHJcbiAgICB2YXIgbWlzc2luZ1JlZmVyZW5jZXMgPSBbXTtcclxuICAgIHNlbGVjdGVkRnJhbWVzLmZvckVhY2goZnJhbWUgPT4ge1xyXG4gICAgICAgIHZhciBpc0ZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGZyYW1lLmlkICE9PSBob21lcGFnZUlkKSB7XHJcbiAgICAgICAgICAgIHZhciBmcmFtZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChmcmFtZS5pZCk7XHJcbiAgICAgICAgICAgIGlmIChmcmFtZU5vZGUudHlwZSA9PT0gJ0ZSQU1FJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBmcmFtZU5vZGUuZmluZEFsbCgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVhY3Rpb25zID0gbm9kZS5yZWFjdGlvbnM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWN0aW9ucy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0aW9ucy5mb3JFYWNoKHJlYWN0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWFjdGlvbi5hY3Rpb24gIT09IG51bGwgJiYgcmVhY3Rpb24uYWN0aW9uLmRlc3RpbmF0aW9uSWQgPT09IGhvbWVwYWdlSWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpc0ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRm91bmQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIG1pc3NpbmdSZWZlcmVuY2VzLnB1c2goeyBpZDogZnJhbWUuaWQsIG5hbWU6IGZyYW1lLm5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgaG9tZXBhZ2VSZWZlcmVuY2VWYWx1ZSA9IChzZWxlY3RlZEZyYW1lcy5sZW5ndGggLSBtaXNzaW5nUmVmZXJlbmNlcy5sZW5ndGgpIC8gc2VsZWN0ZWRGcmFtZXMubGVuZ3RoO1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IGhvbWVwYWdlUmVmZXJlbmNlVmFsdWUsIG5vZGVzOiBtaXNzaW5nUmVmZXJlbmNlcyB9O1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBjdXJyZW50IHBhZ2UgY29udGFpbnMgYW55IG9ycGhhbiBmcmFtZXMuXHJcbiAqIFRoZSBmdW5jdGlvbiBpcyBhcHBsaWVkIHRvIGFsbCBmcmFtZXMgdG9nZXRoZXIuXHJcbiAqIEBwYXJhbSBzZWxlY3RlZEZyYW1lc1xyXG4gKiBAcmV0dXJucyBPYmplY3RcclxuICovXHJcbmV4cG9ydCBjb25zdCBvcnBoYW5QYWdlcyA9IChzZWxlY3RlZEZyYW1lcykgPT4ge1xyXG4gICAgdmFyIG9ycGhhblBhZ2VzID0gW107XHJcbiAgICBzZWxlY3RlZEZyYW1lcy5mb3JFYWNoKGZyYW1lMSA9PiB7XHJcbiAgICAgICAgdmFyIHRhcmdldElkID0gZnJhbWUxLmlkO1xyXG4gICAgICAgIHZhciBpc0ZvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZWN0ZWRGcmFtZXMuZm9yRWFjaChmcmFtZTIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZU5vZGUyID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoZnJhbWUyLmlkKTtcclxuICAgICAgICAgICAgaWYgKGZyYW1lTm9kZTIudHlwZSA9PT0gJ0ZSQU1FJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSBmcmFtZU5vZGUyLmZpbmRBbGwoKTtcclxuICAgICAgICAgICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlYWN0aW9ucyA9IG5vZGUucmVhY3Rpb25zO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWFjdGlvbnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdGlvbnMuZm9yRWFjaChyZWFjdGlvbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVhY3Rpb24uYWN0aW9uICE9PSBudWxsICYmIHJlYWN0aW9uLmFjdGlvbi5kZXN0aW5hdGlvbklkID09PSB0YXJnZXRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc0ZvdW5kID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBvcnBoYW5QYWdlcy5wdXNoKHsgaWQ6IGZyYW1lMS5pZCwgbmFtZTogZnJhbWUxLm5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgb3JwaGFuUGFnZXNWYWx1ZSA9IG9ycGhhblBhZ2VzLmxlbmd0aCAvIHNlbGVjdGVkRnJhbWVzLmxlbmd0aDtcclxuICAgIHJldHVybiB7IHZhbHVlOiBvcnBoYW5QYWdlc1ZhbHVlLCBub2Rlczogb3JwaGFuUGFnZXMgfTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGZpbGxzIG9iamVjdCBvbmx5IGNvbnRhaW5zIHRoZSBjb2xvcnMgYmxhY2sgb3Igd2hpdGUuXHJcbiAqIEBwYXJhbSBmaWxsc1xyXG4gKiBAcmV0dXJucyBjb250YWluc0JsYWNrT3JXaGl0ZVxyXG4gKi9cclxuY29uc3QgY29udGFpbnNCbGFja09yV2hpdGUgPSAoZmlsbHMpID0+IHtcclxuICAgIHZhciBjb250YWluc0JsYWNrT3JXaGl0ZSA9IGZhbHNlO1xyXG4gICAgaWYgKGZpbGxzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGZpbGxzLmZvckVhY2goZmlsbCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChKU09OLnN0cmluZ2lmeShmaWxsLmNvbG9yKSA9PT0gSlNPTi5zdHJpbmdpZnkoeyByOiAwLCBnOiAwLCBiOiAwIH0pIHx8IEpTT04uc3RyaW5naWZ5KGZpbGwuY29sb3IpID09PSBKU09OLnN0cmluZ2lmeSh7IHI6IDEsIGc6IDEsIGI6IDEgfSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5zQmxhY2tPcldoaXRlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5zQXJyYXkgPSBbXTtcclxuICAgICAgICBmaWxscy5mb3JFYWNoKGZpbGwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkoZmlsbC5jb2xvcikgPT09IEpTT04uc3RyaW5naWZ5KHsgcjogMCwgZzogMCwgYjogMCB9KSB8fCBKU09OLnN0cmluZ2lmeShmaWxsLmNvbG9yKSA9PT0gSlNPTi5zdHJpbmdpZnkoeyByOiAxLCBnOiAxLCBiOiAxIH0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluc0FycmF5LnB1c2godHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBmb3VuZGluZ3MgPSBjb250YWluc0FycmF5LmZpbmQoY29udGFpbnMgPT4gY29udGFpbnMgPT09IGZhbHNlKTtcclxuICAgICAgICBpZiAoZm91bmRpbmdzID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgY29udGFpbnNCbGFja09yV2hpdGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb250YWluc0JsYWNrT3JXaGl0ZTtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIGZpbGxzIG9iamVjdCBjb250YWlucyBhbiBpbWFnZS5cclxuICogQHBhcmFtIGZpbGxzXHJcbiAqIEByZXR1cm5zIGNvbnRhaW5zSW1hZ2VcclxuICovXHJcbmNvbnN0IGNvbnRhaW5zSW1hZ2UgPSAoZmlsbHMpID0+IHtcclxuICAgIHZhciBjb250YWluc0ltYWdlID0gZmFsc2U7XHJcbiAgICBmaWxscy5mb3JFYWNoKGZpbGwgPT4ge1xyXG4gICAgICAgIGlmIChmaWxsLnR5cGUgPT09ICdJTUFHRScpIHtcclxuICAgICAgICAgICAgY29udGFpbnNJbWFnZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY29udGFpbnNJbWFnZTtcclxufTtcclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuLi9jb2RlTWVzc2FnZUhhbmRsZXInO1xyXG5pbXBvcnQgeyBzdGFydFZpZXcgfSBmcm9tICcuLi9zdGFydC9zdGFydEhhbmRsZXInO1xyXG5pbXBvcnQgeyBmb250U2l6ZSwgaG9tZXBhZ2VSZWZlcmVuY2UsIGxvY2FsQ29sb3JDb25zaXN0ZW5jeSwgbG9jYWxGb250Q29uc2lzdGVuY3ksIG9ycGhhblBhZ2VzIH0gZnJvbSAnLi9oZWxwZXIvbWV0cmljRXZhbEhlbHBlcic7XHJcbmV4cG9ydCBjb25zdCBtZXRyaWNFdmFsVmlldyA9ICgpID0+IHtcclxuICAgIC8vIHRvIG5hdmlnYXRlIGJhY2sgdG8gdGhlIHN0YXJ0IHBhZ2VcclxuICAgIGhhbmRsZUV2ZW50KCdiYWNrVG9TdGFydCcsICgpID0+IHtcclxuICAgICAgICBmaWdtYS5zaG93VUkoX191aUZpbGVzX18uc3RhcnQpO1xyXG4gICAgICAgIHN0YXJ0VmlldygpO1xyXG4gICAgICAgIGZpZ21hLnVpLnJlc2l6ZSg0NTAsIDU1MCk7XHJcbiAgICB9KTtcclxuICAgIC8vIHRvIGdldCBhbGwgcGFnZXMgb2YgYSBmaWdtYSBkb2N1bWVudFxyXG4gICAgaGFuZGxlRXZlbnQoJ2dldFBhZ2VzJywgKCkgPT4ge1xyXG4gICAgICAgIHZhciBwYWdlcyA9IGZpZ21hLnJvb3QuY2hpbGRyZW47XHJcbiAgICAgICAgdmFyIHBhZ2VzT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIHBhZ2VzLmZvckVhY2gocGFnZSA9PiB7XHJcbiAgICAgICAgICAgIHBhZ2VzT2JqZWN0cy5wdXNoKHsgbmFtZTogcGFnZS5uYW1lLCBpZDogcGFnZS5pZCB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCgnYWxsUGFnZXMnLCBwYWdlc09iamVjdHMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBnZXQgYWxsIGZyYW1lcyBvZiBhIHBhZ2VcclxuICAgIGhhbmRsZUV2ZW50KCdnZXRGcmFtZXMnLCAocGFnZUlkKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFnZSA9IGZpZ21hLmdldE5vZGVCeUlkKHBhZ2VJZCk7XHJcbiAgICAgICAgdmFyIGZyYW1lT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIGlmIChwYWdlLnR5cGUgPT09ICdQQUdFJykge1xyXG4gICAgICAgICAgICBjb25zdCBmcmFtZXMgPSBwYWdlLmZpbmRBbGwobm9kZSA9PiBub2RlLnR5cGUgPT09ICdGUkFNRScpO1xyXG4gICAgICAgICAgICBmcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmcmFtZU9iamVjdHMucHVzaCh7IG5hbWU6IGZyYW1lLm5hbWUsIGlkOiBmcmFtZS5pZCB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKCdmcmFtZXMnLCBmcmFtZU9iamVjdHMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBzZWxlY3QgYWxsIGdpdmVuIGVsZW1lbnRzIGJ5IGlkXHJcbiAgICBoYW5kbGVFdmVudCgnc2V0U2VsZWN0aW9uJywgKGlkcykgPT4ge1xyXG4gICAgICAgIHZhciBub2RlcyA9IFtdO1xyXG4gICAgICAgIGlkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChpZCk7XHJcbiAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XHJcbiAgICB9KTtcclxuICAgIC8vIHRvIGV2YWx1YXRlIHRoZSB1aSB3aXRoIHRoZSBzZWxlY3RlZCBtZXRyaWNzXHJcbiAgICBoYW5kbGVFdmVudCgnZXZhbHVhdGUnLCAoYXJncykgPT4ge1xyXG4gICAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgICAgYXJncy5zZWxlY3RlZE1ldHJpY3MuZm9yRWFjaChtZXRyaWMgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldHJpYykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnRmFyYmtvbnNpc3RlbnonOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsb2NhbENvbG9yQ29uc2lzdGVuY3lSZXN1bHQgPSBsb2NhbENvbG9yQ29uc2lzdGVuY3koYXJncy5zZWxlY3RlZEZyYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgbWV0cmljOiAnRmFyYmtvbnNpc3RlbnonLCB2YWx1ZTogbG9jYWxDb2xvckNvbnNpc3RlbmN5UmVzdWx0LnZhbHVlLCBub2RlczogbG9jYWxDb2xvckNvbnNpc3RlbmN5UmVzdWx0Lm5vZGVzLCB0eXBlOiAnY29sb3JTdHlsZScgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdTY2hyaWZ0a29uc2lzdGVueic6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2FsRm9udENvbnNpc3RlbmN5UmVzdWx0ID0gbG9jYWxGb250Q29uc2lzdGVuY3koYXJncy5zZWxlY3RlZEZyYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgbWV0cmljOiAnU2NocmlmdGtvbnNpc3RlbnonLCB2YWx1ZTogbG9jYWxGb250Q29uc2lzdGVuY3lSZXN1bHQudmFsdWUsIG5vZGVzOiBsb2NhbEZvbnRDb25zaXN0ZW5jeVJlc3VsdC5ub2RlcywgdHlwZTogJ2ZvbnRTdHlsZScgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdWZXJ3ZWlzIGF1ZiBTdGFydHNlaXRlJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaG9tZXBhZ2VSZWZlcmVuY2VSZXN1bHQgPSBob21lcGFnZVJlZmVyZW5jZShhcmdzLnNlbGVjdGVkRnJhbWVzLCBhcmdzLmhvbWVwYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goeyBtZXRyaWM6ICdWZXJ3ZWlzIGF1ZiBTdGFydHNlaXRlJywgdmFsdWU6IGhvbWVwYWdlUmVmZXJlbmNlUmVzdWx0LnZhbHVlLCBub2RlczogaG9tZXBhZ2VSZWZlcmVuY2VSZXN1bHQubm9kZXMsIHR5cGU6ICdzaW5nbGUnIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnVmVyd2Fpc3RlIFNlaXRlbic6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9ycGhhblBhZ2VzUmVzdWx0ID0gb3JwaGFuUGFnZXMoYXJncy5zZWxlY3RlZEZyYW1lcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHsgbWV0cmljOiAnVmVyd2Fpc3RlIFNlaXRlbicsIHZhbHVlOiBvcnBoYW5QYWdlc1Jlc3VsdC52YWx1ZSwgbm9kZXM6IG9ycGhhblBhZ2VzUmVzdWx0Lm5vZGVzLCB0eXBlOiAnc2luZ2xlJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1NjaHJpZnRncsO2w59lJzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9udFNpemVSZXN1bHQgPSBmb250U2l6ZShhcmdzLnNlbGVjdGVkRnJhbWVzKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goeyBtZXRyaWM6ICdTY2hyaWZ0Z3LDtsOfZScsIHZhbHVlOiBmb250U2l6ZVJlc3VsdC52YWx1ZSwgbm9kZXM6IGZvbnRTaXplUmVzdWx0Lm5vZGVzLCB0eXBlOiAnc2luZ2xlJyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKCdldmFsdWF0aW9uUmVzdWx0cycsIHJlc3VsdHMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBnZXQgdGhlIHN0b3JlZCBjdXN0b20gZXZhbHVhdGlvbiBwcm9maWxlc1xyXG4gICAgaGFuZGxlRXZlbnQoJ2dldEV2YWx1YXRpb25Qcm9maWxlU3RvcmFnZScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2V2YWx1YXRpb25Qcm9maWxlcycpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCgnY3VycmVudEV2YWx1YXRpb25Qcm9maWxlU3RvcmFnZScsIHN0b3JhZ2UpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gc3RvcmUgdGhlIGN1c3RvbSBldmFsdWF0aW9uIHByb2ZpbGVzXHJcbiAgICBoYW5kbGVFdmVudCgnc2V0RXZhbHVhdGlvblByb2ZpbGVTdG9yYWdlJywgKHN0b3JhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ2V2YWx1YXRpb25Qcm9maWxlcycsIHN0b3JhZ2UpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gZ2V0IHRoZSBzdG9yZWQgZXZhbHVhdGlvbnNcclxuICAgIGhhbmRsZUV2ZW50KCdnZXRFdmFsdWF0aW9uU3RvcmFnZScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciBzdG9yYWdlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2V2YWx1YXRpb24nKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBzdG9yYWdlID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goJ2N1cnJlbnRFdmFsdWF0aW9uU3RvcmFnZScsIHN0b3JhZ2UpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gc3RvcmUgdGhlIGV2YWx1YXRpb24gcmVzdWx0c1xyXG4gICAgaGFuZGxlRXZlbnQoJ3NldEV2YWx1YXRpb25TdG9yYWdlJywgKHN0b3JhZ2UpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ2V2YWx1YXRpb24nLCBzdG9yYWdlKTtcclxuICAgIH0pKTtcclxufTtcclxuIiwiaW1wb3J0IHsgaGFuZGxlRXZlbnQgfSBmcm9tICcuLi9jb2RlTWVzc2FnZUhhbmRsZXInO1xyXG5pbXBvcnQgeyBtZXRyaWNFdmFsVmlldyB9IGZyb20gJy4uL21ldHJpY0V2YWwvbWV0cmljRXZhbEhhbmRsZXInO1xyXG5pbXBvcnQgeyB0YXNrRXZhbFZpZXcgfSBmcm9tICcuLi90YXNrRXZhbC90YXNrRXZhbEhhbmRsZXInO1xyXG5leHBvcnQgY29uc3Qgc3RhcnRWaWV3ID0gKCkgPT4ge1xyXG4gICAgaGFuZGxlRXZlbnQoJ3Nob3dNZXRyaWNFdmFsJywgKCkgPT4ge1xyXG4gICAgICAgIGZpZ21hLnNob3dVSShfX3VpRmlsZXNfXy5tZXRyaWNFdmFsKTtcclxuICAgICAgICBtZXRyaWNFdmFsVmlldygpO1xyXG4gICAgICAgIGZpZ21hLnVpLnJlc2l6ZSg0NTAsIDU1MCk7XHJcbiAgICB9KTtcclxuICAgIGhhbmRsZUV2ZW50KCdzaG93VGFza0V2YWwnLCAoKSA9PiB7XHJcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnRhc2tFdmFsKTtcclxuICAgICAgICB0YXNrRXZhbFZpZXcoKTtcclxuICAgICAgICBmaWdtYS51aS5yZXNpemUoNDUwLCA1NTApO1xyXG4gICAgfSk7XHJcbn07XHJcbiIsImltcG9ydCB7IGdldENlbnRlck9mTm9kZSwgZ2V0RnJhbWUgfSBmcm9tIFwiLi4vLi4vZmlnbWFBY2Nlc3MvZmlsZUNvbnRlbnRHZXR0ZXJzXCI7XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY29udmVydCB0YXNrIHN0ZXBzIHRvIGFuIGFycmF5IG9mIHN0ZXBzIGNvbnRhaW5pbmcgb3BlcmF0b3JzLlxyXG4gKiBAcGFyYW0gdGFza1xyXG4gKiBAcmV0dXJucyBjb252ZXJ0ZWRTdGVwc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNvbnZlcnRUb09wZXJhdG9ycyA9ICh0YXNrKSA9PiB7XHJcbiAgICB2YXIgY29udmVydGVkU3RlcHMgPSByZXBsYWNlUGF0dGVybnModGFzay5zdGVwcyk7XHJcbiAgICBjb252ZXJ0ZWRTdGVwcyA9IHBsYWNlUmVzcG9uc2VUaW1lT3BlcmF0b3IodGFzay5zdGVwcywgY29udmVydGVkU3RlcHMpO1xyXG4gICAgY29udmVydGVkU3RlcHMgPSBwbGFjZU1lbnRhbGx5UHJlcGFyaW5nT3BlcmF0b3IoY29udmVydGVkU3RlcHMpO1xyXG4gICAgcmV0dXJuIGNvbnZlcnRlZFN0ZXBzO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNvbnZlcnQgYW4gYXJyYXkgb2Ygc3RlcHMgY29udGFpbmluZyBvcGVyYXRvcnMgdG8gYW4gYXJyYXkgY29udGFpbmluZyB0aGUgdGltZXMgcGVyIG9wZXJhdG9yLlxyXG4gKiBAcGFyYW0gc3RlcHNcclxuICogQHBhcmFtIGNvbnZlcnRlZFN0ZXBzXHJcbiAqIEByZXR1cm5zIG9wZXJhdG9yVGltZXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRUaW1lRm9yT3BlcmF0b3JzID0gKHN0ZXBzLCBjb252ZXJ0ZWRTdGVwcykgPT4ge1xyXG4gICAgdmFyIG9wZXJhdG9yVGltZXMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udmVydGVkU3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBvcGVyYXRvclRpbWVzLnB1c2goW10pO1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29udmVydGVkU3RlcHNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjb252ZXJ0ZWRTdGVwc1tpXVtqXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSCc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3JUaW1lc1tpXS5wdXNoKHsgb3BlcmF0b3I6ICdIJywgdGltZTogMC40IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSyc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3JUaW1lc1tpXS5wdXNoKHsgb3BlcmF0b3I6ICdLJywgdGltZTogMC4yIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnTSc6XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlcmF0b3JUaW1lc1tpXS5wdXNoKHsgb3BlcmF0b3I6ICdNJywgdGltZTogMS4zNSB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludGluZ1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50aW5nVGltZSA9IGNhbGN1bGF0ZUZpdHRzTGF3KG51bGwsIHN0ZXBzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50aW5nVGltZSA9IGNhbGN1bGF0ZUZpdHRzTGF3KHN0ZXBzW2kgLSAxXS5pZCwgc3RlcHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvclRpbWVzW2ldLnB1c2goeyBvcGVyYXRvcjogJ1AnLCB0aW1lOiBwb2ludGluZ1RpbWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdSJzpcclxuICAgICAgICAgICAgICAgICAgICBvcGVyYXRvclRpbWVzW2ldLnB1c2goeyBvcGVyYXRvcjogJ1InLCB0aW1lOiAwLjIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3BlcmF0b3JUaW1lcztcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBnZXQgdGhlIHRpbWUgZm9yIGVhY2ggc3RlcCBvZiBhIHRhc2suXHJcbiAqIEBwYXJhbSBvcGVyYXRvclRpbWVzXHJcbiAqIEByZXR1cm5zIHN0ZXBzVGltZXNcclxuICovXHJcbmV4cG9ydCBjb25zdCBnZXRUaW1lRm9yU3RlcHMgPSAob3BlcmF0b3JUaW1lcykgPT4ge1xyXG4gICAgdmFyIHN0ZXBzVGltZXMgPSBbXTtcclxuICAgIG9wZXJhdG9yVGltZXMuZm9yRWFjaChzdGVwID0+IHtcclxuICAgICAgICB2YXIgc3RlcFRpbWUgPSAwLjA7XHJcbiAgICAgICAgc3RlcC5mb3JFYWNoKG9wZXJhdG9yID0+IHtcclxuICAgICAgICAgICAgc3RlcFRpbWUgKz0gb3BlcmF0b3IudGltZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBzdGVwc1RpbWVzLnB1c2goc3RlcFRpbWUpO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gc3RlcHNUaW1lcztcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byByZXBsYWNlIHRoZSB0YXNrIHN0ZXBzIHdpdGggZ29tcyBwYXR0ZXJucyBjb250YWluaW5nIG9wZXJhdG9yc1xyXG4gKiBAcGFyYW0gc3RlcHNcclxuICogQHJldHVybnMgcmVzdWx0QXJyYXlcclxuICovXHJcbmNvbnN0IHJlcGxhY2VQYXR0ZXJucyA9IChzdGVwcykgPT4ge1xyXG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XHJcbiAgICB2YXIgaG9taW5nU3RhdGUgPSAnJztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzd2l0Y2ggKHN0ZXBzW2ldLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnY2xpY2tFbGVtZW50JzpcclxuICAgICAgICAgICAgICAgIGlmIChob21pbmdTdGF0ZSA9PT0gJycgfHwgaG9taW5nU3RhdGUgPT09ICdrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbWluZ1N0YXRlID0gJ20nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5LnB1c2goJ0hQSycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaG9taW5nU3RhdGUgPT09ICdtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5LnB1c2goJ1BLJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZWN0aW9uJzpcclxuICAgICAgICAgICAgICAgIGlmIChob21pbmdTdGF0ZSA9PT0gJycgfHwgaG9taW5nU3RhdGUgPT09ICdrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvbWluZ1N0YXRlID0gJ20nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5LnB1c2goJ0hQSycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaG9taW5nU3RhdGUgPT09ICdtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5LnB1c2goJ1BLJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhvbWluZ1N0YXRlID09PSAnJyB8fCBob21pbmdTdGF0ZSA9PT0gJ2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9taW5nU3RhdGUgPSAnbSc7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nICs9ICdIUEsnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaG9taW5nU3RhdGUgPT09ICdtJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSAnUEsnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaG9taW5nU3RhdGUgPSAnayc7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmcgKz0gJ0gnO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzdGVwc1tpXS5pbnB1dC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZyArPSAnSyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKHN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbGluayc6XHJcbiAgICAgICAgICAgICAgICBpZiAoaG9taW5nU3RhdGUgPT09ICcnIHx8IGhvbWluZ1N0YXRlID09PSAnaycpIHtcclxuICAgICAgICAgICAgICAgICAgICBob21pbmdTdGF0ZSA9ICdtJztcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKCdIUEsnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhvbWluZ1N0YXRlID09PSAnbScpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRBcnJheS5wdXNoKCdQSycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdEFycmF5O1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGFkYXB0IGdvbXMgcGF0dGVybnMgYnkgcGxhY2luZyB0aGUgcmVzcG9uc2UgdGltZSBvcGVyYXRvci5cclxuICogQHBhcmFtIHN0ZXBzXHJcbiAqIEBwYXJhbSBjb252ZXJ0ZWRTdGVwc1xyXG4gKiBAcmV0dXJucyBjb252ZXJ0ZWRTdGVwc1xyXG4gKi9cclxuY29uc3QgcGxhY2VSZXNwb25zZVRpbWVPcGVyYXRvciA9IChzdGVwcywgY29udmVydGVkU3RlcHMpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBnZXRGcmFtZShzdGVwc1tpXS5pZCk7XHJcbiAgICAgICAgdmFyIG5leHQgPSBnZXRGcmFtZShzdGVwc1tpICsgMV0uaWQpO1xyXG4gICAgICAgIGlmIChjdXJyZW50LmlkICE9PSBuZXh0LmlkKSB7XHJcbiAgICAgICAgICAgIGNvbnZlcnRlZFN0ZXBzW2ldICs9ICdSJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udmVydGVkU3RlcHM7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gYWRhcHQgZ29tcyBwYXR0ZXJucyBieSBwbGFjaW5nIHRoZSBtZW50YWxseSBwcmVwYXJpbmcgdGltZSBvcGVyYXRvci5cclxuICogQHBhcmFtIGNvbnZlcnRlZFN0ZXBzXHJcbiAqIEByZXR1cm5zIGNvbnZlcnRlZFN0ZXBzXHJcbiAqL1xyXG5jb25zdCBwbGFjZU1lbnRhbGx5UHJlcGFyaW5nT3BlcmF0b3IgPSAoY29udmVydGVkU3RlcHMpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udmVydGVkU3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgcmVzdWx0U3RyaW5nID0gY29udmVydGVkU3RlcHNbaV07XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb252ZXJ0ZWRTdGVwc1tpXS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHJlc3VsdFN0cmluZ1tqXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSyc6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFN0cmluZ1tqIC0gMV0gIT09ICdLJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRTdHJpbmcgPSByZXN1bHRTdHJpbmcuc2xpY2UoMCwgaikgKyAnTScgKyByZXN1bHRTdHJpbmcuc2xpY2Uoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGorKztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFN0cmluZyA9IHJlc3VsdFN0cmluZy5zbGljZSgwLCBqKSArICdNJyArIHJlc3VsdFN0cmluZy5zbGljZShqKTtcclxuICAgICAgICAgICAgICAgICAgICBqKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnZlcnRlZFN0ZXBzW2ldID0gcmVzdWx0U3RyaW5nO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb252ZXJ0ZWRTdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnZlcnRlZFN0ZXBzW2ldID0gY29udmVydGVkU3RlcHNbaV0ucmVwbGFjZSgnTVBNSycsICdNUEsnKTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udmVydGVkU3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjb252ZXJ0ZWRTdGVwc1tpXSA9IGNvbnZlcnRlZFN0ZXBzW2ldLnJlcGxhY2UoJ1JNJywgJ1InKTtcclxuICAgICAgICBpZiAoY29udmVydGVkU3RlcHNbaV1bLTFdID09PSAnUicgJiYgY29udmVydGVkU3RlcHNbaSArIDFdWzBdID09PSAnTScpIHtcclxuICAgICAgICAgICAgY29udmVydGVkU3RlcHNbaSArIDFdID0gY29udmVydGVkU3RlcHNbaSArIDFdLnNsaWNlKDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBjb252ZXJ0ZWRTdGVwcztcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIHRpbWUgZm9yIGFuIGFycmF5IG9mIHN0ZXBzIGNvbnNpc3Rpbmcgb2YgZ29tcyBvcGVyYXRvcnMuXHJcbiAqIEBwYXJhbSBzdGVwc1xyXG4gKiBAcGFyYW0gY29udmVydGVkU3RlcHNcclxuICogQHJldHVybnMgT2JqZWN0XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2FsY3VsYXRlVGltZSA9IChzdGVwcywgY29udmVydGVkU3RlcHMpID0+IHtcclxuICAgIHZhciBwb2ludGluZ1RpbWVzID0gW107XHJcbiAgICB2YXIgaG9taW5nTnVtID0gMDtcclxuICAgIHZhciB0aW1lID0gMC4wO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb252ZXJ0ZWRTdGVwcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY29udmVydGVkU3RlcHNbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgc3dpdGNoIChjb252ZXJ0ZWRTdGVwc1tpXVtqXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnSCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdGltZSArPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaG9taW5nTnVtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdLJzpcclxuICAgICAgICAgICAgICAgICAgICB0aW1lICs9IDAuMjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgKz0gMS4zNTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1AnOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludGluZ1RpbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50aW5nVGltZSA9IGNhbGN1bGF0ZUZpdHRzTGF3KG51bGwsIHN0ZXBzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50aW5nVGltZSA9IGNhbGN1bGF0ZUZpdHRzTGF3KHN0ZXBzW2kgLSAxXS5pZCwgc3RlcHNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb2ludGluZ1RpbWVzLnB1c2gocG9pbnRpbmdUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aW1lICs9IHBvaW50aW5nVGltZTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ1InOlxyXG4gICAgICAgICAgICAgICAgICAgIHRpbWUgKz0gMC4yO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHBvaW50aW5nVGltZVN1bSA9IDA7XHJcbiAgICBwb2ludGluZ1RpbWVzLmZvckVhY2godGltZSA9PiB7XHJcbiAgICAgICAgcG9pbnRpbmdUaW1lU3VtICs9IHRpbWU7XHJcbiAgICB9KTtcclxuICAgIHZhciBhdmdQb2ludGluZ1RpbWUgPSBwb2ludGluZ1RpbWVTdW0gLyBwb2ludGluZ1RpbWVzLmxlbmd0aDtcclxuICAgIHJldHVybiB7IHRpbWU6IHRpbWUsIHBvaW50aW5nVGltZXM6IHBvaW50aW5nVGltZXMsIGF2Z1BvaW50aW5nVGltZTogYXZnUG9pbnRpbmdUaW1lLCBob21pbmdOdW06IGhvbWluZ051bSB9O1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgcG9pbnRpbmcgdGltZSBiZXR3ZWVuIHR3byBpbnRlcmFjdGlvbiBwb2ludHMgYnkgdXNpbmcgdGhlIEZpdHQncyBMYXcuXHJcbiAqIEBwYXJhbSBsYXN0U3RlcElkXHJcbiAqIEBwYXJhbSBjdXJyZW50U3RlcElkXHJcbiAqIEByZXR1cm5zIHRpbWVcclxuICovXHJcbmNvbnN0IGNhbGN1bGF0ZUZpdHRzTGF3ID0gKGxhc3RTdGVwSWQsIGN1cnJlbnRTdGVwSWQpID0+IHtcclxuICAgIHZhciBhID0gMC4wNTtcclxuICAgIHZhciBiID0gMC4wNTtcclxuICAgIHZhciBsYXN0Q2VudGVyID0gbnVsbDtcclxuICAgIGlmIChsYXN0U3RlcElkICE9PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGxhc3RVSUVsZW1lbnQgPSBmaWdtYS5nZXROb2RlQnlJZChsYXN0U3RlcElkKS5wYXJlbnQuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgbGFzdENlbnRlciA9IGdldENlbnRlck9mTm9kZShsYXN0VUlFbGVtZW50LmlkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGxhc3RDZW50ZXIgPSB7IHg6IDAsIHk6IDAgfTtcclxuICAgIH1cclxuICAgIHZhciBjdXJyZW50VUlFbGVtZW50ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoY3VycmVudFN0ZXBJZCkucGFyZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgdmFyIGN1cnJlbnRDZW50ZXIgPSBnZXRDZW50ZXJPZk5vZGUoY3VycmVudFVJRWxlbWVudC5pZCk7XHJcbiAgICB2YXIgeCA9IDA7XHJcbiAgICB2YXIgeSA9IDA7XHJcbiAgICBpZiAobGFzdENlbnRlci54IDw9IGN1cnJlbnRDZW50ZXIueCkge1xyXG4gICAgICAgIHggPSBNYXRoLmFicyhjdXJyZW50Q2VudGVyLnggLSBsYXN0Q2VudGVyLngpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeCA9IE1hdGguYWJzKGxhc3RDZW50ZXIueCAtIGN1cnJlbnRDZW50ZXIueCk7XHJcbiAgICB9XHJcbiAgICBpZiAobGFzdENlbnRlci55IDw9IGN1cnJlbnRDZW50ZXIueSkge1xyXG4gICAgICAgIHkgPSBNYXRoLmFicyhjdXJyZW50Q2VudGVyLnkgLSBsYXN0Q2VudGVyLnkpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgeSA9IE1hdGguYWJzKGxhc3RDZW50ZXIueSAtIGN1cnJlbnRDZW50ZXIueSk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoTWF0aC5wb3coeCwgMikgKyBNYXRoLnBvdyh5LCAyKSk7XHJcbiAgICB2YXIgdGFyZ2V0V2lkdGggPSBjdXJyZW50VUlFbGVtZW50LndpZHRoO1xyXG4gICAgdmFyIHRpbWUgPSBhICsgYiAqIE1hdGgubG9nMihkaXN0YW5jZSAvIHRhcmdldFdpZHRoICsgMSk7XHJcbiAgICByZXR1cm4gdGltZTtcclxufTtcclxuIiwiaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbiB9IGZyb20gXCIuLi8uLi9maWdtYUFjY2Vzcy9maWxlQ29udGVudEdldHRlcnNcIjtcclxuaW1wb3J0IHsgY3JlYXRlRWxsaXBzZU5vZGUsIGNyZWF0ZUdyb3VwTm9kZSwgY3JlYXRlVGV4dE5vZGUsIGFkZEFubm90YXRpb25Ub0ZpbGUsIHNldFRleHQgfSBmcm9tIFwiLi4vLi4vZmlnbWFBY2Nlc3MvZmlsZUNvbnRlbnRTZXR0ZXJzXCI7XHJcbmltcG9ydCB7IGNoZWNrSW5wdXRFeGFtcGxlIH0gZnJvbSBcIi4vdmFsaWRpdHlIZWxwZXJcIjtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjcmVhdGUgYW4gZXhhbXBsZSB0ZXh0IGZvciBhbiBpbnB1dCBmaWVsZC5cclxuICogQHBhcmFtIGlucHV0XHJcbiAqIEBwYXJhbSB0YXNrbmFtZVxyXG4gKiBAcmV0dXJucyBCb29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhhbXBsZXRleHQgPSAoaW5wdXQsIHRhc2tuYW1lKSA9PiB7XHJcbiAgICB2YXIgcmVzdWx0ID0gY2hlY2tJbnB1dEV4YW1wbGUoKTtcclxuICAgIGlmIChyZXN1bHQgPT09IG51bGwpIHtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uID0gZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb24gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvblJlbFRyYW5zZm9ybSA9IHNlbGVjdGlvbi5yZWxhdGl2ZVRyYW5zZm9ybTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbkhlaWdodCA9IHNlbGVjdGlvbi5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gY3JlYXRlVGV4dE5vZGUoJ0Fubm90YXRpb24gLSAnICsgdGFza25hbWUgKyAnIC0gRWluZ2FiZWJlaXNwaWVsJywgeyByOiAwLCBnOiAwLCBiOiAxIH0sIG51bGwsIGlucHV0KTtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0odGV4dCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdICsgMTAsIHNlbGVjdGlvblJlbFRyYW5zZm9ybVsxXVsyXSArIHNlbGVjdGlvbkhlaWdodCAvIDIgLSB0ZXh0LmhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICBhZGRBbm5vdGF0aW9uVG9GaWxlKHNlbGVjdGlvbiwgdGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY3JlYXRlIGEgdGFzayBhbm5vdGF0aW9uIHRvIHRoZSBjdXJyZW50IHNlbGVjdGlvbi5cclxuICogQHBhcmFtIHRhc2tuYW1lXHJcbiAqIEBwYXJhbSBudW1TdGVwc1xyXG4gKiBAcGFyYW0gY29sb3JcclxuICogQHBhcmFtIHNlbGVjdGlvblxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICogQHJldHVybnMgYW5ub3RhdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRhc2tBbm5vdGF0aW9uID0gKHRhc2tuYW1lLCBudW1TdGVwcywgY29sb3IsIHNlbGVjdGlvbiA9IG51bGwsIGluZGV4ID0gbnVsbCkgPT4ge1xyXG4gICAgdmFyIHN0ZXBOdW1iZXIgPSBTdHJpbmcobnVtU3RlcHMgKyAxKTtcclxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHN0ZXBOdW1iZXIgPSBTdHJpbmcoaW5kZXgrKyk7XHJcbiAgICB9XHJcbiAgICB2YXIgY29udmVydGVkQ29sb3IgPSBjb252ZXJ0Q29sb3IoY29sb3IpO1xyXG4gICAgdmFyIGN1cnJlbnRTZWxlY3Rpb24gPSBudWxsO1xyXG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBzZWxlY3Rpb247XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjdXJyZW50U2VsZWN0aW9uID0gZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24gIT09IG51bGwpIHtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uUmVsVHJhbnNmb3JtID0gY3VycmVudFNlbGVjdGlvbi5yZWxhdGl2ZVRyYW5zZm9ybTtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uUGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5wYXJlbnQ7XHJcbiAgICAgICAgdmFyIGVsbGlwc2UgPSBjcmVhdGVFbGxpcHNlTm9kZSgnQW5ub3RhdGlvbiAtICcgKyB0YXNrbmFtZSwgMjQsIDI0LCBjb252ZXJ0ZWRDb2xvcik7XHJcbiAgICAgICAgdmFyIHRleHQgPSBjcmVhdGVUZXh0Tm9kZSgnQW5ub3RhdGlvbiAtICcgKyB0YXNrbmFtZSArICcgLSBUZXh0JywgeyByOiAxLCBnOiAxLCBiOiAxIH0sIHsgcjogMCwgZzogMCwgYjogMCB9LCBzdGVwTnVtYmVyKTtcclxuICAgICAgICB2YXIgY29udGFpbnNFeGFtcGxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGNvbnRhaW5zSnVzdEV4YW1wbGUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uUGFyZW50LmNoaWxkcmVuW2ldLm5hbWUuZW5kc1dpdGgoJ0VpbmdhYmViZWlzcGllbCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluc0V4YW1wbGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluc0p1c3RFeGFtcGxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZWN0aW9uUGFyZW50Lm5hbWUuZW5kc1dpdGgoJ0Fubm90YXRpb24nKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0oZWxsaXBzZSwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdIC0gMTIsIHNlbGVjdGlvblJlbFRyYW5zZm9ybVsxXVsyXSAtIDEyKTtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0odGV4dCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdIC0gNCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzFdWzJdIC0gOSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhaW5zSnVzdEV4YW1wbGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0oZWxsaXBzZSwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdIC0gMTIsIHNlbGVjdGlvblJlbFRyYW5zZm9ybVsxXVsyXSAtIDEyKTtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0odGV4dCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdIC0gNCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzFdWzJdIC0gOSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGNvbnRhaW5zRXhhbXBsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzZXRSZWxhdGl2ZVRyYW5zZm9ybShlbGxpcHNlLCBzZWxlY3Rpb25SZWxUcmFuc2Zvcm1bMF1bMl0gKyAoKHNlbGVjdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAzKSAqIDEyKSArICgoc2VsZWN0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDIpICogNCksIHNlbGVjdGlvblJlbFRyYW5zZm9ybVsxXVsyXSAtIDEyKTtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0odGV4dCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdICsgKChzZWxlY3Rpb25QYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMikgKiAxNikgLSA0LCBzZWxlY3Rpb25SZWxUcmFuc2Zvcm1bMV1bMl0gLSA5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY29udGFpbnNFeGFtcGxlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzZXRSZWxhdGl2ZVRyYW5zZm9ybShlbGxpcHNlLCBzZWxlY3Rpb25SZWxUcmFuc2Zvcm1bMF1bMl0gKyAoKHNlbGVjdGlvblBhcmVudC5jaGlsZHJlbi5sZW5ndGggLSAyKSAqIDEyKSArICgoc2VsZWN0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aCAtIDEpICogNCksIHNlbGVjdGlvblJlbFRyYW5zZm9ybVsxXVsyXSAtIDEyKTtcclxuICAgICAgICAgICAgc2V0UmVsYXRpdmVUcmFuc2Zvcm0odGV4dCwgc2VsZWN0aW9uUmVsVHJhbnNmb3JtWzBdWzJdICsgKChzZWxlY3Rpb25QYXJlbnQuY2hpbGRyZW4ubGVuZ3RoIC0gMSkgKiAxNikgLSA0LCBzZWxlY3Rpb25SZWxUcmFuc2Zvcm1bMV1bMl0gLSA5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFubm90YXRpb24gPSBjcmVhdGVHcm91cE5vZGUoJ0Fubm90YXRpb24gLSAnICsgdGFza25hbWUgKyAnIC0gJywgW2VsbGlwc2UsIHRleHRdKTtcclxuICAgICAgICBhZGRBbm5vdGF0aW9uVG9GaWxlKGN1cnJlbnRTZWxlY3Rpb24sIGFubm90YXRpb24pO1xyXG4gICAgICAgIHJldHVybiBhbm5vdGF0aW9uO1xyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGRlbGV0ZSBhIHN0ZXAgYW5ub3RhdGlvbiBhbmQgYWRhcHQgdGhlIGZvbGxvd2luZyBzdGVwIGFubm90YXRpb24gbnVtYmVycy5cclxuICogQHBhcmFtIHN0ZXBcclxuICogQHBhcmFtIGZvbGxvd2luZ1N0ZXBzXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZGVsZXRlU3RlcEFubm90YXRpb24gPSAoc3RlcCwgZm9sbG93aW5nU3RlcHMpID0+IHtcclxuICAgIHZhciBzdGVwQW5ub3RhdGlvbiA9IGZpZ21hLmdldE5vZGVCeUlkKHN0ZXAuaWQpO1xyXG4gICAgdmFyIGFubm90YXRpb25JbnB1dCA9IHN0ZXAuaW5wdXQ7XHJcbiAgICB2YXIgcGFyZW50ID0gc3RlcEFubm90YXRpb24ucGFyZW50O1xyXG4gICAgc3RlcEFubm90YXRpb24ucmVtb3ZlKCk7XHJcbiAgICBpZiAoYW5ub3RhdGlvbklucHV0ICE9PSAnJyAmJiBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhcmVudC5jaGlsZHJlbltpXS50eXBlID09PSAnVEVYVCcgJiYgcGFyZW50LmNoaWxkcmVuW2ldLmNoYXJhY3RlcnMgPT09IGFubm90YXRpb25JbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgcGFyZW50LmNoaWxkcmVuW2ldLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHBhcmVudC5jaGlsZHJlbi5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHBhcmVudC5jaGlsZHJlblswXTtcclxuICAgICAgICB2YXIgcGFyZW50c1BhcmVudCA9IHBhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gbnVsbDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhcmVudHNQYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHBhcmVudHNQYXJlbnQuY2hpbGRyZW5baV0uaWQgPT09IHBhcmVudC5pZCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmVudHNQYXJlbnQuaW5zZXJ0Q2hpbGQoaW5kZXgsIG5vZGUpO1xyXG4gICAgfVxyXG4gICAgaWYgKGZvbGxvd2luZ1N0ZXBzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBmb2xsb3dpbmdTdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICB2YXIgc3RlcE5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChzdGVwLmlkKTtcclxuICAgICAgICAgICAgaWYgKHN0ZXBOb2RlLnR5cGUgPT09ICdHUk9VUCcpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RlcE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RlcE5vZGUuY2hpbGRyZW5baV0udHlwZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50ID0gcGFyc2VJbnQoc3RlcE5vZGUuY2hpbGRyZW5baV0uY2hhcmFjdGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRleHQoc3RlcE5vZGUuY2hpbGRyZW5baV0sIHsgcjogMSwgZzogMSwgYjogMSB9LCB7IHI6IDAsIGc6IDAsIGI6IDAgfSwgU3RyaW5nKGN1cnJlbnQgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gdXBkYXRlIGEgc3RlcCBhbm5vdGF0aW9uIG51bWJlci5cclxuICogQHBhcmFtIGFubm90YXRpb25JZFxyXG4gKiBAcGFyYW0gbnVtYmVyXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgdXBkYXRlU3RlcEFubm90YXRpb24gPSAoYW5ub3RhdGlvbklkLCBudW1iZXIpID0+IHtcclxuICAgIHZhciBhbm5vdGF0aW9uID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoYW5ub3RhdGlvbklkKTtcclxuICAgIGlmIChhbm5vdGF0aW9uLnR5cGUgPT09ICdHUk9VUCcpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFubm90YXRpb24uY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGFubm90YXRpb24uY2hpbGRyZW5baV0udHlwZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUZXh0KGFubm90YXRpb24uY2hpbGRyZW5baV0sIHsgcjogMSwgZzogMSwgYjogMSB9LCB7IHI6IDAsIGc6IDAsIGI6IDAgfSwgU3RyaW5nKG51bWJlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG4vKipcclxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGdldCB0aGUgbm9kZSBvZiBhbiBhbm5vdGF0ZWQgZWxlbWVudCBieSBhbm5vdGF0aW9uIGlkLlxyXG4gKiBAcGFyYW0gaWRcclxuICogQHJldHVybnMgc2VsZWN0aW9uXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgZ2V0RWxlbWVudFRvQW5ub3RhdGlvbiA9IChpZCkgPT4ge1xyXG4gICAgdmFyIGFubm90YXRpb24gPSBmaWdtYS5nZXROb2RlQnlJZChpZCk7XHJcbiAgICB2YXIgcGFyZW50ID0gYW5ub3RhdGlvbi5wYXJlbnQ7XHJcbiAgICB2YXIgc2VsZWN0aW9uID0gcGFyZW50LmNoaWxkcmVuWzBdO1xyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjb252ZXJ0IGEgY3NzIGZvcm1hdHRlZCByZ2IgY29sb3IgdG8gYSBmaWdtYSBmb3JtYXR0ZWQgcmdiIGNvbG9yLlxyXG4gKiBAcGFyYW0gY29sb3JcclxuICogQHJldHVybnMgT2JqZWN0XHJcbiAqL1xyXG5jb25zdCBjb252ZXJ0Q29sb3IgPSAoY29sb3IpID0+IHtcclxuICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgncmdiKCcsICcnKTtcclxuICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgnKScsICcnKTtcclxuICAgIHZhciBjb2xvclNwbGl0dGVkID0gY29sb3Iuc3BsaXQoJywnKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcjogcGFyc2VJbnQoY29sb3JTcGxpdHRlZFswXSkgLyAyNTUsXHJcbiAgICAgICAgZzogcGFyc2VJbnQoY29sb3JTcGxpdHRlZFsxXSkgLyAyNTUsXHJcbiAgICAgICAgYjogcGFyc2VJbnQoY29sb3JTcGxpdHRlZFsyXSkgLyAyNTUsXHJcbiAgICB9O1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHNldCB0aGUgcmVsYXRpdmUgVHJhbnNmb3JtYXRpb24gb2YgYSBnaXZlbiBub2RlLlxyXG4gKiBAcGFyYW0gbm9kZUlkXHJcbiAqIEBwYXJhbSB4VHJhbnNmb3JtYXRpb25cclxuICogQHBhcmFtIHlUcmFuc2Zvcm1hdGlvblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHNldFJlbGF0aXZlVHJhbnNmb3JtID0gKG5vZGUsIHhUcmFuc2Zvcm1hdGlvbiwgeVRyYW5zZm9ybWF0aW9uKSA9PiB7XHJcbiAgICBub2RlLnggPSB4VHJhbnNmb3JtYXRpb247XHJcbiAgICBub2RlLnkgPSB5VHJhbnNmb3JtYXRpb247XHJcbn07XHJcbiIsImltcG9ydCB7IGdldEZyYW1lLCBnZXRQYWdlIH0gZnJvbSBcIi4uLy4uL2ZpZ21hQWNjZXNzL2ZpbGVDb250ZW50R2V0dGVyc1wiO1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNoZWNrIHNvbWUgdXNhYmlsaXR5IHNtZWxscyBzYXZlZCBpbiBhIGpzIGZpbGUuXHJcbiAqIEBwYXJhbSBzdGVwc1xyXG4gKiBAcGFyYW0gYXZnUG9pbnRpbmdUaW1lXHJcbiAqIEBwYXJhbSBhdmdIb21pbmdOdW1cclxuICogQHBhcmFtIHBvaW50aW5nVGltZXNcclxuICogQHBhcmFtIGhvbWluZ051bVxyXG4gKiBAcmV0dXJucyByZXN1bHRcclxuICovXHJcbmV4cG9ydCBjb25zdCBjaGVja1VzYWJpbGl0eVNtZWxscyA9IChzdGVwcywgYXZnUG9pbnRpbmdUaW1lLCBhdmdIb21pbmdOdW0sIHBvaW50aW5nVGltZXMsIGhvbWluZ051bSkgPT4ge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuICAgIHZhciB0b29NYW55TGF5ZXJzUmVzdWx0ID0gdG9vTWFueUxheWVycyhzdGVwcyk7XHJcbiAgICBpZiAodG9vTWFueUxheWVyc1Jlc3VsdC5pc0ZvdW5kKSB7XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKHsgdGl0bGU6ICdadSB2aWVsZSBTY2hpY2h0ZW4nLCBpc0ZvdW5kOiB0b29NYW55TGF5ZXJzUmVzdWx0LmlzRm91bmQsIHZhbHVlczogdG9vTWFueUxheWVyc1Jlc3VsdC52YWx1ZXMsIHN0ZXBzOiB0b29NYW55TGF5ZXJzUmVzdWx0LnN0ZXBzIH0pO1xyXG4gICAgfVxyXG4gICAgdmFyIGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0ID0gaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2Uoc3RlcHMpO1xyXG4gICAgaWYgKGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0LmlzRm91bmQpIHtcclxuICAgICAgICByZXN1bHRzLnB1c2goeyB0aXRsZTogJ0hvaGUgV2Vic2l0ZS1FbGVtZW50LUFic3TDpG5kZScsIGlzRm91bmQ6IGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0LmlzRm91bmQsIHZhbHVlczogaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2VSZXN1bHQudmFsdWVzLCBzdGVwczogaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2VSZXN1bHQuc3RlcHMgfSk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGlzdGFudENvbnRlbnRSZXN1bHQgPSBkaXN0YW50Q29udGVudChzdGVwcyk7XHJcbiAgICBpZiAoZGlzdGFudENvbnRlbnRSZXN1bHQuaXNGb3VuZCkge1xyXG4gICAgICAgIHJlc3VsdHMucHVzaCh7IHRpdGxlOiAnRW50ZmVybnRlciBJbmhhbHQnLCBpc0ZvdW5kOiBkaXN0YW50Q29udGVudFJlc3VsdC5pc0ZvdW5kLCB2YWx1ZXM6IGRpc3RhbnRDb250ZW50UmVzdWx0LnZhbHVlcywgc3RlcHM6IGRpc3RhbnRDb250ZW50UmVzdWx0LnN0ZXBzIH0pO1xyXG4gICAgfVxyXG4gICAgdmFyIHBvaW50aW5nVGltZVNtZWxsID0gbG9uZ1AocG9pbnRpbmdUaW1lcywgYXZnUG9pbnRpbmdUaW1lKTtcclxuICAgIGlmIChwb2ludGluZ1RpbWVTbWVsbC5pc0ZvdW5kKSB7XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKHsgdGl0bGU6ICdMYW5nZXMgQW52aXNpZXJlbicsIGlzRm91bmQ6IHBvaW50aW5nVGltZVNtZWxsLmlzRm91bmQsIHZhbHVlczogcG9pbnRpbmdUaW1lU21lbGwudmFsdWVzLCBzdGVwczogcG9pbnRpbmdUaW1lU21lbGwuc3RlcHMgfSk7XHJcbiAgICB9XHJcbiAgICB2YXIgaG9taW5nTnVtU21lbGwgPSBtYW55SChob21pbmdOdW0sIGF2Z0hvbWluZ051bSk7XHJcbiAgICBpZiAoaG9taW5nTnVtU21lbGwuaXNGb3VuZCkge1xyXG4gICAgICAgIHJlc3VsdHMucHVzaCh7IHRpdGxlOiAnVmllbGUgTWF1cy1UYXN0YXR1ci1XZWNoc2VsJywgaXNGb3VuZDogaG9taW5nTnVtU21lbGwuaXNGb3VuZCwgdmFsdWVzOiBob21pbmdOdW1TbWVsbC52YWx1ZXMsIHN0ZXBzOiBob21pbmdOdW1TbWVsbC5zdGVwcyB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNoZWNrIGZvciB0aGUgJ1RvbyBNYW55IExheWVycycgdXNhYmlsaXR5IHNtZWxsLiBJdCBjb3VudHMgZnJhbWUgY2hhbmdlcyBhbmQgcmV0dXJucyB0cnVlIGlmIGZpdmUgb3IgbW9yZSBmcmFtZSBjaGFuZ2VzIGFyZSBmb3VuZC5cclxuICogQHBhcmFtIHN0ZXBzXHJcbiAqIEByZXR1cm5zIHJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IHRvb01hbnlMYXllcnMgPSAoc3RlcHMpID0+IHtcclxuICAgIHZhciByZXN1bHQgPSB7IGlzRm91bmQ6IGZhbHNlLCB2YWx1ZXM6IFtdLCBzdGVwczogW10gfTtcclxuICAgIHZhciBjb3VudCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKChnZXRGcmFtZShzdGVwc1tpXS5pZCkuaWQgIT09IGdldEZyYW1lKHN0ZXBzW2kgLSAxXS5pZCkuaWQpKSB7XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKGNvdW50ID49IDUpIHtcclxuICAgICAgICByZXN1bHQuaXNGb3VuZCA9IHRydWU7XHJcbiAgICAgICAgcmVzdWx0LnZhbHVlcy5wdXNoKGNvdW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSAnSGlnaCBXZWJzaXRlIEVsZW1lbnQgRGlzdGFuY2UnIHVzYWJpbGl0eSBzbWVsbC5cclxuICogQHBhcmFtIHN0ZXBzXHJcbiAqIEByZXR1cm5zIHJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlID0gKHN0ZXBzKSA9PiB7XHJcbiAgICB2YXIgcmVzdWx0ID0geyBpc0ZvdW5kOiBmYWxzZSwgdmFsdWVzOiBbXSwgc3RlcHM6IFtdIH07XHJcbiAgICB2YXIgZGlzdGFuY2VTdW0gPSAwLjA7XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoc3RlcHNbaV0uaWQpO1xyXG4gICAgICAgIHZhciBiZWZvcmVOb2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoc3RlcHNbaSAtIDFdLmlkKTtcclxuICAgICAgICB2YXIgY29udGFpblNhbWUgPSBjdXJyZW50Tm9kZS5yZWFjdGlvbnMuc29tZShyID0+IGJlZm9yZU5vZGUucmVhY3Rpb25zLmluY2x1ZGVzKHIpKTtcclxuICAgICAgICBpZiAoY3VycmVudE5vZGUuaWQgPT09IGJlZm9yZU5vZGUuaWQgfHwgY29udGFpblNhbWUpIHtcclxuICAgICAgICAgICAgZGlzdGFuY2VTdW0gKz0gMC4wO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50Tm9kZS5wYXJlbnQgPT09IGJlZm9yZU5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlU3VtICs9IDAuMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZ2V0RnJhbWUoY3VycmVudE5vZGUuaWQpID09PSBnZXRGcmFtZShiZWZvcmVOb2RlLmlkKSkge1xyXG4gICAgICAgICAgICBkaXN0YW5jZVN1bSArPSAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdldFBhZ2UoY3VycmVudE5vZGUuaWQpID09PSBnZXRQYWdlKGJlZm9yZU5vZGUuaWQpKSB7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlU3VtICs9IDAuNzU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGdldFBhZ2UoY3VycmVudE5vZGUuaWQpICE9PSBnZXRQYWdlKGJlZm9yZU5vZGUuaWQpKSB7XHJcbiAgICAgICAgICAgIGRpc3RhbmNlU3VtICs9IDEuMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgc2V2ZXJpdHkgPSBkaXN0YW5jZVN1bSAvIHN0ZXBzLmxlbmd0aDtcclxuICAgIGlmIChzZXZlcml0eSA+IDAuNSkge1xyXG4gICAgICAgIHJlc3VsdC5pc0ZvdW5kID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY2hlY2sgZm9yIHRoZSAnRGlzdGFudCBDb250ZW50JyB1c2FiaWxpdHkgc21lbGwuIEl0IGNoZWNrcyBpZiBzdGVwcyBjb250YWluIHR3byBmcmFtZSBjaGFuZ2VzIChmcmFtZSBiZWZvcmUsIGN1cnJlbnQgZnJhbWUgYW5kIGZyYW1lIGFmdGVyIGFyZSBkaWZmZXJlbnQpXHJcbiAqIGFuZCBjb3VudHMgdGhlbS4gT3B0aW1hbCBudW1iZXIgb2YgZmluZGluZ3M6IDAuXHJcbiAqIEBwYXJhbSBzdGVwc1xyXG4gKiBAcmV0dXJucyByZXN1bHRcclxuICovXHJcbmV4cG9ydCBjb25zdCBkaXN0YW50Q29udGVudCA9IChzdGVwcykgPT4ge1xyXG4gICAgdmFyIHJlc3VsdCA9IHsgaXNGb3VuZDogZmFsc2UsIHZhbHVlczogW10sIHN0ZXBzOiBbXSB9O1xyXG4gICAgdmFyIGNvdW50ID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgc3RlcHMubGVuZ3RoIC0gMTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGdldEZyYW1lKHN0ZXBzW2kgLSAxXS5pZCkuaWQgIT09IGdldEZyYW1lKHN0ZXBzW2ldLmlkKS5pZCAmJiBnZXRGcmFtZShzdGVwc1tpXS5pZCkuaWQgIT09IGdldEZyYW1lKHN0ZXBzW2kgKyAxXS5pZCkuaWQpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmlzRm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb3VudCsrO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RlcHMucHVzaChpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVzdWx0LnZhbHVlcy5wdXNoKGNvdW50KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYSB0YXNrIGNvbnRhaW5zIHBvaW50aW5nIHRpbWVzIG11Y2ggYmlnZ2VyICgxLjUgdGltZXMpIHRoYW4gdGhlIGF2ZXJhZ2UgcG9pbnRpbmcgdGltZS4gVGhlIGF2ZXJhZ2UgcG9pbnRpbmcgdGltZSBpcyBjYWxjdWxhdGVkIGZyb20gcGFzdCBldmFsdWF0aW9ucy5cclxuICogQHBhcmFtIHBvaW50aW5nVGltZXNcclxuICogQHBhcmFtIGF2Z1BvaW50aW5nVGltZVxyXG4gKiBAcmV0dXJucyByZXN1bHRcclxuICovXHJcbmV4cG9ydCBjb25zdCBsb25nUCA9IChwb2ludGluZ1RpbWVzLCBhdmdQb2ludGluZ1RpbWUpID0+IHtcclxuICAgIHZhciByZXN1bHQgPSB7IGlzRm91bmQ6IGZhbHNlLCB2YWx1ZXM6IFtdLCBzdGVwczogW10gfTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRpbmdUaW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChwb2ludGluZ1RpbWVzW2ldID4gKGF2Z1BvaW50aW5nVGltZSAqIDIpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5pc0ZvdW5kID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmVzdWx0LnZhbHVlcy5wdXNoKHBvaW50aW5nVGltZXNbaV0pO1xyXG4gICAgICAgICAgICByZXN1bHQuc3RlcHMucHVzaChpICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayBpZiBhIHRhc2sgY29udGFpbnMgc3RlcHMgd2l0aCBob21pbmcgbnVtYmVycyBtdWNoIGJpZ2dlciAoMS41IHRpbWVzKSB0aGFuIHRoZSBhdmVyYWdlIGhvbWdpbmcgbnVtYmVyLiBUaGUgYXZlcmFnZSBob21pbmcgbnVtYmVyIGlzIGNhbGN1bGF0ZWQgZnJvbVxyXG4gKiBwYXN0IGV2YWx1YXRpb25zLlxyXG4gKiBAcGFyYW0gaG9taW5nTnVtc1xyXG4gKiBAcGFyYW0gYXZnSG9taW5nTnVtXHJcbiAqIEByZXR1cm5zIHJlc3VsdFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IG1hbnlIID0gKGhvbWluZ051bSwgYXZnSG9taW5nTnVtKSA9PiB7XHJcbiAgICB2YXIgcmVzdWx0ID0geyBpc0ZvdW5kOiBmYWxzZSwgdmFsdWVzOiBbXSwgc3RlcHM6IFtdIH07XHJcbiAgICBpZiAoaG9taW5nTnVtID4gYXZnSG9taW5nTnVtKSB7XHJcbiAgICAgICAgcmVzdWx0LmlzRm91bmQgPSB0cnVlO1xyXG4gICAgICAgIHJlc3VsdC52YWx1ZXMucHVzaChob21pbmdOdW0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufTtcclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBnZXRDdXJyZW50U2VsZWN0aW9uIH0gZnJvbSBcIi4uLy4uL2ZpZ21hQWNjZXNzL2ZpbGVDb250ZW50R2V0dGVyc1wiO1xyXG5pbXBvcnQgeyBnZXRGcmFtZSB9IGZyb20gXCIuLi8uLi9maWdtYUFjY2Vzcy9maWxlQ29udGVudEdldHRlcnNcIjtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayBpZiB0aGUgc2VsZWN0ZWQgZWxlbWVudCBpcyBhbiBhbm5vdGF0aW9uIGdyb3VwLlxyXG4gKiBAcmV0dXJucyBCb29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2hlY2tGb3JBbm5vdGF0aW9uR3JvdXAgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBnZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgc2VsZWN0ZWQgPSBudWxsO1xyXG4gICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCAmJiBzZWxlY3Rpb24ubmFtZS5lbmRzV2l0aCgnQW5ub3RhdGlvbicpID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNlbGVjdGVkID0gJ2VsZW1lbnQnO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoc2VsZWN0aW9uICE9PSBudWxsICYmIHNlbGVjdGlvbi5uYW1lLmVuZHNXaXRoKCdBbm5vdGF0aW9uJykgPT09IHRydWUpIHtcclxuICAgICAgICBzZWxlY3RlZCA9ICdhbm5vdGF0aW9uJztcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxlY3RlZDtcclxufTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayB0aGUgdmFsaWRpdHkgb2YgYSBjb25uZWN0aW9uIGJldHdlZW4gdHdvIG5vZGVzLlxyXG4gKiBAcGFyYW0gYXJnc1xyXG4gKiBAcmV0dXJucyBCb29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2hlY2tWYWxpZGl0eSA9IChhcmdzKSA9PiB7XHJcbiAgICB2YXIgYmVmb3JlTm9kZSA9IG51bGw7XHJcbiAgICB2YXIgYmVmb3JlRnJhbWUgPSBudWxsO1xyXG4gICAgaWYgKGFyZ3MuYmVmb3JlID09PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGJlZm9yZU5vZGUgPSBnZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgYmVmb3JlRnJhbWUgPSBnZXRGcmFtZShiZWZvcmVOb2RlLmlkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGJlZm9yZU5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChhcmdzLmJlZm9yZS5pZCk7XHJcbiAgICAgICAgYmVmb3JlRnJhbWUgPSBnZXRGcmFtZShhcmdzLmJlZm9yZS5pZCk7XHJcbiAgICB9XHJcbiAgICB2YXIgYWZ0ZXJOb2RlID0gbnVsbDtcclxuICAgIHZhciBhZnRlckZyYW1lID0gbnVsbDtcclxuICAgIGlmIChhcmdzLmFmdGVyID09PSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGFmdGVyTm9kZSA9IGdldEN1cnJlbnRTZWxlY3Rpb24oKTtcclxuICAgICAgICBhZnRlckZyYW1lID0gZ2V0RnJhbWUoYWZ0ZXJOb2RlLmlkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGFmdGVyTm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGFyZ3MuYWZ0ZXIuaWQpO1xyXG4gICAgICAgIGFmdGVyRnJhbWUgPSBnZXRGcmFtZShhcmdzLmFmdGVyLmlkKTtcclxuICAgIH1cclxuICAgIGlmIChiZWZvcmVGcmFtZS5pZCAhPT0gYWZ0ZXJGcmFtZS5pZCkge1xyXG4gICAgICAgIHZhciBiZWZvcmVOb2RlUGFyZW50ID0gYmVmb3JlTm9kZS5wYXJlbnQ7XHJcbiAgICAgICAgaWYgKGJlZm9yZU5vZGVQYXJlbnQubmFtZS5lbmRzV2l0aCgnQW5ub3RhdGlvbicpKSB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYmVmb3JlTm9kZVBhcmVudC5jaGlsZHJlblswXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50LnJlYWN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQucmVhY3Rpb25zW2ldLmFjdGlvbi5kZXN0aW5hdGlvbklkID09PSBhZnRlckZyYW1lLmlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmVmb3JlTm9kZS5yZWFjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChiZWZvcmVOb2RlLnJlYWN0aW9uc1tpXS5hY3Rpb24uZGVzdGluYXRpb25JZCA9PT0gYWZ0ZXJGcmFtZS5pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gY2hlY2sgdGhlIHZhbGlkaXR5IG9mIGEgYnV0dG9uIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLiBUaGUgdGFyZ2V0IHNpemUgb2YgNDQgeCA0NCBwaXhlbHMgaXMgdGFrZW4gZnJvbSB0aGUgV0NBRyAyLjEgc3RhbmRhcmQgKDIuNS41KSB3aGVyZSBpdCBpc1xyXG4gKiByZWNvbW1lbmRlZCBmb3IgYm90aCBkZXNrdG9wIGFuZCB0b3VjaCBkZXZpY2VzLlxyXG4gKiBAcmV0dXJucyB2YWxpZGl0eVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrQnV0dG9uVmFsaWRpdHkgPSAoKSA9PiB7XHJcbiAgICB2YXIgY3VycmVudFNlbGVjdGlvbiA9IGdldEN1cnJlbnRTZWxlY3Rpb24oKTtcclxuICAgIHZhciB3aWR0aCA9IGN1cnJlbnRTZWxlY3Rpb24ud2lkdGg7XHJcbiAgICB2YXIgaGVpZ2h0ID0gY3VycmVudFNlbGVjdGlvbi5oZWlnaHQ7XHJcbiAgICBpZiAoKHdpZHRoID49IDQ0KSAmJiAoaGVpZ2h0ID49IDQ0KSkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBzZWxlY3RlZCBlbGVtZW50IGFscmVhZHkgY29udGFpbnMgYW4gZXhhbXBsZS5cclxuICogQHJldHVybnMgQm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrSW5wdXRFeGFtcGxlID0gKCkgPT4ge1xyXG4gICAgdmFyIGN1cnJlbnRTZWxlY3Rpb24gPSBnZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICB2YXIgc2VsZWN0aW9uUGFyZW50ID0gY3VycmVudFNlbGVjdGlvbi5wYXJlbnQ7XHJcbiAgICBpZiAoc2VsZWN0aW9uUGFyZW50Lm5hbWUuZW5kc1dpdGgoJ0Fubm90YXRpb24nKSkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0aW9uUGFyZW50LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25QYXJlbnQuY2hpbGRyZW5baV0ubmFtZS5lbmRzV2l0aCgnRWluZ2FiZWJlaXNwaWVsJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3Rpb25QYXJlbnQuY2hpbGRyZW5baV0uY2hhcmFjdGVycztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG4vKipcclxuICogVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIGNoZWNrIHRoZSB2YWxpZGl0eSBvZiBhbiBpbnB1dCBmaWVsZC4gVGhlIHRleHQgd2lkdGggb2YgdGhlIGlucHV0IGV4YW1wbGUgc2hvdWxkIGJlIHNtYWxsZXIgdGhhbiB0aGUgd2lkdGggb2YgdGhlIGlucHV0IGZpZWxkLlxyXG4gKiBAcGFyYW0gaW5wdXRcclxuICogQHJldHVybnMgQm9vbGVhblxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGNoZWNrSW5wdXRWYWxpZGl0eSA9IChpbnB1dCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICB2YXIgc2VsZWN0aW9uID0gZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgdmFyIHNlbGVjdGlvbldpZHRoID0gc2VsZWN0aW9uLndpZHRoO1xyXG4gICAgdmFyIHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XHJcbiAgICB2YXIgdGV4dFdpZHRoID0gbnVsbDtcclxuICAgIHlpZWxkIGxvYWRpbmdGb250KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgdGV4dC5mb250TmFtZSA9IHsgZmFtaWx5OiAnUm9ib3RvJywgc3R5bGU6ICdSZWd1bGFyJyB9O1xyXG4gICAgICAgIHRleHQuZm9udFNpemUgPSAxNjtcclxuICAgICAgICB0ZXh0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMSB9IH1dO1xyXG4gICAgICAgIHRleHQuY2hhcmFjdGVycyA9IGlucHV0O1xyXG4gICAgfSk7XHJcbiAgICB0ZXh0V2lkdGggPSB0ZXh0LndpZHRoO1xyXG4gICAgdGV4dC5yZW1vdmUoKTtcclxuICAgIGlmICh0ZXh0V2lkdGggPCBzZWxlY3Rpb25XaWR0aCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBjaGVjayB0aGUgdmFsaWRpdHkgb2YgYSBsaW5rIHRoYXQgaXMgY3VycmVudGx5IHNlbGVjdGVkLlxyXG4gKiBBIHRleHQgbGluayBzaG91bGQgbm90IHdyYXAgdG8gYSBzZWNvbmQgbGluZSAoUmVzZWFyY2gtQmFzZWQgV2ViIERlc2lnbiBhbmQgVXNhYmlsaXR5IEd1aWRlbGluZXMgMTAuMTEpLlxyXG4gKiBAcmV0dXJucyBCb29sZWFuXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY2hlY2tMaW5rVmFsaWRpdHkgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHZhciBpc1RleHQgPSBmYWxzZTtcclxuICAgIHZhciBpc0ltYWdlT3JTaGFwZSA9IGZhbHNlO1xyXG4gICAgdmFyIHNlbGVjdGlvbiA9IGdldEN1cnJlbnRTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1RFWFQnKSB7XHJcbiAgICAgICAgaXNUZXh0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGlzSW1hZ2VPclNoYXBlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChpc1RleHQpIHtcclxuICAgICAgICB2YXIgc2VsZWN0aW9uSGVpZ2h0ID0gc2VsZWN0aW9uLmhlaWdodDtcclxuICAgICAgICB2YXIgZm9udFNpemUgPSAxNjtcclxuICAgICAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdURVhUJykge1xyXG4gICAgICAgICAgICBmb250U2l6ZSA9IHNlbGVjdGlvbi5mb250U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRleHQgPSBmaWdtYS5jcmVhdGVUZXh0KCk7XHJcbiAgICAgICAgdmFyIHRleHRIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIHlpZWxkIGxvYWRpbmdGb250KCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRleHQuZm9udE5hbWUgPSB7IGZhbWlseTogJ1JvYm90bycsIHN0eWxlOiAnUmVndWxhcicgfTtcclxuICAgICAgICAgICAgdGV4dC5mb250U2l6ZSA9IGZvbnRTaXplO1xyXG4gICAgICAgICAgICB0ZXh0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMCwgZzogMCwgYjogMSB9IH1dO1xyXG4gICAgICAgICAgICB0ZXh0LmNoYXJhY3RlcnMgPSAnVGVzdCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGV4dEhlaWdodCA9IHRleHQuaGVpZ2h0O1xyXG4gICAgICAgIGlmIChzZWxlY3Rpb25IZWlnaHQgPD0gdGV4dEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoaXNJbWFnZU9yU2hhcGUpIHtcclxuICAgICAgICB2YXIgd2lkdGggPSBzZWxlY3Rpb24ud2lkdGg7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHNlbGVjdGlvbi5oZWlnaHQ7XHJcbiAgICAgICAgaWYgKCh3aWR0aCA+PSA0NCkgJiYgKGhlaWdodCA+PSA0NCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuLyoqXHJcbiAqIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBsb2FkIGEgZm9udFxyXG4gKi9cclxuY29uc3QgbG9hZGluZ0ZvbnQgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMoeyBmYW1pbHk6ICdSb2JvdG8nLCBzdHlsZTogJ1JlZ3VsYXInIH0pO1xyXG59KTtcclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBkaXNwYXRjaCwgaGFuZGxlRXZlbnQgfSBmcm9tICcuLi9jb2RlTWVzc2FnZUhhbmRsZXInO1xyXG5pbXBvcnQgeyBjcmVhdGVFeGFtcGxldGV4dCwgY3JlYXRlVGFza0Fubm90YXRpb24sIGRlbGV0ZVN0ZXBBbm5vdGF0aW9uLCBnZXRFbGVtZW50VG9Bbm5vdGF0aW9uLCB1cGRhdGVTdGVwQW5ub3RhdGlvbiB9IGZyb20gJy4vaGVscGVyL3Rhc2tFdmFsSGVscGVyJztcclxuaW1wb3J0IHsgY2hlY2tCdXR0b25WYWxpZGl0eSwgY2hlY2tGb3JBbm5vdGF0aW9uR3JvdXAsIGNoZWNrSW5wdXRFeGFtcGxlLCBjaGVja0lucHV0VmFsaWRpdHksIGNoZWNrTGlua1ZhbGlkaXR5LCBjaGVja1ZhbGlkaXR5IH0gZnJvbSAnLi9oZWxwZXIvdmFsaWRpdHlIZWxwZXInO1xyXG5pbXBvcnQgeyBjYWxjdWxhdGVUaW1lLCBjb252ZXJ0VG9PcGVyYXRvcnMsIGdldFRpbWVGb3JPcGVyYXRvcnMsIGdldFRpbWVGb3JTdGVwcyB9IGZyb20gJy4vaGVscGVyL2dvbXNIZWxwZXInO1xyXG5pbXBvcnQgeyBjaGVja1VzYWJpbGl0eVNtZWxscywgZGlzdGFudENvbnRlbnQsIGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlIH0gZnJvbSAnLi9oZWxwZXIvdXNhYmlsaXR5U21lbGxzSGVscGVyJztcclxuaW1wb3J0IHsgc3RhcnRWaWV3IH0gZnJvbSAnLi4vc3RhcnQvc3RhcnRIYW5kbGVyJztcclxuaW1wb3J0IHsgZ2V0Q3VycmVudFNlbGVjdGlvbiB9IGZyb20gJy4uL2ZpZ21hQWNjZXNzL2ZpbGVDb250ZW50R2V0dGVycyc7XHJcbmV4cG9ydCBjb25zdCB0YXNrRXZhbFZpZXcgPSAoKSA9PiB7XHJcbiAgICAvLyB0byBuYXZpZ2F0ZSBiYWNrIHRvIHRoZSBzdGFydCBwYWdlXHJcbiAgICBoYW5kbGVFdmVudCgnYmFja1RvU3RhcnQnLCAoKSA9PiB7XHJcbiAgICAgICAgZmlnbWEuc2hvd1VJKF9fdWlGaWxlc19fLnN0YXJ0KTtcclxuICAgICAgICBzdGFydFZpZXcoKTtcclxuICAgICAgICBmaWdtYS51aS5yZXNpemUoNDUwLCA1NTApO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBhZGQgYSB0YXNrIHN0ZXBcclxuICAgIGhhbmRsZUV2ZW50KCdhZGRUYXNrU3RlcCcsIChhcmdzKSA9PiB7XHJcbiAgICAgICAgaWYgKGFyZ3MudHlwZSA9PT0gJ2lucHV0Jykge1xyXG4gICAgICAgICAgICB2YXIgaXNBZGRlZCA9IGNyZWF0ZUV4YW1wbGV0ZXh0KGFyZ3MuaW5wdXQsIGFyZ3MudGFza25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJncy5pbmRleCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXNrQW5ub3RhdGlvbiA9IGNyZWF0ZVRhc2tBbm5vdGF0aW9uKGFyZ3MudGFza25hbWUsIGFyZ3MubnVtU3RlcHMsIGFyZ3MuY29sb3IsIG51bGwsIGFyZ3MuaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHRhc2tBbm5vdGF0aW9uID0gY3JlYXRlVGFza0Fubm90YXRpb24oYXJncy50YXNrbmFtZSwgYXJncy5udW1TdGVwcywgYXJncy5jb2xvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSBnZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGlvbiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCgndGFza1N0ZXBBZGRlZCcsIHsgdGFza25hbWU6IGFyZ3MudGFza25hbWUsIGlkOiB0YXNrQW5ub3RhdGlvbi5pZCwgbmFtZTogc2VsZWN0aW9uLm5hbWUgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyB0byBhZGQgbXVsdGlwbGUgdGFzayBzdGVwc1xyXG4gICAgaGFuZGxlRXZlbnQoJ2FkZFRhc2tTdGVwcycsIChhcmdzKSA9PiB7XHJcbiAgICAgICAgdmFyIGFkZGVkU3RlcHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3Muc3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbiA9IGdldEVsZW1lbnRUb0Fubm90YXRpb24oYXJncy5zdGVwc1tpXS5pZCk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrQW5ub3RhdGlvbiA9IGNyZWF0ZVRhc2tBbm5vdGF0aW9uKGFyZ3MudGFza25hbWUsIGksIGFyZ3MuY29sb3IsIHNlbGVjdGlvbik7XHJcbiAgICAgICAgICAgIGFkZGVkU3RlcHMucHVzaCh7IGlkOiB0YXNrQW5ub3RhdGlvbi5pZCwgbmFtZTogc2VsZWN0aW9uLm5hbWUsIHR5cGU6IGFyZ3Muc3RlcHNbaV0udHlwZSwgaW5wdXQ6IGFyZ3Muc3RlcHNbaV0uaW5wdXQgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKCd0YXNrU3RlcHNBZGRlZCcsIHsgdGFza25hbWU6IGFyZ3MudGFza25hbWUsIHN0ZXBzOiBhZGRlZFN0ZXBzIH0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBkZWxldGUgYSB0YXNrIHN0ZXBcclxuICAgIGhhbmRsZUV2ZW50KCdkZWxldGVTdGVwJywgKGFyZ3MpID0+IHtcclxuICAgICAgICBkZWxldGVTdGVwQW5ub3RhdGlvbihhcmdzLnN0ZXAsIGFyZ3MuZm9sbG93aW5nU3RlcHMpO1xyXG4gICAgfSk7XHJcbiAgICAvLyB0byBkZWxldGUgbXVsdGlwbGUgdGFzayBzdGVwc1xyXG4gICAgaGFuZGxlRXZlbnQoJ2RlbGV0ZVN0ZXBzJywgKGFyZ3MpID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3Muc3RlcHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGVsZXRlU3RlcEFubm90YXRpb24oYXJncy5zdGVwc1tpXSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIHRvIHVwZGF0ZSB0YXNrIHN0ZXAgbnVtYmVyIGFmdGVyIGNoYW5naW5nIHRoZSBvcmRlciBvciBkZWxldGluZyBhIHN0ZXBcclxuICAgIGhhbmRsZUV2ZW50KCd1cGRhdGVTdGVwTnVtYmVycycsICh0YXNrcykgPT4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFza3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YXNrc1tpXS5zdGVwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU3RlcEFubm90YXRpb24odGFza3NbaV0uc3RlcHNbal0uaWQsIGogKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gdG8gY2hlY2sgaWYgYSBzZWxlY3Rpb24gaXMgYW4gYW5ub3RhdGlvblxyXG4gICAgaGFuZGxlRXZlbnQoJ2NoZWNrU2VsZWN0aW9uJywgKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gY2hlY2tGb3JBbm5vdGF0aW9uR3JvdXAoKTtcclxuICAgICAgICBkaXNwYXRjaCgnc2VsZWN0aW9uQ2hlY2tlZCcsIHNlbGVjdGVkKTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIGNoZWNrIGlmIGEgY29ubmVjdGlvbiBiZXR3ZWVuIGEgbmV3IHN0ZXAgYW5kIHRoZSBsYXN0IGV4aXN0aW5nIHN0ZXAgb2YgYSB0YXNrIGlzIHZhbGlkXHJcbiAgICBoYW5kbGVFdmVudCgnY2hlY2tTdGVwVmFsaWRpdHlCZWZvcmUnLCAoYXJncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbGlkaXR5ID0geWllbGQgY2hlY2tWYWxpZGl0eShhcmdzKTtcclxuICAgICAgICBkaXNwYXRjaCgndmFsaWRpdHlCZWZvcmUnLCB2YWxpZGl0eSk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBjaGVjayBpZiBhIGNvbm5lY3Rpb24gYmV0d2VlbiBhIG5ldyB0YXNrIGFuZCB0aGUgbGFzdCBleGlzdGluZyB0YXNrIG9mIGEgc2NlbmFyaW8gaXMgdmFsaWRcclxuICAgIGhhbmRsZUV2ZW50KCdjaGVja1ZhbGlkaXR5QmVmb3JlJywgKGFyZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciB2YWxpZGl0eSA9IHlpZWxkIGNoZWNrVmFsaWRpdHkoYXJncyk7XHJcbiAgICAgICAgZGlzcGF0Y2goJ3ZhbGlkaXR5QmVmb3JlJywgdmFsaWRpdHkpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gY2hlY2sgaWYgYSBjb25uZWN0aW9uIGJldHdlZW4gYSBuZXcgc3RlcCBhbmQgdGhlIGZvbGxvd2luZyBzdGVwIG9mIGEgdGFzayBpcyB2YWxpZFxyXG4gICAgaGFuZGxlRXZlbnQoJ2NoZWNrU3RlcFZhbGlkaXR5QWZ0ZXInLCAoYXJncykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbGlkaXR5ID0geWllbGQgY2hlY2tWYWxpZGl0eShhcmdzKTtcclxuICAgICAgICBkaXNwYXRjaCgndmFsaWRpdHlBZnRlcicsIHZhbGlkaXR5KTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIGNoZWNrIGlmIGEgYnV0dG9uIGlzIHZhbGlkXHJcbiAgICBoYW5kbGVFdmVudCgnY2hlY2tCdXR0b25WYWxpZGl0eScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciB2YWxpZGl0eSA9IHlpZWxkIGNoZWNrQnV0dG9uVmFsaWRpdHkoKTtcclxuICAgICAgICBkaXNwYXRjaCgnYnV0dG9uVmFsaWRpdHknLCB2YWxpZGl0eSk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBjaGVjayBpZiBhbiBpbnB1dCBmaWVsZCBhbHJlYWR5IGNvbnRhaW5zIGFuIGV4YW1wbGVcclxuICAgIGhhbmRsZUV2ZW50KCdjaGVja0lucHV0RXhhbXBsZScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB5aWVsZCBjaGVja0lucHV0RXhhbXBsZSgpO1xyXG4gICAgICAgIGRpc3BhdGNoKCdpbnB1dEV4YW1wbGVDaGVjaycsIHJlc3VsdCk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBjaGVjayBpZiBhbiBpbnB1dCBmaWVsZCBpcyB2YWxpZFxyXG4gICAgaGFuZGxlRXZlbnQoJ2NoZWNrSW5wdXRWYWxpZGl0eScsIChpbnB1dCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIHZhbGlkaXR5ID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhbGlkaXR5ID0geWllbGQgY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbGlkaXR5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcGF0Y2goJ2lucHV0VmFsaWRpdHknLCB2YWxpZGl0eSk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBjaGVjayBpZiBhIGxpbmsgaXMgdmFsaWRcclxuICAgIGhhbmRsZUV2ZW50KCdjaGVja0xpbmtWYWxpZGl0eScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciB2YWxpZGl0eSA9IHlpZWxkIGNoZWNrTGlua1ZhbGlkaXR5KCk7XHJcbiAgICAgICAgZGlzcGF0Y2goJ2xpbmtWYWxpZGl0eScsIHZhbGlkaXR5KTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIGV2YWx1YXRlIGEgdGFza1xyXG4gICAgaGFuZGxlRXZlbnQoJ2V2YWx1YXRlVGFzaycsICh0YXNrKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB2YXIgYXZnUG9pbnRpbmdUaW1lID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygncG9pbnRpbmdUaW1lJyk7XHJcbiAgICAgICAgdmFyIGF2Z0hvbWluZ051bSA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2hvbWluZ051bScpO1xyXG4gICAgICAgIHZhciBjb252ZXJ0ZWRTdGVwcyA9IGNvbnZlcnRUb09wZXJhdG9ycyh0YXNrKTtcclxuICAgICAgICB2YXIgb3BlcmF0b3JUaW1lcyA9IGdldFRpbWVGb3JPcGVyYXRvcnModGFzay5zdGVwcywgY29udmVydGVkU3RlcHMpO1xyXG4gICAgICAgIHZhciBzdGVwc1RpbWVzID0gZ2V0VGltZUZvclN0ZXBzKG9wZXJhdG9yVGltZXMpO1xyXG4gICAgICAgIHZhciBnb21zUmVzdWx0ID0gY2FsY3VsYXRlVGltZSh0YXNrLnN0ZXBzLCBjb252ZXJ0ZWRTdGVwcyk7XHJcbiAgICAgICAgdmFyIHNtZWxscyA9IGNoZWNrVXNhYmlsaXR5U21lbGxzKHRhc2suc3RlcHMsIGF2Z1BvaW50aW5nVGltZSwgYXZnSG9taW5nTnVtLCBnb21zUmVzdWx0LnBvaW50aW5nVGltZXMsIGdvbXNSZXN1bHQuaG9taW5nTnVtKTtcclxuICAgICAgICB2YXIgbG9uZ1BTbWVsbCA9IHNtZWxscy5maW5kKHNtZWxsID0+IHNtZWxsLnRpdGxlID09PSAnTG9uZyBQJyk7XHJcbiAgICAgICAgaWYgKGxvbmdQU21lbGwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdwb2ludGluZ1RpbWUnLCAoYXZnUG9pbnRpbmdUaW1lICsgZ29tc1Jlc3VsdC5hdmdQb2ludGluZ1RpbWUpIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtYW55SFNtZWxsID0gc21lbGxzLmZpbmQoc21lbGwgPT4gc21lbGwudGl0bGUgPT09ICdNYW55IEgnKTtcclxuICAgICAgICBpZiAobWFueUhTbWVsbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ2hvbWluZ051bScsIChhdmdIb21pbmdOdW0gKyBnb21zUmVzdWx0LmhvbWluZ051bSkgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGlzcGF0Y2goJ3Rhc2tFdmFsdWF0aW9uUmVzdWx0JywgeyBnb21zOiB7IGdvbXNUaW1lOiBnb21zUmVzdWx0LnRpbWUsIG9wZXJhdG9yVGltZXM6IG9wZXJhdG9yVGltZXMsIHN0ZXBzVGltZXM6IHN0ZXBzVGltZXMgfSwgdXNhYmlsaXR5U21lbGxzOiBzbWVsbHMgfSk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBldmFsdWF0ZSBhIGNvbXBhcmlzb24gdGFza1xyXG4gICAgaGFuZGxlRXZlbnQoJ2V2YWx1YXRlVGFza0NvbXBhcmlzb24nLCAodGFzaykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIGF2Z1BvaW50aW5nVGltZSA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ3BvaW50aW5nVGltZScpO1xyXG4gICAgICAgIHZhciBhdmdIb21pbmdOdW0gPSB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdob21pbmdOdW0nKTtcclxuICAgICAgICB2YXIgY29udmVydGVkU3RlcHMgPSBjb252ZXJ0VG9PcGVyYXRvcnModGFzayk7XHJcbiAgICAgICAgdmFyIG9wZXJhdG9yVGltZXMgPSBnZXRUaW1lRm9yT3BlcmF0b3JzKHRhc2suc3RlcHMsIGNvbnZlcnRlZFN0ZXBzKTtcclxuICAgICAgICB2YXIgc3RlcHNUaW1lcyA9IGdldFRpbWVGb3JTdGVwcyhvcGVyYXRvclRpbWVzKTtcclxuICAgICAgICB2YXIgZ29tc1Jlc3VsdCA9IGNhbGN1bGF0ZVRpbWUodGFzay5zdGVwcywgY29udmVydGVkU3RlcHMpO1xyXG4gICAgICAgIHZhciBzbWVsbHMgPSBjaGVja1VzYWJpbGl0eVNtZWxscyh0YXNrLnN0ZXBzLCBhdmdQb2ludGluZ1RpbWUsIGF2Z0hvbWluZ051bSwgZ29tc1Jlc3VsdC5wb2ludGluZ1RpbWVzLCBnb21zUmVzdWx0LmhvbWluZ051bSk7XHJcbiAgICAgICAgdmFyIGxvbmdQU21lbGwgPSBzbWVsbHMuZmluZChzbWVsbCA9PiBzbWVsbC50aXRsZSA9PT0gJ0xvbmcgUCcpO1xyXG4gICAgICAgIGlmIChsb25nUFNtZWxsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygncG9pbnRpbmdUaW1lJywgKGF2Z1BvaW50aW5nVGltZSArIGdvbXNSZXN1bHQuYXZnUG9pbnRpbmdUaW1lKSAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbWFueUhTbWVsbCA9IHNtZWxscy5maW5kKHNtZWxsID0+IHNtZWxsLnRpdGxlID09PSAnTWFueSBIJyk7XHJcbiAgICAgICAgaWYgKG1hbnlIU21lbGwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdob21pbmdOdW0nLCAoYXZnSG9taW5nTnVtICsgZ29tc1Jlc3VsdC5ob21pbmdOdW0pIC8gMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRpc3BhdGNoKCdjb21wYXJpc29uVGFza0V2YWx1YXRpb25SZXN1bHQnLCB7IGdvbXM6IHsgZ29tc1RpbWU6IGdvbXNSZXN1bHQudGltZSwgb3BlcmF0b3JUaW1lczogb3BlcmF0b3JUaW1lcywgc3RlcHNUaW1lczogc3RlcHNUaW1lcyB9LCB1c2FiaWxpdHlTbWVsbHM6IHNtZWxscyB9KTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIGV2YWx1YXRlIGEgc2NlbmFyaW9cclxuICAgIGhhbmRsZUV2ZW50KCdldmFsdWF0ZVNjZW5hcmlvJywgKGFyZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgc2NlbmFyaW9TdGVwcyA9IFtdO1xyXG4gICAgICAgIHZhciB0cmFuc2l0aW9uU3RlcHMgPSBbXTtcclxuICAgICAgICB2YXIgYXZnUG9pbnRpbmdUaW1lID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygncG9pbnRpbmdUaW1lJyk7XHJcbiAgICAgICAgdmFyIGF2Z0hvbWluZ051bSA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2hvbWluZ051bScpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5zY2VuYXJpby50YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBhcmdzLnRhc2tzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4gZWxlbWVudC50YXNrbmFtZSA9PT0gYXJncy5zY2VuYXJpby50YXNrc1tpXS50YXNrbmFtZSk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrRWxlbWVudCA9IGFyZ3MudGFza3NbdGFza0luZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YXNrRWxlbWVudC5zdGVwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGFyZ3Muc2NlbmFyaW8udGFza3MubGVuZ3RoIC0gMSAmJiBqID09PSB0YXNrRWxlbWVudC5zdGVwcy5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0ZXBzLnB1c2goeyB0cmFuc2l0aW9uTnVtOiBpICsgMSwgc3RlcHM6IFt0YXNrRWxlbWVudC5zdGVwc1tqXV0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpICE9PSBhcmdzLnNjZW5hcmlvLnRhc2tzLmxlbmd0aCAtIDEgJiYgaiA9PT0gdGFza0VsZW1lbnQuc3RlcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25TdGVwc1tpXS5zdGVwcy5wdXNoKHRhc2tFbGVtZW50LnN0ZXBzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPj0gMSAmJiAoaiA9PT0gMCB8fCBqID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0ZXBzW2kgLSAxXS5zdGVwcy5wdXNoKHRhc2tFbGVtZW50LnN0ZXBzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YXNrRWxlbWVudC5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NlbmFyaW9TdGVwcy5wdXNoKHN0ZXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNvbnZlcnRlZFN0ZXBzID0gY29udmVydFRvT3BlcmF0b3JzKHRhc2tFbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIG9wZXJhdG9yVGltZXMgPSBnZXRUaW1lRm9yT3BlcmF0b3JzKHRhc2tFbGVtZW50LnN0ZXBzLCBjb252ZXJ0ZWRTdGVwcyk7XHJcbiAgICAgICAgICAgIHZhciBzdGVwc1RpbWVzID0gZ2V0VGltZUZvclN0ZXBzKG9wZXJhdG9yVGltZXMpO1xyXG4gICAgICAgICAgICB2YXIgZ29tc1Jlc3VsdCA9IGNhbGN1bGF0ZVRpbWUodGFza0VsZW1lbnQuc3RlcHMsIGNvbnZlcnRlZFN0ZXBzKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tTbWVsbHMgPSBjaGVja1VzYWJpbGl0eVNtZWxscyh0YXNrRWxlbWVudC5zdGVwcywgYXZnUG9pbnRpbmdUaW1lLCBhdmdIb21pbmdOdW0sIGdvbXNSZXN1bHQucG9pbnRpbmdUaW1lcywgZ29tc1Jlc3VsdC5ob21pbmdOdW0pO1xyXG4gICAgICAgICAgICB2YXIgbG9uZ1BTbWVsbCA9IHRhc2tTbWVsbHMuZmluZChzbWVsbCA9PiBzbWVsbC50aXRsZSA9PT0gJ0xvbmcgUCcpO1xyXG4gICAgICAgICAgICBpZiAobG9uZ1BTbWVsbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdwb2ludGluZ1RpbWUnLCAoYXZnUG9pbnRpbmdUaW1lICsgZ29tc1Jlc3VsdC5hdmdQb2ludGluZ1RpbWUpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1hbnlIU21lbGwgPSB0YXNrU21lbGxzLmZpbmQoc21lbGwgPT4gc21lbGwudGl0bGUgPT09ICdNYW55IEgnKTtcclxuICAgICAgICAgICAgaWYgKG1hbnlIU21lbGwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnaG9taW5nTnVtJywgKGF2Z0hvbWluZ051bSArIGdvbXNSZXN1bHQuaG9taW5nTnVtKSAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBldmFsdWF0aW9uSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuaGlzdG9yeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uSW5kZXggPSBhcmdzLmhpc3RvcnkuZmluZEluZGV4KChlbGVtZW50KSA9PiBlbGVtZW50LnRhc2tuYW1lID09PSBhcmdzLnNjZW5hcmlvLnRhc2tzW2ldLnRhc2tuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZhbHVhdGlvbkluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5oaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0YXNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXNrbmFtZTogYXJncy5zY2VuYXJpby50YXNrc1tpXS50YXNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGFza0VsZW1lbnQuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblJ1bnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IHRhc2tFbGVtZW50LnN0ZXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29tczogeyBnb21zVGltZTogZ29tc1Jlc3VsdC50aW1lLCBvcGVyYXRvclRpbWVzOiBvcGVyYXRvclRpbWVzLCBzdGVwc1RpbWVzOiBzdGVwc1RpbWVzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2FiaWxpdHlTbWVsbHM6IHRhc2tTbWVsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpc29uOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MuaGlzdG9yeVtldmFsdWF0aW9uSW5kZXhdLmV2YWx1YXRpb25SdW5zLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogdGFza0VsZW1lbnQuc3RlcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZ29tczogeyBnb21zVGltZTogZ29tc1Jlc3VsdC50aW1lLCBvcGVyYXRvclRpbWVzOiBvcGVyYXRvclRpbWVzLCBzdGVwc1RpbWVzOiBzdGVwc1RpbWVzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNhYmlsaXR5U21lbGxzOiB0YXNrU21lbGxzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb246IG51bGxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgdGFza25hbWU6IGFyZ3Muc2NlbmFyaW8udGFza3NbaV0udGFza25hbWUsIHRpbWU6IGdvbXNSZXN1bHQudGltZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjZW5hcmlvU21lbGxzID0gW107XHJcbiAgICAgICAgdmFyIGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0ID0gaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2Uoc2NlbmFyaW9TdGVwcyk7XHJcbiAgICAgICAgaWYgKGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0LmlzRm91bmQpIHtcclxuICAgICAgICAgICAgc2NlbmFyaW9TbWVsbHMucHVzaCh7IHRpdGxlOiAnSG9oZSBXZWJzaXRlLUVsZW1lbnQtQWJzdMOkbmRlJywgaXNGb3VuZDogaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2VSZXN1bHQuaXNGb3VuZCwgdmFsdWVzOiBoaWdoV2Vic2l0ZUVsZW1lbnREaXN0YW5jZVJlc3VsdC52YWx1ZXMsIHN0ZXBzOiBoaWdoV2Vic2l0ZUVsZW1lbnREaXN0YW5jZVJlc3VsdC5zdGVwcyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbnRDb250ZW50Rm91bmQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRWYWx1ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRTdGVwcyA9IFtdO1xyXG4gICAgICAgIHRyYW5zaXRpb25TdGVwcy5mb3JFYWNoKHRyYW5zaXRpb24gPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRSZXN1bHQgPSBkaXN0YW50Q29udGVudCh0cmFuc2l0aW9uLnN0ZXBzKTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbnRDb250ZW50UmVzdWx0LmlzRm91bmQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbnRDb250ZW50Rm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFudENvbnRlbnRWYWx1ZXMucHVzaChkaXN0YW50Q29udGVudFJlc3VsdC52YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFudENvbnRlbnRTdGVwcy5wdXNoKHRyYW5zaXRpb24udHJhbnNpdGlvbk51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzY2VuYXJpb1NtZWxscy5wdXNoKHsgdGl0bGU6ICdFbnRmZXJudGVyIEluaGFsdCcsIGlzRm91bmQ6IGRpc3RhbnRDb250ZW50Rm91bmQsIHZhbHVlczogZGlzdGFudENvbnRlbnRWYWx1ZXMsIHN0ZXBzOiBkaXN0YW50Q29udGVudFN0ZXBzIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKCdzY2VuYXJpb0V2YWx1YXRpb25SZXN1bHQnLCB7IHRhc2tFdmFsdWF0aW9uSGlzdG9yeTogYXJncy5oaXN0b3J5LCBnb21zVGltZXM6IHJlc3VsdCwgdXNhYmlsaXR5U21lbGxzOiBzY2VuYXJpb1NtZWxscyB9KTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIGV2YWx1YXRlIGEgY29tcGFyaXNvbiBzY2VuYXJpb1xyXG4gICAgaGFuZGxlRXZlbnQoJ2V2YWx1YXRlU2NlbmFyaW9Db21wYXJpc29uJywgKGFyZ3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgc2NlbmFyaW9TdGVwcyA9IFtdO1xyXG4gICAgICAgIHZhciB0cmFuc2l0aW9uU3RlcHMgPSBbXTtcclxuICAgICAgICB2YXIgYXZnUG9pbnRpbmdUaW1lID0geWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygncG9pbnRpbmdUaW1lJyk7XHJcbiAgICAgICAgdmFyIGF2Z0hvbWluZ051bSA9IHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoJ2hvbWluZ051bScpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5zY2VuYXJpby50YXNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBhcmdzLnRhc2tzLmZpbmRJbmRleCgoZWxlbWVudCkgPT4gZWxlbWVudC50YXNrbmFtZSA9PT0gYXJncy5zY2VuYXJpby50YXNrc1tpXS50YXNrbmFtZSk7XHJcbiAgICAgICAgICAgIHZhciB0YXNrRWxlbWVudCA9IGFyZ3MudGFza3NbdGFza0luZGV4XTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0YXNrRWxlbWVudC5zdGVwcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGFyZ3Muc2NlbmFyaW8udGFza3MubGVuZ3RoIC0gMSAmJiBqID09PSB0YXNrRWxlbWVudC5zdGVwcy5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0ZXBzLnB1c2goeyB0cmFuc2l0aW9uTnVtOiBpICsgMSwgc3RlcHM6IFt0YXNrRWxlbWVudC5zdGVwc1tqXV0gfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpICE9PSBhcmdzLnNjZW5hcmlvLnRhc2tzLmxlbmd0aCAtIDEgJiYgaiA9PT0gdGFza0VsZW1lbnQuc3RlcHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25TdGVwc1tpXS5zdGVwcy5wdXNoKHRhc2tFbGVtZW50LnN0ZXBzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPj0gMSAmJiAoaiA9PT0gMCB8fCBqID09IDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblN0ZXBzW2kgLSAxXS5zdGVwcy5wdXNoKHRhc2tFbGVtZW50LnN0ZXBzW2pdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0YXNrRWxlbWVudC5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2NlbmFyaW9TdGVwcy5wdXNoKHN0ZXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGNvbnZlcnRlZFN0ZXBzID0gY29udmVydFRvT3BlcmF0b3JzKHRhc2tFbGVtZW50KTtcclxuICAgICAgICAgICAgdmFyIG9wZXJhdG9yVGltZXMgPSBnZXRUaW1lRm9yT3BlcmF0b3JzKHRhc2tFbGVtZW50LnN0ZXBzLCBjb252ZXJ0ZWRTdGVwcyk7XHJcbiAgICAgICAgICAgIHZhciBzdGVwc1RpbWVzID0gZ2V0VGltZUZvclN0ZXBzKG9wZXJhdG9yVGltZXMpO1xyXG4gICAgICAgICAgICB2YXIgZ29tc1Jlc3VsdCA9IGNhbGN1bGF0ZVRpbWUodGFza0VsZW1lbnQuc3RlcHMsIGNvbnZlcnRlZFN0ZXBzKTtcclxuICAgICAgICAgICAgdmFyIHRhc2tTbWVsbHMgPSBjaGVja1VzYWJpbGl0eVNtZWxscyh0YXNrRWxlbWVudC5zdGVwcywgYXZnUG9pbnRpbmdUaW1lLCBhdmdIb21pbmdOdW0sIGdvbXNSZXN1bHQucG9pbnRpbmdUaW1lcywgZ29tc1Jlc3VsdC5ob21pbmdOdW0pO1xyXG4gICAgICAgICAgICB2YXIgbG9uZ1BTbWVsbCA9IHRhc2tTbWVsbHMuZmluZChzbWVsbCA9PiBzbWVsbC50aXRsZSA9PT0gJ0xvbmcgUCcpO1xyXG4gICAgICAgICAgICBpZiAobG9uZ1BTbWVsbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdwb2ludGluZ1RpbWUnLCAoYXZnUG9pbnRpbmdUaW1lICsgZ29tc1Jlc3VsdC5hdmdQb2ludGluZ1RpbWUpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG1hbnlIU21lbGwgPSB0YXNrU21lbGxzLmZpbmQoc21lbGwgPT4gc21lbGwudGl0bGUgPT09ICdNYW55IEgnKTtcclxuICAgICAgICAgICAgaWYgKG1hbnlIU21lbGwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnaG9taW5nTnVtJywgKGF2Z0hvbWluZ051bSArIGdvbXNSZXN1bHQuaG9taW5nTnVtKSAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBldmFsdWF0aW9uSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuaGlzdG9yeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBldmFsdWF0aW9uSW5kZXggPSBhcmdzLmhpc3RvcnkuZmluZEluZGV4KChlbGVtZW50KSA9PiBlbGVtZW50LnRhc2tuYW1lID09PSBhcmdzLnNjZW5hcmlvLnRhc2tzW2ldLnRhc2tuYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZXZhbHVhdGlvbkluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgYXJncy5oaXN0b3J5LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0YXNrJyxcclxuICAgICAgICAgICAgICAgICAgICB0YXNrbmFtZTogYXJncy5zY2VuYXJpby50YXNrc1tpXS50YXNrbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGFza0VsZW1lbnQuY29sb3IsXHJcbiAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGlvblJ1bnM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcHM6IHRhc2tFbGVtZW50LnN0ZXBzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ29tczogeyBnb21zVGltZTogZ29tc1Jlc3VsdC50aW1lLCBvcGVyYXRvclRpbWVzOiBvcGVyYXRvclRpbWVzLCBzdGVwc1RpbWVzOiBzdGVwc1RpbWVzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2FiaWxpdHlTbWVsbHM6IHRhc2tTbWVsbHMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpc29uOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFyZ3MuaGlzdG9yeVtldmFsdWF0aW9uSW5kZXhdLmV2YWx1YXRpb25SdW5zLnVuc2hpZnQoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgICAgICBzdGVwczogdGFza0VsZW1lbnQuc3RlcHMsXHJcbiAgICAgICAgICAgICAgICAgICAgZ29tczogeyBnb21zVGltZTogZ29tc1Jlc3VsdC50aW1lLCBvcGVyYXRvclRpbWVzOiBvcGVyYXRvclRpbWVzLCBzdGVwc1RpbWVzOiBzdGVwc1RpbWVzIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNhYmlsaXR5U21lbGxzOiB0YXNrU21lbGxzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb246IG51bGxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgdGFza25hbWU6IGFyZ3Muc2NlbmFyaW8udGFza3NbaV0udGFza25hbWUsIHRpbWU6IGdvbXNSZXN1bHQudGltZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjZW5hcmlvU21lbGxzID0gW107XHJcbiAgICAgICAgdmFyIGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0ID0gaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2Uoc2NlbmFyaW9TdGVwcyk7XHJcbiAgICAgICAgaWYgKGhpZ2hXZWJzaXRlRWxlbWVudERpc3RhbmNlUmVzdWx0LmlzRm91bmQpIHtcclxuICAgICAgICAgICAgc2NlbmFyaW9TbWVsbHMucHVzaCh7IHRpdGxlOiAnSG9oZSBXZWJzaXRlLUVsZW1lbnQtQWJzdMOkbmRlJywgaXNGb3VuZDogaGlnaFdlYnNpdGVFbGVtZW50RGlzdGFuY2VSZXN1bHQuaXNGb3VuZCwgdmFsdWVzOiBoaWdoV2Vic2l0ZUVsZW1lbnREaXN0YW5jZVJlc3VsdC52YWx1ZXMsIHN0ZXBzOiBoaWdoV2Vic2l0ZUVsZW1lbnREaXN0YW5jZVJlc3VsdC5zdGVwcyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpc3RhbnRDb250ZW50Rm91bmQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRWYWx1ZXMgPSBbXTtcclxuICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRTdGVwcyA9IFtdO1xyXG4gICAgICAgIHRyYW5zaXRpb25TdGVwcy5mb3JFYWNoKHRyYW5zaXRpb24gPT4ge1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFudENvbnRlbnRSZXN1bHQgPSBkaXN0YW50Q29udGVudCh0cmFuc2l0aW9uLnN0ZXBzKTtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbnRDb250ZW50UmVzdWx0LmlzRm91bmQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3RhbnRDb250ZW50Rm91bmQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFudENvbnRlbnRWYWx1ZXMucHVzaChkaXN0YW50Q29udGVudFJlc3VsdC52YWx1ZXMpO1xyXG4gICAgICAgICAgICAgICAgZGlzdGFudENvbnRlbnRTdGVwcy5wdXNoKHRyYW5zaXRpb24udHJhbnNpdGlvbk51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGlzdGFudENvbnRlbnRGb3VuZCkge1xyXG4gICAgICAgICAgICBzY2VuYXJpb1NtZWxscy5wdXNoKHsgdGl0bGU6ICdFbnRmZXJudGVyIEluaGFsdCcsIGlzRm91bmQ6IGRpc3RhbnRDb250ZW50Rm91bmQsIHZhbHVlczogZGlzdGFudENvbnRlbnRWYWx1ZXMsIHN0ZXBzOiBkaXN0YW50Q29udGVudFN0ZXBzIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkaXNwYXRjaCgnY29tcGFyaXNvblNjZW5hcmlvRXZhbHVhdGlvblJlc3VsdCcsIHsgdGFza0V2YWx1YXRpb25IaXN0b3J5OiBhcmdzLmhpc3RvcnksIGdvbXNUaW1lczogcmVzdWx0LCB1c2FiaWxpdHlTbWVsbHM6IHNjZW5hcmlvU21lbGxzIH0pO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gZ2V0IHRoZSBzdG9yYWdlIGNvbnRhaW5pbmcgYWxsIGRlZmluZWQgdGFza3NcclxuICAgIGhhbmRsZUV2ZW50KCdnZXRUYXNrU3RvcmFnZScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciB0YXNrcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCd0YXNrcycpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRhc2tzID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGF0Y2goJ2N1cnJlbnRUYXNrU3RvcmFnZScsIHRhc2tzKTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIHNldCB0aGUgdGFzayBzdG9yYWdlXHJcbiAgICBoYW5kbGVFdmVudCgnc2V0VGFza1N0b3JhZ2UnLCAodGFza3MpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHlpZWxkIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ3Rhc2tzJywgdGFza3MpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gZ2V0IHRoZSBzdG9yYWdlIGNvbnRhaW5pbmcgYWxsIGRlZmluZWQgc2NlbmFyaW9zXHJcbiAgICBoYW5kbGVFdmVudCgnZ2V0U2NlbmFyaW9TdG9yYWdlJywgKCkgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgdmFyIHNjZW5hcmlvcyA9IHVuZGVmaW5lZDtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdzY2VuYXJpb3MnKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBzY2VuYXJpb3MgPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwYXRjaCgnY3VycmVudFNjZW5hcmlvU3RvcmFnZScsIHNjZW5hcmlvcyk7XHJcbiAgICB9KSk7XHJcbiAgICAvLyB0byBzZXQgdGhlIHNjZW5hcmlvIHN0b3JhZ2VcclxuICAgIGhhbmRsZUV2ZW50KCdzZXRTY2VuYXJpb1N0b3JhZ2UnLCAoc2NlbmFyaW9zKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdzY2VuYXJpb3MnLCBzY2VuYXJpb3MpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gZ2V0IHRoZSBzdG9yYWdlIGNvbnRhaW5pbmcgYWxsIHRhc2sgZXZhbHVhdGlvbnNcclxuICAgIGhhbmRsZUV2ZW50KCdnZXRUYXNrRXZhbHVhdGlvblN0b3JhZ2UnLCAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB2YXIgZXZhbHVhdGlvblN0b3JhZ2UgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgeWllbGQgZmlnbWEuY2xpZW50U3RvcmFnZS5nZXRBc3luYygndGFza0V2YWx1YXRpb24nKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU3RvcmFnZSA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKCdjdXJyZW50VGFza0V2YWx1YXRpb25TdG9yYWdlJywgZXZhbHVhdGlvblN0b3JhZ2UpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gc2V0IHRoZSB0YXNrIGV2YWx1YXRpb24gc3RvcmFnZVxyXG4gICAgaGFuZGxlRXZlbnQoJ3NldFRhc2tFdmFsdWF0aW9uU3RvcmFnZScsIChzdG9yYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCd0YXNrRXZhbHVhdGlvbicsIHN0b3JhZ2UpO1xyXG4gICAgfSkpO1xyXG4gICAgLy8gdG8gZ2V0IHRoZSBzdG9yYWdlIGNvbnRhaW5pbmcgYWxsIHNjZW5hcmlvIGV2YWx1YXRpb25zXHJcbiAgICBoYW5kbGVFdmVudCgnZ2V0U2NlbmFyaW9FdmFsdWF0aW9uU3RvcmFnZScsICgpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgIHZhciBldmFsdWF0aW9uU3RvcmFnZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKCdzY2VuYXJpb0V2YWx1YXRpb24nKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBldmFsdWF0aW9uU3RvcmFnZSA9IHZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BhdGNoKCdjdXJyZW50U2NlbmFyaW9FdmFsdWF0aW9uU3RvcmFnZScsIGV2YWx1YXRpb25TdG9yYWdlKTtcclxuICAgIH0pKTtcclxuICAgIC8vIHRvIHNldCB0aGUgc2NlbmFyaW8gZXZhbHVhdGlvbiBzdG9yYWdlXHJcbiAgICBoYW5kbGVFdmVudCgnc2V0U2NlbmFyaW9FdmFsdWF0aW9uU3RvcmFnZScsIChzdG9yYWdlKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICB5aWVsZCBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdzY2VuYXJpb0V2YWx1YXRpb24nLCBzdG9yYWdlKTtcclxuICAgIH0pKTtcclxufTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==