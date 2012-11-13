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
		// Property	p = "x" ...
		// Path 	P = [] | P.p | P;P
		//////////////////////////////////////////////////


		/** Empty Trace Property
		*/
		function __TraceEmpty() {
				return {
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
						toString : function () {
								return "";
						}
				}
		}

		/** Trace Property
		 * @param variable Variable name
		 */
		function __TraceProperty(property) {
				return {
						/* Dump
						 * @return Array<String>
						 */
						dump: function(array) {
								array.foreach(function(k, v){
										array[k] = v + "." + property;
								});
								return array;
						},

						/* To String
						 * @return String
						 */
						toString : function () {
								return property;
						}
				}
		}

		/** Trace Path
		 * @param path Path prefix
		 * @param property Path property
		 */
		function __TracePath(path, property) {
				return {
						/* Dump
						 * @return Array<String>
						 */
						dump: function(array) {
								array = path.dump(array);

								//array.foreach(function(k,v){
								//		array[k] = v + ".";
								//});
								array = property.dump(array);

								return array;
						},

						/* To String
						 * @return String
						 */
						toString : function () {
								return path.toString() + "." + property.toString();
						}
				}
		}

		/** Trace Path Set
		 * @param path0 Trace Path 0
		 * @param path1 Trace Path 1
		 */
		function __TraceSet(path0, path1) {
				return {

						/* Dump
						 * @return Array<String>
						 */
						dump: function(array) {
								// dump path 0
								var set0 = new Array(array);
								path0.dump(set0);

								// dump path 1
								var set1 = new Array(array);
								path1.dump(set1);

								// merge sets
								return set0.concat(set1);
						},

						/* To String
						 * @return String
						 */
						toString : function () {
								return "( " + path0.toString() + " ; " + path1.toString() + " )";
						}
				}
		}

		//////////////////////////////////////////////////
		// APC . Path
		//////////////////////////////////////////////////
		APC.TracePath = {};
		APC.TracePath.TraceEmpty	= __TraceEmpty;
		APC.TracePath.TraceProperty	= __TraceProperty;
		APC.TracePath.TracePath		= __TracePath;
		APC.TracePath.TraceSet		= __TraceSet;





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

})(__APC);
