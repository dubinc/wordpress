import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { PanelRow, TextControl, Button, Notice } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import AnalitycsLink from './components/analytics-link';
import { ReactComponent as DubincIcon } from './assets/logo.svg';
import { ReactComponent as ClickIcon } from './assets/click.svg';
import { ReactComponent as ClickActivityIcon } from './assets/click-activity.svg';
import { ReactComponent as LeadIcon } from './assets/lead.svg';
import { ReactComponent as LeadActivityIcon } from './assets/lead-activity.svg';
import { ReactComponent as SaleIcon } from './assets/sale.svg';
import { ReactComponent as SaleActivityIcon } from './assets/sale-activity.svg';

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

const retrieveLinkInfo = async (postId) => {
	const query = new URLSearchParams({ post_id: String(postId) }).toString();
	return apiFetch({
		path: `/dubco/v1/links/info?${query}`,
		method: 'GET',
	});
};

const formatMetric = (value) => {
	if (!Number.isFinite(value)) {
		return '0';
	}
	return new Intl.NumberFormat().format(value);
};

const LinkMetrics = ({ linkInfo }) => {
	if (!linkInfo) {
		return null;
	}

	const clicks = Number(linkInfo.clicks) || 0;
	const leads = Number(linkInfo.leads) || 0;
	const sales = Number(linkInfo.sales) || 0;

	return (
		<div className="dubco-link-metrics">
			<div
				className="dubco-link-metric"
				title={__('Clicks', 'dubinc')}
				aria-label={__('Clicks', 'dubinc')}
			>
				{clicks > 0 ? (
					<ClickActivityIcon className="dubco-link-metric-icon" />
				) : (
					<ClickIcon className="dubco-link-metric-icon" />
				)}
				<span className="dubco-link-metric-value">{formatMetric(clicks)}</span>
			</div>
			<div
				className="dubco-link-metric"
				title={__('Leads', 'dubinc')}
				aria-label={__('Leads', 'dubinc')}
			>
				{leads > 0 ? (
					<LeadActivityIcon className="dubco-link-metric-icon" />
				) : (
					<LeadIcon className="dubco-link-metric-icon" />
				)}
				<span className="dubco-link-metric-value">{formatMetric(leads)}</span>
			</div>
			<div
				className="dubco-link-metric"
				title={__('Sales', 'dubinc')}
				aria-label={__('Sales', 'dubinc')}
			>
				{sales > 0 ? (
					<SaleActivityIcon className="dubco-link-metric-icon" />
				) : (
					<SaleIcon className="dubco-link-metric-icon" />
				)}
				<span className="dubco-link-metric-value">{formatMetric(sales)}</span>
			</div>
		</div>
	);
};

const MetaBox = ({ postStatus, metaFields, setMetaFields, postId }) => {
	const [editMode, setEditMode] = useState(false);
	const [pathname, setPathname] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isRetrying, setIsRetrying] = useState(false);
	const [linkInfo, setLinkInfo] = useState(null);

	const { _dubco_short_url, _dubco_short_url_id, _dubco_short_url_error } = metaFields;

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await retrieveLinkInfo(postId);
				setLinkInfo(response);
			} catch (error) {
				setError(error?.message || error);
			}
		}
		if (postId && _dubco_short_url_id) {
			fetchData();
		}
	}, [postId, _dubco_short_url_id]);

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
														_dubco_short_url_id: response.id,
														_dubco_short_url_domain: response.domain,
													});
													setLinkInfo(response);
												}
											} catch (error) {
												setError(error?.message || error);
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
							<div className="dubco-link-metrics-container">
								<AnalitycsLink shortLink={_dubco_short_url} />
								<LinkMetrics linkInfo={linkInfo} />
							</div>
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
											setMetaFields({
												_dubco_short_url: response.shortLink,
												_dubco_short_url_id: response.id,
												_dubco_short_url_domain: response.domain,
											});
											setLinkInfo(response);
										}
									} catch (error) {
										setError(error?.message || error);
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
									<Button
										variant="secondary"
										disabled={isLoading || isRetrying}
										onClick={async () => {
											try {
												setError('');
												setIsRetrying(true);
												const response = await retrieveLinkInfo(postId);
												if (response) {
													setMetaFields({
														_dubco_short_url: response.shortLink,
														_dubco_short_url_id: response.id,
														_dubco_short_url_domain: response.domain,
														_dubco_short_url_error: '',
													});
													setLinkInfo(response);
												}
											} catch (error) {
												setError(error?.message || error);
											} finally {
												setIsRetrying(false);
											}
										}}
									>
										{isRetrying
											? __('Retrying', 'dubinc')
											: __('Retry', 'dubinc')}
									</Button>
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
