//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
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
function __permit(contract, value) {
		//parser = new __ContractParser();
		//contract = parser.parse(contract);
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
						return type:
				},

				/** Get Type
				 * @return type
				 */
				getType: function() {
						return type:
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
						return value!=null? value: "";
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
						return liertal;
				},

				/** Get Contract
				 * @return contract
				 */
				getContract: function() {
						return liertal;
				},

				/** Readable
				 * @param name Variable name
				 * @return true iff the contract allows reading, false otherwise
				 */
				readable: function(name) {
						switch (literal.getType()) {
								case __CType.AT:
										return {
												readable: false, contracts: new __ContractSet()
										}
										break;
								case __CType.QMark:
										return {
												readable: true, contracts: new __ContractSet(contract)
										}
										break;
								case __CType.RegEx:
										if(literal.match(name)) {
												return {
														readable: true, contracts: new __ContractSet(contract)
												}
										} else {
												return {
														readable: false, contracts: new __ContractSet()
												}
										}
										break;
								case __CType.RegExQMark:
										if(literal.match(name)) {
												result = contract.readable(name);											
												return {
														readable: true, contracts: new __ContractSet(contract, result.contracts)
												};
										} else {
												return contract.readable(name);
										}
										break;
								case __CType.RegExStar:
										if(literal.match(name)) {										
												return {
														readable: true, contracts: new __ContractSet(this, contract)
												};
										} else {
												return contract.readable(name);
										}
										break;
								default:
										return {
												readable: false, contracts: new __ContractSet()
										}
										break;
						}
				},

				/** Writeable
				 * @param name Variable name
				 * @return true iff the contract allows writing, false otherwise
				 */
				writeable: function(name) {
						if(contract==null){
								switch (literal.getType()) {
										case __CType.AT:
												return false;
										case __CType.QMark:
												return true;
										case __CType.RegEx:
										case __CType.RegExQMark:
										case __CType.RegExStar:
												return literal.match(name);
										default:
												return false;

								}
						} else if(contract.contract==null) {
								switch (contract.getLiteral.getType()) {
										case __CType.AT:
										case __CType.QMark:
										case __CType.RegEx:
												return false;
										case __CType.RegExQMark:
										case __CType.RegExStar:
												return literal.match(name);
										default:
												return false;

								}
						} else {
								return false;
						}




						// TODO; test
						return contract==null ? literal.match(name) : false;
				},

				/** Dump literal
				 * @return value:[type]; ...
				 */
				dump: function() {
						return contract!=null ? literal.dump() + "; " + contract.dump() : literal.dump();
				},

				/** To string
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
function __ContractSet() {

		// list of contracts
		var contracts = new Array();
		for (var i=0, args=arguments.length; i < args; i++) {
				if(arguments[i] instanceof Contract) {
						contracts.push(arguments[i]);
				} else if(arguments[i] instanceof ContractSet) {
						arguments[i].foreach(function(k,v){
								contracts.push(v);
						});
				}

				return {
						// TODO
						// list of contracts
						//contracts: new Array(),

						/** Set
						 * @param contract Access Persmission Contract
						 */
						add: function(contractc) {
								this.contracts.push(c);
						},

								/** Foreach
								 * @param func Callback function
								 */
								forach: function(func) {
										this.contracts.forach(func);
								},

								/** Readable
								 * @param name Variable name
								 * @return true iff the ONE contract allows reading, false otherwise
								 */
								readable: function(name) {
										var result = false;
										contracts.foreach(function(k,v){
												result &= v.writeable();
										});
										return reult;


										// TODO: ask literal whether reading is allowed or not
										// 	return { valid: true, cts: contracts };
										return true;
								},

								/** Writeable
								 * @param name Variable name
								 * @return true iff the ONE contract allows writing, false otherwise
								 */
								writeable: function(name) {
										var result = false;
										contracts.foreach(function(k,v){
												result &= v.writeable();
										});
										return reult;
								}
				}
		}
