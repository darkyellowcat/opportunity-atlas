// Run from either the downloadable Pages repository or the publishing checkout.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = fs.existsSync('programs.js') ? '.' : 'dist';
const context = vm.createContext({ window: {} });
for (const name of ['catalog.js', 'programs.js', 'additions.js', 'extras.js']) {
  const filename = path.join(root, name);
  vm.runInContext(fs.readFileSync(filename, 'utf8'), context, { filename });
}
const records = [...context.window.ATLAS_PROGRAMS, ...context.window.ATLAS_ADDITIONS, ...context.window.ATLAS_EXTRA];
if (!records.length) throw new Error('没有可巡查的条目');
process.stdout.write(JSON.stringify(records.map(({id, title, sources, events, checked, watch, reviewDays}) =>
  ({id, title, sources, events, checked, watch, reviewDays}))));
