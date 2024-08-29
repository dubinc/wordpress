<?php

namespace Dubco\Rest;

use Dubco\Module;
use WP_REST_Server;

class User extends Module {

	public function register() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'dubco/v1', '/user-info', [
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get_dubco_user_info' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			] );
		} );

	}

	public function get_dubco_user_info() {
		$user_info = get_option( 'dubco_user_info' );
		if ( ! $user_info ) {
			return new \WP_Error( 'no_user_info', 'No user info found', [ 'status' => 404 ] );
		}

		return rest_ensure_response( $user_info );
	}
}
