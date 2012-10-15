//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.21.0
//////////////////////////////////////////////////

// load trace path
load("parser.js");



////////////////////////////////////////////////////
// PERMIT CONTRACT
////////////////////////////////////////////////////

/** Standard Access Handler
 * @param contract Access Permission Contract to apply
 * @param value Target value
 */
function __permit(string, base, name) {
		parser = new __ContractParser();
		contract = parser.parse(string);

		obj = base[name];
		base[name] = __createMembrane(obj, name, contract);

// TODO, 
// diffenretn access method ?
		//
		// TODO: wrap value
		// apply contract and wrap value
}


// TODO
//////////////////////////////////////////////////
// Contract
// data structure for contracts
// RegEx			  = x | (x|..)	
// Contract Literal	c = @ | ? | RegEx | RegEx? | RegEx*
// Contract			C = [] | c.C 
//////////////////////////////////////////////////


/** Literal Type
*/
var __CType = {
		AT: "@",
		QMark: "?",
		RegEx: "RegEx",
		RegExQMark: "RegEx?",
		RegExStar: "RegEx*"
} 

/** Contract Literal
 * @param type Literal type
 * @param value String value
 * @return contract literal 
 */
function __ContractLiteral(type, value) {
		return {

				/** Get Value
				 * @return value
				 */
				getValue: function() {
						return type;
				},

				/** Get Type
				 * @return type
				 */
				getType: function() {
						return type;
				},

				/** Dump
				 * @return value:[type]
				 */
				dump: function () {
						return value + ":[" + type + "]";
				}, 

				/** To string
				 * @return value
				 */
				toString: function() {	
						if(type==__CType.RegExQMark) {
							return value!=null ? value + "?" : "";
						} else if(type==__CType.RegExStar) {
							return value!=null ? value + "*" : "";
						} else return value!=null ? value + "?" : "";
				},

				/** Match
				 * @param name Variable name
				 * @return true iff the name matches to the literal, false otherwise
				 */
				match: function(name) {
						return type==__CType.AT ? false : type==__CType.QMark ? true : new RegExp("^" + value + "$").test(name);

				}
		}
}

/** Access Permission Contract
 * @param literal Contract literal
 * @param contract Access Permission Contract
 * @return Access Permission Contract
 */
function __Contract(literal, contract) {
		return {

				/** Get Literal
				 * @return literal
				 */
				getLiteral: function() {
						return literal;
				},

				/** Get Contract
				 * @return contract
				 */
				getContract: function() {
						return contract;
				},

				/** Readable
				 * @param name Variable name
				 * @return true iff the contract allows reading, false otherwise
				 */
				readable: function(name) {
						switch (literal.getType()) {
								case __CType.AT:
										// readable(@.C', name) ::= (false, {})
										return {
												readable: false, contracts: new __ContractSet()
										};
								case __CType.QMark:
										// readable(?.C', name) ::= (true, {C'})
										return {
												readable: true, contracts: new __ContractSet(contract)
										};
								case __CType.RegEx:
										// readable(RegEx.C', name) ::= (true, {C'}), RegEx.match(name)
										// readable(RegEx.C', name) ::= (false, {}), otherwise
										if(literal.match(name)) return {
												readable: true, contracts: new __ContractSet(contract)
										};
										else return {
												readable: false, contracts: new __ContractSet()
										};
								case __CType.RegExQMark:
										// readable(RegEx?.C', name) ::= (true, {C'})+readable(C', name), RegEx.match(name)
										// readable(RegEx?.C', name) ::= readable(C', name), otherwise
										if(literal.match(name)) {
												var result = contract!=null ? contract.readable(name) : {readable: false, contracts: new __ContractSet()};		
												return {
														readable: true, contracts: new __ContractSet(contract, result.contracts)
												};
										} else return contract!=null ? contract.readable(name) : {readable: false, contracts: new __ContractSet()};
								case __CType.RegExStar:
										// readable(RegEx*.C', name) ::= (true, {C+C'})+readable(C', name), RegEx.match(name)
										// readable(RegEx*.C', name) ::= readable(C', name), otherwise
										if(literal.match(name)) {
												var result = contract!=null ? contract.readable(name) : {readable: false, contracts: new __ContractSet()};
												return {
														readable: true, contracts: new __ContractSet(this, new __ContractSet(contract, result.contracts))
												};
										} else return contract!=null ? contract.readable(name) : {readable: false, contracts: new __ContractSet()};
								default:
										// readable(c.C', name) ::= (false, {})
										return {
												readable: false, contracts: new __ContractSet()
										}
						}
				},

				/** Writeable
				 * @param name Variable name
				 * @return true iff the contract allows writing, false otherwise
				 */
				writeable: function(name) {
						if(contract==null) {
								// writeable(c.{}, name)
								switch (literal.getType()) {
										case __CType.AT:
												// writeable(@.{}, name) ::= false
												return false;
										case __CType.QMark:
												// writeable(?.{}, name) ::= true
												return true;
										case __CType.RegEx:
										case __CType.RegExQMark:
										case __CType.RegExStar:
												// writeable(RegEx.{}, name) ::= true, RegEx.match(name)
												// writeable(RegEx?.{}, name) ::= true, RegEx.match(name)
												// writeable(RegEx*.{}, name) ::= true, RegEx.match(name)
												return literal.match(name);
										default:
												// writeable(c.{}, name) ::= false
												return false;

								}
						} else if(contract.getContract()==null) {
								// writeable(c.c'.{}, name)
								switch (contract.getLiteral().getType()) {
										case __CType.AT:
										case __CType.QMark:
										case __CType.RegEx:
												// writeable(c.@.{}, name) ::= false
												// writeable(c.?.{}, name) ::= false
												// writeable(c.RegEx.{}, name) ::= false
												return false;
										case __CType.RegExQMark:
										case __CType.RegExStar:
												// writeable(c.RegEx?.{}, name) ::= true, c.match(name)
												// writeable(c.RegEx*.{}, name) ::= true, c.match(name)
												return literal.match(name);
										default:
												// writeable(c.c'.{}, name) ::= false
												return false;

								}
						} else {
								// writeable(c.C', name) ::= false
								return false;
						}
				},

				/** Dump contract
				 * @return value:[type]; ...
				 */
				dump: function() {
						// TODO
						return contract!=null ? literal.dump() + "; " + contract.dump() : literal.dump();
				},

				/** To string
				 * @return literal.contract
				 */
				toString: function() {
						// TODO
						return  contract!=null ? literal.toString() + "." + contract.toString() : literal.toString();
				},

				/** Type
				 * @return literal.contract
				 */
				toString: function() {
						return  contract!=null ? literal.toString() + "." + contract.toString() : literal.toString();
				}

		}
}

/** List of Access Permission Contract
 * @return List of Access Permission Contract
 */
function __ContractSet(arg0, arg1) {
		return {
				/** Readable
				 * @param name Variable name
				 * @return true iff the ONE contract allows reading, false otherwise
				 */
				readable: function(name) {
						var result0 = arg0!=null ? arg0.readable(name) : {readable: false, contracts: new __ContractSet()};
						var result1 = arg1!=null ? arg1.readable(name) : {readable: false, contracts: new __ContractSet()};
						return {
								readable: (result0.readable||result1.readable), contracts: new __ContractSet(result0.contracts, result1.contracts)
						};
				},

				/** Writeable
				 * @param name Variable name
				 * @return true iff the ONE contract allows writing, false otherwise
				 */
				writeable: function(name) {
						// TODO: test
						var result0 = arg0!=null ? arg0.writeable(name) : false;
						var result1 = arg1!=null ? arg1.writeable(name) : false;
						return result0||result1
				},

				/** Dump set
				 * @return value:[type]; ...
				 */
				dump: function() {
						// TODO: Ausgabe ist unschön
						return (arg0!=null ? (arg1!=null ? arg0.dump() + "; " + arg1.dump() : arg0.dump()) : (arg1!=null ? arg1.dump() : ""));
				},

				/** To string
				 * @return 
				 */
				toString: function() {
						// TODO: Ausgabe ist unschön
						return (arg0!=null ? (arg1!=null ? arg0.toString() + "; " + arg1.toString() : arg0.toString()) : (arg1!=null ? arg1.toString() : ""));
				}
		}
}
