<?php
/**
 * Module
 *
 * @package DubTechnologiesInc
 */

namespace DubTechnologiesInc;

/**
 * Module is any feature that conditionally activates based on the current context.
 */
abstract class Module {


	/**
	 * Used to alter the order in which clases are initialized.
	 *
	 * Lower number will be initialized first.
	 *
	 * @note This has no correlation to the `init` priority. It's just a way to allow certain classes to be initialized before others.
	 *
	 * @var int The priority of the module.
	 */
	public $load_order = 10;

	/**
	 * Checks whether the Module should run within the current context.
	 *
	 * @return bool
	 */
	public function can_register() {
		return true;
	}

	/**
	 * Connects the Module with WordPress using Hooks and/or Filters.
	 *
	 * @return void
	 */
	abstract public function register();
}
