import { allowedNodeEnvironmentFlags } from 'process';
import { dispatch, handleEvent } from '../codeMessageHandler';
import { startView } from '../start/startHandler';
import { fontSize, homepageReference, linkConsistency, localColorConsistency, localFontConsistency, orphanPages, targetSize, textLinkLength } from './helper/metricsHelper';

export const statevalView = () => {
    handleEvent('loadMetrics', () => {
        loadMetrics();
    });

    handleEvent('backToStart', () => {
        figma.showUI(__uiFiles__.start);
        startView();
        figma.ui.resize(450, 550);
    });

    handleEvent('getPages', () => {
        var pages = figma.root.children;
        var pagesObjects = [];
        pages.forEach(page => {
            pagesObjects.push({ name: page.name, id: page.id });
        })
        dispatch('allPages', pagesObjects);
    });

    handleEvent('getFrames', (pageId) => {
        const page = figma.getNodeById(pageId);
        const frames = page.findAll(node => node.type === 'FRAME');
        var frameObjects = [];
        frames.forEach(frame => {
            frameObjects.push({ name: frame.name, id: frame.id });
        })
        dispatch('frames', frameObjects);
    });

    /**
     * Selection
     */

    handleEvent('setSelection', (ids) => {
        var nodes = [];
        ids.forEach(id => {
            var node = figma.getNodeById(id);
            nodes.push(node);
        })
        figma.currentPage.selection = nodes;
    })

    /**
     * Evaluation
     */

    handleEvent('evaluate', (args) => {
        console.log(args);
        var results = [];
        args.selectedMetrics.forEach(metric => {
            switch(metric) {
                case 'Farbkonsistenz':
                    var localColorConsistencyResult = localColorConsistency(args.selectedFrames);
                    results.push({ metric: 'Farbkonsistenz', value: localColorConsistencyResult.value, nodes: localColorConsistencyResult.nodes, type: 'colorStyle' });
                    break;
                case 'Schriftkonsistenz':
                    var localFontConsistencyResult = localFontConsistency(args.selectedFrames);
                    results.push({ metric: 'Schriftkonsistenz', value: localFontConsistencyResult.value, nodes: localFontConsistencyResult.nodes, type: 'fontStyle' });
                    break;
                case 'Linkkonsistenz':
                    var linkConsistencyResult = linkConsistency(args.selectedFrames);
                    results.push({ metric: 'Linkkonsistenz', value: linkConsistencyResult.value, nodes: linkConsistencyResult.nodes, type: 'comparison' });
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
        console.log(results);
        dispatch('evaluationResults', results);
    });

    /**
     * Get and set storage
     */

    handleEvent('getEvaluationProfileStorage', async () => {
        var storage = undefined;
        await figma.clientStorage.getAsync('evaluationProfiles').then((value) => {
            storage = value;
        });
        dispatch('currentEvaluationProfileStorage', storage);
    });

    handleEvent('setEvaluationProfileStorage', async (storage) => {
        await figma.clientStorage.setAsync('evaluationProfiles', storage);
    })

    handleEvent('getEvaluationStorage', async () => {
        var storage = undefined;
        await figma.clientStorage.getAsync('evaluation').then((value) => {
            storage = value;
        });
        dispatch('currentEvaluationStorage', storage);
    })

    handleEvent('setEvaluationStorage', async (storage) => {
        await figma.clientStorage.setAsync('evaluation', storage);
    });
}

const loadMetrics = () => {
    
}