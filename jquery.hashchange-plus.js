/**
 * jQuery hashchange plus
 * The enhanced jQuery plugin for hashchange event. Based on jQuery hashchange event of Ben Alman.
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