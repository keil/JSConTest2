//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 1.00
//////////////////////////////////////////////////

//////////////////////////////////////////////////
// TRACE PATH
// data structure to log access paths
// Property	p = "x" ...
// Path 	P = [] | P.p 
//////////////////////////////////////////////////


/** Trace Property
 * @param variable Variable name
 */
function __TraceProperty(variable) {
		return {
				// property value
				property: variable,

				// to string method
				toString : function () {
						return property;
				}
		}
}

/** Trace Path
 * @param prefix Path prefix
 * @param variable Path property
 */
function __TracePath(prefix, variable) {
		return {
				// path prefix
				path: prefix,

				// path property
				property: variable,

				// to string method
				toString : function () {
						if (this.path == null)
								return this.property.toString();
						else
								return this.path.toString() + "." + this.property.toString();
				}
		}
}



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

