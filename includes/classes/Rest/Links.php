<?php

namespace DubTechnologiesInc\Rest;

use DubTechnologiesInc\Api\ApiClient;
use DubTechnologiesInc\Dub\Integration;
use DubTechnologiesInc\Module;
use WP_REST_Server;

class Links extends Module {


	public function register() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	public function register_routes() {
		register_rest_route(
			'dubco/v1',
			'/links',
			[
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'create_link' ],
				'permission_callback' => [ $this, 'permissions_check' ],
			]
		);

		register_rest_route(
			'dubco/v1',
			'/links/(?P<id>[a-zA-Z0-9_]+)',
			[
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => [ $this, 'update_link' ],
				'permission_callback' => [ $this, 'permissions_check' ],
			]
		);
	}

	public function create_link( $request ) {
		// Handle POST request to create a new link
		$params = $request->get_params();

		$post_id = $params['post_id'];

		$api_client = ApiClient::get_instance();
		$response   = $api_client->request(
			'POST',
			'/links',
			[
				'url' => get_permalink( $post_id ),
			]
		);

		if ( 200 !== $response['status_code'] ) {
			return new \WP_REST_Response( $response['body']->error->message, 500 );
		}

		Integration::update_meta_from_response( $post_id, $response );

		return new \WP_REST_Response( $response['body'], $response['status_code'] );
	}

	public function update_link( $request ) {
		$id     = $request->get_param( 'id' );
		$params = $request->get_params();

		$post_id = $params['post_id'];

		$api_client = ApiClient::get_instance();
		$response   = $api_client->request(
			'PATCH',
			'/links/' . $id,
			[
				'key' => $params['key'],
			]
		);

		if ( 200 !== $response['status_code'] ) {
			return new \WP_REST_Response( $response['body']->error->message, 500 );
		}

		Integration::update_meta_from_response( $post_id, $response );

		return new \WP_REST_Response( $response['body'], $response['status_code'] );
	}

	public function permissions_check( $request ) {
		return current_user_can( 'edit_posts' );
	}
}
