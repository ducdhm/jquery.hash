/**
 * jQuery hash
 * @version: 0.1
 * @author: ducdhm
 * @email: ducdhm@gmail.com
 * @skype: ducdhm
 */
(function ($, loc, undefined) {
	/**
	 * Check key of hash is existed or not
	 * @method isKeyExisted
	 * @param {String} key The hash key will be checked
	 * @param {String} hash The hash will be checked
	 * @returns {Boolean}
	 */
	var isKeyExisted = function (key, hash) {
		return (new RegExp(key + '=(.)*[&]*')).test(hash);
	};

	/**
	 * Get hash from `window.location.href` not from `window.location.hash` because `window.location.hash` always
	 * decodes the encoded values
	 * @method _getHash
	 * @return {String} The hash
	 */
	var _getHash = function () {
		var href = location.href,
			hash = '';

		if (href.indexOf('#') !== -1) {
			hash = href.split('#')[1];
		}

		return hash;
	};

	/**
	 * Set key for value in a hash
	 * @method _setHash
	 * @param {String} key The hash key will be set value
	 * @param {String|Number} value The value of key
	 * @param {String} hash The hash which the key will be set value
	 * @returns {String} The new hash
	 */
	var _setHash = function (key, value, hash) {
		var key_value_string = key + '=' + value.encodeUrl();

		if (isKeyExisted(key, hash)) {
			hash = hash.replace(new RegExp(key + '=[^&]*', 'i'), key_value_string);
		} else {
			hash += (hash.indexOf('=') === -1 ? '' : '&') + key_value_string;
		}

		return hash;
	};

	/**
	 * Remove key in a hash
	 * @method _removeHash
	 * @param {String} key The key will be removed
	 * @param {String} hash The hash will remove key
	 * @return {String} The removed key hash
	 */
	var _removeHash = function (key, hash) {
		hash = hash.replace(new RegExp('[&]*' + key + '=[^&$]*', 'i'), '').replace(/#[^a-z0-9]/ig, '#');

		return hash === '#' ? '#!' : hash;
	};

	$.hash = {
		/**
		 * Get value of a hash key
		 * @method get
		 * @param {String} key The hash key will be got
		 * @returns {String|Null} The value of hash key
		 */
		get: function (key) {
			var hash = _getHash();

			if (isKeyExisted(key, hash)) {
				hash = hash.split('&');
				for (var i = 0, pair; pair = hash[i]; i++) {
					var index = pair.indexOf('='),
						_key = pair.substr(0, index);

					if (_key === key) {
						return pair.substr(index + 1, pair.length).removeBOM().decodeUrl();
					}
				}
			} else {
				return undefined;
			}
		},

		/**
		 * Set value for a hash key
		 * @method set
		 * @param {String|Object} key The hash key will be set value
		 * @param {String|Number} value The value of key
		 */
		set: function (key, value) {
			var hash = _getHash();

			if (typeof key === 'string') {
				hash = _setHash(key, value, hash);
			} else {
				for (var _key in key) {
					hash = _setHash(_key, key[_key], hash);
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
			var hash = _getHash();

			if (typeof key === 'string') {
				hash = _removeHash(key, hash);
			} else {
				for (var i = 0, _key; _key = key[i]; i++) {
					hash = _removeHash(_key, hash);
				}
			}

			location.hash = hash;
		}
	};

}(jQuery, window.location));