//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.2
//////////////////////////////////////////////////

// load trace path
load("path.js");
// load violation
load("violation.js")


//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

/** Standard Access Handler
 * @param target Wrapped target value
 * @param path Path of the wrapped value
 * @return AccessHandler
 */
function __AccessHandler(target, path, contract) {
		return {
				/** function to handle read access
				 * @param receiver Receiver of the property access
				 * @param name Name of the property access 
				 * @return Wrapped opbject
				 */
				get: function(receiver, name) {
						// create a new path
						tracePath =  new __TracePath(path, name);
						// register at loggin engine
						__accessLogger.set(__AccessType.READ, tracePath);

						// TODO: evtl. give function to contract
						stat = contract.readable(name);
						if(stat.readable) {
								value =  target[name];
						} else {
								switch(__config_ViolationMode) {
										case __ViolationMode.OBSERVER:
												// TODO add violation to the oberserver!
												__violationLogger.set(__ViolationType.READ, tracePath);
												value =  target[name];
												break;
										case __ViolationMode.PROTECTOR:
												// TODO add violation to the oberserver!
												__violationLogger.set(__ViolationType.READ, tracePath);
												value = undefined;
										default:
												value = undefined;
								}

						}

						/* TODO
						 * check if it is already wrapped, than extend handler, otherwise create new one
						 */
						return __createMembrane(value, tracePath, stat.contracts);

				},
						/** function to handle write access
						 * @param receiver Receiver of the property assignment
						 * @param name Name of the property assignment
						 * @param value Value to assign
						 */

						set: function(receiver, name, value) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.WRITE, tracePath);

								// TODO: evtl. give function to contract
								if(contract.writeable(name)) {
										target[name] = value;
								} else {
										switch(__config_ViolationMode) {
												case __ViolationMode.OBSERVER:
														// TODO add violation to the oberserver!
														__violationLogger.set(__ViolationType.WRITE, tracePath);
														target[name] = value;
														return true;
														break;
												case __ViolationMode.PROTECTOR:
														__violationLogger.set(__ViolationType.WRITE, tracePath);
														// TODO add violation to the oberserver!
														return false;
												default:
														return false;
										}

								}

								// TODO
								// return true, for success, false in fail case
								// what to to if PROTECTORE mode
								// property assignment
								//target[name] = value;
								//return true;
						}
		}
};



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////

/** Standard Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 */
function __createMembrane(init, name, contract) {
		// create trace path
		initPath = new __TracePath(null, name);

		/** wrap object/ function or return primitive value
		 * @param target Target value to wrap
		 */
		function wrap(target) {

				// IF primitive value, return value
				if (target !== Object(target)) {
						return target;
				}

				/* WRAP function
				 * @param func Function object
				 * @param base Function base
				 * @param args Function arguments
				 */
				function wrapFunction(func, base, args) {
						return wrap(func.apply(base, Array.prototype.map.call(args, wrap)));
				}

				// AccessHandler for <target>
				var accessHandler = __AccessHandler(target, initPath, contract);

				// If function, create function proxy
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

				// If object, create object proxy
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

/** Apply Proxy
 * can be used to wrap an value
 * @param base Current environment <this>
 * @param name Variable name
 * @param contract Access Permission Contract
 */
function __applyProxy(contract, base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, name, contract);
}



////////////////////////////////////////////////////
// HANDLER REFERENCE
////////////////////////////////////////////////////

/** Standard Handler Reference Map
 * reference map proxy -> handler
 */
function __HandlerReference() {
		var handlerMap = new WeakMap();

		return {
				/** set map entry
				 * @param proxy Key value
				 * @param handler Value
				 */
				set: function(proxy, handler) {
						handlerMap.set(proxy, handler);
						return true;
				},
						/** get map entry
						 * @param proxy Key value
						 */
						get: function(proxy) {
								return handlerMap.get(proxy, undefined);
						}
		};
};

// current proxy,handler map
var __handlerReference = new  __HandlerReference();
