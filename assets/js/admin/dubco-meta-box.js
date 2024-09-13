window.jQuery(document).ready(function ($) {
	const updateShortLink = async (postId, linkId, key) => {
		return window.wp.apiFetch({
			path: `/dubco/v1/links/${linkId}`,
			method: 'PATCH',
			data: { post_id: postId, key },
		});
	};

	$('.dubinc-add-class-notices').each(function () {
		$(this).addClass('notice notice-warning');
	});

	$('#dubco_create_button').on('click', function (event) {
		event.preventDefault();
		const postId = $('#post_ID').val();
		$.ajax({
			url: window.dubcoMetaBox.ajax_url,
			method: 'POST',
			data: {
				action: 'dubco_create_short_link',
				nonce: window.dubcoMetaBox.nonce,
				post_id: postId,
			},
			success(response) {
				if (response.success) {
					$('#dubco-short-link').show();
					$('#dubco_short_url_id').val(response.data.id);
					$('#dubco_short_url').val(response.data.shortLink);
					$('#dubco_create_button').hide();
					$('#dubco_edit_button').show();
				} else {
					$('#dubco_error').text(response.data).show();
				}
			},
		});
	});

	$('#dubco_edit_button').on('click', function (event) {
		event.preventDefault();
		$('#dubco_short_url').hide();
		$('#dubco_edit_button').hide();
		$('#dubco_update_button').show();
		$('#dubco_key').show();
	});

	$('#dubco_update_button').on('click', async function (event) {
		event.preventDefault();
		const postId = $('#post_ID').val();
		const linkId = $('#dubco_short_url_id').val();
		const key = $('#dubco_key').val();
		$(this).text(wp.i18n.__('Updating...', 'dubinc'));
		try {
			$('#dubco_error').hide();
			const response = await updateShortLink(postId, linkId, key);
			if (response) {
				$('#dubco_short_url').val(response.shortLink).show();
				$('#dubco_key').hide();
				$('#dubco_update_button').hide();
				$('#dubco_edit_button').show();
			}
		} catch (error) {
			console.error(error);
			$('#dubco_error').addClass('error').text(error).show();
		} finally {
			$(this).text(wp.i18n.__('Update', 'dubinc'));
		}
	});
});
