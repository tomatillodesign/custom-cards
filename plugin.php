<?php
/**
* Plugin Name: Custom Cards
* Plugin URI: https://github.com/tomatillodesign/custom-cards/
* Description: Adds a single customizable Card block to the editor (displayed in grids) – includes Bootstrap modals, icon grid, button grid, and more
* Author: Chris Liu-Beers, Tomatillo Design
* Author URI: https://www.tomatillodesign.com/
* Version: 1.0
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';



/* Enqueue Bootstrap Modal JS and CSS */
add_action( 'wp_enqueue_scripts', 'clb_enqueue_custom_scripts' );
function clb_enqueue_custom_scripts() {

          wp_enqueue_script( 'clb-modal-js', plugin_dir_url( __FILE__ ) . '/js/clb-bootstrap-modal-only.js', array('jquery'), '1.0.0', true );
		wp_enqueue_script( 'clb-move-modals-js', plugin_dir_url( __FILE__ ) . '/js/clb-move-modals.js', array('jquery'), '1.0.0', true );
		wp_enqueue_style( 'clb-modal-css', plugin_dir_url( __FILE__ ) . '/css/clb-bootstrap-modal-only.css' );


}




//
//
// require 'plugin-update-checker/plugin-update-checker.php';
// $myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
// 	'https://github.com/tomatillodesign/custom-gutenberg-blocks',
// 	__FILE__, //Full path to the main plugin file or functions.php.
// 	'custom-gutenberg-blocks'
// );
//
// //Optional: Set the branch that contains the stable release.
// //$myUpdateChecker->setBranch('prod');
