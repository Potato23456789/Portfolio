// Generates a simple cube GLB for testing the 3D viewer
const fs = require('fs')

// 24 vertices (4 per face × 6 faces) with correct winding per face
const positions = new Float32Array([
  -0.5,-0.5, 0.5,  0.5,-0.5, 0.5,  0.5, 0.5, 0.5, -0.5, 0.5, 0.5, // front
  -0.5,-0.5,-0.5, -0.5, 0.5,-0.5,  0.5, 0.5,-0.5,  0.5,-0.5,-0.5, // back
  -0.5, 0.5,-0.5, -0.5, 0.5, 0.5,  0.5, 0.5, 0.5,  0.5, 0.5,-0.5, // top
  -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,  0.5,-0.5, 0.5, -0.5,-0.5, 0.5, // bottom
   0.5,-0.5,-0.5,  0.5, 0.5,-0.5,  0.5, 0.5, 0.5,  0.5,-0.5, 0.5, // right
  -0.5,-0.5,-0.5, -0.5,-0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5,-0.5, // left
])

const indices = new Uint16Array([
   0, 1, 2,  0, 2, 3,
   4, 5, 6,  4, 6, 7,
   8, 9,10,  8,10,11,
  12,13,14, 12,14,15,
  16,17,18, 16,18,19,
  20,21,22, 20,22,23,
])

const posBytes = Buffer.from(positions.buffer)
const idxBytes = Buffer.from(indices.buffer)
const binBuf   = Buffer.concat([posBytes, idxBytes])

const gltf = {
  asset: { version: '2.0' },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0 }],
  meshes: [{ primitives: [{ attributes: { POSITION: 0 }, indices: 1, material: 0 }] }],
  materials: [{
    pbrMetallicRoughness: { baseColorFactor: [0.9, 0.3, 0.5, 1], metallicFactor: 0.4, roughnessFactor: 0.5 },
    doubleSided: true
  }],
  accessors: [
    { bufferView: 0, componentType: 5126, count: 24, type: 'VEC3', max: [0.5,0.5,0.5], min: [-0.5,-0.5,-0.5] },
    { bufferView: 1, componentType: 5123, count: 36, type: 'SCALAR' },
  ],
  bufferViews: [
    { buffer: 0, byteOffset: 0,              byteLength: posBytes.length },
    { buffer: 0, byteOffset: posBytes.length, byteLength: idxBytes.length },
  ],
  buffers: [{ byteLength: binBuf.length }],
}

const jsonRaw    = Buffer.from(JSON.stringify(gltf), 'utf8')
const jsonPad    = (4 - jsonRaw.length % 4) % 4
const jsonChunk  = Buffer.concat([jsonRaw, Buffer.alloc(jsonPad, 0x20)]) // pad with spaces

const binPad     = (4 - binBuf.length % 4) % 4
const binChunk   = Buffer.concat([binBuf, Buffer.alloc(binPad, 0x00)])

const totalLen   = 12 + 8 + jsonChunk.length + 8 + binChunk.length

const header     = Buffer.alloc(12)
header.writeUInt32LE(0x46546C67, 0) // 'glTF'
header.writeUInt32LE(2,           4)
header.writeUInt32LE(totalLen,    8)

const jsonHeader = Buffer.alloc(8)
jsonHeader.writeUInt32LE(jsonChunk.length, 0)
jsonHeader.writeUInt32LE(0x4E4F534A,       4) // 'JSON'

const binHeader  = Buffer.alloc(8)
binHeader.writeUInt32LE(binChunk.length,   0)
binHeader.writeUInt32LE(0x004E4942,        4) // 'BIN\0'

const glb = Buffer.concat([header, jsonHeader, jsonChunk, binHeader, binChunk])
fs.mkdirSync('public/models', { recursive: true })
fs.writeFileSync('public/models/test.glb', glb)
console.log(`test.glb written — ${glb.length} bytes`)
