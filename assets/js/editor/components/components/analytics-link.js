import { __ } from '@wordpress/i18n';

const AnalitycsLink = ({ shortLink, workspaceSlug }) => {
	let domain;
	let key;
	try {
		const parsedUrl = new URL(shortLink);
		domain = parsedUrl.hostname;
		key = parsedUrl.pathname.split('/')[1];
	} catch (error) {
		console.error('Invalid URL:', error);
		return null;
	}
	return (
		<div className="dubco-analytics-link">
			<p>
				<a
					href={`https://app.dub.co/${workspaceSlug}/analytics?domain=${domain}&key=${key}&tab=clicks`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{__('Analytics for link', 'dubco-plugin')}
				</a>
			</p>
		</div>
	);
};

export default AnalitycsLink;
