export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/auth": [3],
		"/auth/login": [4],
		"/auth/sign-up": [5],
		"/calendar": [6],
		"/journalv2": [9],
		"/journalv3": [10],
		"/journal": [7],
		"/journal/[id]": [8],
		"/moodActivities": [14],
		"/mood": [11],
		"/mood/meditation": [12],
		"/mood/yoga": [13],
		"/task": [15]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';