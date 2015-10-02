queue-buffer
============

QueueBuffer.js is a simple JavaScript queuing solution.
Makes it easy to handle multiple calls of asynchronous functions.
It requires the Util.js file.


Usage
-----

Create a queue:
	
	var queueBuffer = new QueueBuffer();

You can also define how the queue should be handled:

	var queueBuffer = new QueueBuffer({
		processQueueOption: 'lastComesFirst'
	});

You have three options:
-	'firstComesFirst'		-> default, the functions in the queue are called in sequence (chronologically)
-	'lastComesFirst'		-> the functions queue is handled non-chronologically, everytime the queue moves on, the latest function added to the queue gets called next 
-	'onlyConsiderLast'		-> once the queue moves on the latest function added to the queue gets called next, and the remaining queued functions are removed from the queue (ignored)

Two example functions which could be queued:

	// first argument needs to be the function which moves onto the next in queue
	var myAsyncFunction = function(callNextInQueue) {
		// do something...
		console.log('myAsyncFunction');
		setTimeout(function() {
			// when finished call the functions first argument (is a function)
			callNextInQueue();
		}, 2000);
	};

	// add your own arguments behind
	var myAsyncFunctionWithOneArgument = function(callNextInQueue, myArgument) {
		// do something...
		console.log('myAsyncFunctionWithOneArgument');
		console.log(myArgument);
		setTimeout(function() {
			callNextInQueue();
		}, 2000);
	};
	var myAsyncFunctionWithTwoArguments = function(callNextInQueue, myArgument, myOtherArgument) {
		// do something...
		console.log('myAsyncFunctionWithTwoArguments');
		console.log(myArgument);
		console.log(myOtherArgument);
		setTimeout(function() {
			callNextInQueue();
		}, 2000);
	};

Queue'em:

	queueBuffer.add(myAsyncFunction);
	queueBuffer.add(myAsyncFunctionWithOneArgument, ['argument']);
	queueBuffer.add(myAsyncFunctionWithTwoArguments, ['argument one', 'argument two']);

When you queue functions which have custom arguments (more than the first mandatory queue argument callNextInQueue (you can call it whatever you want it just needs to be the first)) you pass an array with your custom arguments as the second argument to the add functino of the queue.

If you have problems understanding the difference between the three options, take a look how the console output looks for each queue option after the queue has finished:

'firstComesFirst':

	myAsyncFunction
	myAsyncFunctionWithOneArgument
	argument
	myAsyncFunctionWithTwoArguments
	argument one
	argument two

'lastComesFirst':

	myAsyncFunction
	myAsyncFunctionWithTwoArguments
	argument one
	argument two
	myAsyncFunctionWithOneArgument
	argument

'onlyConsiderLast':

	myAsyncFunction
	myAsyncFunctionWithTwoArguments
	argument one
	argument two

If you have questions, just contact me.
Have fun!