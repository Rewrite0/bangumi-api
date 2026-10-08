import { defineConfig } from 'tsdown';
import fs from 'node:fs';

const apis = fs.readdirSync('./src/apis').map((dir) => `./src/apis/${dir}/index.ts`);

export default defineConfig({
  entry: ['./src/index.ts', './src/adapters/index.ts', ...apis],
});
