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
// OBJECT CONTRACTS
////////////////////////////////////////////////////

/** Permit
 * @param string Access Permission Contract to apply
 * @param obj Object
 * @param name Object name [optional]
 * @return Object proxy
 */
function __permit(string, obj, name) {
		// optional name
		objname = name!=null ? name : "";

		// parse contracts
		parser = new __ContractParser();
		contract = parser.parse(string);

		// create proxy
		return __createMembrane(obj, objname, contract);
}

/** Apply
 * @param string Access Permission Contract
 * @param base Current object
 * @param name Property name
 */
function __apply(string, base, name) {
		obj = base[name];
		base[name] = __permit(string, obj, name);
}

/** Apply Object
 * @param string Access Permission Contract
 * @param base Current object
 * @param name Property name
 */
function __applyObj(string, base) {
		// get object name
		i = string.indexOf(".");
		obj = string.substr(0,i);
		contract = string.substring(i+1);

		// abbly contract
		__apply(contract, base, obj);
}



////////////////////////////////////////////////////
// FUNCTION CONTRACTS
////////////////////////////////////////////////////

/** Permit Arguments 
 * @param string Access Permission Contract
 * @param function Function
 * @param name Function name [optional]
 * @return Function proxy
 */
function __permitArgs(string, func, name) {
		// optional name
		funcname = name!=null ? name : "";

		// parse contracts
		parser = new __ContractParser();
		contract = parser.parse(string);

		// create function proxy
		return __createFunctionMembrane(func, funcname, contract);
}

/** Apply Arguments 
 * @param string Access Permission Contract
 * @param base Current object
 * @param name Function name
 */
function __permitArgs(string, base, name) {
		func = base[name];
		base[name] = __permitArgs(string, func, name);
}
