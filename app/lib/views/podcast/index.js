import {getState} from '../../actions/state.js';
import {getPodcastDetails} from '../../actions/podcasts/index.js';
import {showSection} from '../../util/nav.js';

export const PATH = /^\/podcast\/(\d+)\/$/;
export const ID = 'podcast';
export const SECTION = 'podcast';

export const enter = async ({match}) => {
	showSection(SECTION);
	document.querySelector('#episode-details').classList.remove('visible');
	document.querySelector('#episode-list').classList.add('visible');

	const id = match[1];
	const state = getState();

	let podcast = state.podcast;

	if (podcast && state.podcast.id === id) {
		const {default: render} = await import('./render.js');
		await render(podcast);
	} else {

		const [podcasts, {default: render}] = await Promise.all([
			getPodcastDetails(id),
			import('./render.js')
		]);

		await render(podcasts);
	}
};

export const leave = () => {
	// Nothing to do yet
};