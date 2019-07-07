import {formatPodcastEntry, getFeedData} from './format.js';

const ITUNES_TOP_URL = '/.netlify/functions/top-podcasts';
const ITUNES_PODCAST_URL = '/.netlify/functions/podcast-details?id=';
const FEED_BASE_URL = '/.netlify/functions/feed?url=';

const parser = new DOMParser();

let podcasts = null;

export const getLoadedPodcasts = () => podcasts;

export const getTopPodcasts = async () => {
	const res = await fetch(ITUNES_TOP_URL);
	const {feed} = await res.json();
	const {entry: entries} = feed;

	podcasts = entries.reduce((result, entry) => {
		const data = formatPodcastEntry(entry);
		result.push(data);
		return result;
	}, []);

	return podcasts;
};

export const getPodcastDetails = async (id) => {
	if (!id) throw new Error('Missing id for getPodcastData');

	const res = await fetch(ITUNES_PODCAST_URL + id);
	const {resultCount, results} = await res.json();

	if (resultCount <= 0 || results.length <= 0) throw new Error('Podcast details not found');

	const [{feedUrl}] = results;

	const feedData = await fetch(FEED_BASE_URL + encodeURIComponent(feedUrl));
	const body = await feedData.text();

	const doc = parser.parseFromString(body, 'text/xml');

	return getFeedData(doc);
};
