(function() {

	'use strict';

	window.Util = (function() {

		/**
		 * Extends the target object with the second passed object onto a new object.
		 */
		var extend = function(targetObj, extendWithObj) {
			var newObj = {};

			// clone target
			for (var key in targetObj) {
				if(targetObj.hasOwnProperty(key)) {
					newObj[key] = targetObj[key];
				}
			}

			// extend new object with second passed object
			for (var key in extendWithObj) {
				if(extendWithObj.hasOwnProperty(key)) {
					newObj[key] = extendWithObj[key];
				}
			}

			return newObj;
		};


		return {
			extend: extend
		};

	}());

}());