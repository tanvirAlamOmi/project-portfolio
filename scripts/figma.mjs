#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          const val = values.join('=').trim().replace(/^["']|["']$/g, '');
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const TOKEN = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_API_KEY;

if (!TOKEN) {
  console.error('❌ Error: FIGMA_ACCESS_TOKEN or FIGMA_API_KEY not found in environment or .env.local');
  process.exit(1);
}

const BASE_URL = 'https://api.figma.com/v1';

async function fetchFigma(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'X-Figma-Token': TOKEN,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Figma API Error [${res.status}]: ${errorText}`);
  }
  return res.json();
}

function normalizeNodeId(nodeId) {
  return nodeId.replace(/-/g, ':');
}

async function main() {
  const [,, command, ...args] = process.argv;

  if (!command || command === 'help' || command === '--help') {
    console.log(`
Figma CLI Utility for Project Portfolio
=======================================
Usage:
  node scripts/figma.mjs whoami
  node scripts/figma.mjs file <fileKey>
  node scripts/figma.mjs node <fileKey> <nodeId>
  node scripts/figma.mjs export <fileKey> <nodeId> <outputPath> [--format=svg|png] [--scale=2]
    `);
    return;
  }

  try {
    if (command === 'whoami' || command === 'status') {
      const data = await fetchFigma('/me');
      console.log('✅ Connected to Figma successfully!');
      console.log(`👤 User: ${data.handle} (${data.email})`);
      console.log(`🆔 ID: ${data.id}`);
    } else if (command === 'file') {
      const [fileKey] = args;
      if (!fileKey) {
        console.error('❌ Usage: node scripts/figma.mjs file <fileKey>');
        return;
      }
      console.log(`🔍 Fetching file info for: ${fileKey}...`);
      const data = await fetchFigma(`/files/${fileKey}?depth=1`);
      console.log(`📄 Name: ${data.name}`);
      console.log(`🕒 Last Modified: ${data.lastModified}`);
      console.log(`📑 Pages:`);
      data.document.children.forEach(page => {
        console.log(`  - ${page.name} (id: ${page.id}, children: ${page.children ? page.children.length : 0})`);
      });
    } else if (command === 'node') {
      const [fileKey, rawNodeId] = args;
      if (!fileKey || !rawNodeId) {
        console.error('❌ Usage: node scripts/figma.mjs node <fileKey> <nodeId>');
        return;
      }
      const nodeId = normalizeNodeId(rawNodeId);
      console.log(`🔍 Fetching node [${nodeId}] from file [${fileKey}]...`);
      const data = await fetchFigma(`/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}`);
      const nodeData = data.nodes[nodeId];
      if (!nodeData) {
        console.error(`❌ Node ${nodeId} not found in response.`);
        return;
      }
      console.log(JSON.stringify(nodeData, null, 2));
    } else if (command === 'export') {
      const [fileKey, rawNodeId, outputPath, ...flags] = args;
      if (!fileKey || !rawNodeId || !outputPath) {
        console.error('❌ Usage: node scripts/figma.mjs export <fileKey> <nodeId> <outputPath> [--format=svg|png] [--scale=2]');
        return;
      }
      const nodeId = normalizeNodeId(rawNodeId);
      let format = 'png';
      let scale = '2';
      for (const flag of flags) {
        if (flag.startsWith('--format=')) format = flag.split('=')[1];
        if (flag.startsWith('--scale=')) scale = flag.split('=')[1];
      }

      console.log(`🖼️ Exporting node [${nodeId}] as ${format.toUpperCase()} (scale: ${scale})...`);
      const params = new URLSearchParams({
        ids: nodeId,
        format,
        scale,
      });
      const data = await fetchFigma(`/images/${fileKey}?${params.toString()}`);
      const imageUrl = data.images[nodeId];
      if (!imageUrl) {
        throw new Error(`Figma did not return an image URL for node ${nodeId}`);
      }

      console.log(`⬇️ Downloading asset from: ${imageUrl}`);
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) throw new Error(`Download failed: ${imgRes.statusText}`);
      const arrayBuffer = await imgRes.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const targetPath = path.isAbsolute(outputPath) ? outputPath : path.join(rootDir, outputPath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, buffer);
      console.log(`✅ Saved to: ${targetPath} (${buffer.length} bytes)`);
    } else {
      console.error(`Unknown command: ${command}`);
    }
  } catch (err) {
    console.error(`❌ Error:`, err.message);
  }
}

main();
