<?php

namespace Dubco\Api;

use Dubco\Admin\Settings;

class ApiClient {

	private $api_key;
	private $base_url = 'https://api.dub.co';

	public static function get_instance() {
		static $instance = null;

		if ( null === $instance ) {
			$instance = new self();
		}

		return $instance;
	}
	private function __construct() {
		$this->api_key = Settings::get_api_key();
	}

	public function request( $method, $endpoint, $data = [] ) {
		$url     = $this->base_url . $endpoint;
		$headers = [
			'Authorization' => 'Bearer ' . $this->api_key,
			'Content-Type'  => 'application/json',
		];

		return $this->make_request( $method, $url, $headers, $data );
	}

	private function make_request( $method, $url, $headers, $data ) {
		$response = wp_remote_request(
			$url,
			[
				'method'  => $method,
				'headers' => $headers,
				'body'    => wp_json_encode( $data ),
			]
		);

		if ( is_wp_error( $response ) ) {
			return [
				'status_code' => 500,
				'body'        => [
					'error' => $response->get_error_message(),
				],
			];
		}

		return [
			'status_code' => wp_remote_retrieve_response_code( $response ),
			'body'        => wp_json_encode( wp_remote_retrieve_body( $response ) ),
		];
	}
}
