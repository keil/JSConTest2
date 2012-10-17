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

