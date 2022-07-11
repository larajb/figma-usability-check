var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dispatch, handleEvent } from '../codeMessageHandler';
import { startView } from '../start/startHandler';
import { fontSize, homepageReference, localColorConsistency, localFontConsistency, orphanPages } from './helper/metricEvalHelper';
export const metricEvalView = () => {
    // to navigate back to the start page
    handleEvent('backToStart', () => {
        figma.showUI(__uiFiles__.start);
        startView();
        figma.ui.resize(450, 550);
    });
    // to get all pages of a figma document
    handleEvent('getPages', () => {
        var pages = figma.root.children;
        var pagesObjects = [];
        pages.forEach(page => {
            pagesObjects.push({ name: page.name, id: page.id });
        });
        dispatch('allPages', pagesObjects);
    });
    // to get all frames of a page
    handleEvent('getFrames', (pageId) => {
        const page = figma.getNodeById(pageId);
        var frameObjects = [];
        if (page.type === 'PAGE') {
            const frames = page.findAll(node => node.type === 'FRAME');
            frames.forEach(frame => {
                frameObjects.push({ name: frame.name, id: frame.id });
            });
        }
        dispatch('frames', frameObjects);
    });
    // to select all given elements by id
    handleEvent('setSelection', (ids) => {
        var nodes = [];
        ids.forEach(id => {
            var node = figma.getNodeById(id);
            nodes.push(node);
        });
        figma.currentPage.selection = nodes;
    });
    // to evaluate the ui with the selected metrics
    handleEvent('evaluate', (args) => {
        var results = [];
        args.selectedMetrics.forEach(metric => {
            switch (metric) {
                case 'Farbkonsistenz':
                    var localColorConsistencyResult = localColorConsistency(args.selectedFrames);
                    results.push({ metric: 'Farbkonsistenz', value: localColorConsistencyResult.value, nodes: localColorConsistencyResult.nodes, type: 'colorStyle' });
                    break;
                case 'Schriftkonsistenz':
                    var localFontConsistencyResult = localFontConsistency(args.selectedFrames);
                    results.push({ metric: 'Schriftkonsistenz', value: localFontConsistencyResult.value, nodes: localFontConsistencyResult.nodes, type: 'fontStyle' });
                    break;
                case 'Verweis auf Startseite':
                    var homepageReferenceResult = homepageReference(args.selectedFrames, args.homepage);
                    results.push({ metric: 'Verweis auf Startseite', value: homepageReferenceResult.value, nodes: homepageReferenceResult.nodes, type: 'single' });
                    break;
                case 'Verwaiste Seiten':
                    var orphanPagesResult = orphanPages(args.selectedFrames);
                    results.push({ metric: 'Verwaiste Seiten', value: orphanPagesResult.value, nodes: orphanPagesResult.nodes, type: 'single' });
                    break;
                case 'Schriftgröße':
                    var fontSizeResult = fontSize(args.selectedFrames);
                    results.push({ metric: 'Schriftgröße', value: fontSizeResult.value, nodes: fontSizeResult.nodes, type: 'single' });
                    break;
            }
        });
        dispatch('evaluationResults', results);
    });
    // to get the stored custom evaluation profiles
    handleEvent('getEvaluationProfileStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var storage = undefined;
        yield figma.clientStorage.getAsync('evaluationProfiles').then((value) => {
            storage = value;
        });
        dispatch('currentEvaluationProfileStorage', storage);
    }));
    // to store the custom evaluation profiles
    handleEvent('setEvaluationProfileStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('evaluationProfiles', storage);
    }));
    // to get the stored evaluations
    handleEvent('getEvaluationStorage', () => __awaiter(void 0, void 0, void 0, function* () {
        var storage = undefined;
        yield figma.clientStorage.getAsync('evaluation').then((value) => {
            storage = value;
        });
        dispatch('currentEvaluationStorage', storage);
    }));
    // to store the evaluation results
    handleEvent('setEvaluationStorage', (storage) => __awaiter(void 0, void 0, void 0, function* () {
        yield figma.clientStorage.setAsync('evaluation', storage);
    }));
};
