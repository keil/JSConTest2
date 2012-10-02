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
						// TODO: test
						return literal.match(name);
				},

				/** Writeable
				 * @param name Variable name
				 * @return true iff the contract allows writing, false otherwise
				 */
				writeable: function(name) {
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
function __Contracts() {
		return {
				// list of contracts
				contracts : new Array(),

						  /** Set
						   * @param contract Access Persmission Contract
						   */
						  set: function(contractc) {
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
