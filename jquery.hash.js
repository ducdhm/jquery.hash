/**
 * jQuery.hash library v0.1
 * Copyright (c) 2013 Duc Doan Hoang Minh
 *
 * @license https://github.com/bobkhin/jquery.hash/blob/master/LICENSE-MIT
 *
 * Date: Thu, Aug 08th, 2013 (GTM+7)
 */
(function ($, loc, String, undefined) {
	/**
	 * Encode url with spaces will be encoded into `+`
	 * @method encodeUrl
	 * @return {String} The encoded string
	 */
	if (!String.prototype.encodeUrl) {
		String.prototype.encodeUrl = function () {
			return encodeURIComponent(this).replace(/%20/g, '+');
		};
	}

	/**
	 * Decode url with `+` will be encoded into space
	 * @method decodeUrl
	 * @return {String} The decoded string
	 */
	if (!String.prototype.decodeUrl) {
		String.prototype.decodeUrl = function () {
			return decodeURIComponent(this.replace(/\+/g, '%20'));
		};
	}

	/**
	 * Remove BOM character in encoded URL string
	 * @method removeBOM
	 * @return {String} The removed BOM string
	 */
	if (!String.prototype.removeBOM) {
		String.prototype.removeBOM = function () {
			return this.replace(/%EF%BB%BF/gi, '');
		}
	}

	/**
	 * Check key of hash is existed or not
	 * @method isKeyExisted
	 * @param {String} key The hash key will be checked
	 * @param {String} hash The hash will be checked
	 * @returns {Boolean}
	 */
	var isKeyExisted = function (key, hash) {
		return (new RegExp('[#&]+' + key + '=(.)*[&]*')).test(hash);
	};

	/**
	 * Get hash from `window.location.href` not from `window.location.hash` because `window.location.hash` always
	 * decodes the encoded values
	 * @method getHash
	 * @return {String} The hash
	 */
	var getHash = function () {
		var href = location.href,
			hash = '';

		if (href.indexOf('#') !== -1) {
			hash = href.split('#')[1];


			if (hash.indexOf('=') <= 0) {
				hash = '';
			}
		}

		return '#' + hash;
	};

	/**
	 * Set key for value in a hash
	 * @method setHash
	 * @param {String} key The hash key will be set value
	 * @param {String|Number} value The value of key
	 * @param {String} hash The hash which the key will be set value
	 * @returns {String} The new hash
	 */
	var setHash = function (key, value, hash) {
		var key_value_string = key + '=' + value.encodeUrl();

		if (isKeyExisted(key, hash)) {
			hash = hash.replace(new RegExp('([#&]+)' + key + '=[^&]*', 'i'), '$1' + key_value_string);
		} else {
			hash += (hash.indexOf('=') === -1 ? '' : '&') + key_value_string;
		}

		return hash;
	};

	/**
	 * Remove key in a hash
	 * @method removeHash
	 * @param {String} key The key will be removed
	 * @param {String} hash The hash will remove key
	 * @return {String} The removed key hash
	 */
	var removeHash = function (key, hash) {
		hash = hash.replace(new RegExp('[#&]+' + key + '=[^&$]*', 'i'), '').replace(/^&/, '');

		return hash === '' ? '!' : hash;
	};

	/**
	 * Get key and value from pair string
	 * @method getKeyValue
	 * @param {String} pair_string The string which includes key and value. Key and value are separated by `=`.
	 * @return {Array} [key, value]
	 */
	var getKeyValue = function (pair_string) {
		var result = [];

		if (pair_string.indexOf('=') !== -1) {
			var index = pair_string.indexOf('='),
				key = pair_string.substr(0, index),
				value = pair_string.substr(index + 1, pair_string.length).removeBOM().decodeUrl();

			result.push(key);
			result.push(isNaN(+value) ? value : +value);
		}

		return result;
	};

	$.hash = {
		/**
		 * Get value of a hash key
		 * @method get
		 * @param {String} key The hash key will be got
		 * @returns {String|Number|Undefined} The value of hash key
		 */
		get: function (key) {
			var hash = getHash().replace('#', '');

			if (isKeyExisted(key, hash)) {
				hash = hash.split('&');
				for (var i = 0, pair; pair = hash[i]; i++) {
					pair = getKeyValue(pair);

					if (pair[0] === key) {
						return pair[1];
					}
				}
			} else {
				return undefined;
			}
		},

		/**
		 * Get all pair key and value of hash, that are separated by `&`
		 * @method getAll
		 * @return {Object}
		 */
		getAll: function () {
			var hash = getHash().replace('#', ''),
				all = {};

			if (hash.indexOf('&') !== -1) {
				hash = hash.split('&');

				for (var i = 0, pair; pair = hash[i]; i++) {
					pair = getKeyValue(pair);

					if (pair[0]) {
						all[pair[0]] = pair[1];
					}
				}
			} else if (hash.indexOf('=') !== -1) {
				var pair = getKeyValue(hash);

				if (pair[0]) {
					all[pair[0]] = pair[1];
				}
			}

			return all;
		},

		/**
		 * Set value for a hash key
		 * @method set
		 * @param {String|Object} key The hash key will be set value
		 * @param {String|Number} value The value of key
		 */
		set: function (key, value) {
			var hash = getHash();

			if (typeof key === 'string') {
				hash = setHash(key, '' + value, hash);
			} else {
				for (var _key in key) {
					hash = setHash(_key, '' + key[_key], hash);
				}
			}

			location.hash = hash;
		},

		/**
		 * Remove key(s) in a hash
		 * @method removeHash
		 * @param {String|Array} key The key or array of keys will be removed from hash
		 */
		remove: function (key) {
			var hash = getHash();

			if (typeof key === 'string') {
				hash = removeHash(key, hash);
			} else {
				for (var i = 0, _key; _key = key[i]; i++) {
					hash = '#' + removeHash(_key, hash);
				}
			}

			location.hash = hash;
		}
	};

}(jQuery, window.location, String));