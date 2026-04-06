const fs = require('fs');
const buffer = fs.readFileSync('public/model.glb');
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);
const output = gltf.nodes.map((n, i) => `${i}: ${n.name} (children: ${n.children ? n.children.join(',') : 'none'})`).join('\n');
fs.writeFileSync('nodes.txt', output);
