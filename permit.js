//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.22
//////////////////////////////////////////////////

// load trace path
load("contract.js");



////////////////////////////////////////////////////
// PERMIT CONTRACT
////////////////////////////////////////////////////

/** Permit Contract
 * @param string Access Permission Contract to apply
 * @param base Current object
 * @param name Property name
 */
function __permit(string, base, name) {
		parser = new __ContractParser();
		contract = parser.parse(string);

		// wrap value
		obj = base[name];
		base[name] = __createMembrane(obj, name, contract);
}

/**  Permit Contract
 * @param string Access Permission Contract with leading property
 * @param base Current object
 */
function __apply(string, base) {
		i = string.indexOf(".");
		obj = string.substr(0,i);
		contract = string.substring(i+1);

		// permit contract
		__permit(contract, base, obj);
}





////////////////////////////////////////////////////
// FUNCTION CONTRACTS
////////////////////////////////////////////////////


function __permitArgs(string, func) {
		parser = new __ContractParser();
		contract = parser.parse(string);

		var result = __createFunctionMembrane(func, "function", contract);
		return result;
}



//////////////////////////////////////////////////
// MEMBRANE
//////////////////////////////////////////////////

/** Function Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 * @param contract Access Permission Contract
 * @return wrapped function or __createMembrane(init)
 */
function __createFunctionMembrane(init, name, contract) {
		if (typeof init !== "function") {
				return __createMembrane(init, "unknown", contract); // TODO function name ?
		}

		/* WRAP function
		 * @param func Function object
		 * @param base Function base
		 * @param args Function arguments
		 */
		function wrapFunction(func, base, args) {
				stat = contract.readable("arguments");
				args = __createMembrane(args, "arguments", stat.contracts);
				return func.apply(base, args);
		}

		function callTrap() {
				return wrapFunction(init, this, arguments);
		}
		function constructTrap() {
				return wrapFunction(init, this, arguments);
		}

		// create trace path
		initPath = new __TracePath(null, name);
		// TODO handle name

		// AccessHandler for <init>
		var accessHandler = __AccessHandler(init, initPath, contract);

		return Proxy.createFunction(accessHandler, callTrap, constructTrap);
}




//name = "function";
// create trace path
//initPath = new __TracePath(null, name);

/** wrap object/ function or return primitive value
 * @param target Target value to wrap
 */
//function wrap(target) {
//}

// RETURN wrapped object
//return wrap(init);
//}



















/** Function Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 */
function __createFunctionMembrane3(init, contract) {
		if (typeof init !== "function") {
				return __createMembrane(init, "unknown", contract); // TODO function name ?
		}

		// create trace path
		initPath = new __TracePath(null, "function");

		// AccessHandler for <target>
		var accessHandler = __AccessHandler(init, initPath, contract);

		/* WRAP function
		 * @param func Function object
		 * @param base Function base
		 * @param args Function arguments
		 */
		function wrapFunction(func, base, args) {
				//args.foreach(function(
				//	args[k] = 					
				//));
				args = __createMembrane(args, "args", contract);	
				//__sysout("#" + Object.keys(args));
				return wrap(func.apply(base, args /*Array.prototype.map.call(args, wrap)*/));
		}

		function callTrap() {
				var value = wrapFunction(init, wrap(this) , arguments);
				return value;
		}
		function constructTrap() {
				function forward(args) {
						return target.apply(this, args);
				}
				return wrap(new forward(Array.prototype.map.call(arguments, wrap)));
		}
		// RETURN wrapped object
		return Proxy.createFunction(accessHandler, callTrap, constructTrap);



}

















/** Standard Membrane
 * @param init Value to wrap
 * @param name Variable name (needed to trace the path)
 */
function __createFunctionMembrane2(init, contract) {
		name = "function";
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
						return wrap(func.apply(base, /*Array.prototype.map.call(args, wrap)*/ args));
						//return func.apply(base, args);
				}

				// AccessHandler for <target>
				var accessHandler = __AccessHandler(target, initPath, contract);

				// If function, create function proxy
				if (typeof target === "function") {
						function callTrap() {
								var value = wrapFunction(target, wrap(this), arguments);
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











