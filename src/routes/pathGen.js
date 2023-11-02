import fs from 'fs';
import { pathTree } from './pathTree.js';

const isObject = (value) => {
	return !!(value && typeof value === 'object' && !Array.isArray(value));
};

const buildedPaths = {};

const buildPath = (path, keyName, prepend) => {
	if (isObject(path)) {
		//If we are object then we aren't string
		// We just asume is a path
		const entries = Object.entries(path); // We take all entries of obj
		const otherPaths = entries.filter(([key]) => key !== 'path'); // and filter the path
		const currentPath = `${prepend ?? ''}${path.path}/`; // Our current path is the sum of the previous
		otherPaths.forEach(([key, value]) => buildPath(value, key, currentPath));
		buildedPaths[keyName] = currentPath.slice(0, -1);
	}
};

buildPath(pathTree, 'index');

fs.writeFileSync(
	'./src/routes/paths.ts',
	`export const paths = ${JSON.stringify(buildedPaths)}`,
);
