//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.22
//////////////////////////////////////////////////

// Load waek map
load("__lib_jsweakmap.js");
// load hash set
load("__lib_jshashset.js");
// load string padding
load("__lib_jspadding.js");



//////////////////////////////////////////////////
//  VIOLATION LOGGER
//  logger for access violations
//////////////////////////////////////////////////

/** Access Type
*/
var __ViolationType = {
		READ : {value: 0, name: "READ VIOLATION", toString: function() { return this.name;} }, 
		WRITE: {value: 1, name: "WRITE VIOLATION", toString: function() { return this.name;} }
};

/** Violation Logger 
*/
function __ViolationLogger() {

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
				/** sets a new value
				 * @param type Access type
				 * @param path Access path
				 */
				set: function(type, path) {
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
__violationLogger = new __ViolationLogger();

/** Evaluation Function
*/
function __evaluateViolation() {
		__sysout("\n\n\n\n\n");
		__sysout("##################################################");
		__sysout("# EVALUATION of VIOLATIONS                       #");
		__sysout("##################################################");
		__violationLogger.print();
		__sysout("##################################################");
}

function __clearViolation() {
__violationLogger = new __ViolationLogger();
}

function __dumpViolation() {
		__sysout("##################################################");
		__sysout("# EVALUATION of VIOLATIONS                       #");
		__violationLogger.print();
		__clearViolation()
}
