(function() {

	'use strict';

	/**
	 * Simple queuing solution
	 * Credits: http://ricostacruz.com/backbone-patterns/#animation_buffer
	 */
	window.QueueBuffer = function(options) {

		var queue			= [];
		var currentItemIndex;
		var defaultOptions 	= {
			processQueueOption: 'firstComesFirst' // 'firstComesFirst' / 'lastComesFirst' / 'onlyConsiderLast'
		};
		options				= Util.extend(defaultOptions, options);


		/**
		 * Adds a function and its arguments to the buffer, and executes it if it's
		 * the only command to be ran.
		 */
		var add = function(fn, args) {
			if (args === undefined) {
				args = [];
			}

			queue.push({
				fn: fn,
				args: args
			});
			if (queue.length === 1) {
				currentItemIndex = 0;
				fn.apply(undefined, [next].concat(args)); // call function and pass the next function as the first argument followed by the actual arguments
			}
		};

		/**
		 * Moves onto the next command in the buffer.
		 */
		var next = function() {
			var queueLength;
			var queuedItem;

			if (options.processQueueOption === 'firstComesFirst') {
				queue.shift();
				if (queue.length) {
					queuedItem = queue[0];
					currentItemIndex = 0;
					queuedItem.fn.apply(undefined, [next].concat(queuedItem.args));
				}
			}
			else if (options.processQueueOption === 'lastComesFirst') {
				// queue.pop();
				queue.splice(currentItemIndex, 1);
				queueLength = queue.length;
				if (queueLength) {
					queuedItem = queue[queueLength - 1];
					currentItemIndex = queueLength - 1;
					queuedItem.fn.apply(undefined, [next].concat(queuedItem.args));
				}
			}
			else if (options.processQueueOption === 'onlyConsiderLast') {
				queue.splice(currentItemIndex, 1);
				queueLength = queue.length;
				if (queueLength) {
					if (queueLength > 1) {
						queue.splice(0, queueLength - 1);
					}
					queuedItem = queue[0];
					currentItemIndex = 0;
					queuedItem.fn.apply(undefined, [next].concat(queuedItem.args));
				}
			}
		};


		// public
		return {
			add: add
		};

	};

	// test
	/*var queueBuffer = new QueueBuffer();
	var exampleArgument = 'This is an example argument for a function which is queued.';
	for (var i = 0; i < 5; i++) {
		(function(i) {
			queueBuffer.add(function(callNextInQueue, exampleArgument) {
				// console.log(this);
				// console.log(exampleArgument);
				console.log('start of function nr. ' + i);
				setTimeout(function() {
					console.log('end of function nr. ' + i + '\n\n');
					callNextInQueue();
				}, 2000);
			}, [exampleArgument]);
		}(i));
	}*/

}());