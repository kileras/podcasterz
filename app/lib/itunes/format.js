const getLabelValue = (item) => {
	return item && item.label ? item.label : item;
};

export const formatPodcastEntry = (entry) => {
	const {
		id: {
			attributes: {
				'im:id': id
			}
		},
		'im:name': name,
		title,
		summary,
		'im:artist': author,
		'im:image': images
	} = entry;

	const image = images.reduce((result, {attributes, label}) => {
		const height = parseInt(attributes.height, 10);
		if (!height || height < result.height) return result;
		return {
			label,
			height
		};
	}, {});

	return Object.entries({
		id,
		name,
		title,
		summary,
		author,
		image
	}).reduce((res, [key, value]) => {
		res[key] = getLabelValue(value);
		return res;
	}, {});
};
