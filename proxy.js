//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
//////////////////////////////////////////////////

// Load logging engine
load("log4js.js");
var logger = new Log(Log.DEBUG, Log.consoleLogger);


//////////////////////////////////////////////////
// MISCELLANEOUS
//////////////////////////////////////////////////

/* 
 * API Standard Output
 */
function __sysout(value) {
		if(typeof print != "undefined")
				// JS Shell concole oputput
				print(value);
		else if(typeof alert  != "undefined")
				// Standard alert notification
				alert(value);
}



/*
 * Wraps obj with a Proxy
 */
//function makeProxy(obj) {
//		if(obj instanceof Function) {
//				return Proxy.createFunction(AccessHandler(obj), Object.getPrototypeOf(obj));
//		} else if(obj instanceof Object) {
//				return Proxy.create(AccessHandler(obj), Object.getPrototypeOf(obj));
//		}
//}

/*
 * Apply Proxy to base[name]
 */
//function applyProxy(base, name) {
//		obj = base[name];
//		base[name] = makeProxy(obj);
//}


function isPrimitive(arg) {
		/**/ logger.debug("call isPrimitive");
		var type = typeof arg;
		return arg == null || (type != "object" && type != "function");
}

//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////


function makeMembrane(init) {

		function wrapFunction(func) {
				/**/ logger.debug("call wrapFunction on " + func);
				return function() {
						return wrap(func.apply(wrap(this), toArray(arguments).map(wrap)));	
				}
		}


		function wrap(target) {
				/**/ logger.debug("call wrap on " + target);

				// Primitives
				if(isPrimitive(target)) { return target; }

				// AccessHandler
				var accessHandler = AccessHandler(target);
				var baseHandler = Proxy.create( {
						get: function(receiver, name) {
								wrapFunction(accessHandler[name]);
						}

				});

				if(typeof target === "function") {
						var wrapped = wrapFunction(target);
						return Proxy.createFunction(basehandler, wrapped);
				} else {
						return Proxy.create(baseHandler, wrap(Object.getPrototypeOf(target)));
				}
		}

//		return Object.freeze({
//				wrapper: wrap(init)
//		});

return wrap(init);


}

function AccessHandler(target) {
		return {
				get: function(receiver, name) {
						/**/ logger.debug("call GET on Accesshandler");
						__sysout("[PROPERTY READ] " + name);
						value =  target[name];
						return value; 
				},
				set: function(receiver, name, val) {
						/**/ logger.debug("call SET on Accesshandler");
						__sysout("[PROPERTY WRITE] " + name);
						target[name] = val;
						return true;
				}
		}};

// ...
//////////////////////////////////////////////////
// PROXY
//////////////////////////////////////////////////

var test = {
		x: 4711,
		y: {a:47, b:11},
		z: 4712
};

//test = applyProxy(test);

//test = Proxy.create(AccessHandler(test));
//test2 = Proxy.create(handlerMaker(test));


var test1 = {
		x: 6543,
		y: {a:34, b:35},
		z: 435345
};

//test1 = applyProxy(test1);


//applyProxy(this, "test");
//applyProxy(this, "test1");


test = makeMembrane(test);


logger.warn("test :)");

//var px = Proxy.create({
//		get: function(proxy, name) {
//				return 'Hello, '+ name;
//		}
//});

