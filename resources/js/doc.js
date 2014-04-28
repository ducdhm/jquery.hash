(function ($) {
	$(function () {
		// Set a hash key
		var btnSetHash = $('#btnSetHash'),
			txtSetHashKey = $('#txtSetHashKey'),
			txtSetHashValue = $('#txtSetHashValue');

		btnSetHash.on('click', function () {
			var key = txtSetHashKey.val().trim(),
				value = txtSetHashValue.val().trim();

			if (key) {
				$.hash.set(key, value);
			}
		});

		// Set hash keys
		var btnAddSetHash = $('#addSetHash'),
			setHashes = $('.set-hashes'),
			btnSetHashes = $('#btnSetHashes');

		btnAddSetHash.on('click', function () {
			setHashes.find('div.hash:last').after(
				'<div class="hash">' +
					'<div class="form-group">' +
						'<div class="col-md-3">' +
							'<input type="text" class="form-control" value="" placeholder="Hash key" /> ' +
						'</div>' +
						'<div class="col-md-3">' +
							'<input type="text" class="form-control" value="" placeholder="Hash value" /> ' +
						'</div>' +
						'<div class="col-md-3">' +
							'<button type="button" class="btn btn-danger btn-remove-key" title="Remove this key"><i class="glyphicon glyphicon-remove"></i></button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		});

		setHashes.on('click', '.btn-remove-key', function () {
			$(this).closest('.hash').remove();
		});

		btnSetHashes.on('click', function () {
			var all = {},
				count = 0;

			setHashes.find('div.hash').each(function () {
				var hashWrapper = $(this),
					input = hashWrapper.find('input'),
					key = input.eq(0).val().trim(),
					value = input.eq(1).val().trim();

				if (key) {
					all[key] = value;
					count++;
				}
			});

			if (count > 0) {
				$.hash.set(all);
			}
		});

		// Get value of a hash key
		var btnGetHash = $('#btnGetHash'),
			txtGetHashKey = $('#txtGetHashKey'),
			txtGetHashValue = $('#txtGetHashValue');

		btnGetHash.on('click', function () {
			var key = txtGetHashKey.val().trim();

			if (key) {
				txtGetHashValue.val($.hash.get(key));
			}
		});

		// Get value of all hash key
		var btnGetAll = $('#btnGetAll'),
			allHash = $('#all-hash');

		btnGetAll.on('click', function () {
			var all = $.hash.getAll(),
				all_string = '',
				count = 0;

			for (var key in all) {
				var value = all[key];

				all_string += (count !== 0 ? ',\n' : '') + '\t' + key + ': ';
				all_string += (isNaN(+value) ? '\'' + value + '\'' : value);
				count++;
			}

			allHash.html('{\n' + all_string + '\n}').removeClass('prettyprinted');
			prettyPrint();
		});

		// Remove hash key(s)
		var btnRemoveHash = $('#btnRemoveHash'),
			removeHash = $('.remove-hash'),
			addRemoveHash = $('#addRemoveHash');

		addRemoveHash.on('click', function () {
			removeHash.find('div.hash:last').after(
				'<div class="hash">' +
					'<div class="form-group">' +
						'<div class="col-md-3">' +
							'<input type="text" class="form-control" value="" placeholder="Hash key" /> ' +
						'</div>' +
						'<div class="col-md-3">' +
							'<button type="button" class="btn btn-danger btn-remove-key" title="Remove this key"><i class="glyphicon glyphicon-remove"></i></button>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
		});

		removeHash.on('click', '.btn-remove-key', function () {
			$(this).closest('.hash').remove();
		});

		btnRemoveHash.on('click', function () {
			var keys = [];

			removeHash.find('div.hash').each(function () {
				var hashWrapper = $(this),
					input = hashWrapper.find('input'),
					key = input.eq(0).val().trim();

				if (key) {
					keys.push(key);
				}
			});

			if (keys[0]) {
				$.hash.remove(keys);
			}
		});

		// Prettify code
		prettyPrint();
	});

}(jQuery));