const fs = require('fs');
const path = require('path');

// Read the GLB file
const glbPath = path.join(__dirname, 'public', 'model.glb');

// Simple analysis using raw buffer
const buffer = fs.readFileSync(glbPath);
const jsonLength = buffer.readUInt32LE(12);
const jsonString = buffer.toString('utf8', 20, 20 + jsonLength);
const gltf = JSON.parse(jsonString);

console.log('\n========================================');
console.log('MODEL STRUCTURE ANALYSIS');
console.log('========================================\n');

console.log('--- NODES (Hierarchy) ---');
if (gltf.nodes) {
  gltf.nodes.forEach((node, i) => {
    console.log(`Node ${i}: "${node.name || 'unnamed'}"`);
    if (node.translation) console.log(`  Translation: ${node.translation}`);
    if (node.rotation) console.log(`  Rotation: ${node.rotation}`);
    if (node.scale) console.log(`  Scale: ${node.scale}`);
    if (node.mesh !== undefined) console.log(`  Uses Mesh: ${node.mesh}`);
    if (node.skin !== undefined) console.log(`  Uses Skin: ${node.skin}`);
    if (node.children) console.log(`  Children: ${node.children.join(', ')}`);
  });
}

console.log('\n--- MESHES ---');
if (gltf.meshes) {
  gltf.meshes.forEach((mesh, i) => {
    console.log(`Mesh ${i}: "${mesh.name || 'unnamed'}"`);
    mesh.primitives?.forEach((prim, j) => {
      console.log(`  Primitive ${j}:`, prim.attributes);
    });
  });
}

console.log('\n--- SKINS (Bones/Rigging) ---');
if (gltf.skins) {
  gltf.skins.forEach((skin, i) => {
    console.log(`Skin ${i}: "${skin.name || 'unnamed'}"`);
    if (skin.joints) {
      console.log(`  Joints (${skin.joints.length}):`);
      skin.joints.forEach((jointIdx, j) => {
        const jointName = gltf.nodes?.[jointIdx]?.name || `node_${jointIdx}`;
        console.log(`    ${j}: Node ${jointIdx} "${jointName}"`);
      });
    }
  });
} else {
  console.log('No skins found (model is not rigged)');
}

console.log('\n--- ANIMATIONS ---');
if (gltf.animations) {
  gltf.animations.forEach((anim, i) => {
    console.log(`Animation ${i}: "${anim.name || 'unnamed'}"`);
    if (anim.channels) {
      console.log(`  Channels: ${anim.channels.length}`);
    }
  });
} else {
  console.log('No animations found');
}

console.log('\n========================================');
