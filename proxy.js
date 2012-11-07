//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.00
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// HANDLER
//////////////////////////////////////////////////

/** Standard Access Handler
 * @param path Trace Path
 * @param contract Access Permission Contract
 * @return AccessHandler
 */
function __AccessHandler(path, contract) {
		return {
				/** extend contract
				 * @param extPath Access Permission Contract
				 * @param extContract Access Permission Contract
				 */
				extend: function(extPath, extContract) {
						/* C = C&C' */
						contract = new __AndContract(contract, extContract).reduce();
						/* P = P;P' */
						path = new __TraceSet(path, extPath);
				},



				/* ************************************************** *
				 * HANDLER TRAPS
				 * ************************************************** */ 



				/** Object.getOwnPropertyDescriptor(proxy,name) 
				 * @param target Wrapped target value
				 * @param name Property name
				 * @return Descriptor | undefined
				 */
				getOwnPropertyDescriptor: function(target, name) {
						/* Trace Path *************************************** */
						tracePath =  new __TracePath(path, new __TraceProperty(name));
						__accessLogger.put(__AccessType.READ, tracePath);

						/* Access Permission Contract *********************** */
						if(contract.isReadable(name)) {
								var desc = Object.getOwnPropertyDescriptor(target, name);
								if (desc !== undefined) desc.value = __createMembrane(desc, tracePath, contract.derive(name));
								return desc;
						} else {
								__violationLogger.put(__ViolationType.READ, tracePath);
								var desc = (__config_ViolationMode == __ViolationMode.OBSERVER) ? Object.getOwnPropertyDescriptor(target, name) : undefined;
								if (desc !== undefined) desc.value = __createMembrane(desc.value, tracePath, contract.derive(name));
								return desc;
						}
				},
				/** Object.getOwnPropertyNames(proxy)
				 * @param target Wrapped target value
				 * @return Array
				 */
				getOwnPropertyNames: function(target) {
						return Object.getOwnPropertyNames(target);
				},
				/** Object.getPrototypeOf(proxy)
				 * @param target Wrapped target value
				 * @return Any 
				 */
				getPrototypeOf: function(target) {
						return Object.getPrototypeOf(target)
				},
				/** Object.defineProperty(proxy,name,desc)
				 * @param target Wrapped target value
				 * @param name Property name
				 * @param value Property value
				 * @return Boolean
				 */
				defineProperty: function(target, name, desc) {
						/* Trace Path *************************************** */
						tracePath =  new __TracePath(path, new __TraceProperty(name));
						__accessLogger.put(__AccessType.WRITE, tracePath);

						/* Access Permission Contract *********************** */
						if(contract.isWriteable(name)) {
								return Object.defineProperty(target, name, desc);
						} else {
								__violationLogger.put(__ViolationType.WRITE, tracePath);
								return (__config_ViolationMode == __ViolationMode.OBSERVER) ? Object.defineProperty(target, name, desc) : false;
						}
				},
				/** delete proxy[name]
				 * @param target Wrapped target value
				 * @param name Property name
				 * @return Boolean
				 */
				deleteProperty: function(target, name) {
						/* Trace Path *************************************** */
						tracePath =  new __TracePath(path, new __TraceProperty(name));
						__accessLogger.put(__AccessType.WRITE, tracePath);

						/* Access Permission Contract *********************** */
						if(contract.isWriteable(name)) {
								return delete target[name];
						} else {
								__violationLogger.put(__ViolationType.WRITE, tracePath);
								return (__config_ViolationMode == __ViolationMode.OBSERVER) ? delete target[name] : false;
						}
				},
				/** Object.freeze(proxy)
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				freeze: function(target) {
						// TODO
						return Object.freeze(target);
				},
				/** Object.seal(proxy) 
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				seal: function(target) {
						// TODO
						return Object.seal(target);
				},
				/** Object.preventExtensions(proxy) 
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				preventExtensions: function(target) {
						// TODO
						return Object.preventExtensions(target);
				},
				/** Object.isFrozen(proxy) 
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				isFrozen: function(target) {
						// TODO
						return Object.isFrozen(target);
				},
				/** Object.preventExtensions(proxy) 
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				isSealed: function(target) {
						// TODO
						return Object.isSealed(target);
				},
				/** Object.preventExtensions(proxy) 
				 * @param target Wrapped target value
				 * @return Boolean
				 */
				isExtensible: function(target) {
						// TODO
						return Object.isExtensible(target);
				},

				/** name in proxy
				 * @param target Wrapped target value
				 * @param name Property name
				 * @param Boolean
				 */
				has: function(target, name) {
						return (name in target);
				},
				/** ({}).hasOwnProperty.call(proxy,name)
				 * @param target Wrapped target value
				 * @param name Property name
				 * @param Boolean
				 */
				hasOwn: function(target, name) {
						return ({}).hasOwnProperty.call(target, name); 
				},
				/** proxy[name]
				 * @param target Wrapped target value
				 * @param name Name of the property access
				 * @param receiver Receiver of the property access
				 * @return Proxy | Primitive
				 */
				get: function(target, name, receiver) {
						/* Trace Path *************************************** */
						tracePath =  new __TracePath(path, new __TraceProperty(name));
						__accessLogger.put(__AccessType.READ, tracePath);

						/* Access Permission Contract *********************** */
						if(contract.isReadable(name)) {
								return target[name];
						} else {
								__violationLogger.put(__ViolationType.READ, tracePath);
								return (__config_ViolationMode == __ViolationMode.OBSERVER) ? __createMembrane(target[name], tracePath, contract.derive(name)) : undefined;
						}
				},
				/** proxy[name] = val
				 * @param target Wrapped target value
				 * @param name Name of the property assignment
				 * @param value Value to assign
				 * @param receiver Receiver of the property assignment
				 * @return Boolean
				 */
				set: function(target, name, value, receiver) {
						/* Trace Path *************************************** */
						tracePath =  new __TracePath(path, new __TraceProperty(name));
						__accessLogger.put(__AccessType.WRITE, tracePath);

						/* Access Permission Contract *********************** */
						if(contract.isWriteable(name)) {
								return target[name] = value;
						} else {
								__violationLogger.put(__ViolationType.WRITE, tracePath);
								return (__config_ViolationMode == __ViolationMode.OBSERVER) ? target[name] = value : false;
						}
				},
				/** for (name in proxy)
				 * @param target Wrapped target value
				 * @return Iterator
				 */
				enumerate: function(target) {
						var result = [];
						for (var name in target) {
								result.push(name);
						};
						return result;
				},
				/** Object.keys(proxy)
				 * @param target Wrapped target value
				 * @return Array
				 */
				keys: function(target) {
						return Object.keys(target);
				},
				/** proxy(...args)
				 * @param target Wrapped target value
				 * @param thisArg This 
				 * @param args Arguments
				 * @return Any
				 */
				apply: function(target, thisArg, args {
						// TODO
						return target.apply(thisArg, args);
				},
				/** new proxy(...args)
				 * @param target Wrapped target value
				 * @param args Arguments
				 * @return Any
				 */
				construct: function(target, args) {
						// TODO
						return target.apply(this, args);
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
						initPath = name=="" ? new __TraceEmpty() : new __TraceProperty(name);

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
								var accessHandler = __AccessHandler(target, initPath, contract.reduce());

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
										var proxy = Proxy.createFunction(accessHandler, callTrap, constructTrap);
										__handlerReference.put(proxy, accessHandler);
										return proxy;
								}

								// If object, create object proxy
								else {
										var prototype = wrap(Object.getPrototypeOf(target));
										var proxy = Proxy.create(accessHandler, prototype);
										__handlerReference.put(proxy, accessHandler);
										return proxy;
								}
						}

						// check if init is already a proxy
						// than, extend the contract
						// otherwise, create new a proxy
						if(__handlerReference.containsKey(init)) {
								var accessHandler = __handlerReference.get(init);
								accessHandler.extend(initPath, contract);
								return init;

						} else {
								// RETURN wrapped object
								return wrap(init);
						}
				}



























/** Standard Function Handler
 * @param path Path of the wrapped value
 * @return FunctionHandler
 */
function __FunctionHandler(path, contract) {
		return {
				// TODO Caching ?
				extend: function(extPath, extContract) {
						__sysout("EXTEND with " + path + extContract);
						contract = new __AndContract(contract, extContract).reduce();
						path = new __TraceSet(path, extPath);
				},
				// TODO
				apply: function(target, thisArg, args {
						args = __createMembrane(args, "arguments", contract.derive("arguments"));
						base = __createMembrane(thisArg, "this", contract);
						return target.apply(base, args);
				},
				// TODO
				construct: function(target, args) {
						// TODO: whats to do
						// is apply called ?
						//
				}
				}
				};





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
		initPath = name=="" ? new __TraceEmpty() : new __TraceProperty(name);

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
// CACHE REFERENCE
////////////////////////////////////////////////////

/** Standard Handler Cache
 * reference map proxy -> handler
 */
function __HandlerCache() {	
		var handlerMap = new SimpleWeakMap();

		return {
				/** put map entry
				 * @param proxy Key value
				 * @param handler Value
				 */
				put: function(proxy, handler) {
						handlerMap.set(proxy, handler);
						return true;
				},
						/** get map entry
						 * @param proxy Key value
						 */
						get: function(proxy) {
								return handlerMap.get(proxy);
						},
						/** contains key
						 * @param proxy
						 * @return true if proxy is element of map, false otherwise
						 */
						containsKey: function(proxy) {
								return handlerMap.get(proxy) !== undefined ? true : false;

						}
		};
};

// current proxy,handler map
var __cache = new  __HandlerCache();
