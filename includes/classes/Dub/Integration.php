<?php

namespace DubTechnologiesInc\Dub;

use DubTechnologiesInc\Admin\Settings;
use DubTechnologiesInc\Api\ApiClient;
use DubTechnologiesInc\Api\TokenManager;
use DubTechnologiesInc\Module;

class Integration extends Module {

	public static function update_meta_from_response( $post_id, $response ) {
		update_post_meta( $post_id, '_dubco_short_url', $response['body']->shortLink );
		update_post_meta( $post_id, '_dubco_short_url_id', $response['body']->id );
		update_post_meta( $post_id, '_dubco_short_url_domain', $response['body']->domain );
	}

	/**
	 * @inheritDoc
	 */
	public function register() {
		add_action(
			'save_post',
			[ $this, 'save_post' ],
			10,
			2
		);
	}

	public function save_post( int $post_id, \WP_Post $post ) {
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( ! in_array( $post->post_type, Settings::get_supported_post_types(), true ) ) {
			return;
		}

		if ( 'publish' !== $post->post_status ) {
			return;
		}

		$short_url = get_post_meta( $post_id, '_dubco_short_url', true );

		if ( ! $short_url ) {
			$this->generate_short_url( $post_id );

		}
	}

	public function generate_short_url( $post_id ) {
		update_post_meta( $post_id, '_dubco_short_url_error', '' );

		$api_client = ApiClient::get_instance();
		$response   = $api_client->request(
			'POST',
			'/links',
			[
				'url' => get_permalink( $post_id ),
			]
		);

		if ( 200 !== $response['status_code'] ) {
			update_post_meta( $post_id, '_dubco_short_url_error', $response['body']->error->message );

			return [
				'error' => $response['body']->error->message,
			];
		}

		self::update_meta_from_response( $post_id, $response );

		return [
			'shortLink' => $response['body']->shortLink,
			'id'        => $response['body']->id,
		];
	}
}
