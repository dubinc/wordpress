<?php

namespace DubTechnologiesInc\Editor;

use DubTechnologiesInc\Module;
use DubTechnologiesInc\ModuleInitialization;

class Classic extends Module {

	public function register() {
		add_action( 'add_meta_boxes', [ $this, 'dubco_add_meta_box' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'dubco_enqueue_scripts' ] );
		add_action( 'wp_ajax_dubco_create_short_link', [ $this, 'dubco_create_short_link' ] );
	}

	public function dubco_enqueue_scripts() {
		wp_enqueue_script(
			'dubco-meta-box',
			DUBCO_PLUGIN_URL . 'assets/js/admin/dubco-meta-box.js',
			[ 'jquery' ],
			DUBCO_PLUGIN_VERSION,
			true
		);
		wp_localize_script(
			'dubco-meta-box',
			'dubcoMetaBox',
			[
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'dubco_meta_box_nonce' ),
			]
		);
	}

	public function dubco_add_meta_box() {
		add_meta_box(
			'dubco_meta_box',
			__( 'DubTechnologiesInc Short Link', 'dubinc' ),
			[ $this, 'dubco_meta_box_callback' ],
			null,
			'side',
			'default',
			[
				'__back_compat_meta_box' => true,
			]
		);
	}

	public function echo_analitycs_link( $short_url ): void {
		if ( ! $short_url ) {
			return;
		}
		$domain   = wp_parse_url( $short_url, PHP_URL_HOST );
		$pathname = ltrim( wp_parse_url( $short_url, PHP_URL_PATH ), '/' );

		if ( ! $domain || ! $pathname ) {
			return;
		}

		$href = "https://app.dub.co/analytics?domain={$domain}&key={$pathname}&tab=clicks";
		?>
		<div class="dubco-analytics-link" style="height: 20px">
			<p>
				<a
					href="<?php echo esc_url( $href ); ?>"
					target="_blank"
					rel="noopener noreferrer"
					style="height: 20px"
				>
					<?php esc_html_e( 'Analytics for link', 'dubinc' ); ?>
				</a>
			</p>
		</div>
		<?php
	}

	public function dubco_meta_box_callback( $post ) {
		wp_nonce_field( 'dubco_save_meta_box_data', 'dubco_meta_box_nonce' );
		$short_url    = get_post_meta( $post->ID, '_dubco_short_url', true );
		$short_url_id = get_post_meta( $post->ID, '_dubco_short_url_id', true );
		$pathname     = '';
		if ( $short_url ) {
			$pathname = ltrim( wp_parse_url( $short_url, PHP_URL_PATH ), '/' );
		}

		if ( 'publish' !== $post->post_status ) {
			echo '<div class="dubinc-add-class-notices"><p>' .
					esc_html__( 'You can only create short links for published posts. A short link will be created automatically, if it doesn\'t exists when this post is published', 'dubinc' ) .
					'</p></div>';
			return;
		}
		?>


		<div id="dubco-meta-box">
			<input type="hidden" name="dubco_short_url_id" id="dubco_short_url_id"
				value="<?php echo esc_attr( $short_url_id ); ?>"/>
			<div id="dubco-short-link" class="<?php if ( ! $short_url ) { echo 'hidden';} ?>">
				<p>
					<label for="dubco_short_url"><?php esc_html_e( 'Short URL:', 'dubinc' ); ?></label>
					<input type="text" id="dubco_short_url" name="dubco_short_url"
						value="<?php echo esc_attr( $short_url ); ?>" readonly/>
					<input type="text" id="dubco_key" class="hidden"
						value="<?php echo esc_attr( $pathname ); ?>" >
				</p>
				<button id="dubco_edit_button" class="button"><?php esc_html_e( 'Edit', 'dubinc' ); ?></button>
				<button id="dubco_update_button" class="button hidden"><?php esc_html_e( 'Update', 'dubinc' ); ?></button>
			</div>
			<button id="dubco_create_button" class="button <?php if ( $short_url ) { echo 'hidden';} ?>">
				<?php esc_html_e( 'Create Short Link', 'dubinc' ); ?>
			</button>
			<?php $this->echo_analitycs_link( $short_url ); ?>
			<div id="dubco_error" class="hidden"></div>
		</div>
		<?php
	}

	public function dubco_create_short_link() {
		check_ajax_referer( 'dubco_meta_box_nonce', 'nonce' );
		$post_id     = (int) filter_input( INPUT_POST, 'post_id', FILTER_SANITIZE_NUMBER_INT );
		$integration = ModuleInitialization::instance()->get_class( 'DubTechnologiesInc\DubTechnologiesInc\Integration' );
		$response    = $integration->generate_short_url( $post_id );

		if ( $response['error'] ) {
			wp_send_json_error( $response['error'] );
		} else {
			wp_send_json_success( $response );
		}
	}
}
