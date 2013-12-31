/**
 * jQuery.hashchange-plus library v0.1
 * The enhanced jQuery plugin for hashchange event. Based on jQuery hashchange event of Ben Alman.
 * Copyright (c) 2013 Duc Doan Hoang Minh
 *
 * @license https://github.com/bobkhin/jquery.hash/blob/master/LICENSE-MIT
 *
 * Date: Thu, Aug 08th, 2013 (GTM+7)
 */
(function ($, win) {
	var $win = $(win);

	// Array of hashchange+ events
	var events = [];

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
		$win.on('hashchange', function (e) {
			var agurs = [e, $.hash.getAll(), win.location.hash];

			for (var i = 0, event; event = events[i]; i++) {
				event.apply(this, agurs);
			}
		}).trigger('hashchange');
	});

}(jQuery, window));