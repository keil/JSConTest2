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
//////////////////////////////////////////////////
function __TracePath(prefix) {
		return {
				pathPrefix: prefix,
						propertyPath: [],

						addProperty : function(name) {
								this.propertyPath.push(name);
						}, 

						toString : function () {
								path = this.pathPrefix.toString();
								this.propertyPath.forEach(function(value) {
										path += "." + value;
								});
								return path;
						},

						toPrefix : function() {
								return new TracePath(this.toString());
						},

						clone: function() {
								var clone = new __TracePath(this.pathPrefix);
								this.propertyPath.forEach(function(value) {
										clone.addProperty(value);
								});
								return clone;
						}
		}
}



var __Type = {
		READ : {value: 0, name: "READ", toString: function() { return this.name;} }, 
		WRITE: {value: 1, name: "WRIRE", toString: function() { return this.name;}}
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
//  HANDLER REFERENCE
//////////////////////////////////////////////////

/* Access Logger 
 */
function __AccessLogger() {


		function hashingFunction(e) {
			return e.toString();
		}


		function equalityFunction(arg0, arg1) {
			return ((arg0.type == arg1.type) && (arg0.path.toString() == arg1.path.toString()));
		}


		function Entry(type, path) {
				return Object.freeze({
						type: type,
					   path: path,
					   toString: function() {return padding_right(" [" + type.toString() + "] ", ' ', 9) + path.toString();}
				});
		}

		// Access Map
		var accessMap = new HashSet(hashingFunction, equalityFunction);

		return {
			set: function(type, path) {
					entryValue = Entry(type, path);
					accessMap.add(entryValue);
			},
			foreach: function(func) {
					accessMap.values().forEach(func);
			},
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
