//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Version: 0.20
//////////////////////////////////////////////////

// load trace path
load("path.js");



//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

/* Standard Access Handler
*/
function __AccessHandler(target, path) {
		return {
				get: function(receiver, name) {
						// new path
						tracePath = path.clone();
						tracePath.addProperty(name);

						// register at loggin engine
						__accessLogger.set(__Type.READ, tracePath);

						// value
						value =  target[name];
						return __createMembrane(value, tracePath);

						// TODO
						// * check if is wrapped/ hthen extens handler
						//
				},
						set: function(receiver, name, value) {
								// new path
								tracePath = path.clone();
								tracePath.addProperty(name);

								// register at loggin engine & return
								__accessLogger.set(__Type.WRITE, tracePath);

								// TODO		
								// * wrap object to wwrite ?
								//

								target[name] = value;
								return true;
						}
		}
};



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __createMembrane(init, name) {

		//var path 
		initPath = new __TracePath(name);

		/* wrap Object / Function or return Primitive Value
		*/
		function wrap(target) {

				/* IF primitive value
				*/
				if (target !== Object(target)) {
						return target;
				}

				/* WRAP function
				*/
				function wrapFunction(func, base, args) {
						return wrap(func.apply(base, Array.prototype.map.call(args, wrap)));
				}

				// create AccessHandler
				var accessHandler = __AccessHandler(target, initPath);

				// FUNCTION
				if (typeof target === "function") {
						function callTrap() {
								var value = wrapFunction(target, wrap(this), arguments);
								return value;
						}
						function constructTrap() {
								function forward(args) {
										return target.apply(this, args);
								}
								return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
						}
						return Proxy.createFunction(accessHandler, callTrap, constructTrap);
				}
				// OBJECT
				else {
						var prototype = wrap(Object.getPrototypeOf(target));
						return Proxy.create(accessHandler, prototype);

						// TODO
						// * add access handler as property to the proxy
						// * security reasons ???
						// var proxy = Proxy.create(accessHandler, prototype);
						// proxy["accesshandler"] = accessHandler;
						// return proxy;

				}
		}

		// RETURN wrapped object
		return wrap(init);
}



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////
function __applyProxy(base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, name);
}
