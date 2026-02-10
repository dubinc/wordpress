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

	public static function retrieve_link_info( $post_id = 0, $link_id = null, $domain = null, $key = null ) {
		$params = [];

		if ( $link_id ) {
			$params['linkId'] = $link_id;
		}

		if ( empty( $params ) && $domain && $key ) {
			$params['domain'] = $domain;
			$params['key']    = $key;
		}

		if ( empty( $params ) && $post_id ) {
			$stored_link_id = get_post_meta( $post_id, '_dubco_short_url_id', true );
			if ( $stored_link_id ) {
				$params['linkId'] = $stored_link_id;
			} else {
				$short_url = get_post_meta( $post_id, '_dubco_short_url', true );
				if ( $short_url ) {
					$parsed_domain = wp_parse_url( $short_url, PHP_URL_HOST );
					$parsed_key    = ltrim( (string) wp_parse_url( $short_url, PHP_URL_PATH ), '/' );
					if ( $parsed_domain && $parsed_key ) {
						$params['domain'] = $parsed_domain;
						$params['key']    = $parsed_key;
					}
				}
			}
		}

		if ( empty( $params ) ) {
			return [
				'status_code' => 400,
				'error'       => 'Missing link identifier.',
			];
		}

		$api_client = ApiClient::get_instance();
		$response   = $api_client->request( 'GET', '/links/info', $params );

		if ( 200 !== $response['status_code'] ) {
			$message = 'Request failed.';
			if ( is_object( $response['body'] ) && isset( $response['body']->error->message ) ) {
				$message = $response['body']->error->message;
			}
			if ( $post_id ) {
				update_post_meta( $post_id, '_dubco_short_url_error', $message );
			}
			return [
				'status_code' => $response['status_code'],
				'error'       => $message,
			];
		}

		if ( $post_id ) {
			self::update_meta_from_response( $post_id, $response );
			update_post_meta( $post_id, '_dubco_short_url_error', '' );
		}

		return [
			'status_code' => $response['status_code'],
			'body'        => $response['body'],
		];
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
