//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.22
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
		/*
		   {
		   getOwnPropertyDescriptor: function(name) -> PropertyDescriptor | undefined // Object.getOwnPropertyDescriptor(proxy, name)
		   getPropertyDescriptor:    function(name) -> PropertyDescriptor | undefined // Object.getPropertyDescriptor(proxy, name)   (not in ES5)
		   getOwnPropertyNames:      function() -> [ string ]                         // Object.getOwnPropertyNames(proxy) 
		   getPropertyNames:         function() -> [ string ]                         // Object.getPropertyNames(proxy)              (not in ES5)
		   defineProperty:           function(name, propertyDescriptor) -> any        // Object.defineProperty(proxy,name,pd)
		   delete:                   function(name) -> boolean                        // delete proxy.name
		   fix:                      function() -> { string: PropertyDescriptor }     // Object.{freeze|seal|preventExtensions}(proxy)
		   | undefined
		   }
		   {
		   has:       function(name) -> boolean                  // name in proxy
		   hasOwn:    function(name) -> boolean                  // ({}).hasOwnProperty.call(proxy, name)
		   get:       function(receiver, name) -> any            // receiver.name
		   set:       function(receiver, name, val) -> boolean   // receiver.name = val
		   enumerate: function() -> [string]                     // for (name in proxy) (return array of enumerable own and inherited properties)
		   keys:      function() -> [string]                     // Object.keys(proxy)  (return array of enumerable own properties only)
		   }
		   */
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
						var desc = Object.getOwnPropertyDescriptor(obj, name);
						// TODO why
						// a trapping proxy's properties must always be configurable
						if (desc !== undefined) { desc.configurable = true; }
						return desc;


						var desc = Object.getOwnPropertyDescriptor(target, name);
						//var desc = Object.getPropertyDescriptor(obj, name); // not in ES5
						if (desc !== undefined) desc.value = this.get(null, name);
						return desc;
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
						// TODO, discuss wrap arguments
						//return wrap(func.apply(base, args /*Array.prototype.map.call(args, wrap)*/));
						return func.apply(base, args);
				}

				// AccessHandler for <target>
				var accessHandler = __AccessHandler(target, initPath, contract);

				// If function, create function proxy
				if (typeof target === "function") {
						function callTrap() {
								var value = wrapFunction(target, /*wrap(this)*/ this, arguments);
								return value;
						}
						function constructTrap() {
								function forward(args) {
										return target.apply(this, args);
								}
								//return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
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
 * @return Wrapped Object
 */
function __wrap(contract, obj) {
		__createMembrane(obj, name, contract);
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
