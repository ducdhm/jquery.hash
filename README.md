jQuery Hash
===========
The jQuery plugin for manipulating with hash

Set value of a hash key
-----------------------
Structure:
```
/**
 * @param {String} key The hash key will be set value
 * @param {String|Number} value The value of key
 */
$.hash.set(key, value);
```

Example:
```
$.hash.set('name', 'bobkhin');
```

Set value of hash keys
----------------------
Structure:
```
/**
 * @param {Object} set The set of pair of key and value
 */
$.hash.set({
	key1: value1,
	key2: value2,
	key3: value3,
	...
});
```

Example:
```
$.hash.set({
	name: 'bobkhin',
	skype: 'ducdhm',
	email: 'ducdhm@gmail.com',
	age: 24
});
```

Get value of a hash key
-----------------------
Structure:
```
/**
 * @param {String} key The hash key will be got
 * @returns {String|Number|Undefined} The value of hash key
 */
$.hash.get(key)
```

Example:
```
$.hash.get('name');
```
