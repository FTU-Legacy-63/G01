(()=>{
"use strict";
const api = window.PitchLedger;
function beats(text, limit = 280) {
  const paragraphs = String(text || "").split(/\n\s*\n/).filter(Boolean), result = [];
  for (const paragraph of paragraphs) {
    const sentences = paragraph.split(/(?<=[.!?])\s+/);
    let line = "";
    for (const sentence of sentences) {
      const next = sentence.trim();
      if (line && (line + " " + next).length > limit) { result.push(line); line = ""; }
      line += (line ? " " : "") + next;
    }
    if (line) result.push(line);
  }
  return result.length ? result : [""];
}
function pitchLines(p, scene = {}) {
  const authored = scene.pitchLines?.length ? scene.pitchLines : [{id:"pitch",text:p.pitch,expression:scene.defaultExpression}];
  return authored.flatMap((line,i) => (line.voice||line.keepTogether?[line.text]:beats(line.text)).map((text,j) => ({...line,id:(line.id || "pitch-"+i)+"-"+j,text})));
}
function dialogueLines(p, nodeId, scene = {}) {
  const node = p.dialogue.nodes.find(n => n.id === nodeId) || p.dialogue.nodes[0];
  const expression = scene.nodeExpressions?.[node.id] || scene.topicExpressions?.[node.topicId] || scene.defaultExpression || "thoughtful";
  return beats(node.founderText).map((text,i) => ({id:node.id+"-"+i,text,expression,voice:scene.voiceClips?.[node.id]?.[i]}));
}
api.narrative = { beats, pitchLines, dialogueLines };
})();
