<?php

namespace Dubco\Api;

use Dubco\Admin\Settings;
use Dubco\Module;

class Oauth {

	const ACTION = 'dubco_get_oauth_code';

	const DUBCO_CLIENT_ID = 'dub_app_6fb7a1d6ca1ca7142c4ba5c59ad795fe967bd6e5a0765688';
	const DUBCO_OAUTH_STATE = 'dubco_oauth_state';
	const DUBCO_OAUTH_CODE_VERIFIER = 'dubco_oauth_code_verifier';

	const OAUTH_ENDPOINT = 'https://api.dub.co/oauth/token';

	const SCOPE = [
		'links.read',
		'links.write',
		'domains.read',
		//'conversions.write',
	];

	public function get_code_challenge( $code_verifier ) {
		return str_replace(
			[ '%2B', '%2F' ],
			[
				'-',
				'_',
			],
			urlencode( trim( base64_encode( hash( 'sha256', $code_verifier, true ) ), '=' ) )
		);
	}

	public function generate_code_verifier() {
		return rtrim( strtr( base64_encode( random_bytes( 50 ) ), '+/', '-_' ), '=' );
	}

	public function initiate_oauth() {
		$code_verifier  = $this->generate_code_verifier();
		$code_challenge = $this->get_code_challenge( $code_verifier );

		$state = bin2hex( random_bytes( 16 ) );

		set_transient( self::DUBCO_OAUTH_STATE, $state, 300 );
		set_transient( self::DUBCO_OAUTH_CODE_VERIFIER, $code_verifier, 300 );

		$redirect_uri = site_url( '/dubco/oauth/callback' );

		$auth_url = 'https://app.dub.co/oauth/authorize?response_type=code&client_id=' . self::DUBCO_CLIENT_ID .
		            '&redirect_uri=' . $redirect_uri .
		            '&scope=' . implode( ',', self::SCOPE ) .
		            '&code_challenge=' . $code_challenge . '&code_challenge_method=S256&state=' . $state;

		wp_redirect( $auth_url );
		exit;

	}

	public function can_register() {
		return false;
	}

	public function add_my_query_var( $vars ) {
		$vars[] = 'dubco_action';

		return $vars;
	}

	public function handle_oauth_callback() {
		$code           = filter_input( INPUT_GET, 'code', FILTER_UNSAFE_RAW );
		$state          = filter_input( INPUT_GET, 'state', FILTER_UNSAFE_RAW );
		$saved_state    = get_transient( self::DUBCO_OAUTH_STATE );
		$code_verifier  = get_transient( self::DUBCO_OAUTH_CODE_VERIFIER );
		$code_challenge = $this->get_code_challenge( $code_verifier );

		if ( $state !== $saved_state ) {
			wp_die( 'Invalid state received from the dubco Oauth', 'Invalid state', [ 'response' => 400 ] );
		}

		if ( ! $code ) {
			wp_die( 'No code received from the dubco Oauth', 'No code', [ 'response' => 400 ] );
		}

		$response = wp_remote_post(
			static::OAUTH_ENDPOINT,
			[
				'body' => [
					'grant_type'     => 'authorization_code',
					'client_id'      => self::DUBCO_CLIENT_ID,
					'code'           => $code,
					'redirect_uri'   => site_url( '/dubco/oauth/callback' ),
					'code_verifier'  => $code_verifier,
					'code_challenge' => $code_challenge,
				],
			]
		);


		if ( is_wp_error( $response ) ) {
			$error_message = $response->get_error_message();
			wp_die( 'Message: ' . $error_message, 'Error when getting code', [ 'response' => 400 ] );
		} else {
			$http_code = wp_remote_retrieve_response_code( $response );
			$body      = wp_remote_retrieve_body( $response );
			if ( $http_code == 200 ) {
				// save the token to the options table
				$body = json_decode( $body );
				update_option( 'dubco_access_token', $body->access_token );
				update_option( 'dubco_refresh_token', $body->refresh_token );
				$api_clinet = new ApiClient( new TokenManager() );
				$response = $api_clinet->request( 'GET', '/oauth/userinfo' );
				if ( $response['status_code'] === 200 ) {
					$user_info = $response['body'];
					update_option( 'dubco_user_info', $user_info );
				}
				wp_safe_redirect( admin_url( 'options-general.php?page=dubco-settings' ) );
				exit();
			} else {
				// The server responded with a different HTTP status code
				// You can handle this situation here
			}
		}
		die();
	}

	public function register() {
		add_filter( 'query_vars', [ $this, 'add_my_query_var' ] );
		add_rewrite_rule( '^dubco/oauth/callback/?$', 'index.php?dubco_action=' . static::ACTION, 'top' );

		add_action( 'template_redirect', [ $this, 'template_redirect' ] );
		$this->maybe_start_oauth();
	}

	public function template_redirect() {
		$action = get_query_var( 'dubco_action' );

		if ( static::ACTION === $action ) {
			$this->handle_oauth_callback();
		}

	}

	/**
	 * @return void
	 */
	public function maybe_start_oauth(): void {
		$action = filter_input( INPUT_GET, 'action', FILTER_UNSAFE_RAW );

		if ( Settings::ACTION === $action ) {
			wp_verify_nonce(
				filter_input( INPUT_POST, Settings::NONONCE, FILTER_UNSAFE_RAW ),
				Settings::ACTION
			);
			$this->initiate_oauth();
		}

		if ( 'dubco_save_options' === $action && isset( $_POST['disconnect'] ) ) {
			delete_option( 'dubco_access_token' );
			delete_option( 'dubco_refresh_token' );
			wp_safe_redirect( admin_url( '/options-general.php?page=dubco-settings' ) );
			die();
		}
	}
}
