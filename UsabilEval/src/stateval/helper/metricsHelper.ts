import { getNode } from "../../figmaAccess/fileContents";
import { getHeight, getReactions, getType } from "../../figmaAccess/nodeProperties";

// /**
//  * This is a function to evaluate the link consistency across multiple frames.
//  * This function is applied to all frames together.
//  * @returns 
//  */
// export const linkConsistency = (frames) => {
//     var internalLinks = [];
//     var externalLinks = [];
//     var destinations = { internal: [], external: [] };
//     frames.forEach(frame => {
//         const frameNode = figma.getNodeById(frame.id);
//         const nodes = frameNode.findAll();
//         nodes.forEach(node => {
//             var reactions = getReactions(node.id);
//             if (reactions.length > 0) {
//                 reactions.forEach(reaction => {
//                     if (reaction.action.navigation === 'NAVIGATE') {
//                         destinations.internal.push(reaction.action.destinationId);
//                         internalLinks.push({ node: node, destination: reaction.action.destinationId });
//                     } else if (reaction.action.type === 'URL') {
//                         var cleanedUrl = reaction.action.url.replace(/(^\w+:|^)\/\//, '');
//                         destinations.external.push(cleanedUrl);
//                         externalLinks.push({ node: node, destination: cleanedUrl });
//                     }
//                 });
//             } else if (getType(node.id) === 'TEXT' && node.hyperlink !== null) {
//                 var cleanedUrl = node.hyperlink.value.replace(/(^\w+:|^)\/\//, '');
//                 destinations.external.push(cleanedUrl);
//                 externalLinks.push({ node: node, destination: cleanedUrl });
//             }
//         })
//     });
//     destinations.internal = destinations.internal.filter((item, index) => destinations.internal.indexOf(item) === index);
//     destinations.external = destinations.external.filter((item, index) => destinations.external.indexOf(item) === index);

//     var internalLinksResults = getLinkConsistency(internalLinks, destinations.internal);
//     var externalLinksResults = getLinkConsistency(externalLinks, destinations.external);

//     var linksResults = [];
//     linksResults.push(...internalLinksResults, ...externalLinksResults);
    
//     linksResults = linksResults.filter(result => result.probablyNotCorrect.id.length > 0);

//     return { value: null, nodes: linksResults };
// }

// const getLinkConsistency = (links, destinations) => {
//     var linksGrouped = links.reduce((acc, obj) => {
//         const property = obj.destination;
//         acc[property] = acc[property] || [];
//         acc[property].push(obj);
//         return acc;
//     }, {});
//     var linksAndFormats = [];
//     destinations.forEach(destination => {
//         var linkFormats = [];
//         if (linksGrouped[destination].length >= 1) {
//             linkFormats.push([linksGrouped[destination][0].node]);
//             var lastIndex = 0;
//             for (let i = 1; i < linksGrouped[destination].length; i++) {
//                 if (getType(linksGrouped[destination][i].node.id) === 'TEXT') {
//                     if (linksGrouped[destination][i].node.characters === linksGrouped[destination][i-1].node.characters) {
//                         linkFormats[lastIndex].push(linksGrouped[destination][i].node);
//                     } else {
//                         linkFormats.push([linksGrouped[destination][i].node]);
//                         lastIndex = linkFormats.length-1;
//                     }
//                 } else if (getType(linksGrouped[destination][i].node.id) === 'MEDIA') {
//                     if (linksGrouped[destination][i].node.mediaData === linksGrouped[destination][i-1].node.mediaData) {
//                         linkFormats[lastIndex].push(linksGrouped[destination][i].node);
//                     } else {
//                         linkFormats.push([linksGrouped[destination][i].node]);
//                         lastIndex = linkFormats.length-1;
//                     }
//                 } else if (linksGrouped[destination][i].node.children.length > 0) {
//                     if (linksGrouped[destination][i].node.characters === linksGrouped[destination][i-1].node.characters) {
//                         linkFormats[lastIndex].push(linksGrouped[destination][i].node);
//                     } else {
//                         linkFormats.push([linksGrouped[destination][i].node]);
//                         lastIndex = linkFormats.length-1;
//                     }
//                 } else {
//                     if (JSON.stringify(linksGrouped[destination][i].node.fills) === JSON.stringify(linksGrouped[destination][i-1].node.fills)) {
//                         linkFormats[lastIndex].push(linksGrouped[destination][i].node);
//                     } else {
//                         linkFormats.push([linksGrouped[destination][i].node]);
//                         lastIndex = linkFormats.length-1;
//                     }
//                 }
//             }
//         }
//         linksAndFormats.push({ destination: destination, groupedNodes: linkFormats });
//     });
//     var linksResults = [];
//     linksAndFormats.forEach(link => {
//         var probablyCorrectIndex = link.groupedNodes.map(a => a.length).indexOf(Math.max(...link.groupedNodes.map(a => a.length)));
//         var probablyCorrect = link.groupedNodes[probablyCorrectIndex];
//         var probablyNotCorrect = link.groupedNodes.filter(nodes => probablyCorrect !== nodes);
//         var probablyCorrectNodes = { name: [], id: [] };
//         var probablyNotCorrectNodes = { name: [], id: [] };
//         probablyCorrect.forEach(el => {
//             probablyCorrectNodes.name.push(el.name);
//             probablyCorrectNodes.id.push(el.id);
//         });
//         for (let i = 0; i < probablyNotCorrect.length; i++) {
//             probablyNotCorrect[i].forEach(el => {
//                 probablyNotCorrectNodes.name.push(el.name);
//                 probablyNotCorrectNodes.id.push(el.id);
//             });
//         }
//         linksResults.push({ destination: link.destination, probablyCorrect: probablyCorrectNodes, probablyNotCorrect: probablyNotCorrectNodes });
//     })

//     return linksResults;
// }

/**
 * This is a function to evaluate the color consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @returns notPredefined 
 */
export const localColorConsistency = (frames) => {
    var colorStyles = figma.getLocalPaintStyles();
    var predefinedColorStyles = [];
    colorStyles.forEach(style => {
        const index = predefinedColorStyles.findIndex((colorStyle) => JSON.stringify(colorStyle) === JSON.stringify(style.paints));
        if (index < 0 && containsBlackOrWhite(style.paints) === false && style.paints.length > 0) {
            predefinedColorStyles.push(style.paints);
        }
    })
    var nodeFills = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
        const nodes = frameNode.findAll();
        nodes.forEach(node => {
            if (!node.name.startsWith('Annotation')) {
                if ('fills' in node) {
                    const index = nodeFills.findIndex((nodeFill) => JSON.stringify(nodeFill.fill) === JSON.stringify(node.fills));
                    if (containsBlackOrWhite(node.fills) === false && containsImage(node.fills) === false && node.fills.length > 0) {
                        if (index < 0) {
                            nodeFills.push({ nodes: [node.id], fill: node.fills });
                        } else if (index >= 0) {
                            nodeFills[index].nodes.push(node.id);
                        }
                    }
                }
            }
        });
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
}

const containsBlackOrWhite = (fills) => {
    var containsBlackOrWhite = false;
    fills.forEach(fill => {
        if (JSON.stringify(fill.color) === JSON.stringify({ r: 0, g: 0, b: 0 }) || JSON.stringify(fill.color) === JSON.stringify({ r: 1, g: 1, b: 1 })) {
            containsBlackOrWhite = true;
        }
    });
    return containsBlackOrWhite;
}

const containsImage = (fills) => {
    var containsImage = false;
    fills.forEach(fill => {
        if (fill.type === 'IMAGE') {
            containsImage = true;
        }
    });
    return containsImage;
}

/**
 * This is a function to evaluate the font consistency above multiple frames in a document.
 * This function is applied to all frames together.
 * @returns 
 */
export const localFontConsistency = (frames) => {
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
        const nodes = frameNode.findAll();
        nodes.forEach(node => {
            if (!node.name.startsWith('Annotation')) {
                if (getType(node.id) === 'TEXT') {
                    var fontNameAndSize = { fontName: node.fontName, fontSize: node.fontSize };
                    var index = nodeTextStyles.findIndex((style) => JSON.stringify(style.fontStyle) === JSON.stringify(fontNameAndSize));
                    if (index < 0) {
                        nodeTextStyles.push({ nodes: [node.id], fontStyle: fontNameAndSize });
                    } else if (index >= 0) {
                        nodeTextStyles[index].nodes.push(node.id);
                    }
                }
            }
        });
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
}

// /**
//  * This is a function to evaluate the length of a text link.
//  * This function is applied to one text element.
//  * @param link 
//  * @returns 
//  */
// export const textLinkLength = (frames) => {
//     var tooLongLinks = [];
//     frames.forEach(frame => {
//         const frameNode = figma.getNodeById(frame.id);
//         const textNodes = frameNode.findAll(node => node.type === 'TEXT');
//         textNodes.forEach(text => {
//             var reactions = getReactions(text.id);
//             if (reactions.length > 0) {
//                 reactions.forEach(async reaction => {
//                     if (reaction.action.navigation === 'NAVIGATE' || text.hyperlink !== null) {
//                         var height = getHeight(text.id);
//                         var fontSize = text.fontSize;
//                         var testText = figma.createText();
//                         var textHeight = null;
//                         await loadingFont().then(() => {
//                             testText.fontName = { family: 'Roboto', style: 'Regular' };
//                             testText.fontSize = fontSize;
//                             testText.fills = [{ type: 'SOLID', color: {r: 0, g: 0, b: 1} }];
//                             testText.characters = 'Test';
//                         })
//                         textHeight = testText.height;
//                         testText.remove();
//                         if (height > textHeight) {
//                             tooLongLinks.push({ id: text.id, name: text.name });
//                         }
//                     }
//                 });
//             }
//         });
//     });
//     return tooLongLinks;
// }

/**
 * This is a function to check that the font size of a text is equal to or bigger than 12pt.
 * This function is appliex to one text element.
 * @returns 
 */
export const fontSize = (frames) => {
    var textsWithSmallerFontSize = [];
    frames.forEach(frame => {
        const frameNode = figma.getNodeById(frame.id);
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
    });
    return { value: null, nodes: textsWithSmallerFontSize };
}

/**
 * This is a function to check if any frame is missing a homepage reference.
 * The function is applied to all frames together.
 * @returns missingReferences
 */
export const homepageReference = (selectedFrames, homepageId) => {
    var missingReferences = [];
    selectedFrames.forEach(frame => {
        var isFound = false;
        if (frame.id !== homepageId) {
            var frameNode = getNode(frame.id);
            const nodes = frameNode.findAll();
            nodes.forEach(node => {
                var reactions = getReactions(node.id);
                if (reactions.length > 0) {
                    reactions.forEach(reaction => {
                        if (reaction.action.destinationId === homepageId) {
                            isFound = true;
                        }
                    });
                }
            });
        } else {
            var isFound = true;
        }
        if (isFound === false) {
            missingReferences.push({ id: frame.id, name: frame.name });
        }
    });
    var homepageReferenceValue = (selectedFrames.length - missingReferences.length) / selectedFrames.length;
    return { value: homepageReferenceValue, nodes:  missingReferences };
}

/**
 * This is a function to check if the current page contains any orphan frames.
 * The function is applied to all frames together.
 * @returns orphanPages
 */
export const orphanPages = (selectedFrames) => {
    var orphanPages = [];
    selectedFrames.forEach(frame1 => {
        var targetId = frame1.id;
        var isFound = false;
        selectedFrames.forEach(frame2 => {
            const frameNode2 = figma.getNodeById(frame2.id);
            const nodes = frameNode2.findAll();
            nodes.forEach(node => {
                var reactions = getReactions(node.id);
                if (reactions.length > 0) {
                    reactions.forEach(reaction => {
                        if (reaction.action.destinationId === targetId) {
                            isFound = true;
                        }
                    });
                }
            });
        });
        if(isFound === false) {
            orphanPages.push({ id: frame1.id, name: frame1.name });
        }
    });
    var orphanPagesValue = orphanPages.length / selectedFrames.length;
    return { value: orphanPagesValue, nodes: orphanPages };
}

/************************
 * Helper
 ************************/
const loadingFont = async () => {
    await figma.loadFontAsync({ family: 'Roboto', style: 'Regular'});
}
