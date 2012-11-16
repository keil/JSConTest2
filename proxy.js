//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////
(function(APC){

		//////////////////////////////////////////////////
		// HANDLER
		//////////////////////////////////////////////////

		/** Standard Access Handler
		 * @param contract Access Permission Contract
		 * @param path Trace Path
		 * @return AccessHandler
		 */
		function __AccessHandler(contract, path) {
				return {
						/** extend contract
						 * @param extContract Access Permission Contract
						 * @param extPath Access Permission Contract
						 */
						extend: function(extContract, extPath) {
								/* C = C&C' */
								contract = new APC.Contract.AndContract(contract, extContract).reduce();
								/* P = P;P' */
								path = new APC.TracePath.TraceSet(path, extPath);
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
								tracePath =  new APC.TracePath.TracePath(path, new APC.TracePath.TraceProperty(name));
								APC.Access.Logger.put(APC.Access.Type.READ, tracePath);

								/* Access Permission Contract *********************** */
								if(contract.isReadable(name)) {
										var desc = Object.getOwnPropertyDescriptor(target, name);
										if (desc !== undefined) desc.value = __createMembrane(desc, contract.derive(name), tracePath);
										return desc;
								} else {
										APC.Violation.Logger.put(APC.Violation.Type.READ, tracePath);
										var desc = (APC.Config.EvaluationMode == APC.Evaluation.Mode.OBSERVER) ? Object.getOwnPropertyDescriptor(target, name) : undefined;
										if (desc !== undefined) desc.value = __createMembrane(desc.value, contract.derive(name), tracePath);
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
								tracePath =  new APC.TracePath.TracePath(path, new APC.TracePath.TraceProperty(name));
								APC.Access.Logger.put(APC.Access.Type.WRITE, tracePath);

								/* Access Permission Contract *********************** */
								if(contract.isWriteable(name)) {
										return Object.defineProperty(target, name, desc);
								} else {
										APC.Violation.Logger.put(APC.Violation.Type.WRITE, tracePath);
										return (APC.Config.EvaluationMode == APC.Evaluation.Mode.OBSERVER) ? Object.defineProperty(target, name, desc) : false;
								}
						},
						/** delete proxy[name]
						 * @param target Wrapped target value
						 * @param name Property name
						 * @return Boolean
						 */
						deleteProperty: function(target, name) {
								/* Trace Path *************************************** */
								tracePath =  new APC.TracePath.TracePath(path, new APC.TracePath.TraceProperty(name));
								APC.Access.Logger.put(APC.Access.Type.WRITE, tracePath);

								/* Access Permission Contract *********************** */
								if(contract.isWriteable(name)) {
										return delete target[name];
								} else {
										APC.Violation.Logger.put(APC.Violation.Type.WRITE, tracePath);
										return (APC.Config.EvaluationMode == APC.Evaluation.Mode.OBSERVER) ? delete target[name] : false;
								}
						},
						/** Object.freeze(proxy)
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						freeze: function(target) {
								return Object.freeze(target);
						},
						/** Object.seal(proxy) 
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						seal: function(target) {
								return Object.seal(target);
						},
						/** Object.preventExtensions(proxy) 
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						preventExtensions: function(target) {
								return Object.preventExtensions(target);
						},
						/** Object.isFrozen(proxy) 
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						isFrozen: function(target) {
								return Object.isFrozen(target);
						},
						/** Object.preventExtensions(proxy) 
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						isSealed: function(target) {
								return Object.isSealed(target);
						},
						/** Object.preventExtensions(proxy) 
						 * @param target Wrapped target value
						 * @return Boolean
						 */
						isExtensible: function(target) {
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
								tracePath =  new APC.TracePath.TracePath(path, new APC.TracePath.TraceProperty(name));
								APC.Access.Logger.put(APC.Access.Type.READ, tracePath);

								/* Access Permission Contract *********************** */
								if(contract.isReadable(name)) {
										return __createMembrane(target[name], contract.derive(name), tracePath);
								} else {
										APC.Violation.Logger.put(APC.Violation.Type.READ, tracePath);
										return (APC.Config.EvaluationMode == APC.Evaluation.Mode.OBSERVER) ? __createMembrane(target[name], contract.derive(name), tracePath) : undefined;
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
								tracePath =  new APC.TracePath.TracePath(path, new APC.TracePath.TraceProperty(name));
								APC.Access.Logger.put(APC.Access.Type.WRITE, tracePath);

								/* Access Permission Contract *********************** */
								if(contract.isWriteable(name)) {
										return target[name] = value;
								} else {
										APC.Violation.Logger.put(APC.Violation.Type.WRITE, tracePath);
										return (APC.Config.EvaluationMode == APC.Evaluation.Mode.OBSERVER) ? target[name] = value : false;
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
								return target.apply(thisArg, args);
						},
						/** new proxy(...args)
						 * @param target Wrapped target value
						 * @param args Arguments
						 * @return Any
						 */
						construct: function(target, args) {
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
								contract = new APC.Contract.AndContract(contract, extContract).reduce();
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
								args = __createMembrane(args, contract.derive("arguments"), "arguments");
								thisArg = __createMembrane(thisArg, contract, "this");

								return target.apply(thisArg, args);
						},
						/** new proxy(...args)
						 * @param target Wrapped target value
						 * @param args Arguments
						 * @return Any
						 */
						construct: function(target, args) {
								return this.apply(target, this, args);
						}
				};
		}





		//////////////////////////////////////////////////
		// MEMBRANE
		//////////////////////////////////////////////////

		/** Standard Membrane
		 * @param init Value to wrap
		 * @param contract Access Permission Contract
		 * @param path Trace Path
		 * @return wrapped object or primitive value
		 */
		function __createMembrane(init, contract, path) {
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
						var accessHandler = __AccessHandler(contract.reduce(), path);

						/* Proxy ******************************************** */
						var proxy = new Proxy(target, accessHandler);
						__cache.put(proxy, accessHandler);
						return proxy;
				}

				/** Wrap Object
				 * @param target Target value to wrap
				 * @return  Proxy
				 */
				function extend(target) {
						_cache.get(target).extend(contract, path);
						return target;
				}

				// RETURN wrapped object
				return (__cache.containsKey(init)) ? extend(init) : wrap(init);
		}



		/** Function Membrane
		 * @param init Value to wrap
		 * @param contract Access Permission Contract
		 * @return wrapped object
		 */
		function __createFunctionMembrane(init, contract) {
				/** Wrap Object
				 * @param target Target value to wrap
				 * @return  Proxy | Primitive
				 */
				function wrap(target) {
						// IF no function, return standard membrane
						if (typeof init !== "function") {
								return __createMembrane(init, contract, new __TraceEmpty());
						}

						/* Access Handler *********************************** */
						var functionHandler = __FunctionHandler(contract.reduce());

						/* Proxy ******************************************** */
						var proxy = new Proxy(target, functionHandler);
						__fcache.put(proxy, functionHandler);
						return proxy;
				}

				/** Wrap Object
				 * @param target Target value to wrap
				 * @return  Proxy
				 */
				function extend(target) {
						_fcache.get(target).extend(contract);
						return target;
				}

				// RETURN wrapped object
				return (__fcache.containsKey(init)) ? extend(init) : wrap(init);
		}





		////////////////////////////////////////////////////
		// CACHE REFERENCE
		////////////////////////////////////////////////////

		/** Standard Handler Cache
		 * reference map proxy -> handler
		 */
		function __HandlerCache() {	
				var handlerMap = new WeakMap();

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
										if (proxy !== Object(proxy)) {
												return false;
										}
										return (handlerMap.get(proxy, undefined) !== undefined) ? true : false;
								}
				};
		};

		// AccessHandler Cache
		var __cache = new  __HandlerCache();
		// FucntionHandler Cache
		var __fcache = new  __HandlerCache();




		//////////////////////////////////////////////////
		// APC . Proxy
		//////////////////////////////////////////////////
		APC.Proxy = {};
		APC.Proxy.wrap = __createMembrane;
		APC.Proxy.wrapArgs = __createFunctionMembrane;

})(__APC);
