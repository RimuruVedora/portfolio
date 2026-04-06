import { Document, NodeIO } from '@gltf-transform/core';

async function inspect() {
  const io = new NodeIO();
  const document = await io.read('c:/Users/Administrator/Desktop/tries/portfolio/public/friend.glb');
  const root = document.getRoot();
  console.log("Nodes:");
  document.getRoot().listNodes().forEach(n => {
    console.log(n.getName());
  });
}

inspect().catch(console.error);
