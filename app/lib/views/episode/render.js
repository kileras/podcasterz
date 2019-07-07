
import {updateElements} from '../../util/dom.js';
import {renderPodcastDetail} from '../common.js';

export const PATH = /^\/podcast\/(\d+)\/episode\/(.+)\/$/;
export const ID = 'episode';
export const SECTION = 'podcast';

const renderEpisodeDetails = (episode) => {

	const {
		title,
		summary,
		file
	} = episode;

	updateElements([
		{selector: '#episode-details h3', attrs: {textContent: title}},
		{selector: '#episode-summary', attrs: {textContent: summary}},
		{selector: 'audio', attrs: {src: file}}
	]);
};

const render = (podcast, episode) => {
	renderPodcastDetail(podcast);
	renderEpisodeDetails(episode);
};

export default render;
