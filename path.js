//////////////////////////////////////////////////
// JavaScript Reflection API
//  for Access Permission Contracts
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 2.01
//////////////////////////////////////////////////
(function(APC) {

		//////////////////////////////////////////////////
		// TRACE PATH
		// data structure to log access paths
		// Property	p = "x" |  p{n}
		// Path 	P = [] | P.p | (P:p) | (P;P)
		//////////////////////////////////////////////////


		/** Empty Trace Property
		*/
		function __TraceEmpty() {
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return true;
						},
//					   isSequence:		function() { return false; },
//					   getCardinality:	function() { return 0;},
//					   getLast:			function() { return this; },
//					   getRawProperty:	function() { return this; },

//					   increaseSequence: function(arg) {
//							   return arg;
//					   },

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array.push("");
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return "";
					   },

//					   /* Flattening
//						* @param arg Trace Path
//						* @return Trace Path
//						*/
//					   flattening: function (arg) {
//							   // TODO
//							   return arg;
//					   },

//					   contains: function (arg) {
//							   return (this==arg);
//					   },

//					   // TODO
//					   foreach: function(callback) {
//						   callback(this);
//					   }
				});
		}

		/** Trace Property
		 * @param variable Variable name
		 */
		function __TraceProperty(property) {
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return false;
						},
//					   isSequence:		function() { return false; },
//					   getCardinality:	function() { return 0;},
//					   getLast:			function() { return this; },
//					   getRawProperty:	function() { return property; },

//					   increaseSequence: function(arg) {
//							   if(arg.isSequence()) {
//									   return new __TraceCardinality(this, arg.getCardinality()+1);
//							   } else {
//									   return new __TraceCardinality(this, 2);
//							   }
//					   },
					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   if(array.length === 0) {
									   array.push(property);
									   return array;
							   }

							   array.foreach(function(k, v){
									   array[k] = v + "." + property;
							   });
							   return array;
					   },
					   test: function() {return "foreach";},
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return property;
					   },

//					   /* Flattening
//						* @param arg Trace Path
//						* @return Trace Path
//						*/
//					   flattening: function (arg) {
//							   // TODO
//							   return new __TracePath(this, arg);
//					   },
//					   contains: function (arg) {
//							   return (this==arg);
//					   },
//
//					    // TODO
//					   foreach: function(callback) {
//					   			callback(this);
//					   }
				});
		}

//		/** Trace PropertyCardinality
//		 * @param variable Variable name
//		 */
//		function __TraceCardinality(property, cardinality) {
//				if(property.isEmpty()) return new __TraceEmpty();
//
//				if(cardinality==0) return new __TraceEmpty();
//				if(cardinality==1) return new property;
//
//				return __cache.c({
//						/** n({}) ::= true */
//						isEmpty: function() {
//								return property.isEmpty();
//						},
//
//					   isSequence:		function() { return true; },
//					   getCardinality:	function() { return cardinality;},
//					   getLast:			function() { return this; },
//					   getRawProperty:	function() { return property.getRawProperty(); },
//
//					   increaseSequence: function(arg) {
//							   if(arg.isSequence()) {
//									   return new __TraceCardinality(property, cardinality+arg.getCardinality());
//							   } else {
//									   return new __TraceCardinality(property, cardinality+1);
//							   }
//					   },
//
//
//					   //////////////////////////////////////////////////
//					   /* Dump
//						* @return Array<String>
//						*/
//					   dump: function(array) {
//							   propertyString = property;
//							   for(var i=1;i<cardinality;i++) {
//									   propertyString += ("." + property);
//							   }
//
//							   if(array.length === 0) {
//									   array.push(propertyString);
//								   return array;
//							   }
//
//							   array.foreach(function(k, v){
//									   array[k] = v + "." + propertyString;
//							   });
//							   return array;
//					   },
//					   /* To String
//						* @return String
//						*/
//					   toString: function () {
//							   return (property + "{" + cardinality + "}");
//					   },
//
//					   /* Flattening
//						* @param arg Trace Path
//						* @return Trace Path
//						*/
//					   flattening: function (arg) {
//							   // TODO
//							   return new __TracePath(this, arg);
//							   //return new __TracePath(path.flattening(property), arg);
//							   //  return path.flattening(new __TracePath(property, arg));
//					   },
//
//					   contains: function (arg) {
//							   return (this==arg);
//					   },
//
//					    // TODO
//					   foreach: function(callback) {
//					   
//					   }
//				});
//		}
//
//





		/** Trace Argument
		 * @param path Function path
		 * @param property Argument name
		 */
		function __TraceArgument(path, property) {
				// TODO
				//
				//
				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return (path.isEmpty() && property.isEmpty());
						},
//					   isSequence:		function() { return property.isSequence(); },
//					   getCardinality:	function() { return 0;},
//					   getLast:			function() { return property; },
//					   getRawProperty:	function() { return property.getRawProperty() },
//
//					   increaseSequence: function(arg) {
//							   return this;
//					   },

					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array = path.dump(array);
							   array = property.dump(array);
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return "function " + path.toString() + ": " + property.toString();
					   },

//					   /* Flattening
//						* @param arg Trace Path
//						* @return Trace Path
//						*/
//					   flattening: function (arg) {
//							   // TODO
//							   return new __TraceArgument(path, property.flattening(arg));
//					   },
//					   contains: function (arg) {
//							   return (this==arg);
//					   },
//
//					    // TODO
//					   foreach: function(callback) {
//					   			path.foreach(callback);
//							   property.foreach(callback);
//					   }

				});
		}

		/** Trace Path
		 * @param path Path prefix
		 * @param property Path property
		 */
		function __TracePath(path, property) {
				//__sysout("$" + path);
				//__sysout("#" + path.getLast());
				//__sysout("@" + property);
//				if(path.getLast().getRawProperty()==property.getRawProperty()) {
//						return path.increaseSequence(property);
//				}
//
//

				if(path.isEmpty() && property.isEmpty()) return new __TraceEmpty();
				else if(path.isEmpty()) return property;
				else if(property.isEmpty()) return path;

				//return path.flattening(property);

				return __cache.c({
						//path: path,
						//property: property,

						/** n({}) ::= true */
						isEmpty: function() {
								return (path.isEmpty() && property.isEmpty());
						},
//					   isSequence:		function() { return property.isSequence(); },
//					   getCardinality:	function() { return 0;},
//					   getLast:			function() { return property; },
//					   getRawProperty:	function() { return property.getRawProperty() },
//
//
//					   increaseSequence: function(arg) {
//							   if(property.getRawProperty()==arg.getRawProperty()) {
//									   // merge raw properties
//									   if(property.isSequence() && arg.isSequence()) {
//											   return new __TracePath(path,
//													   new __TraceCardinality(property.getLast(),
//															   (property.getCardinality()+arg.getCardinality())));
//									   } else if(property.isSequence()) {
//											   return new __TracePath(path,
//															   new __TraceCardinality(property.getLast(),
//																	   (property.getCardinality()+1)));
//									   } else if(property.isSequence()) {
//											   return new __TracePath(path,
//															   new __TraceCardinality(property.getLast(),
//																	   (arg.getCardinality()+1)));
//									   } else {
//											   return new __TracePath(path,
//															   new __TraceCardinality(property.getLast(),
//																	   2));
//									   }
//							   }
//					   },
					   //////////////////////////////////////////////////
					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   array = path.dump(array);
							   array = property.dump(array);
							   return array;
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return path.toString() + "." + property.toString();
					   },

//					   /* Flattening
//						* @param arg Trace Path
//						* @return Trace Path
//						*/
//					   flattening: function (arg) {
//							   // TODO
//							   //return new __TracePath(path.flattening(property), arg);
//							   return path.flattening(new __TracePath(property, arg));
//					   },
//
//					   contains: function (arg) {
//							   return (this==arg);
//					   },
//
//					    // TODO
//					   foreach: function(callback) {
//							   path.foreach(callback);
//							   property.foreach(callback);
//					   }
//
				});
		}

		/** Trace Path Set
		 * @param path0 Trace Path 0
		 * @param path1 Trace Path 1
		 */
		function __TraceSet(path0, path1) {
				if(path0.isEmpty() && path1.isEmpty()) return new __TraceEmpty();
				else if(path0.isEmpty()) return path1;
				else if(path1.isEmpty()) return path0;


				return __cache.c({
						/** n({}) ::= true */
						isEmpty: function() {
								return (path0.isEmpty() && path1.isEmpty());
						},
					   isSequence:		function() { return false; },
					   getCardinality:	function() { return 0;},
					   getLast:			function() { return this; },
					   getRawProperty:	function() { return null; },

					   increaseSequence: function(arg) {
							   return this;
					   },


					   //////////////////////////////////////////////////

					   /* Dump
						* @return Array<String>
						*/
					   dump: function(array) {
							   // dump path 0
							   var set0 = new Array(array);
							   set0 = path0.dump(set0);

							   // dump path 1
							   var set1 = new Array(array);
							   set1 = path1.dump(set1);

							   // merge sets
							   return set0.concat(set1);
					   },
					   /* To String
						* @return String
						*/
					   toString: function () {
							   return "( " + path0.toString() + " ; " + path1.toString() + " )";
					   },

					   /* Flattening
						* @param arg Trace Path
						* @return Trace Path
						*/
					   flattening: function (arg) {
							   // TODO
							   return new __TraceSet(path0.flattening(arg), path1.flattening(arg));
					   },

					   contains: function (arg) {
							   return (path0.contains(arg) || path1.contains(arg));
					   },

					    // TODO
					//   foreach: function(callback) {
					//		   path0.foreach(callback);
					//		   path1.foreach(callback);
					//   
					//   }

				});
		}

		// TODO
		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath = {};
		APC.TracePath.TraceEmpty	= __TraceEmpty;
		APC.TracePath.TraceProperty	= __TraceProperty;
		APC.TracePath.TraceArgument	= __TraceArgument;
		APC.TracePath.TracePath		= __TracePath;
		APC.TracePath.TraceSet		= __TraceSet;





		//////////////////////////////////////////////////
		//  PATH CACHE
		//  cache for access (trace)paths
		//////////////////////////////////////////////////

		/** Path Cache 
		*/
		function __PathCache() {

				// cache array
				var cache = new StringMap();

				return {

						/* cache function
						 * @param path trace path
						 * @return trace path
						 */
						c: function(path) {
								if(this.contains(path.toString())) {
										return this.get(path.toString());
								} else {
										this.put(path.toString(), path);
										return path;
								}
						},

								/* put
								 * @param key cache key
								 * @param value cache value
								 * @return value
								 */
								put: function(key, value) {
										cache.set(key, value);
										return value;
								},

								/* get
								 * @param key cache key
								 * @return value
								 */
								get: function(key) {
										return cache.get(key);
								},

								/* contains
								 * @param key cache key
								 * @return true, if key in cache, false otherwise
								 */
								contains: function(key) {
										return cache.has(key);
								},

								/* clear cache
								*/
								clear: function() {
										cache = new StringMap();
								}
				}
		}

		// current path cache
		var __cache = new __PathCache();



		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath.Cache = __cache;





		//////////////////////////////////////////////////
		//  ACCESS LOGGER
		//  logger for access (trace)paths
		//////////////////////////////////////////////////

		/** Access Type
		*/
		var __AccessType = {
				READ : {value: 0, name: "READ", toString: function() { return this.name;} }, 
				WRITE: {value: 1, name: "WRITE", toString: function() { return this.name;} }
		};

		/** Access Logger 
		*/
		function __AccessLogger() {

				/** hash function
				 * @param e Value
				 */
				function hashingFunction(e) {
						return e.toString();
				}

				/** compare to elements
				 * @param arg0 First argument
				 * @param arg1 Second argument
				 */
				function equalityFunction(arg0, arg1) {
						return ((arg0.type == arg1.type) && (arg0.path.toString() == arg1.path.toString()));
				}

				/** list entry
				 * @param type Access type
				 * @param path Access path
				 */
				function Entry(type, path) {
						return Object.freeze({
								type: type,
							   path: path,
							   toString: function() {
									   return padding_right(" [" + type.toString() + "] ", ' ', 9) + path.toString();
							   }
						});
				}

				// access map
				var accessMap = new HashSet(hashingFunction, equalityFunction);

				return {
						/** put a new value
						 * @param type Access type
						 * @param path Access path
						 */
						put: function(type, path) {
								entryValue = Entry(type, path);
								accessMap.add(entryValue);
						},

								/** iterates over elements
								 * @param func Function to call for each element
								 */		
								foreach: function(func) {
										accessMap.values().forEach(func);
								},

								/** prints the list
								*/
								print: function () {
										accessMap.values().forEach(function(value) {
												__sysout(value.toString());
										});
								}
				}
		};

		// current access logger
		__accessLogger = new __AccessLogger();

		/** Evaluation Function
		*/
		function __evaluateAccess() {
				__sysout("\n\n\n\n\n");
				__sysout("##################################################");
				__sysout("# EVALUATION of ACCESS                           #");
				__sysout("##################################################");
				__accessLogger.print();
				__sysout("##################################################");
		}

		function __clearAccess() {
				__accessLogger = new __AccessLogger();
				APC.Access.Logger = __accessLogger;
		}

		function __dumpAccess() {
				__sysout("##################################################");
				__sysout("# EVALUATION of ACCESS                           #");
				__accessLogger.print();
				__clearAccess();
		}

		//////////////////////////////////////////////////
		// APC . Access
		//////////////////////////////////////////////////
		APC.Access = {};
		APC.Access.Type				= __AccessType;
		APC.Access.Logger			= __accessLogger;
		APC.Access.evaluate			= __evaluateAccess;
		APC.Access.dump				= __dumpAccess;





		//////////////////////////////////////////////////
		//  JsConTest
		//  contract/effect generator
		//////////////////////////////////////////////////

		/** Make Read Effects
		 * returns a list with dumped TracePath Elements in <acp>-style
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return Array
		 */
		function __makeReadEffects() {
				var rEffects = new Array();
				__accessLogger.foreach(function(v) {
						if(v.type == APC.Access.Type.READ) {
								(v.path.dump(new Array())).foreach(function(k, v) {
										rEffects.push(__makeEffectPath(v.split(".")));
								});
						}
				});
				return rEffects;
		}

		/** Make Write Effects
		 * returns a list with dumped TracePath Elements in <acp>-style
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return Array
		 */
		function __makeWriteEffects() {
				var wEffects = new Array();
				__accessLogger.foreach(function(v) {
						if(v.type == APC.Access.Type.WRITE) {
								(v.path.dump(new Array())).foreach(function(k,v) {
										wEffects.push(__makeEffectPath(v.split(".")));
								});
						}
				});
				return wEffects;
		}

		/** Make Write Effects
		 * generates a TracePath to an <acp>-like path
		 * @see __JSConTest.events.handler.effects / acpToPath
		 * @return <acp>-Path
		 */
		function __makeEffectPath(pathArray) {

				// an access path <acp> is
				// {type: PROP, property: "name", effect: <acp>}
				// {type: PARAMETER, number: anInt, fname: "fun_identifier"}
				// {type: VARIABLE, name: "var_identifier", }


				// <acp>-Types
				var PARAMETER = 1,
					VARIABLE = 2,
					PROP = 3,
					QUESTIONMARK = 4,
					STAR = 5,
					ALL = 6,
					noPROP = 7,
					regExProp = 8,
					regExVar = 9;


				/** Make <acp>-Variable
				 * @param varname Variable name
				 * @return <acp>-Variable
				 */
				function makeVariable(varname) {
						return {type: VARIABLE, name:varname, toString: function() {return varname;}}
				}

				/** Make <acp>-Parameter
				 * @param parnum Parameter number
				 * @param fname Function name
				 * @return <acp>-Parameter
				 */
				function makeParameter(parnum, fname) {
						return {type: PARAMETER, number: parnum, fname: fname, toString: function() {return fname + ".argumentsXX." + parnum;}}
				}

				/** Make <acp>-Property
				 * @param pname Property name
				 * @param effect Parent effect
				 * @return <acp>-Parameter
				 */	
				function makeProperty(pname, effect) {
						return {type: PROP, property: pname, effect: effect, toString: function() {return effect.toString + "." + pname;}}
				}

				if(pathArray[1] == "arguments") {
						var tmp = makeParameter(pathArray[2], pathArray[0]);
						var i = 3;
				} else {
						var tmp = makeVariable(pathArray[0]);
						var i = 1;
				}

				for(; i<pathArray.length; i++ ) {
						tmp = {type: PROP, property:  pathArray[i], effect: tmp}
				}
				return tmp;
		}



		/** Append Effect Inference to DOM node
		 * @param domNode DOM node
		 */
		function __appendEffects(domNode) {
				var handler = __JSConTest.events.handler.effects.create(domNode);

				var rEffect = __makeReadEffects();
				handler.assertEffectsRead(0,0,0,0,rEffect);

				var wEffect = __makeWriteEffects();
				handler.assertEffectsWrite(0,0,0,0,wEffect);

				handler.statistic();
		}

		//////////////////////////////////////////////////
		// APC . Effect
		//////////////////////////////////////////////////
		APC.Effect = {};
		APC.Effect.getReadEffect		= __makeReadEffects;
		APC.Effect.getWriteEffect		= __makeWriteEffects;
		APC.Effect.appendEffectsToNode	= __appendEffects;

})(__APC);
