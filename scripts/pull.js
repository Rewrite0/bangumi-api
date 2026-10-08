import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import openapiTS, { astToString } from 'openapi-typescript';

const root = process.cwd();
const target = path.join(root, 'src/types/openapi.ts')

const ast = await openapiTS(new URL("https://bangumi.github.io/api/dist.json"));
const contents = astToString(ast);
fs.writeFileSync(target, contents);
