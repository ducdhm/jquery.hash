/**
 * jQuery hashchange
 * The enhanced jQuery plugin for hashchange event. Based on jQuery hashchagne event of Ben Alman.
 * @version: 0.1
 * @require: jquery.hash, jquery.hashchange
 * @author: Duc Doan Hoang Minh
 * @email: ducdhm@gmail.com
 * @skype: ducdhm
 */
(function ($, win) {
	var $win = $(win);

	// Array of hashchange+ events
	var events = [];

	// Options of hashchange+ event
	var options = {};

	// Default config of hashchange+ event
	var DEFAULTS = {
		getAll: true,
		runWhenInit: true
	};

	/**
	 * Config for hashchange+ event
	 * @method configEvent
	 * @param {Object} config The configuration of hashchange+ event
	 */
	$.hash.configEvent = function (config) {
		options = $.extend(config, DEFAULTS);
	};

	/**
	 * The hashchange+ event
	 * @method change
	 * @param {Function} callback The function will be executed when hash's changed
	 */
	$.hash.change = function (callback) {
		if (typeof callback === 'function') {
			events.push(callback);
		}
	};

	$(function () {
		var agurs = [];

		if (options.getAll) {
			agur = [$.hash.getAll(), win.location.hash];
		}

		$win.on('hashchange', function (e) {
			for (var i = 0, event; event = events[i]; i++) {
				event.apply(this, agurs.unshift(e));
			}
		});

		if (options.runWhenInit) {
			$win.trigger('hashchange');
		}
	});

}(jQuery, window));