//////////////////////////////////////////////////
// JS Proxy API
// (c) University of Freiburg
// http://proglang.informatik.uni-freiburg.de/
// Author: Matthias Keil
// http://www.informatik.uni-freiburg.de/~keilr/
// Version: 0.20.0
//////////////////////////////////////////////////



////////////////////////////////////////////////////
// PERMIT CONTRACT
////////////////////////////////////////////////////

/** Standard Access Handler
 * @param contract Access Permission Contract to apply
 * @param value Target value
 */
function __permit(contract, value) {
		// TODO
		// apply contract and wrap value
}


// TODO
//////////////////////////////////////////////////
// Contract
// data structure for contracts
// Contract Literal	c = @ | ? | RegEx | RegEx? | RegEx*
// Contract			C = [] | c.C 
//////////////////////////////////////////////////

var __CType = {
		AT: "@",
		QM: "?",
		RegEx: "RegEx",
		RegExQMark: "RegEx?",
		RegExStar: "RegEx*"
} 

function __ContractLiteral(type, value) {
		return {
				type : type, 
				value : value,

				toString : function() {
					return "[" + type + "]:" + value;
				}
		}
}

function __Contract(literal, contract) {
		return {
				c : literal,
				cp : contract,


				readable: function() {
				},
				
				writeable : function() {
				},

				toString : function() {
						return literal==null ? contract==null ? "()" : contract.toString() :  contract==null ? literal.toString() : literal.toString() + "." + contract.toString();
								
							//	+ "." + contract.toString()
						
						
						//return literal.toString() + "." + contract.toString();
				}


		}
}

function __Contracts() {
		return {
				contracts : new Array(),

						  set : function(c) {
								  this.contracts.push(c);
						  },

						  forach : function(func) {
								  this.contracts.forach(func);
						  },

							readable : function () {
							
							
									return {
											valid: true,
											cts: contracts
									};
							},
							writeable : function () {
							

								return true;
							}
		}
}
