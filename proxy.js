//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 1.00
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
				/* FUNDAMENTAL TRAPS
				*/

				/** function to get property descriptor
				 * @param name Property name
				 * @return Descriptor or undefined
				 */
				getOwnPropertyDescriptor: function(name) {
						// create a new path
						tracePath =  new __TracePath(path, name);
						// register at loggin engine
						__accessLogger.set(__AccessType.READ, tracePath);

						stat = contract.readable(name);
						if(stat.readable) {
								var desc = Object.getOwnPropertyDescriptor(target, name);
								if (desc !== undefined) desc.value = __createMembrane(desc, tracePath, stat.contracts);
								return desc;
						} else if(__config_ViolationMode == __ViolationMode.OBSERVER) {
								__violationLogger.set(__ViolationType.READ, tracePath);
								var desc = Object.getOwnPropertyDescriptor(target, name);
								if (desc !== undefined) desc.value = __createMembrane(desc, tracePath, stat.contracts);
								return desc;
						} else {
								__violationLogger.set(__ViolationType.READ, tracePath);
								return undefined;
						}
				},
						/** function to get property descriptor
						 * @param name Property name
						 * @return Descriptor or undefined
						 */
						getPropertyDescriptor: function(name) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.READ, tracePath);

								stat = contract.readable(name);
								if(stat.readable) {
										var desc = Object.getOwnPropertyDescriptor(target, name);
										//var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
										if (desc !== undefined) desc.value = __createMembrane(desc, tracePath, stat.contracts);
										return desc;
								} else if(__config_ViolationMode == __ViolationMode.OBSERVER) {
										__violationLogger.set(__ViolationType.READ, tracePath);
										var desc = Object.getOwnPropertyDescriptor(target, name);
										//var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
										if (desc !== undefined) desc.value = __createMembrane(desc, tracePath, stat.contracts);
										return desc;
								} else {
										__violationLogger.set(__ViolationType.READ, tracePath);
										return undefined;
								}
						},
						/** function to get property names
						 * @return Array
						 */
						getOwnPropertyNames: function() {
								return Object.getOwnPropertyNames(target);
						},
						/** function to get property names
						 * @return Array
						 */
						getPropertyNames: function() {
								return Object.getOwnPropertyNames(target);
								//return Object.getPropertyNames(obj); // not in ES5
						},
						/** function to define properties
						 * @param name Property name
						 * @param value Property value
						 */
						defineProperty: function(name, value) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.WRITE, tracePath);

								if(contract.writeable(name)) {
										Object.defineProperty(target, name, value);
								} else if(__config_ViolationMode == __ViolationMode.OBSERVER) {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
										Object.defineProperty(target, name, value);
								} else {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
								}
						},
						/** function to delete properties
						 * @return true if deleted, otherwise false
						 */
						delete: function(name) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.WRITE, tracePath);

								if(contract.writeable(name)) {
										return delete target[name];
								} else if(__config_ViolationMode == __ViolationMode.OBSERVER) {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
										return delete target[name];
								} else {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
										return false;
								}
						},
						/** function to handle read access
						 * @return Wrapped object or undefined
						 */
						fix: function() {
								if (Object.isFrozen(obj)) {
										var result = {};
										Object.getOwnPropertyNames(obj).forEach(function(name) {
												result[name] = Object.getOwnPropertyDescriptor(obj, name);
										});
										return __createMembrane(result, tracePath, contract);
								}
								return undefined;
						},

						/* DERIVED TRAPS
						*/

						/** function to handle read access
						 * @param receiver Receiver of the property access
						 * @param name Name of the property access 
						 * @return Wrapped object or undefined
						 */
						get: function(receiver, name) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.READ, tracePath);

								stat = contract.readable(name);
								if(stat.readable) {
										value =  target[name];
								} else {
										__violationLogger.set(__ViolationType.READ, tracePath);
										value = __config_ViolationMode == __ViolationMode.OBSERVER ? target[name] : undefined;
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
						 * @return value
						 */
						set: function(receiver, name, value) {
								// create a new path
								tracePath =  new __TracePath(path, name);
								// register at loggin engine
								__accessLogger.set(__AccessType.WRITE, tracePath);

								if(contract.writeable(name)) {
										target[name] = value;
								} else if(__config_ViolationMode == __ViolationMode.OBSERVER) {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
										target[name] = value;
								} else {
										__violationLogger.set(__ViolationType.WRITE, tracePath);
								}
								return value;
						},
						/** function to check properties
						 * @param name Property name
						 * @param value true if property exists, false otherwise false
						 */
						has: function(name) {
								return (name in target);
						},
						/** function to check properties
						 * @param name Property name
						 * @param value true if property exists, false otherwise false
						 */
						hasOwn: function(name) {
								return ({}).hasOwnProperty.call(target, name); 
						},
						/** function for enumeration
						 * @return array
						 */
						enumerate: function() {
								var result = [];
								for (var name in target) { result.push(name); };
								return result;
						},
						/** function to get keys
						 * @return array
						 */
						keys: function() {
								return Object.keys(target);
						}
		}
};



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////

/** Standard Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 * @param contract Access Permission Contract
 * @return wrapped object or primitive value
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
						return func.apply(base, args);
				}

				// AccessHandler for <target>
				var accessHandler = __AccessHandler(target, initPath, contract);

				// If function, create function proxy
				if (typeof target === "function") {
						function callTrap() {
								var value = wrapFunction(target, this, arguments);
								return value;
						}
						function constructTrap() {
								function forward(args) {
										return target.apply(this, args);
								}
								return new forward(arguments);
						}
						return Proxy.createFunction(accessHandler, callTrap, constructTrap);
				}

				// If object, create object proxy
				else {
						var prototype = wrap(Object.getPrototypeOf(target));
						return Proxy.create(accessHandler, prototype);	
				}
		}

		// RETURN wrapped object
		return wrap(init);
}

/** Function Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 * @param contract Access Permission Contract
 * @return wrapped function or __createMembrane(init)
 */
function __createFunctionMembrane(init, name, contract) {
		// if no function, set standard membrane
		if (typeof init !== "function") {
				return __createMembrane(init, name, contract);
		}

		/* WRAP function
		 * @param func Function object
		 * @param base Function base
		 * @param args Function arguments
		 */
		function wrapFunction(func, base, args) {
				stat = contract.readable("arguments");
				args = __createMembrane(args, "arguments", stat.contracts);
				return func.apply(base, args);
		}

		/* CALL trap
		 * @return function return
		 */
		function callTrap() {
				return wrapFunction(init, this, arguments);
		}

		/* CALL trap
		 * @return function return
		 */
		function constructTrap() {
				return wrapFunction(init, this, arguments);
		}

		// create trace path
		initPath = new __TracePath(null, name);

		// AccessHandler for <init>
		var accessHandler = __AccessHandler(init, initPath, contract);

		return Proxy.createFunction(accessHandler, callTrap, constructTrap);
}

/** Apply Proxy
 * can be used to wrap an value
 * @param contract Access Permission Contract
 * @param base Current environment <this>
 * @param name Variable name
 */
function __applyProxy(contract, base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, name, contract);
}

/** Wrap
 * can be used to wrap an value
 * @param contract Access Permission Contract
 * @param obj Object
 * @param name Object name
 * @return Wrapped Object
 */
function __wrap(contract, obj, name) {
		objname = name!=null ? name : "";
		return __createMembrane(obj, objname, contract);
}



////////////////////////////////////////////////////
// HANDLER REFERENCE
////////////////////////////////////////////////////

// TODO: take use ?!
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
