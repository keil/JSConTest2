//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Version: 0.20
//////////////////////////////////////////////////

// Load waek map
load("__lib_jsweakmap.js");
// load hash set
load("__lib_jshashset.js");
// load string padding
load("__lib_jspadding.js");



//////////////////////////////////////////////////
// TRACE PATH
// data structure to log access paths
// Property	p = "x" ...
// Path 	P = [] | P.p 
//////////////////////////////////////////////////


/* Trace Property
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

/* Trace Path
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
// TRACE PATH
// data structure to log access paths
// TraceProperty p = "x" ...
// TracePath 	 P = [] | P.p 
//////////////////////////////////////////////////


var __Type = {
		READ : {value: 0, name: "READ", toString: function() { return this.name;} }, 
		WRITE: {value: 1, name: "WRIRE", toString: function() { return this.name;} }
};



//////////////////////////////////////////////////
//  HANDLER REFERENCE
//////////////////////////////////////////////////

function __HandlerReference() {
		// AccessHandler Map
		// Proxy -> Hanler
		var handlerMap = new WeakMap();

		return {
				set: function(proxy, handler) {
						handlerMap.set(proxy, handler);
						return true;
				},
						get: function(proxy) {
								return handlerMap.get(proxy, undefined);
						}
		};
};



//////////////////////////////////////////////////
//  ACCESS LOGGER
//  logger for access (trace)paths
//////////////////////////////////////////////////

/* Access Logger 
*/
function __AccessLogger() {

		// hash function
		function hashingFunction(e) {
				return e.toString();
		}

		// compare to elements
		function equalityFunction(arg0, arg1) {
				return ((arg0.type == arg1.type) && (arg0.path.toString() == arg1.path.toString()));
		}

		// list entry
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
				// sets a new value
				set: function(type, path) {
						entryValue = Entry(type, path);
						accessMap.add(entryValue);
				},
						
				// iterates over elements		
				foreach: function(func) {
								accessMap.values().forEach(func);
						},

				// prints the list
				print: function () {
						accessMap.values().forEach(function(value) {
										__sysout(value.toString());
								});
						}
		}
};
// current access logger
__accessLogger = new __AccessLogger();


/* Evaluation Function
*/
function __evaluate() {
		__sysout("\n\n\n\n\n");
		__sysout("##################################################");
		__sysout("# EVALUATION of ACCESS                           #");
		__sysout("##################################################");
		__accessLogger.print();
		__sysout("##################################################");
}
