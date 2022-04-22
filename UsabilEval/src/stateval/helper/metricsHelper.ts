import { getCurrentSelection } from "../../figmaAccess/fileContents"
import { getReactions } from "../../figmaAccess/nodeProperties";

/**
 * This is a function to check if any frame is missing a homepage reference.
 * @returns findings
 */
export const homepageReference = () => {
    var findings = [];
    const homepage = getCurrentSelection();
    const frames = figma.currentPage.findAll(node => node.type === 'FRAME');
    frames.forEach(frame => {
        var isFound = false;
        if (frame.id !== homepage.id) {
            const nodes = frame.findAll();
            nodes.forEach(node => {
                var reactions = getReactions(node.id);
                if (reactions.length > 0) {
                    reactions.forEach(reaction => {
                        if (reaction.action.destinationId === homepage.id) {
                            isFound = true;
                        }
                    });
                }
            });
        } else {
            var isFound = true;
        }
        findings.push({ frameName: frame.name, isFound: isFound });
    });
    return findings;
}

/**
 * This is a function to check if the current page contains any orphan frames
 * @returns orphanPages
 */
export const orphanPages = () => {
    var orphanPages = [];
    const frames = figma.currentPage.findAll(node => node.type === 'FRAME');
    frames.forEach(frame1 => {
        var target = frame1.id;
        frames.forEach(frame2 => {
            var isFound = false;
            const nodes = frame2.findAll();
            nodes.forEach(node => {
                var reactions = getReactions(node.id);
                if (reactions.length > 0) {
                    reactions.forEach(reaction => {
                        if (reaction.action.destinationId === target) {
                            isFound = true;
                        }
                    });
                }
            });
            if(!isFound) {
                orphanPages.push({ frameName: frame1.name, frameId: frame1.id });
            }
        });
    });
}
