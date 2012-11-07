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
				apply: function(target, thisArg, args) {
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
		};
}



/** Function Handler
 * @param contract Access Permission Contract
 * @return FunctionHandler
 */
function __FunctionHandler(contract) {
		return {
				/** extend contract
				 * @param extPath Access Permission Contract
				 * @param extContract Access Permission Contract
				 */
				extend: function(extContract) {
						/* C = C&C' */
						contract = new __AndContract(contract, extContract).reduce();
				},



				/* ************************************************** *
				 * HANDLER TRAPS
				 * ************************************************** */ 



				/** proxy(...args)
				 * @param target Wrapped target value
				 * @param thisArg This 
				 * @param args Arguments
				 * @return Any
				 */
				apply: function(target, thisArg, args) {
						// TODO
						args = __createMembrane(args, "arguments", contract.derive("arguments"));
						thisArg = __createMembrane(thisArg, "this", contract);
						return target.apply(thisArg, args);
				},
				/** new proxy(...args)
				 * @param target Wrapped target value
				 * @param args Arguments
				 * @return Any
				 */
				construct: function(target, args) {
						return apply(target, this, args);
				}
		};
}





//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////

/** Standard Membrane
 * @param init Value to wrap
 * @param contract Access Permission Contract
 * @param name Variable name
 * @return wrapped object or primitive value
 */
function __createMembrane(init, contract, name) {
		/* Trace Path *************************************** */
		initPath = name=="" ? new __TraceEmpty() : new __TraceProperty(name);

		/** Wrap Object
		 * @param target Target value to wrap
		 * @return  Proxy | Primitive
		 */
		function wrap(target) {
				// IF target is primitive value, return target
				if (target !== Object(target)) {
						return target;
				}

				/* Access Handler *********************************** */
				var accessHandler = __AccessHandler(target, initPath, contract.reduce());

				/* Proxy ******************************************** */
				var proxy = Proxy(target, accessHandler);
				__cache.put(proxy, accessHandler);
				return proxy;
		}

		/** Wrap Object
		 * @param target Target value to wrap
		 * @return  Proxy
		 */
		function extend(target) {
				_cache.get(target).extend(initPath, contract);
				return target;
		}

		// RETURN wrapped object
		return (__cache.containsKey(init)) ? extend(init) : wrap(init);
}



/** Function Membrane
 * @param init Value to wrap
 * @param contract Access Permission Contract
 * @param name Variable name
 * @return wrapped object
 */
function __createFunctionMembrane(init, contract, name) {
		/* Trace Path *************************************** */
		initPath = name=="" ? new __TraceEmpty() : new __TraceProperty(name);

		/** Wrap Object
		 * @param target Target value to wrap
		 * @return  Proxy | Primitive
		 */
		function wrap(target) {
				// IF no function, return standard membrane
				if (typeof init !== "function") {
						return __createMembrane(init, contract, name);
				}

				/* Access Handler *********************************** */
				var functionHandler = __FunctionHandler(target, initPath, contract.reduce());

				/* Proxy ******************************************** */
				var proxy = Proxy(target, functionHandler);
				__fcache.put(proxy, functionHandler);
				return proxy;
		}

		/** Wrap Object
		 * @param target Target value to wrap
		 * @return  Proxy
		 */
		function extend(target) {
				_fcache.get(target).extend(initPath, contract);
				return target;
		}

		// RETURN wrapped object
		return (__fcache.containsKey(init)) ? extend(init) : wrap(init);
}





////////////////////////////////////////////////////
// INTERFACE
////////////////////////////////////////////////////


/** Apply Proxy
 * can be used to wrap an value
 * @param contract Access Permission Contract
 * @param base Current environment <this>
 * @param name Variable name
 */
function __applyProxy(contract, base, name) {
		obj = base[name];
		base[name] = __createMembrane(obj, contract, name);
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
		return __createMembrane(obj, contract, objname);
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

// AccessHandler Cache
var __cache = new  __HandlerCache();
// FucntionHandler Cache
var __fcache = new  __HandlerCache();
