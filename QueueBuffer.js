/**
 * QueueBuffer
 *
 * by Frank Frick
 *
 * A simple queuing solution
 * Credits: http://ricostacruz.com/backbone-patterns/#animation_buffer
 */


 (function() {

 	'use strict';


	window.QueueBuffer = function(options) {

		var defaultOptions 		= {
			processQueueOption: 'firstComesFirst' // 'firstComesFirst' / 'lastComesFirst' / 'onlyConsiderLast'
		};
		options					= Util.extend(defaultOptions, options);
		var queue				= [];
		var lastCommandFinished = true; // last remaining command in queue is meant


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
			if (lastCommandFinished) {
				next();
			}
		};

		/**
		 * Empties the queue. I.e.: Dismisses all queued commands.
		 */
		var clear = function() {
			queue = [];
		};

		/**
		 * Moves onto the next command in the buffer.
		 */
		var next = function() {
			var queueLength;
			var queuedItem;
			var nextItemIndex;

			if (queue.length === 0) {
				lastCommandFinished = true;
			}
			else {
				if (options.processQueueOption === 'firstComesFirst') {
					nextItemIndex = 0;
					queuedItem = queue[nextItemIndex];
					execute(queuedItem);
				}
				else if (options.processQueueOption === 'lastComesFirst') {
					nextItemIndex = queue.length - 1;
					queuedItem = queue[nextItemIndex];
					execute(queuedItem);
				}
				else if (options.processQueueOption === 'onlyConsiderLast') {
					queueLength = queue.length;
					if (queueLength > 1) {
						queue.splice(0, queueLength - 1);
					}
					nextItemIndex = 0;
					queuedItem = queue[nextItemIndex];
					execute(queuedItem);
				}
			}
		};

		/**
		 * Removes the next queued command from the queue, executes it and passes
		 * the 'next' function as the first argument followed by the actual arguments.
		 */
		var execute = function(queuedItem) {
			lastCommandFinished = false;
			var queuedItemIndex = queue.indexOf(queuedItem);
			queue.splice(queuedItemIndex, 1); // remove the item from the queue
			queuedItem.fn.apply(undefined, [next].concat(queuedItem.args)); // execute the item's function
		};


		// public
		return {
			add: add,
			clear: clear
		};

	};


	// test
	/*var queueBuffer = new QueueBuffer({
		processQueueOption: 'firstComesFirst'
	});
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
