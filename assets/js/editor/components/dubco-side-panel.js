import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, TextControl, Button, Notice } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import AnalitycsLink from './components/analytics-link';
import { ReactComponent as DubincIcon } from './assets/logo.svg';

const createShortLink = async (postId) => {
	return apiFetch({
		path: '/dubco/v1/links',
		method: 'POST',
		data: { post_id: postId },
	});
};

const updateShortLink = async (postId, linkId, key) => {
	return apiFetch({
		path: `/dubco/v1/links/${linkId}`,
		method: 'PATCH',
		data: { post_id: postId, key },
	});
};

const MetaBox = ({ postStatus, metaFields, setMetaFields, postId }) => {
	const [editMode, setEditMode] = useState(false);
	const [pathname, setPathname] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const { _dubco_short_url, _dubco_short_url_id, _dubco_short_url_error } = metaFields;

	useEffect(() => {
		if (_dubco_short_url) {
			const url = new URL(_dubco_short_url);
			setPathname(url.pathname.substring(1));
		}
	}, [_dubco_short_url]);

	if (postStatus !== 'publish') {
		return (
			<PluginDocumentSettingPanel
				title={__('Dub', 'dubinc')}
				initialOpen={false}
				icon={<DubincIcon />}
			>
				<Notice status="warning" isDismissible={false}>
					{__(
						'You can only create short links for published posts. ' +
							"A short link will be created automatically, if it doesn't exists when this post is published",
						'dubinc',
					)}
				</Notice>
			</PluginDocumentSettingPanel>
		);
	}
	return (
		<PluginDocumentSettingPanel title={__('Dub', 'dubinc')} initialOpen={false}>
			<PanelRow>
				<div>
					{_dubco_short_url && (
						<>
							<div className="dubco-short-link">
								{editMode ? (
									<TextControl
										value={pathname}
										label={__('Edit the pathname', 'dubinc')}
										onChange={(value) => setPathname(value)}
									/>
								) : (
									<TextControl
										value={_dubco_short_url}
										label={__('Url', 'dubinc')}
										onChange={(value) =>
											setMetaFields({ _dubco_short_url: value })
										}
										readOnly
									/>
								)}
								{editMode ? (
									<Button
										variant="primary"
										onClick={async () => {
											try {
												setError('');
												setIsLoading(true);
												const response = await updateShortLink(
													postId,
													_dubco_short_url_id,
													pathname,
												);
												if (response) {
													setMetaFields({
														_dubco_short_url: response.shortLink,
													});
												}
											} catch (error) {
												setError(error);
											} finally {
												setIsLoading(false);
											}

											setEditMode(!editMode);
										}}
									>
										{isLoading
											? __('Updating', 'dubinc')
											: __('Update', 'dubinc')}
									</Button>
								) : (
									<Button
										variant="primary"
										onClick={() => setEditMode(!editMode)}
									>
										{__('Edit', 'dubinc')}
									</Button>
								)}
							</div>
							{error && <Notice status="error">{error}</Notice>}
							<AnalitycsLink shortLink={_dubco_short_url} />
						</>
					)}
					{!_dubco_short_url && (
						<div className="dubco-creat-link">
							<Button
								variant="primary"
								disabled={isLoading}
								description={__('Create a short link for this post', 'dubinc')}
								onClick={async () => {
									try {
										setError('');
										setIsLoading(true);
										const response = await createShortLink(postId);
										if (response) {
											setMetaFields({ _dubco_short_url: response.shortLink });
										}
									} catch (error) {
										setError(error);
									} finally {
										setIsLoading(false);
									}
								}}
							>
								{isLoading
									? __('Creating Short Link...', 'dubinc')
									: __('Create Short Link', 'dubinc')}
							</Button>
							{_dubco_short_url_error && (
								<Notice
									status="error"
									onRemove={() => {
										setMetaFields({ _dubco_short_url_error: '' });
									}}
								>
									{_dubco_short_url_error}
								</Notice>
							)}
							{error && <Notice status="error">{error}</Notice>}
						</div>
					)}
				</div>
			</PanelRow>
		</PluginDocumentSettingPanel>
	);
};

const applyWithSelect = withSelect((select) => {
	return {
		metaFields: select('core/editor').getEditedPostAttribute('meta'),
		postStatus: select('core/editor').getEditedPostAttribute('status'),
		postId: select('core/editor').getCurrentPostId(),
	};
});

const applyWithDispatch = withDispatch((dispatch) => {
	return {
		setMetaFields(newValue) {
			dispatch('core/editor').editPost({ meta: newValue });
		},
	};
});

export default compose([applyWithSelect, applyWithDispatch])(MetaBox);
