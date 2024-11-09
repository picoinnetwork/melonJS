import { checkVersion } from "./../utils/utils.ts";
import { version } from "./../version.ts";
import { game } from "../index.js";

/**
 * @import Application from "./../application/application.js";
 */

/**
 * Contains all registered plugins.
 * @name cache
 * @memberof plugin
 * @type {Object.<plugin.BasePlugin>}
 */
export const cache = {};

/**
 * @namespace plugin
 */

/**
 * a base Object class for plugin
 * (plugin must be installed using the register function)
 * @memberof plugin
 */
export class BasePlugin {
	/**
	 * @param {Application} [app] - a reference to the app/game that registered this plugin
	 */
	constructor(app = game) {
		/**
		 * define the minimum required version of melonJS<br>
		 * this can be overridden by the plugin
		 */
		this.version = version;

		/**
		 * a reference to the app/game that registered this plugin
		 * @type {Application}
		 */
		this.app = app;
	}
}

/**
 * patch a melonJS function
 * @name patch
 * @memberof plugin
 * @param {object} proto - target object
 * @param {string} name - target function
 * @param {Function} fn - replacement function
 * @example
 * // redefine the me.game.update function with a new one
 * me.plugin.patch(me.game, "update", function () {
 *   // display something in the console
 *   console.log("duh");
 *   // call the original me.game.update function
 *   this._patched();
 * });
 */
export function patch(proto, name, fn) {
	// use the object prototype if possible
	if (typeof proto.prototype !== "undefined") {
		proto = proto.prototype;
	}
	// reuse the logic behind object extends
	if (typeof proto[name] === "function") {
		// save the original function
		const _parent = proto[name];
		// override the function with the new one
		Object.defineProperty(proto, name, {
			configurable: true,
			value: (function (name, fn) {
				return function () {
					this._patched = _parent;
					const ret = fn.apply(this, arguments);
					this._patched = null;
					return ret;
				};
			})(name, fn),
		});
	} else {
		throw new Error(name + " is not an existing function");
	}
}

/**
 * Register a plugin.
 * @name register
 * @memberof plugin
 * @param {plugin.BasePlugin} plugin - Plugin object to instantiate and register
 * @param {string} [name=plugin.constructor.name] - a unique name for this plugin
 * @param {...*} [args] - all extra parameters will be passed to the plugin constructor
 * @example
 * // register a new plugin
 * me.plugin.register(TestPlugin, "testPlugin");
 * // the `testPlugin` class instance can also be accessed through me.plugin.cache
 * me.plugin.cache.testPlugin.myfunction ();
 */
export function register(plugin, name = plugin.toString().match(/ (\w+)/)[1]) {
	// ensure me.plugins[name] is not already "used"
	if (cache[name]) {
		throw new Error("plugin " + name + " already registered");
	}

	// get extra arguments
	let _args = [];
	if (arguments.length > 2) {
		// store extra arguments if any
		_args = Array.prototype.slice.call(arguments, 1);
	}

	// try to instantiate the plugin
	_args[0] = plugin;
	const instance = new (plugin.bind.apply(plugin, _args))();

	// inheritance check
	if (typeof instance === "undefined" || !(instance instanceof BasePlugin)) {
		throw new Error("Plugin should extend the BasePlugin Class !");
	}

	// compatibility testing
	if (checkVersion(instance.version, version) > 0) {
		throw new Error(
			"Plugin version mismatch, expected: " +
				instance.version +
				", got: " +
				version,
		);
	}

	// create a reference to the new plugin
	cache[name] = instance;
}

/**
 * returns the the plugin instance with the specified class type or registered name
 * @name get
 * @memberof plugin
 * @param {object|string} classType - the Class Object or registered name of the plugin to retreive
 * @returns {plugin.BasePlugin} a plugin instance or undefined
 */
export function get(classType) {
	for (const name in cache) {
		if (
			(typeof classType === "string" && classType === name) ||
			cache[name] instanceof classType
		) {
			return cache[name];
		}
	}
}
